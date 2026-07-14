"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import FloatingPreview from "@/components/ui/floating-preview";

interface Props {
  projects: Project[];
}

export default function WorkTable({ projects }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div ref={ref} className="border-t border-black/8">
      {/* Table header — hidden on mobile */}
      <div className="type-meta hidden md:grid grid-cols-[1fr_160px_120px_48px] gap-[20px] py-[20px] border-b border-black/8 text-[#999D9E] uppercase">
        <span>Project</span>
        <span>Location</span>
        <span>Year</span>
        <span />
      </div>

      {/* Rows */}
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
        >
          <FloatingPreview
            preview={
              <div
                className="w-full h-full bg-cover bg-center rounded-lg shadow-2xl"
                style={{ backgroundColor: "#e5e5e2" }}
              >
                <div className="w-full h-full flex items-center justify-center text-[#999D9E] text-sm">
                  {project.title}
                </div>
              </div>
            }
          >
            <Link
              href={`/work/${project.slug}`}
              className="group grid md:grid-cols-[1fr_160px_120px_48px] gap-[20px] items-center py-[clamp(18px,2.2vw,28px)] border-b border-black/8 hover:border-black/20 transition-all duration-400 max-md:grid-cols-[1fr_auto]"
            >
              {/* Project name */}
              <div>
                <span className="type-card-title text-[#1C1D20] group-hover:text-[#1C1D20] transition-colors duration-400">
                  {project.title}
                </span>
                <span className="type-meta md:hidden block text-[#999D9E] mt-[4px]">
                  {project.location} — {project.year}
                </span>
              </div>
              <span className="type-body-small hidden md:block text-[#999D9E]">{project.location}</span>
              <span className="type-body-small hidden md:block text-[#999D9E]">{project.year}</span>
              <ArrowUpRight className="w-[18px] h-[18px] text-[#999D9E] group-hover:text-[#FDE910] transition-all duration-400 group-hover:translate-x-[4px] group-hover:translate-y-[-4px] justify-self-end" />
            </Link>
          </FloatingPreview>
        </motion.div>
      ))}
    </div>
  );
}
