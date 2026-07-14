"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/site-config";

const ABOUT_ROWS = [
  {
    label: "Contact",
    value: [SITE_CONFIG.email, SITE_CONFIG.phone, SITE_CONFIG.location],
  },
  {
    label: "Software",
    value: ["待补充 / Software details to be added"],
  },
  {
    label: "Education",
    value: ["待补充 / Education details to be added"],
  },
  {
    label: "Experience",
    value: ["待补充 / Work experience to be added"],
  },
];

export default function AboutInline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={ref}
      id="about"
      className="mx-auto -mt-[120px] max-w-[980px] max-md:-mt-[72px]"
      style={{ padding: "clamp(86px, 12vw, 168px) 5vw" }}
    >
      <motion.div
        className="grid gap-[clamp(42px,6vw,82px)] border-t border-black/10 pt-[clamp(34px,5vw,58px)] md:grid-cols-[0.82fr_1fr]"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.76, ease: [0.76, 0, 0.24, 1] }}
      >
        <div>
          <p className="type-meta mb-[clamp(18px,3vw,30px)] text-[#999D9E]">About / Profile</p>
          <div className="relative aspect-[3/4] overflow-hidden bg-[#E7E7E3]">
            <div className="absolute inset-[18px] border border-black/8" />
            <div className="absolute inset-0 flex items-center justify-center text-[14px] font-medium text-[#1C1D20]/38">
              Photo / 待上传
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <motion.h2
              className="text-[clamp(46px,6vw,76px)] font-normal leading-[0.98] text-[#1C1D20]"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
            >
              Wei Bowen
              <br />
              魏博文
            </motion.h2>

            <motion.p
              className="mt-[clamp(22px,3vw,34px)] max-w-[520px] text-[18px] leading-[1.55] text-[#1C1D20]/62"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1], delay: 0.16 }}
            >
              Brand Visual Designer based in Beijing. This area is prepared for a concise resume-style profile,
              including contact, software, education, experience, and portrait.
            </motion.p>
          </div>

          <div className="mt-[clamp(42px,6vw,72px)] border-t border-black/10">
            {ABOUT_ROWS.map((row, index) => (
              <motion.div
                key={row.label}
                className="grid gap-[14px] border-b border-black/10 py-[22px] md:grid-cols-[160px_1fr]"
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1], delay: 0.2 + index * 0.06 }}
              >
                <p className="type-meta text-[#999D9E]">{row.label}</p>
                <div className="space-y-[5px]">
                  {row.value.map((item) => (
                    <p key={item} className="text-[15px] leading-[1.5] text-[#1C1D20]">
                      {item}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
