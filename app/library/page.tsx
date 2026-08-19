"use client";
import { useMemo, useState } from "react";
import ResourceGrid from "@/components/ResourceGrid";
import { ResourceType } from "@/lib/clients";
import { usePortalData } from "@/lib/usePortalData";
const filters: ("All" | ResourceType)[] = [
  "All",
  "Edited video",
  "Short-form video",
  "Raw footage",
  "Photo",
  "Graphic",
  "Document",
  "Other",
];
export default function LibraryPage() {
  const { clients, resources, ready } = usePortalData();
  const [type, setType] = useState<(typeof filters)[number]>("All");
  const [clientId, setClientId] = useState("all");
  const shown = useMemo(
    () =>
      resources.filter(
        (resource) =>
          (type === "All" || resource.type === type) &&
          (clientId === "all" || resource.clientId === clientId),
      ),
    [resources, type, clientId],
  );
  if (!ready)
    return (
      <section className="page">
        <div className="empty">Loading library…</div>
      </section>
    );
  return (
    <section className="page">
      <div className="page-title">
        <div>
          <p className="eyebrow">ASSET MANAGEMENT</p>
          <h1>Content library</h1>
          <p>Search, review and share your production work.</p>
        </div>
      </div>
      <div className="library">
        <aside className="card filter-panel">
          {filters.map((filter) => (
            <button
              className={type === filter ? "active" : ""}
              key={filter}
              onClick={() => setType(filter)}
            >
              {filter}
              <span>
                {filter === "All"
                  ? resources.length
                  : resources.filter((resource) => resource.type === filter)
                      .length}
              </span>
            </button>
          ))}
        </aside>
        <section className="card">
          <div className="card-head">
            <div>
              <h2>{type === "All" ? "All resources" : type}</h2>
              <small>{shown.length} resources across your clients</small>
            </div>
            <select
              className="client-select"
              value={clientId}
              onChange={(event) => setClientId(event.target.value)}
            >
              <option value="all">All clients</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <ResourceGrid resources={shown} />
        </section>
      </div>
    </section>
  );
}
