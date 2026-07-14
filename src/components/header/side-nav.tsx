"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "home", label: "首页" },
  { id: "work", label: "作品" },
  { id: "about", label: "关于" },
  { id: "contact", label: "联系" },
];

export default function SideNav() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const isDarkSection = active === "home" || active === "contact";

  useEffect(() => {
    if (pathname !== "/") return;

    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  if (pathname !== "/") return null;

  return (
    <motion.nav
      className="fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-[8px] md:flex"
      style={{ left: "calc(clamp(20px, 4vw, 48px) + 80px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      onMouseLeave={() => setHovered(null)}
    >
      {SECTIONS.map((s) => (
        <SideNavItem
          key={s.id}
          id={s.id}
          label={s.label}
          isActive={active === s.id}
          isHovered={hovered === s.id}
          isDarkSection={isDarkSection}
          onHover={() => setHovered(s.id)}
          onClick={() => scrollTo(s.id)}
        />
      ))}
    </motion.nav>
  );
}

function SideNavItem({
  id,
  label,
  isActive,
  isHovered,
  isDarkSection,
  onHover,
  onClick,
}: {
  id: string;
  label: string;
  isActive: boolean;
  isHovered: boolean;
  isDarkSection: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  const itemRef = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const textX = useSpring(rawX, { stiffness: 250, damping: 19, mass: 0.34 });
  const textY = useSpring(rawY, { stiffness: 250, damping: 19, mass: 0.34 });

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    onHover();
    const rect = itemRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    rawX.set(Math.max(-11, Math.min(11, distanceX * 0.22)));
    rawY.set(Math.max(-6, Math.min(6, distanceY * 0.18)));
  }

  function resetMagnet() {
    rawX.set(0);
    rawY.set(0);
  }

  const textColor = isDarkSection
    ? isActive
      ? "text-white"
      : isHovered
        ? "text-white/88"
        : "text-white/44"
    : isActive || isHovered
      ? "text-[#1C1D20]"
      : "text-[#999D9E]";

  const dotColor = isDarkSection
    ? isActive
      ? "bg-white"
      : isHovered
        ? "bg-white/80"
        : "bg-white/30"
    : isActive
      ? "bg-[#FDE910]"
      : isHovered
        ? "bg-[#1C1D20]"
        : "bg-current opacity-30";

  return (
    <button
      ref={itemRef}
      type="button"
      aria-label={`Scroll to ${label}`}
      data-section={id}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMagnet}
      onClick={onClick}
      className={cn(
        "group relative flex min-h-[38px] items-center gap-[12px] text-left transition-colors duration-300",
        textColor
      )}
    >
      <motion.span
        className={cn("h-[7px] w-[7px] shrink-0 rounded-full transition-colors duration-300", dotColor)}
        animate={{ scale: isActive ? 1.32 : isHovered ? 1.18 : 1, opacity: isActive || isHovered ? 1 : 0.62 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="text-[14px] font-medium leading-none will-change-transform"
        style={{ x: textX, y: textY }}
        animate={{ opacity: isActive ? 1 : isHovered ? 0.92 : 0.68 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
    </button>
  );
}
