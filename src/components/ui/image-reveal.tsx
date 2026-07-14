"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  scale?: number;
  duration?: number;
}

export default function ImageReveal({
  src,
  alt,
  className,
  aspectRatio = "4/3",
  scale = 1.1,
  duration = 1.3,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-5% 0px" });

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      style={{ aspectRatio }}
    >
      <motion.div
        initial={{ scale }}
        animate={isInView ? { scale: 1 } : { scale }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-full"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
          role="img"
          aria-label={alt}
        />
      </motion.div>
    </div>
  );
}
