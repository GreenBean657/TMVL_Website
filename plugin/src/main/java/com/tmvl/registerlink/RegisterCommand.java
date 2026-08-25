package com.tmvl.registerlink;

import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public final class RegisterCommand implements CommandExecutor {

    private final RegisterPlugin plugin;

    public RegisterCommand(RegisterPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!(sender instanceof Player)) {
            sender.sendMessage(plugin.msg("only-players"));
            return true;
        }
        Player player = (Player) sender;
        player.sendMessage(plugin.msg("requesting"));

        // Never do HTTP on the main server thread.
        plugin.getServer().getScheduler().runTaskAsynchronously(plugin, () -> {
            String link;
            try {
                link = requestLink(player);
            } catch (Exception e) {
                plugin.getLogger().warning("Registration request failed for "
                        + player.getName() + ": " + e.getMessage());
                link = null;
            }
            String finalLink = link;
            plugin.getServer().getScheduler().runTask(plugin, () -> deliver(player, finalLink));
        });
        return true;
    }

    /** POSTs the player's uuid and username to the endpoint; returns the response body. */
    private String requestLink(Player player) throws IOException {
        String body = "uuid=" + URLEncoder.encode(player.getUniqueId().toString(), "UTF-8")
                + "&username=" + URLEncoder.encode(player.getName(), "UTF-8");

        HttpURLConnection conn = (HttpURLConnection) new URL(plugin.getEndpoint()).openConnection();
        try {
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setConnectTimeout(plugin.getTimeoutSeconds() * 1000);
            conn.setReadTimeout(plugin.getTimeoutSeconds() * 1000);
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("User-Agent",
                    plugin.getName() + "/" + plugin.getDescription().getVersion());

            try (OutputStream out = conn.getOutputStream()) {
                out.write(body.getBytes(StandardCharsets.UTF_8));
            }

            int status = conn.getResponseCode();
            InputStream in = status >= 200 && status < 300 ? conn.getInputStream() : conn.getErrorStream();
            String response = readAll(in);
            if (status < 200 || status >= 300) {
                throw new IOException("endpoint responded with HTTP " + status);
            }
            return response.trim();
        } finally {
            conn.disconnect();
        }
    }

    /** Sends the returned link to the player as a clickable chat component. */
    private void deliver(Player player, String link) {
        if (!player.isOnline()) {
            return;
        }
        if (link == null) {
            player.sendMessage(plugin.msg("error"));
            return;
        }
        if (!link.startsWith("http://") && !link.startsWith("https://")) {
            plugin.getLogger().warning("Endpoint returned an invalid link for "
                    + player.getName() + ": " + link);
            player.sendMessage(plugin.msg("failure"));
            return;
        }
        player.sendMessage(plugin.msg("success"));

        TextComponent component = new TextComponent(link);
        component.setColor(net.md_5.bungee.api.ChatColor.AQUA);
        component.setUnderlined(true);
        component.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, link));
        player.spigot().sendMessage(component);
    }

    private static String readAll(InputStream in) throws IOException {
        if (in == null) {
            return "";
        }
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        byte[] chunk = new byte[4096];
        int read;
        while ((read = in.read(chunk)) != -1) {
            buffer.write(chunk, 0, read);
        }
        in.close();
        return buffer.toString("UTF-8");
    }
}
