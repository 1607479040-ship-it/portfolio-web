import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/lib/data";
import CaseMetadata from "@/components/work/case-metadata";
import CaseGallery from "@/components/work/case-gallery";
import CaseNavigation from "@/components/work/case-navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Wei Bowen`,
    description: project.description,
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      {/* Hero */}
      <section
        className="max-w-[1400px] mx-auto"
        style={{ padding: "clamp(140px, 18vh, 220px) 5vw clamp(48px, 6vw, 80px)" }}
      >
        <div className="type-meta inline-block px-[12px] py-[6px] rounded-full border border-black/10 text-[#999D9E] mb-[clamp(20px,3vw,36px)]">
          {project.services.join(" · ")}
        </div>
        <h1
          className="type-page-title text-[#1C1D20] max-w-[900px]"
        >
          {project.title}
        </h1>
      </section>

      {/* Cover Image */}
      <section className="max-w-[1400px] mx-auto" style={{ padding: "0 5vw clamp(48px, 6vw, 80px)" }}>
        <div
          className="w-full bg-cover bg-center rounded-lg overflow-hidden"
          style={{
            aspectRatio: "16/9",
            backgroundColor: "#e5e5e2",
            backgroundImage: `url(${project.coverImage})`,
          }}
          role="img"
          aria-label={project.title}
        />
      </section>

      {/* Metadata */}
      <CaseMetadata project={project} />

      {/* Description */}
      <section className="max-w-[1400px] mx-auto" style={{ padding: "0 5vw clamp(48px, 6vw, 80px)" }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[clamp(28px,4vw,60px)]">
          <h2 className="type-intro text-[#1C1D20]">
            {project.description}
          </h2>
          <div className="flex flex-col gap-[clamp(24px,3vw,40px)]">
            <div>
              <h3 className="type-meta text-[#999D9E] uppercase mb-[10px]">Challenge</h3>
              <p className="type-body text-[#1C1D20]/70">{project.challenge}</p>
            </div>
            <div>
              <h3 className="type-meta text-[#999D9E] uppercase mb-[10px]">Approach</h3>
              <p className="type-body text-[#1C1D20]/70">{project.approach}</p>
            </div>
            <div>
              <h3 className="type-meta text-[#999D9E] uppercase mb-[10px]">Outcome</h3>
              <p className="type-body text-[#1C1D20]/70">{project.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <CaseGallery images={project.images} title={project.title} />

      {/* Live site */}
      {project.url && (
        <section className="max-w-[1400px] mx-auto text-center" style={{ padding: "0 5vw clamp(48px, 6vw, 80px)" }}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[10px] text-[#1C1D20] decoration-[#FDE910] decoration-2 underline-offset-4 hover:underline text-lg"
          >
            Visit Live Site →
          </a>
        </section>
      )}

      {/* Next / Prev + All */}
      <CaseNavigation prev={prev} next={next} />
    </>
  );
}
