"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import RoundedButton from "@/components/ui/rounded-button";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F5F5F3]"
      style={{ padding: "clamp(100px, 14vh, 180px) 5vw" }}>
      <motion.div
        className="text-center max-w-[540px]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <p className="text-[#999D9E] text-xs tracking-wider uppercase mb-[16px]">404</p>
        <h1 className="text-[#1C1D20] font-normal tracking-[-0.04em] leading-[0.94] mb-[20px]"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Page not
          <br />
          found
        </h1>
        <p className="text-[#999D9E] leading-relaxed mb-[40px]">
          您访问的页面不存在。也许是拼写错误，或者页面已移动。
        </p>
        <RoundedButton href="/">
          Back to Home
        </RoundedButton>
      </motion.div>
    </section>
  );
}
