"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PortalHeader() {
  const pathname = usePathname();
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
      <span className="help">?</span>
    </header>
  );
}
