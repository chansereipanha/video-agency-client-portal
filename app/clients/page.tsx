"use client";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Client, clients as initialClients } from "@/lib/clients";
import ClientCard from "@/components/ClientCard";
export default function ClientsPage() {
    const [clients, setClients] = useState(initialClients);
    const [query, setQuery] = useState("");
    const dialog = useRef<HTMLDialogElement>(null);
    const shown = useMemo(
        () =>
        clients.filter((c) =>
            `${c.name} ${c.industry} ${c.contact}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        ),
        [clients, query],
    );
    function addClient(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const name = String(d.get("name"));
        const next: Client = {
            id: name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
            name,
            initials: name
                .split(" ")
                .map((x) => x[0])
                .join("")
                .slice(0, 2)
                .toUpperCase(),
            industry: String(d.get("industry")),
            contact: String(d.get("contact")),
            email: String(d.get("email")),
            assets: 0,
            colour: "#c9fa49",
            notes: "New client — add production notes here.",
        };
        setClients((old) => [...old, next]);
        dialog.current?.close();
        e.currentTarget.reset();
    }
    return (
        <section className="page">
            <div className="page-title">
                <div>
                    <p className="eyebrow">CLIENT DIRECTORY</p>
                    <h1>Clients</h1>
                    <p>A home for every relationship, project and file.</p>
                </div>
                <button className="button" onClick={() => dialog.current?.showModal()}>
                    + Add client
                </button>
            </div>
            <div className="toolbar">
                <input
                    className="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search clients…"
                />
                <span className="hint">{shown.length} clients</span>
            </div>
            <div className="client-grid">
                {shown.map((client) => <ClientCard client={client} key={client.id} />)}
            </div>
            {shown.length === 0 && (
                <div className="empty">No clients match that search.</div>
            )}
            <dialog className="dialog" ref={dialog}>
                <button className="close" onClick={() => dialog.current?.close()}>
                    ×
                </button>
                <h2>Add a client</h2>
                <form onSubmit={addClient}>
                    <div className="fields">
                        <label>
                            Company name
                            <input name="name" required />
                        </label>
                        <label>
                            Industry
                            <input name="industry" required />
                        </label>
                        <label>
                            Primary contact
                            <input name="contact" required />
                        </label>
                        <label>
                            Email
                            <input name="email" type="email" required />
                        </label>
                    </div>
                    <div className="dialog-actions">
                        <button
                        className="button light"
                        type="button"
                        onClick={() => dialog.current?.close()}
                        >
                            Cancel
                        </button>
                        <button className="button">Save client</button>
                    </div>
                </form>
            </dialog>
        </section>
    );
}
