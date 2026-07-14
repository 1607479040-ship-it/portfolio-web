"use client";

import SplitTextReveal from "@/components/ui/split-text-reveal";

export default function HomeIntro() {
  return (
    <section
      className="mx-auto max-w-[980px]"
      style={{ padding: "clamp(72px, 10vw, 140px) 5vw clamp(88px, 12vw, 170px)" }}
    >
      <div className="grid grid-cols-1 gap-[clamp(40px,8vw,120px)] border-t border-black/8 pt-[clamp(34px,5vw,72px)] md:grid-cols-[0.55fr_1.45fr]">
        {/* Left label */}
        <p className="type-meta text-[#999D9E] uppercase">
          About the Studio
        </p>

        {/* Right text */}
        <SplitTextReveal
          text="让品牌开口说话。从符号到系统，构建有生命力的品牌视觉。以策略为根基，以美学为表达，为品牌建立可长期生长的视觉秩序。"
          className="type-intro max-w-[980px] text-[#1C1D20]"
          as="p"
          stagger={0.02}
          duration={0.65}
        />
      </div>
    </section>
  );
}
