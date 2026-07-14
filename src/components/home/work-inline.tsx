"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type MouseEvent, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useMotionValue } from "framer-motion";
import { projects } from "@/lib/data";
import type { Project } from "@/types";
import ProjectModal from "@/components/home/project-modal";
import { useRouteTransition } from "@/providers/route-transition-provider";

const WORK_COPY = [
  {
    key: "zh",
    left: [
      "视觉是品牌最沉默的发言人",
      "我的工作，是让它开口说对的话",
      "一个符号背后，是一套能运转的视觉系统",
      "克制，但不寡淡",
    ],
    right: ["品牌视觉设计师，北京", "3 年品牌视觉从业经验"],
  },
  {
    key: "en",
    left: [
      "Visual is a brand's quietest spokesperson",
      "My work is making sure it says the right thing",
      "Behind every mark, a system that works",
      "Restrained, never cold.",
    ],
    right: ["Brand Visual Designer, Beijing", "3 years. Strategy to execution"],
  },
];

const workCopyLineVariants = {
  enter: { opacity: 0, y: 26 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

const previewContentVariants = {
  enter: (direction: number) => ({ y: direction > 0 ? "100%" : "-100%" }),
  center: { y: "0%" },
  exit: (direction: number) => ({ y: direction > 0 ? "-100%" : "100%" }),
};

export default function WorkInline() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activePreview, setActivePreview] = useState<Project | null>(null);
  const [copyIndex, setCopyIndex] = useState(0);
  const [previewDirection, setPreviewDirection] = useState(1);
  const [previewVisible, setPreviewVisible] = useState(false);
  const canRenderPreviewPortal = useClientHydrated();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const hasPreviewPosition = useRef(false);
  const activePreviewIndex = useRef<number | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const syncPreviewPosition = useCallback(
    (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      if (!hasPreviewPosition.current) {
        pointerX.jump(event.clientX);
        pointerY.jump(event.clientY);
        hasPreviewPosition.current = true;
        return;
      }

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    },
    [pointerX, pointerY]
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

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedProject(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!isInView) return;

    const interval = window.setInterval(() => {
      setCopyIndex((current) => (current + 1) % WORK_COPY.length);
    }, 7600);

    return () => window.clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="work"
      className="mx-auto max-w-[1280px]"
      style={{ padding: "clamp(74px, 9vw, 132px) 5vw clamp(84px, 11vw, 150px)" }}
    >
      <div className="mx-auto mb-[clamp(58px,8vw,104px)] max-w-[980px]">
        <WorkCopyBlock copy={WORK_COPY[copyIndex]} isInView={isInView} />
      </div>

      <p className="mx-auto mb-[clamp(22px,3vw,34px)] max-w-[980px] text-[12px] font-medium leading-none text-[#999D9E]">
        Selected Work
      </p>

      <div
        className="relative border-t border-black/8"
        onPointerMove={syncPreviewPosition}
        onPointerLeave={() => {
          setPreviewVisible(false);
          hasPreviewPosition.current = false;
        }}
      >
        {projects.slice(0, 4).map((project, i) => (
          <motion.div
            key={project.slug}
            className="border-b border-black/8 transition-colors duration-500 hover:border-black/20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
          >
            <button
              type="button"
              onPointerEnter={(event) => handlePreviewEnter(event, project, i)}
              onClick={() => setSelectedProject(project)}
              className="group mx-auto grid w-full max-w-[980px] grid-cols-[minmax(0,1fr)_minmax(120px,190px)] items-center gap-[clamp(16px,3vw,36px)] py-[clamp(22px,3vw,44px)] text-left max-sm:grid-cols-1"
            >
              <span className="type-work-title min-w-0 text-[#1C1D20] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[8px] group-hover:text-[#B7B7B7] group-hover:opacity-55 group-hover:blur-[0.2px] max-sm:group-hover:translate-x-0">
                {project.title}
              </span>
              <span className="mr-[7px] text-right text-[12px] font-medium leading-[1.35] text-[#999D9E] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[6px] group-hover:text-[#B7B7B7] group-hover:opacity-70 max-sm:mr-0 max-sm:text-left">
                {project.services[0]}
              </span>
            </button>
          </motion.div>
        ))}

        {canRenderPreviewPortal &&
          createPortal(
            <motion.div
              aria-hidden="true"
              className="pointer-events-none fixed left-0 top-0 z-[120] hidden md:block"
              style={{ x: pointerX, y: pointerY }}
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
                className="absolute left-0 top-0 overflow-hidden border border-black/8 bg-[#e5e5e2] shadow-[0_24px_80px_rgba(28,29,32,0.16)]"
                style={{
                  width: "clamp(260px, 28vw, 410px)",
                  aspectRatio: "1.34 / 1",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <AnimatePresence initial={false} custom={previewDirection}>
                  {activePreview && (
                    <WorkPreviewCard
                      key={activePreview.slug}
                      direction={previewDirection}
                      project={activePreview}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>,
            document.body
          )}
      </div>

      <motion.div
        className="mt-[clamp(36px,5vw,70px)] flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <MoreWorkCta />
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function subscribeToHydration(onStoreChange: () => void) {
  const frame = window.requestAnimationFrame(onStoreChange);
  return () => window.cancelAnimationFrame(frame);
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function useClientHydrated() {
  return useSyncExternalStore(subscribeToHydration, getClientSnapshot, getServerSnapshot);
}

function MoreWorkCta() {
  const { startTransition } = useRouteTransition();
  const [layerState, setLayerState] = useState<"rest" | "enter" | "leave">("rest");

  function handleEnter() {
    setLayerState("rest");
    window.requestAnimationFrame(() => setLayerState("enter"));
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    startTransition("/morework", {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
      onMouseLeave={() => setLayerState("leave")}
      onBlur={() => setLayerState("leave")}
      className="group relative h-[74px] min-w-[210px] overflow-hidden rounded-full border border-black/14 bg-white px-[42px] text-center text-[15px] font-medium text-[#1C1D20] shadow-[0_18px_55px_rgba(28,29,32,0.08)]"
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
      <span className="relative z-10 inline-flex items-center justify-center text-[#1C1D20]">
        More Work
      </span>
    </button>
  );
}

function WorkCopyBlock({ copy, isInView }: { copy: (typeof WORK_COPY)[number]; isInView: boolean }) {
  return (
    <div className="grid gap-[clamp(30px,5vw,40px)] md:grid-cols-[minmax(0,720px)_220px] md:items-start">
      <AnimatePresence mode="wait">
        <motion.div key={`left-${copy.key}`} className="space-y-[8px]" initial="enter" animate="center" exit="exit">
          {copy.left.map((line, index) => (
            <WorkCopyLine
              key={line}
              delay={isInView ? 0.05 + index * 0.075 : 0}
              className="block text-[clamp(22px,2.35vw,32px)] font-normal leading-[1.14] text-[#1C1D20] md:whitespace-nowrap"
            >
              {line}
            </WorkCopyLine>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`right-${copy.key}`}
          className="space-y-[12px] pt-[5px] md:justify-self-end md:text-right"
          initial="enter"
          animate="center"
          exit="exit"
        >
          {copy.right.map((line, index) => (
            <WorkCopyLine
              key={line}
              delay={isInView ? 0.1 + index * 0.08 : 0}
              className="block text-[15px] font-medium leading-[1.45] text-[#1C1D20]/80"
            >
              {line}
            </WorkCopyLine>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WorkCopyLine({
  children,
  className,
  delay,
}: {
  children: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.span
      className={className}
      variants={workCopyLineVariants}
      transition={{ duration: 0.72, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.span>
  );
}

function WorkPreviewCard({ project, direction }: { project: Project; direction: number }) {
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
        <span className="max-w-[58%] text-[12px] font-medium leading-[1.35] text-[#1C1D20]/70">{project.title}</span>
        <span className="text-right text-[12px] font-medium leading-[1.35] text-[#1C1D20]/45">{project.year}</span>
      </div>
    </motion.div>
  );
}
