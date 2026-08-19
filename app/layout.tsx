import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";


export const metadata: Metadata = {
  title: "Cutroom | Client Portal",
  description: "Demo client portal for a video production agency.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <Link className="brand" href="/">
              <span>c</span> CUTROOM
            </Link>
            <nav aria-label="Main navigation">
              <Link href="/">
                ◈ <span>Overview</span>
              </Link>
              <Link href="/clients">
                ◉ <span>Clients</span>
              </Link>
              <Link href="/library">
                ▣ <span>Content library</span>
              </Link>
            </nav>
            <div className="user-card">
              <div className="avatar">MW</div>
              <div>
                <b>Maia Wolfgramm</b>
                <small>Producer</small>
              </div>
            </div>
          </aside>
          <main className="content">
            <header>
              <span>WORKSPACE / CLIENT PORTAL</span>
              <span className="help">?</span>
            </header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
