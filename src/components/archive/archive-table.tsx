"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ArchiveProject } from "@/types";

interface Props {
  items: ArchiveProject[];
}

export default function ArchiveTable({ items }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <div ref={ref} className="border-t border-black/8">
      {/* Desktop header */}
      <div className="hidden md:grid grid-cols-[1fr_160px_160px_80px_48px] gap-[20px] py-[20px] border-b border-black/8 text-xs text-[#999D9E] tracking-wider uppercase">
        <span>Project</span>
        <span>Location</span>
        <span>Services</span>
        <span>Year</span>
        <span />
      </div>

      {/* Rows */}
      {items.map((item, i) => (
        <motion.a
          key={`${item.title}-${i}`}
          href={item.url || "#"}
          target={item.url ? "_blank" : undefined}
          rel={item.url ? "noopener noreferrer" : undefined}
          className="group grid md:grid-cols-[1fr_160px_160px_80px_48px] gap-[20px] items-center py-[clamp(14px,1.8vw,22px)] border-b border-black/8 hover:border-black/20 transition-all duration-400 max-md:grid-cols-[1fr_auto] max-md:gap-[8px] cursor-pointer"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.02 + i * 0.015 }}
        >
          <span
            className="text-[#1C1D20] group-hover:text-[#1C1D20] transition-colors duration-400 font-normal tracking-[-0.01em]"
            style={{ fontSize: "clamp(15px, 1.4vw, 20px)" }}
          >
            {item.title}
          </span>
          <span className="hidden md:block text-sm text-[#999D9E]">{item.location}</span>
          <span className="hidden md:block text-sm text-[#999D9E]">{item.services}</span>
          <span className="hidden md:block text-sm text-[#999D9E]">{item.year}</span>
          <span className="md:hidden text-xs text-[#999D9E]">
            {item.location} — {item.year}
          </span>
          <ArrowUpRight className="w-[16px] h-[16px] text-[#999D9E] group-hover:text-[#FDE910] transition-all duration-400 group-hover:translate-x-[3px] group-hover:translate-y-[-3px] justify-self-end" />
        </motion.a>
      ))}
    </div>
  );
}
