"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/site-config";
import ServicesList from "@/components/about/services-list";
import AwardsBlock from "@/components/about/awards-block";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="max-w-[1400px] mx-auto"
        style={{ padding: "clamp(140px, 18vh, 220px) 5vw clamp(48px, 6vw, 80px)" }}
      >
        <motion.h1
          className="text-[#1C1D20] font-normal tracking-[-0.04em] leading-[0.94]"
          style={{ fontSize: "clamp(48px, 8vw, 130px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About
        </motion.h1>
      </section>

      {/* Bio Grid */}
      <section className="max-w-[1400px] mx-auto" style={{ padding: "0 5vw clamp(80px, 10vw, 120px)" }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-[clamp(32px,5vw,80px)]">
          {/* Portrait placeholder */}
          <div className="relative aspect-[3/4] max-h-[600px] bg-[#F5F5F3] rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-[#999D9E] text-lg">Your Photo</span>
          </div>

          <div className="flex flex-col justify-center gap-[clamp(24px,3vw,40px)]">
            <motion.h2
              className="text-[#1C1D20] font-normal tracking-[-0.025em] leading-[1.15]"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              我是{SITE_CONFIG.name}，一名关注品牌秩序、视觉系统与商业表达的品牌视觉设计师。
            </motion.h2>

            <motion.p
              className="text-[#999D9E] leading-relaxed"
              style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              从符号到系统，我相信每个品牌都有自己独特的视觉语言等待被发掘。我的工作方法是：深入理解品牌的商业逻辑与文化基因，用策略引导视觉，用美学展开表达，最终形成可长期生长的品牌视觉系统。
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services */}
      <ServicesList />

      {/* Awards */}
      <AwardsBlock />
    </>
  );
}
