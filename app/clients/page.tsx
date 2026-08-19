"use client";
import { FormEvent, useMemo, useRef, useState } from "react";
import ClientCard from "@/components/ClientCard";
import { Client } from "@/lib/clients";
import { usePortalData } from "@/lib/usePortalData";

export default function ClientsPage() {
  const { clients, saveClients } = usePortalData();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name");
  const [editing, setEditing] = useState<Client | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = useMemo(
    () =>
      clients
        .filter((client) =>
          `${client.name} ${client.industry} ${client.contact}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "assets"
            ? b.assets - a.assets
            : sort === "industry"
              ? a.industry.localeCompare(b.industry)
              : a.name.localeCompare(b.name),
        ),
    [clients, query, sort],
  );
  function open(client?: Client) {
    setEditing(client ?? null);
    dialog.current?.showModal();
  }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name"));
    const values = {
      name,
      initials: name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      industry: String(data.get("industry")),
      contact: String(data.get("contact")),
      email: String(data.get("email")),
      notes: String(data.get("notes")),
      colour: editing?.colour ?? "#c9fa49",
    };
    if (editing)
      saveClients(
        clients.map((client) =>
          client.id === editing.id ? { ...client, ...values } : client,
        ),
      );
    else {
      const id = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      saveClients([...clients, { ...values, id, assets: 0 }]);
    }
    dialog.current?.close();
  }
  return (
    <section className="page">
      <div className="page-title">
        <div>
          <p className="eyebrow">CLIENT DIRECTORY</p>
          <h1>Clients</h1>
          <p>A home for every relationship, project and file.</p>
        </div>
        <button className="button" onClick={() => open()}>
          + Add client
        </button>
      </div>
      <div className="toolbar">
        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search clients…"
        />
        <label className="sort">
          Sort{" "}
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="name">A–Z</option>
            <option value="industry">Industry</option>
            <option value="assets">Most assets</option>
          </select>
        </label>
        <span className="hint">{shown.length} clients</span>
      </div>
      <div className="client-grid">
        {shown.map((client) => (
          <div className="client-wrap" key={client.id}>
            <ClientCard client={client} />
            <button className="edit-client" onClick={() => open(client)}>
              Edit
            </button>
          </div>
        ))}
      </div>
      {shown.length === 0 && (
        <div className="empty">No clients match that search.</div>
      )}
      <dialog className="dialog" ref={dialog}>
        <button className="close" onClick={() => dialog.current?.close()}>
          ×
        </button>
        <h2>{editing ? "Edit client" : "Add a client"}</h2>
        <form onSubmit={save}>
          <div className="fields">
            <label>
              Company name
              <input defaultValue={editing?.name} name="name" required />
            </label>
            <label>
              Industry
              <input
                defaultValue={editing?.industry}
                name="industry"
                required
              />
            </label>
            <label>
              Primary contact
              <input defaultValue={editing?.contact} name="contact" required />
            </label>
            <label>
              Email
              <input
                defaultValue={editing?.email}
                name="email"
                type="email"
                required
              />
            </label>
            <label className="wide">
              Notes
              <textarea defaultValue={editing?.notes} name="notes" />
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
