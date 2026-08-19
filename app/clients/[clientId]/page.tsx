import Link from "next/link";
import { notFound } from "next/navigation";

import { clients, resources } from "@/lib/clients";

export default async function ClientProfilePage(
    props: PageProps<"/clients/[clientId]">
) {
    const { clientId } = await props.params;
    const client = clients.find((c) => c.id === clientId);

    if (!client) {
        notFound();
    }

    return (
        <section className="page">
            <Link className="link" href="/clients">
                ← All clients
            </Link>

            <div className="profile-hero">
                <div
                    className="client-logo"
                    style={{ background: client.colour, color: "#18271c" }}
                >
                    {client.initials}
                </div>

                <div>
                    <h1>{client.name}</h1>
                    <p>{client.industry} · Client since August 2026</p>
                </div>
            </div>

            <div className="two-col">
                <section className="card">
                    <div className="card-head">
                        <h2>Client details</h2>
                    </div>

                    <div className="detail-list">
                        <Detail label="Primary contact" value={client.contact} />
                        <Detail label="Email" value={client.email} />
                        <Detail label="Notes" value={client.notes} />
                    </div>
                </section>

                <section className="card">
                    <div className="card-head">
                        <h2>Recent resources</h2>
                        <Link className="link" href="/library">
                        View all →
                        </Link>
                    </div>

                    <ResourceGrid client={client.name} />
                </section>
            </div>
        </section>
    );
}

function Detail({ label, value }: { label: string; value: string }) {
    return (
        <div className="detail">
            <span>{label}</span>
            <b>{value}</b>
        </div>
    );
}

export function ResourceGrid({ client }: { client: string }) {
    return (
        <div className="resources">
            {resources.map(([name, meta, icon], index) => (
                <article className="resource" key={name}>
                <div className={`thumb ${index === 1 ? "blue" : index === 2 ? "gold" : ""}`}>
                    {icon}
                </div>

                <div>
                    <b>{name}</b>
                    <small>
                    {client} · {meta}
                    </small>
                </div>
                </article>
            ))}
        </div>
    );
}

