"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import type { Project } from "@/types";

export default function WorkMediaDrift() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rowOneX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-28, 28]);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [28, -28]);
  const firstRow = projects.slice(0, 4);
  const secondRow = projects.slice(3, 7);

  return (
    <section
      ref={ref}
      className="mx-auto max-w-[1920px] overflow-hidden bg-[#F5F5F3]"
      style={{ padding: "clamp(40px,7vw,86px) clamp(18px,2.6vw,32px) clamp(96px,12vw,160px)" }}
    >
      <div className="space-y-[clamp(28px,4vw,44px)]">
        <motion.div style={{ x: rowOneX }} className="grid min-w-[1120px] grid-cols-4 gap-[clamp(22px,3vw,34px)]">
          {firstRow.map((project) => (
            <MediaTile key={project.slug} project={project} />
          ))}
        </motion.div>
        <motion.div style={{ x: rowTwoX }} className="grid min-w-[1120px] grid-cols-4 gap-[clamp(22px,3vw,34px)]">
          {secondRow.map((project) => (
            <MediaTile key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MediaTile({ project }: { project: Project }) {
  return (
    <article className="group relative aspect-[1.34/1] overflow-hidden bg-[#E3E3E1]">
      <div
        className="absolute inset-[9%] bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(28,29,32,0.06), rgba(28,29,32,0.16)), url(${project.coverImage})`,
        }}
      />
      <div className="absolute inset-[9%] border border-black/8" />
      <div className="absolute bottom-[18px] left-[18px] right-[18px] flex items-center justify-between gap-[18px] text-[12px] font-medium text-[#1C1D20]/50">
        <span>{project.title}</span>
        <span>{project.year}</span>
      </div>
    </article>
  );
}
