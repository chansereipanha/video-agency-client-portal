"use client";
import Link from "next/link";
import { usePortalData } from "@/lib/usePortalData";
export default function Home() {
  const { clients, resources } = usePortalData();
  return (
    <section className="page">
      <div className="page-title">
        <div>
          <p className="eyebrow">WEDNESDAY, 19 AUGUST</p>
          <h1>Kia ora, Maia.</h1>
          <p>Here’s what’s moving across the studio today.</p>
        </div>
        <Link className="button" href="/clients">
          + Add client
        </Link>
      </div>
      <div className="stats">
        <Stat
          label="ACTIVE CLIENTS"
          number={clients.length}
          hint="+1 added this month"
        />
        <Stat label="LIVE PROJECTS" number={8} hint="3 awaiting review" />
        <Stat
          label="TOTAL ASSETS"
          number={resources.length}
          hint="+12 uploaded this week"
        />
      </div>
      <div className="two-col">
        <section className="card">
          <div className="card-head">
            <h2>Projects in motion</h2>
            <Link className="link" href="/library">
              View library →
            </Link>
          </div>
          <Project
            title="Harbour winter campaign"
            sub="Harbour & Co. · Brand film"
            status="IN REVIEW"
            tone="review"
          />
          <Project
            title="Studio launch series"
            sub="Koru Wellness · Social"
            status="EDITING"
            tone=""
            variant="two"
          />
          <Project
            title="Coastal living, episode 04"
            sub="Northland Escapes · Video series"
            status="READY"
            tone=""
            variant="three"
          />
        </section>
        <section className="card">
          <div className="card-head">
            <h2>Recent activity</h2>
          </div>
          <Activity
            text="Tia Rangi left feedback on Harbour winter campaign"
            time="24 minutes ago"
          />
          <Activity text="4 files added to Koru Wellness" time="2 hours ago" />
          <Activity
            text="Finn McLeod approved the Rimu walkthrough"
            time="Yesterday"
          />
        </section>
      </div>
    </section>
  );
}
function Stat({
  label,
  number,
  hint,
}: {
  label: string;
  number: number;
  hint: string;
}) {
  return (
    <div className="stat">
      <span className="label">{label}</span>
      <div className="number">{number}</div>
      <div className="hint">
        <b>{hint.split(" ")[0]}</b> {hint.substring(hint.indexOf(" ") + 1)}
      </div>
    </div>
  );
}
function Project({
  title,
  sub,
  status,
  tone,
  variant = "",
}: {
  title: string;
  sub: string;
  status: string;
  tone: string;
  variant?: string;
}) {
  return (
    <div className="project">
      <div className={`poster ${variant}`} />
      <div>
        <b>{title}</b>
        <small>{sub}</small>
      </div>
      <span className={`pill ${tone}`}>{status}</span>
    </div>
  );
}
function Activity({ text, time }: { text: string; time: string }) {
  return (
    <div className="activity">
      <span className="dot" />
      <div>
        {text}
        <br />
        <small>{time}</small>
      </div>
    </div>
  );
}
