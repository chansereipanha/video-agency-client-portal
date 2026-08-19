"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", icon: "◈", label: "Overview", active: (path: string) => path === "/" },
  { href: "/clients", icon: "◉", label: "Clients", active: (path: string) => path.startsWith("/clients") },
  { href: "/library", icon: "▣", label: "Content library", active: (path: string) => path.startsWith("/library") },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return <nav aria-label="Main navigation">{links.map((link) => <Link className={link.active(pathname) ? "active" : ""} href={link.href} key={link.href}><span className="nav-icon">{link.icon}</span><span>{link.label}</span></Link>)}</nav>;
}
