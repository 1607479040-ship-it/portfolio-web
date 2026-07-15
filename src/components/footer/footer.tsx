"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowDownLeft } from "lucide-react";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/site-config";
import { withBasePath } from "@/lib/paths";

type LayerState = "rest" | "enter" | "leave";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const boundaryPath = useTransform(
    scrollYProgress,
    [0, 0.65],
    [
      "M 0 0 Q 720 210 1440 0 L 1440 0 L 0 0 Z",
      "M 0 0 Q 720 0 1440 0 L 1440 0 L 0 0 Z",
    ]
  );
  const resumeX = useTransform(scrollYProgress, [0.12, 0.72], [-190, 0]);
  const resumeOpacity = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative mx-auto h-[860px] max-w-[1920px] overflow-hidden bg-[#1C1D20] text-white"
      style={{ padding: "clamp(132px, 13vw, 176px) 5vw 30px" }}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[-1px] h-[clamp(120px,17vw,230px)] w-full"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <motion.path d={boundaryPath} fill="#F5F5F3" />
      </svg>

      <div className="relative z-10 mx-auto flex h-full max-w-[980px] flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative">
            <div className="grid w-fit grid-cols-[74px_minmax(0,1fr)] gap-x-[clamp(22px,4vw,42px)] md:grid-cols-[88px_minmax(0,1fr)]">
              <div className="flex h-[74px] w-[74px] items-center justify-center self-center rounded-full bg-white/18 text-[17px] font-medium text-white/82 md:h-[88px] md:w-[88px]">
                WB
              </div>
              <span className="select-none self-center text-[44px] font-normal leading-[0.96] md:text-[76px] xl:text-[96px]">
                Let&rsquo;s build
              </span>
              <span className="col-span-2 select-none text-[44px] font-normal leading-[0.96] md:text-[76px] xl:text-[96px]">
                together
              </span>
            </div>

            <ArrowDownLeft
              aria-hidden="true"
              className="absolute right-[7%] top-[42%] hidden h-[28px] w-[28px] text-white/82 md:block"
              strokeWidth={1.6}
            />

            <div className="relative mt-[clamp(42px,6vw,70px)]">
              <div className="h-px w-full bg-white/14" />
              <motion.a
                href={withBasePath("/resume.pdf")}
                download
                className="absolute right-[clamp(6px,8vw,96px)] top-1/2 flex h-[102px] w-[102px] items-center justify-center rounded-full bg-[#FDE910] text-[18px] font-medium tracking-[0.08em] text-[#1C1D20] shadow-[0_22px_58px_rgba(0,0,0,0.18)] md:h-[122px] md:w-[122px]"
                style={{ x: resumeX, y: "-50%", opacity: resumeOpacity }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                下载简历
              </motion.a>
            </div>

            <div className="mt-[clamp(50px,7vw,78px)] flex flex-wrap gap-[12px]">
              <CurveLink href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</CurveLink>
              <CurveLink href="tel:+8617326201536">{SITE_CONFIG.phone}</CurveLink>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid -translate-y-[18px] gap-[26px] text-white/62 md:grid-cols-[1fr_1fr] md:items-end"
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
        >
          <div className="type-meta">
            <p className="mb-[12px] text-white/30">VERSION</p>
            <p className="text-white/72">2026 Edition</p>
          </div>

          <div className="type-meta md:text-right">
            <p className="mb-[12px] text-white/30">SOCIALS</p>
            <div className="flex flex-wrap gap-x-[22px] gap-y-[10px] md:justify-end">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/72 transition-colors duration-300 hover:text-[#FDE910]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function CurveLink({ href, children }: { href: string; children: ReactNode }) {
  const [layerState, setLayerState] = useState<LayerState>("rest");

  function handleEnter() {
    setLayerState("rest");
    window.requestAnimationFrame(() => setLayerState("enter"));
  }

  return (
    <a
      href={href}
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
      onMouseLeave={() => setLayerState("leave")}
      onBlur={() => setLayerState("leave")}
      className="relative inline-flex min-h-[58px] overflow-hidden rounded-full border border-white/18 px-[28px] text-[15px] font-medium text-white transition-colors duration-300"
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-[-18%] top-full h-[190%] w-[136%] rounded-[50%] bg-[#FDE910]"
        initial={false}
        animate={
          layerState === "enter"
            ? { y: "-88%" }
            : layerState === "leave"
              ? { y: "-205%" }
              : { y: "0%" }
        }
        transition={layerState === "rest" ? { duration: 0 } : { duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (layerState === "leave") setLayerState("rest");
        }}
      />
      <span
        className={`relative z-10 flex items-center justify-center transition-colors duration-300 ${
          layerState === "rest" ? "text-white" : "text-[#1C1D20]"
        }`}
      >
        {children}
      </span>
    </a>
  );
}
