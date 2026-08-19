import { resources } from "@/lib/clients";

export default function ResourceGrid({ clientName }: { clientName: string }) {
  return (
    <div className="resources">
      {resources.map(([name, meta, icon], index) => (
        <article className="resource" key={name}>
          <div className={`thumb ${index === 1 ? "blue" : index === 2 ? "gold" : ""}`}>
            {icon}
          </div>
          <div>
            <b>{name}</b>
            <small>{clientName} · {meta}</small>
          </div>
        </article>
      ))}
    </div>
  );
}
