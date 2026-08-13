import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "./components/topbar";
import Toplinks from "./components/toplinks";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import styles from "../css/layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: { title: string; description: string } = {
  title: "AEGIS",
  description:
    "Alter. Evaluate. Govern. Isolate. Secure. The AEGIS anomalous entity database.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${styles.html}`}
    >
      <body className={`bg-hexagon ${styles.body}`}>
        <Topbar />
        <Toplinks />
        <div className={styles.content}>
          <Sidebar />
          <main className={styles.main}>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
