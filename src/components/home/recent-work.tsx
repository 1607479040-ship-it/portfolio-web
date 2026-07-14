"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import FloatingPreview from "@/components/ui/floating-preview";
import RoundedButton from "@/components/ui/rounded-button";

export default function RecentWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const recentProjects = projects.slice(0, 3);

  return (
    <section
      ref={ref}
      className="max-w-[1400px] mx-auto"
      style={{ padding: "0 5vw clamp(80px, 12vw, 160px)" }}
    >
      {/* Header */}
      <motion.div
        className="flex items-end justify-between mb-[clamp(32px,5vw,64px)]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="type-section-title text-[#1C1D20]">
          Selected
          <br />
          Work
        </h2>
        <RoundedButton href="/work" magnetic>
          All Projects
          <ArrowUpRight className="ml-[8px] w-[16px] h-[16px]" />
        </RoundedButton>
      </motion.div>

      {/* Project list */}
      <div className="border-t border-black/8">
        {recentProjects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
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
                className="group flex items-center gap-[clamp(16px,3vw,36px)] py-[clamp(22px,3vw,44px)] border-b border-black/8 hover:border-black/20 transition-all duration-400"
              >
                <span className="type-meta text-[#999D9E] font-mono w-[28px] shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="type-work-title flex-1 text-[#1C1D20] group-hover:text-[#1C1D20] transition-colors duration-400">
                  {project.title}
                </span>
                <span className="type-meta text-[#999D9E] hidden sm:inline">{project.services[0]}</span>
                <ArrowUpRight className="w-[18px] h-[18px] text-[#999D9E] group-hover:text-[#FDE910] transition-colors duration-400 group-hover:translate-x-[4px] group-hover:translate-y-[-4px] transition-transform" />
              </Link>
            </FloatingPreview>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
