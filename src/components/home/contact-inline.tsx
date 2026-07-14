"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/site-config";
import RoundedButton from "@/components/ui/rounded-button";

export default function ContactInline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section ref={ref} id="contact" className="max-w-[1400px] mx-auto text-center"
      style={{ padding: "clamp(80px, 12vw, 160px) 5vw" }}>
      <motion.div
        className="max-w-[780px] mx-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <p className="type-meta text-[#999D9E] uppercase mb-[16px]">Contact</p>
        <h2 className="type-section-title text-[#1C1D20] mb-[24px]">
          Get in Touch
        </h2>
        <p className="type-body text-[#999D9E] mb-[clamp(36px,5vw,56px)]">
          欢迎沟通品牌识别、包装视觉、活动主视觉与空间导视项目。
        </p>

        <div className="grid gap-[12px] mb-[clamp(36px,5vw,56px)]">
          <a href={`mailto:${SITE_CONFIG.email}`}
            className="type-email text-[#1C1D20] decoration-[#FDE910] decoration-4 underline-offset-8 transition-colors duration-400 hover:underline">
            {SITE_CONFIG.email}
          </a>
        </div>

        <RoundedButton href="/contact" magnetic>
          Start a Project
          <ArrowUpRight className="ml-[8px] w-[16px] h-[16px]" />
        </RoundedButton>

        <div className="flex flex-wrap justify-center gap-[20px] mt-[clamp(36px,5vw,56px)]">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              className="type-body-small text-[#999D9E] decoration-[#FDE910] decoration-2 underline-offset-4 transition-colors duration-300 hover:text-[#1C1D20] hover:underline">
              {s.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
