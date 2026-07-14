"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  preview: ReactNode;
  className?: string;
}

export default function FloatingPreview({ children, preview, className }: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setVisible(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => setVisible(false)}
      className={className}
    >
      {children}

      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none"
        style={{
          width: "clamp(260px, 28vw, 420px)",
          aspectRatio: "3/2",
        }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.92,
          x: pos.x,
          y: pos.y,
        }}
        transition={{
          opacity: { duration: 0.35 },
          scale: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          x: { type: "spring", stiffness: 80, damping: 18 },
          y: { type: "spring", stiffness: 80, damping: 18 },
        }}
      >
        {/* Offset from cursor */}
        <div className="absolute top-4 left-4 w-full h-full">
          {preview}
        </div>
      </motion.div>
    </div>
  );
}
