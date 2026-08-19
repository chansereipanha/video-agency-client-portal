import Link from "next/link";
import type { Client } from "@/lib/clients";

export default function ClientCard({ client }: { client: Client }) {
  return (
    <Link className="client" href={`/clients/${client.id}`}>
      <div className="client-logo" style={{ background: client.colour }}>
        {client.initials}
      </div>
      <h2>{client.name}</h2>
      <p>{client.industry}</p>
      <div className="client-meta">
        <span>{client.contact}</span>
        <span>{client.assets} ASSETS</span>
      </div>
    </Link>
  );
}
