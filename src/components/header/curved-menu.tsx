"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/site-config";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CurvedMenu({ isOpen, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate path
  const initialPath = "M 0 0 Q 50 150 100 0 L 100 100 L 0 100 Z";
  const openPath = "M 0 0 Q 50 0 100 0 L 100 100 L 0 100 Z";

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    }),
    exit: { opacity: 0, y: 16, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[150] pointer-events-none"
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      exit="hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-[#1C1D20]"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={
          isOpen
            ? { clipPath: "inset(0 0 0% 0)" }
            : { clipPath: "inset(0 0 100% 0)" }
        }
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* SVG curved edge */}
      <svg
        className="absolute left-0 bottom-[-1px] w-full h-[150px]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d={isOpen ? openPath : initialPath}
          animate={{ d: isOpen ? openPath : initialPath }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          fill="#FEFEFE"
        />
      </svg>

      {/* Content */}
      {isOpen && (
        <div className="relative z-10 h-full flex flex-col justify-center pointer-events-auto px-[5vw] pt-[100px] pb-[80px]">
          <nav className="flex flex-col gap-[8px]">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "inline-block text-white text-[clamp(48px,8vw,110px)] font-normal tracking-[-0.04em] leading-[1.05]",
                    "transition-opacity duration-300 hover:opacity-50"
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom info */}
          <motion.div
            className="mt-auto flex gap-[40px] text-white/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <a href="mailto:weibw02@163.com" className="hover:text-white transition-colors">
              weibw02@163.com
            </a>
            <a href="tel:+8617326201536" className="hover:text-white transition-colors">
              +86 173 2620 1536
            </a>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
