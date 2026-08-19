"use client";

import { usePathname } from "next/navigation";

export default function PortalHeader() {
  const pathname = usePathname();
  const label = pathname === "/" ? "WORKSPACE / OVERVIEW" : pathname === "/clients" ? "WORKSPACE / CLIENTS" : pathname.startsWith("/clients/") ? "WORKSPACE / CLIENTS / CLIENT PROFILE" : "WORKSPACE / CONTENT LIBRARY";
  return <header><span>{label}</span><span className="help">?</span></header>;
}
