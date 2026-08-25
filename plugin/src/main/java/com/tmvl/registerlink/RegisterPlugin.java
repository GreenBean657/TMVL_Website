package com.tmvl.registerlink;

import org.bukkit.ChatColor;
import org.bukkit.plugin.java.JavaPlugin;

public final class RegisterPlugin extends JavaPlugin {

    private String endpoint;
    private int timeoutSeconds;

    @Override
    public void onEnable() {
        saveDefaultConfig();
        this.endpoint = getConfig().getString("endpoint", "http://localhost/register");
        this.timeoutSeconds = getConfig().getInt("timeout-seconds", 10);

        if (endpoint != null && !endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
            getLogger().warning("Endpoint '" + endpoint
                    + "' has no scheme, assuming http:// - add http:// or https:// in config.yml to silence this.");
            this.endpoint = "http://" + endpoint;
        }

        if (getCommand("register") == null) {
            getLogger().severe("/register is missing from plugin.yml, disabling plugin.");
            getServer().getPluginManager().disablePlugin(this);
            return;
        }
        getCommand("register").setExecutor(new RegisterCommand(this));
        getLogger().info("Registration endpoint: " + endpoint);
    }

    public String getEndpoint() {
        return endpoint;
    }

    public int getTimeoutSeconds() {
        return timeoutSeconds;
    }

    /** Returns a configured message with the prefix and color codes applied. */
    public String msg(String key) {
        String prefix = getConfig().getString("messages.prefix", "");
        String raw = getConfig().getString("messages." + key, key);
        return ChatColor.translateAlternateColorCodes('&', prefix + raw);
    }
}
