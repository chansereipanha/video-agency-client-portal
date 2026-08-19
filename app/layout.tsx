import type { Metadata } from "next";
import Link from "next/link";
import SidebarNav from "@/components/SidebarNav";
import PortalHeader from "@/components/PortalHeader";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cutroom | Client Portal",
  description: "Demo client portal for a video production agency.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <Link className="brand" href="/">
              <span>c</span> CUTROOM
            </Link>
            <SidebarNav />
            <div className="user-card">
              <div className="avatar">MW</div>
              <div>
                <b>Maia Wolfgramm</b>
                <small>Producer</small>
              </div>
            </div>
          </aside>
          <main className="content"><PortalHeader />{children}</main>
        </div>
      </body>
    </html>
  );
}
