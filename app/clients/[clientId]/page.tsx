"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import DetailList from "@/components/DetailList";
import ResourceGrid from "@/components/ResourceGrid";
import { ResourceType } from "@/lib/clients";
import { usePortalData } from "@/lib/usePortalData";
const resourceTypes: ResourceType[] = [
  "Edited video",
  "Short-form video",
  "Raw footage",
  "Photo",
  "Graphic",
  "Document",
  "Other",
];

export default function ClientProfilePage() {
  const { clientId } = useParams<{ clientId: string }>();
  const { clients, resources, ready, saveClients, saveResources } =
    usePortalData();
  const [type, setType] = useState<"All" | ResourceType>("All");
  const [editing, setEditing] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const foundClient = clients.find((item) => item.id === clientId);
  useEffect(() => {
    if (editing) dialog.current?.showModal();
  }, [editing]);
  function closeEditDialog() {
    dialog.current?.close();
    setEditing(false);
  }
  if (!ready)
    return (
      <section className="page">
        <div className="empty">Loading client…</div>
      </section>
    );
  if (!foundClient)
    return (
      <section className="page">
        <Link className="link" href="/clients">
          ← All clients
        </Link>
        <div className="empty">
          <h2>Client not found</h2>
          <p>
            This client may have been removed or opened in a different browser.
          </p>
        </div>
      </section>
    );
  const client = foundClient;
  const clientResources = resources.filter(
    (resource) =>
      resource.clientId === client.id &&
      (type === "All" || resource.type === type),
  );
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    saveClients(
      clients.map((item) =>
        item.id === client.id
          ? {
              ...item,
              name: String(data.get("name")),
              industry: String(data.get("industry")),
              contact: String(data.get("contact")),
              email: String(data.get("email")),
              notes: String(data.get("notes")),
            }
          : item,
      ),
    );
    closeEditDialog();
  }
  function addResource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const resourceType = data.get("type") as ResourceType;
    saveResources([
      ...resources,
      {
        id: crypto.randomUUID(),
        clientId: client.id,
        name: String(data.get("name")),
        type: resourceType,
        meta: `${resourceType} · New upload`,
        icon:
          resourceType.includes("video") || resourceType === "Raw footage"
            ? "▶"
            : resourceType === "Photo"
              ? "▧"
              : resourceType === "Graphic"
                ? "✦"
                : resourceType === "Document"
                  ? "▤"
                  : "•",
        tone: "green",
      },
    ]);
    event.currentTarget.reset();
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
        <button
          className="button light profile-edit"
          onClick={() => setEditing(true)}
        >
          Edit client
        </button>
      </div>
      <div className="two-col">
        <section className="card">
          <div className="card-head">
            <h2>Client details</h2>
          </div>
          <DetailList
            details={[
              { label: "Primary contact", value: client.contact },
              { label: "Email", value: client.email },
              { label: "Notes", value: client.notes },
            ]}
          />
        </section>
        <section className="card">
          <div className="card-head">
            <div>
              <h2>Client resources</h2>
              <small>
                {clientResources.length} items · {type}
              </small>
            </div>
            <Link className="link" href="/library">
              Open library →
            </Link>
          </div>
          <div className="resource-tabs">
            {["All", ...resourceTypes].map((value) => (
              <button
                className={type === value ? "active" : ""}
                key={value}
                onClick={() => setType(value as "All" | ResourceType)}
              >
                {value}
              </button>
            ))}
          </div>
          <ResourceGrid resources={clientResources} />
        </section>
      </div>
      <section className="card add-resource">
        <div className="card-head">
          <h2>Add a resource</h2>
        </div>
        <form className="resource-form" onSubmit={addResource}>
          <input name="name" placeholder="Resource file name" required />
          <select name="type">
            {resourceTypes.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <button className="button">Add resource</button>
        </form>
      </section>
      <dialog className="dialog" ref={dialog} onClose={() => setEditing(false)}>
        <button className="close" type="button" onClick={closeEditDialog}>
          ×
        </button>
        <h2>Edit client</h2>
        <form onSubmit={save}>
          <div className="fields">
            <label>
              Company name
              <input defaultValue={client.name} name="name" required />
            </label>
            <label>
              Industry
              <input defaultValue={client.industry} name="industry" required />
            </label>
            <label>
              Primary contact
              <input defaultValue={client.contact} name="contact" required />
            </label>
            <label>
              Email
              <input
                defaultValue={client.email}
                name="email"
                type="email"
                required
              />
            </label>
            <label className="wide">
              Notes
              <textarea defaultValue={client.notes} name="notes" />
            </label>
          </div>
          <div className="dialog-actions">
            <button
              className="button light"
              type="button"
              onClick={closeEditDialog}
            >
              Cancel
            </button>
            <button className="button">Save changes</button>
          </div>
        </form>
      </dialog>
    </section>
  );
}
