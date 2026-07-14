"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AWARDS } from "@/lib/site-config";

export default function AwardsBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section ref={ref} className="max-w-[1400px] mx-auto" style={{ padding: "0 5vw clamp(80px, 10vw, 120px)" }}>
      <div className="border-t border-black/8 pt-[clamp(36px,5vw,60px)]">
        <h2 className="text-xs text-[#999D9E] uppercase tracking-wider mb-[clamp(28px,4vw,48px)]">Recognition / Awards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[clamp(16px,2vw,28px)]">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.title}
              className="border-t border-black/8 pt-[20px]"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <h3 className="text-[#1C1D20] text-lg font-normal mb-[6px]">{award.title}</h3>
              <p className="text-[#999D9E] text-sm">{award.from}, {award.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
