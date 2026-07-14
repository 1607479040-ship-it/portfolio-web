"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  duration?: number;
}

export default function SplitTextReveal({
  text,
  className,
  style,
  as: Tag = "p",
  delay = 0,
  stagger = 0.03,
  duration = 0.7,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref} style={style} className={cn("flex flex-wrap", className)}>
      {words.map((word, wi) => (
        <span key={wi} className="mask-reveal mr-[0.28em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : { y: "100%" }}
            transition={{
              duration,
              delay: delay + wi * stagger,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
