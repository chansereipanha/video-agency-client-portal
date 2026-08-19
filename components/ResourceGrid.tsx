import type { Resource } from "@/lib/clients";
export default function ResourceGrid({ resources }: { resources: Resource[] }) {
  if (!resources.length)
    return <div className="empty">No resources in this category yet.</div>;
  return (
    <div className="resources">
      {resources.map((resource) => (
        <article className="resource" key={resource.id}>
          <div className={`thumb ${resource.tone}`}>
            {resource.icon}
            <span>{resource.type}</span>
          </div>
          <div>
            <b>{resource.name}</b>
            <small>{resource.meta}</small>
          </div>
        </article>
      ))}
    </div>
  );
}
