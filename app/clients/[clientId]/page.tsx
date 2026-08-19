import Link from "next/link";
import { notFound } from "next/navigation";

import { clients } from "@/lib/clients";
import DetailList from "@/components/DetailList";
import ResourceGrid from "@/components/ResourceGrid";

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

                    <DetailList details={[{ label: "Primary contact", value: client.contact }, { label: "Email", value: client.email }, { label: "Notes", value: client.notes }]} />
                </section>

                <section className="card">
                    <div className="card-head">
                        <h2>Recent resources</h2>
                        <Link className="link" href="/library">
                        View all →
                        </Link>
                    </div>

                    <ResourceGrid clientName={client.name} />
                </section>
            </div>
        </section>
    );
}
