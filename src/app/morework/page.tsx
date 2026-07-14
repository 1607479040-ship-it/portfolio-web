"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import MoreWorkList from "@/components/work/more-work-list";

export default function MoreWorkPage() {
  return (
    <>
      <section
        className="mx-auto max-w-[1280px]"
        style={{ padding: "clamp(142px, 18vh, 224px) 5vw clamp(52px, 7vw, 92px)" }}
      >
        <motion.p
          className="type-meta mb-[clamp(18px,2vw,30px)] text-[#999D9E]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          More Work / {String(projects.length).padStart(2, "0")}
        </motion.p>
        <motion.h1
          className="type-page-title text-[#1C1D20]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
        >
          Work
          <br />
          Archive
        </motion.h1>
      </section>

      <section className="mx-auto max-w-[1280px]" style={{ padding: "0 5vw clamp(96px, 12vw, 170px)" }}>
        <MoreWorkList projects={projects} />
      </section>
    </>
  );
}
