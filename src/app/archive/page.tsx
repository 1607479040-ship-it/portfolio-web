"use client";

import { motion } from "framer-motion";
import { archiveProjects } from "@/lib/archive-data";
import ArchiveTable from "@/components/archive/archive-table";

export default function ArchivePage() {
  return (
    <>
      <section
        className="max-w-[1400px] mx-auto"
        style={{ padding: "clamp(140px, 18vh, 220px) 5vw clamp(48px, 6vw, 80px)" }}
      >
        <motion.p
          className="text-[#999D9E] text-xs tracking-wider uppercase mb-[clamp(16px,2vw,28px)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Full Archive ({archiveProjects.length} projects)
        </motion.p>
        <motion.h1
          className="text-[#1C1D20] font-normal tracking-[-0.04em] leading-[0.94]"
          style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Archive
        </motion.h1>
      </section>

      <section className="max-w-[1400px] mx-auto" style={{ padding: "0 5vw clamp(80px, 10vw, 120px)" }}>
        <ArchiveTable items={archiveProjects} />
      </section>
    </>
  );
}
