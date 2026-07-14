"use client";

import type { Project } from "@/types";

interface Props {
  project: Project;
}

export default function CaseMetadata({ project }: Props) {
  return (
    <section className="max-w-[1400px] mx-auto" style={{ padding: "clamp(48px, 6vw, 80px) 5vw" }}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-[clamp(28px,4vw,60px)] border-t border-black/8 pt-[clamp(28px,4vw,48px)]">
        <div>
          <h3 className="type-meta text-[#999D9E] uppercase mb-[12px]">Client</h3>
          <p className="type-body text-[#1C1D20]">{project.client}</p>
        </div>
        <div>
          <h3 className="type-meta text-[#999D9E] uppercase mb-[12px]">Services</h3>
          <ul className="flex flex-wrap gap-[8px]">
            {project.services.map((s) => (
              <li key={s} className="type-body text-[#1C1D20]">{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="type-meta text-[#999D9E] uppercase mb-[12px]">Year & Location</h3>
          <p className="type-body text-[#1C1D20]">{project.year} — {project.location}</p>
        </div>
      </div>
    </section>
  );
}
