"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import RoundedButton from "@/components/ui/rounded-button";

export default function SuccessPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#1C1D20] text-white"
      style={{ padding: "clamp(100px, 14vh, 180px) 5vw" }}>
      <motion.div
        className="text-center max-w-[540px]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <CheckCircle className="w-[48px] h-[48px] text-green-400 mx-auto mb-[24px]" />
        <h1 className="font-normal tracking-[-0.04em] leading-[0.94] mb-[20px]"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Thank you!
        </h1>
        <p className="text-white/50 leading-relaxed mb-[40px]">
          您的消息已收到。我会在 48 小时内回复。请检查您的邮箱获取确认信息。
        </p>
        <RoundedButton href="/" variant="dark">
          Back to Home
        </RoundedButton>
      </motion.div>
    </section>
  );
}
