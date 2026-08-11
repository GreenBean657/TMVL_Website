import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "./components/topbar";
import Toplinks from "./components/toplinks";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AEGIS",
  description:
    "Alter. Evaluate. Govern. Isolate. Secure. The AEGIS anomalous entity database.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-hexagon flex h-full flex-col font-sans text-[#222]">
        <Topbar />
        <Toplinks />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
