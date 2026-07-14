"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useInView } from "framer-motion";
import type { Project } from "@/types";

interface Props {
  projects: Project[];
}

export default function MoreWorkList({ projects }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const [activePreview, setActivePreview] = useState<Project | null>(null);
  const [previewDirection, setPreviewDirection] = useState(1);
  const [previewVisible, setPreviewVisible] = useState(false);
  const activePreviewIndex = useRef<number | null>(null);
  const hasPreviewPosition = useRef(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const previewX = useSpring(pointerX, { stiffness: 150, damping: 24, mass: 0.42 });
  const previewY = useSpring(pointerY, { stiffness: 150, damping: 24, mass: 0.42 });

  const syncPreviewPosition = useCallback(
    (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      if (!hasPreviewPosition.current) {
        pointerX.jump(event.clientX);
        pointerY.jump(event.clientY);
        previewX.jump(event.clientX);
        previewY.jump(event.clientY);
        hasPreviewPosition.current = true;
        return;
      }

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    },
    [pointerX, pointerY, previewX, previewY]
  );

  const handlePreviewEnter = useCallback(
    (event: PointerEvent, project: Project, index: number) => {
      if (event.pointerType !== "mouse") return;
      syncPreviewPosition(event);

      if (activePreviewIndex.current !== null && activePreviewIndex.current !== index) {
        setPreviewDirection(index > activePreviewIndex.current ? 1 : -1);
      }

      activePreviewIndex.current = index;
      setActivePreview(project);
      setPreviewVisible(true);
    },
    [syncPreviewPosition]
  );

  return (
    <div
      ref={ref}
      className="relative border-t border-black/8"
      onPointerMove={syncPreviewPosition}
      onPointerLeave={() => setPreviewVisible(false)}
    >
      <div className="type-meta hidden grid-cols-[minmax(0,1fr)_260px_90px] gap-[24px] border-b border-black/8 py-[20px] text-[#999D9E] md:grid">
        <span>Project</span>
        <span>Service</span>
        <span className="text-right">Year</span>
      </div>

      {projects.map((project, i) => (
        <motion.button
          key={project.slug}
          type="button"
          onPointerEnter={(event) => handlePreviewEnter(event, project, i)}
          className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-[16px] gap-y-[8px] border-b border-black/8 py-[clamp(18px,2.8vw,34px)] text-left transition-colors duration-300 hover:border-black/24 md:grid-cols-[minmax(0,1fr)_260px_90px] md:gap-[24px]"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.02 + i * 0.035 }}
        >
          <span className="type-work-title text-[#1C1D20] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[8px] group-hover:text-[#B7B7B7] group-hover:opacity-55 group-hover:blur-[0.2px] max-md:group-hover:translate-x-0">
            {project.title}
          </span>
          <span className="type-body-small text-[#999D9E] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[6px] group-hover:text-[#B7B7B7] group-hover:opacity-70 max-md:col-start-1 max-md:row-start-2 max-md:group-hover:translate-x-0">
            {project.services.join(" / ")}
          </span>
          <span className="type-body-small text-right text-[#999D9E] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[6px] group-hover:text-[#B7B7B7] group-hover:opacity-70 max-md:row-span-2 max-md:group-hover:translate-x-0">
            {project.year}
          </span>
        </motion.button>
      ))}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden md:block"
        style={{ x: previewX, y: previewY }}
        animate={{
          opacity: previewVisible && activePreview ? 1 : 0,
          scale: previewVisible && activePreview ? 1 : 0.96,
        }}
        transition={{
          opacity: { duration: 0.22, ease: "easeOut" },
          scale: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
        }}
      >
        <div
          className="absolute overflow-hidden border border-black/8 bg-[#e5e5e2] shadow-[0_24px_80px_rgba(28,29,32,0.16)]"
          style={{
            width: "clamp(260px, 28vw, 410px)",
            aspectRatio: "1.34 / 1",
            transform: "translate(-50%, -50%)",
          }}
        >
          <AnimatePresence initial={false} custom={previewDirection}>
            {activePreview && (
              <MoreWorkPreviewCard
                key={activePreview.slug}
                direction={previewDirection}
                project={activePreview}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

const previewContentVariants = {
  enter: (direction: number) => ({ y: direction > 0 ? "100%" : "-100%" }),
  center: { y: "0%" },
  exit: (direction: number) => ({ y: direction > 0 ? "-100%" : "100%" }),
};

function MoreWorkPreviewCard({ project, direction }: { project: Project; direction: number }) {
  return (
    <motion.div
      custom={direction}
      variants={previewContentVariants}
      className="absolute inset-0 overflow-hidden"
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(28,29,32,0.04), rgba(28,29,32,0.22)), url(${project.coverImage})`,
        }}
      />
      <div className="absolute inset-0 bg-[#f5f5f3]/55" />
      <div className="absolute inset-[18%] border border-black/8 bg-[#F5F5F3]/88" />
      <div className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FDE910] text-[14px] font-medium text-[#1C1D20] shadow-[0_18px_45px_rgba(253,233,16,0.28)]">
        View
      </div>
      <div className="absolute bottom-[18px] left-[18px] right-[18px] flex items-end justify-between gap-[18px] text-[#1C1D20]">
        <span className="type-meta max-w-[58%] text-[#1C1D20]/70">{project.title}</span>
        <span className="type-meta text-right text-[#1C1D20]/45">{project.year}</span>
      </div>
    </motion.div>
  );
}
