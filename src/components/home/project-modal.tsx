"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/types";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const images = [project.coverImage, ...project.images];

  return (
    <motion.div
      className="fixed inset-0 z-[180] bg-[#111214]/88 px-[clamp(12px,2.5vw,36px)] py-[clamp(14px,3vh,34px)]"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project detail`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
      onMouseDown={onClose}
    >
      <motion.article
        data-lenis-prevent
        className="relative mx-auto h-full max-w-[1120px] overflow-y-auto bg-[#F5F5F3] text-[#1C1D20] shadow-[0_24px_90px_rgba(0,0,0,0.36)]"
        initial={{ y: 44, scale: 0.982 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 34, scale: 0.985 }}
        transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-black/8 bg-[#F5F5F3]/92 px-[clamp(18px,4vw,56px)] py-[16px] backdrop-blur-md">
          <span className="type-meta text-[#999D9E]">{project.client}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-black/10 text-[#1C1D20] transition-colors duration-300 hover:bg-[#1C1D20] hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        <div className="px-[clamp(18px,4vw,58px)] py-[clamp(34px,6vw,82px)]">
          <div className="grid gap-[clamp(26px,4vw,58px)] lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <h3 className="max-w-[720px] text-[56px] font-normal leading-[0.96] md:text-[104px] xl:text-[132px]">
              {project.title}
            </h3>
            <div className="type-body-small text-[#1C1D20]/64">
              <p className="mb-[18px]">{project.description}</p>
              <div className="grid grid-cols-2 gap-x-[26px] gap-y-[16px] border-t border-black/10 pt-[18px]">
                <ProjectMeta label="Client" value={project.client} />
                <ProjectMeta label="Year" value={project.year} />
                <ProjectMeta label="Services" value={project.services.join(" / ")} />
                <ProjectMeta label="Location" value={project.location} />
              </div>
            </div>
          </div>

          <div className="mt-[clamp(34px,6vw,82px)] space-y-[clamp(18px,3vw,34px)]">
            {images.map((image, index) => (
              <div
                key={`${project.slug}-${index}`}
                className="relative min-h-[360px] overflow-hidden bg-[#DEDEDA] md:min-h-[620px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(28,29,32,0.04), rgba(28,29,32,0.14)), url(${image})`,
                  }}
                />
                <div className="absolute bottom-[18px] left-[18px] right-[18px] flex justify-between gap-[18px] text-[12px] font-medium text-[#1C1D20]/50">
                  <span>{project.title}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function ProjectMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="type-meta mb-[6px] text-[#999D9E]">{label}</p>
      <p className="text-[13px] leading-[1.45] text-[#1C1D20]">{value}</p>
    </div>
  );
}
