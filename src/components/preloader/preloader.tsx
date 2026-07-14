"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePreloader } from "@/providers/preloader-provider";
import { PRELOADER_WORDS } from "@/lib/site-config";

const EXIT_DURATION = 0.8;
const EXIT_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const CURTAIN_CURVE = "50% 14%";

export default function Preloader() {
  const { onExiting, onComplete } = usePreloader();
  const [phase, setPhase] = useState<"words" | "exit" | "done">("words");
  const [wordIndex, setWordIndex] = useState(0);
  const [firstAppear, setFirstAppear] = useState(true);
  const startedRef = useRef(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPhase("done");
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (wordIndex < PRELOADER_WORDS.length - 1) {
      const delay = wordIndex === 0 ? 900 : 130;
      timeout = setTimeout(() => {
        setFirstAppear(false);
        setWordIndex((i) => i + 1);
      }, delay);
    } else {
      timeout = setTimeout(() => {
        onExiting();
        setPhase("exit");
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [wordIndex, onExiting]);

  useEffect(() => {
    if (phase !== "exit") return;
    const fallback = setTimeout(finish, EXIT_DURATION * 1000 + 200);
    return () => clearTimeout(fallback);
  }, [finish, phase]);

  if (phase === "done") return null;

  const isExiting = phase === "exit";

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[9999] h-[122dvh] bg-[#1C1D20]"
      initial={{ y: 0, borderBottomLeftRadius: "0% 0%", borderBottomRightRadius: "0% 0%" }}
      animate={
        isExiting
          ? {
              y: "-100%",
              borderBottomLeftRadius: CURTAIN_CURVE,
              borderBottomRightRadius: CURTAIN_CURVE,
            }
          : { y: 0, borderBottomLeftRadius: "0% 0%", borderBottomRightRadius: "0% 0%" }
      }
      transition={{ duration: EXIT_DURATION, ease: EXIT_EASE }}
      onAnimationComplete={() => {
        if (isExiting) {
          finish();
        }
      }}
    >
      {/* Words */}
      <div className="absolute left-0 top-0 flex h-dvh w-full items-center justify-center gap-3 -translate-x-[5px]">
        <span className="w-[6px] h-[6px] rounded-full bg-white opacity-85 shrink-0" />
        <motion.span
          className="text-white font-medium tracking-[0.06em] select-none"
          style={{ fontSize: "clamp(24px, 4vw, 48px)" }}
          initial={firstAppear ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: firstAppear ? 0.6 : 0 }}
        >
          {PRELOADER_WORDS[wordIndex]}
        </motion.span>
      </div>
    </motion.div>
  );
}
