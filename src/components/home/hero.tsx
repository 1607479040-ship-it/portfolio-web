"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/site-config";

const HERO_MESSAGES = [
  {
    key: "en",
    eyebrow: "Brand Visual Designer",
    bodyLines: [
      "I build visual systems for brands.",
      "Identity, packaging, campaigns, and digital presence.",
      "Clear enough to guide, quiet enough to last.",
    ],
    titleLines: ["Wei", "Bowen"],
    metaLines: ["Based in Beijing", "Visual identity and brand systems"],
  },
  {
    key: "zh",
    eyebrow: "品牌视觉设计师",
    bodyLines: ["我为品牌建立视觉系统。", "从识别、包装到活动与数字呈现。", "清晰、克制，并且能够长期运转。"],
    titleLines: ["魏博文"],
    metaLines: ["北京", "品牌视觉与商业表达"],
  },
];

const lineVariants = {
  enter: { opacity: 0, y: 26 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = HERO_MESSAGES[activeIndex];

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_MESSAGES.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <section
      id="home"
      ref={ref}
      className="sticky top-0 z-0 mx-auto h-dvh max-w-[1920px] overflow-hidden bg-[#1C1D20]"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/5-14.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-[#1C1D20]/16" />

      <motion.div
        className="relative z-10 mx-auto flex h-full w-full max-w-[980px] items-center justify-center px-[clamp(16px,3vw,32px)] pb-[118px]"
        initial={{ opacity: 0, y: 26 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
      >
        <div className="relative flex min-h-[500px] w-full flex-col justify-between bg-white px-[clamp(24px,4vw,48px)] py-[clamp(24px,4vw,40px)] text-[#1C1D20] shadow-[0_26px_80px_rgba(0,0,0,0.12)]">
          <div className="grid grid-cols-3 items-start gap-[20px] text-[11px] font-medium leading-none">
            <span
              role="img"
              aria-label={SITE_CONFIG.name}
              className="block h-[18px] w-[69px] bg-[#1C1D20]"
              style={{
                WebkitMaskImage: "url('/images/weibowen.png')",
                maskImage: "url('/images/weibowen.png')",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
                maskPosition: "left center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
            <div className="flex justify-center gap-[18px] text-center">
              <span>Aesthetics</span>
              <span>Symbol</span>
              <span>System</span>
            </div>
            <span className="justify-self-end text-right">{SITE_CONFIG.location}</span>
          </div>

          <div className="grid gap-[18px] md:grid-cols-[0.92fr_1fr] md:items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={`body-${active.key}`}
                className="space-y-[8px] md:col-start-2 md:translate-y-[18px]"
                initial="enter"
                animate="center"
                exit="exit"
              >
                <AnimatedLine className="block text-[13px] font-medium leading-[1.45]" delay={0.05}>
                  {active.eyebrow}
                </AnimatedLine>
                {active.bodyLines.map((line, index) => (
                  <AnimatedLine
                    key={line}
                    className="block max-w-[360px] text-[13px] font-medium leading-[1.45] text-[#1C1D20]/82"
                    delay={0.12 + index * 0.055}
                  >
                    {line}
                  </AnimatedLine>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <AnimatePresence mode="wait">
              <motion.div key={`title-${active.key}`} initial="enter" animate="center" exit="exit">
                <div className="mb-[18px] space-y-[5px]">
                  {active.metaLines.map((line, index) => (
                    <AnimatedLine
                      key={line}
                      className="block text-[13px] leading-none text-[#1C1D20]/55"
                      delay={0.04 + index * 0.05}
                    >
                      {line}
                    </AnimatedLine>
                  ))}
                </div>
                <div
                  className={`font-serif text-[58px] font-normal leading-[0.9] md:text-[104px] xl:text-[124px] ${
                    active.key === "zh" ? "-ml-[6px]" : ""
                  }`}
                >
                  {active.titleLines.map((line, index) => (
                    <AnimatedLine key={line} className="block" delay={0.12 + index * 0.075}>
                      {line}
                    </AnimatedLine>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#work"
        aria-label="Scroll to selected work"
        className="absolute bottom-[78px] left-1/2 z-20 flex -translate-x-1/2 items-center justify-center text-white/72 transition-colors duration-300 hover:text-[#FDE910]"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.75 }}
      >
        <span className="relative flex h-[48px] w-[30px] items-start justify-center rounded-full border border-current bg-black/10 backdrop-blur-sm">
          <motion.span
            className="mt-[10px] h-[7px] w-[2px] rounded-full bg-current"
            animate={reduceMotion ? {} : { y: [0, 14, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.65, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

function AnimatedLine({
  children,
  className,
  delay,
}: {
  children: string;
  className?: string;
  delay: number;
}) {
  return (
    <motion.span
      className={className}
      variants={lineVariants}
      transition={{ duration: 0.68, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.span>
  );
}
