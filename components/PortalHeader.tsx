"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PortalHeader() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(() => typeof window !== "undefined" && localStorage.getItem("cutroom-theme") === "dark");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("cutroom-theme", isDark ? "dark" : "light");
  }, [isDark]);
  const crumbs =
    pathname === "/"
      ? [{ label: "WORKSPACE", href: "/" }, { label: "OVERVIEW" }]
      : pathname === "/clients"
        ? [{ label: "WORKSPACE", href: "/" }, { label: "CLIENTS" }]
        : pathname.startsWith("/clients/")
          ? [
              { label: "WORKSPACE", href: "/" },
              { label: "CLIENTS", href: "/clients" },
              { label: "CLIENT PROFILE" },
            ]
          : [{ label: "WORKSPACE", href: "/" }, { label: "CONTENT LIBRARY" }];
  return (
    <header>
      <div className="breadcrumbs">
        {crumbs.map((crumb, index) => (
          <span key={crumb.label}>
            {index > 0 && <i>/</i>}
            {crumb.href ? (
              <Link href={crumb.href}>{crumb.label}</Link>
            ) : (
              crumb.label
            )}
          </span>
        ))}
      </div>
      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={() => setIsDark((current) => !current)} aria-label="Toggle dark mode" title="Toggle dark mode">
          {isDark ? "☀" : "◐"}
        </button>
        <span className="help">?</span>
      </div>
    </header>
  );
}
