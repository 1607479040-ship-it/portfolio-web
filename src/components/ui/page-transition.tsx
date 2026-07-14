"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePreloader } from "@/providers/preloader-provider";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface Props {
  children: ReactNode;
}

export default function PageTransition({ children }: Props) {
  const { isComplete } = usePreloader();
  const initialLoad = !isComplete;

  return (
    <>
      <motion.div
        initial={initialLoad ? { opacity: 1, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {children}
      </motion.div>

    </>
  );
}
