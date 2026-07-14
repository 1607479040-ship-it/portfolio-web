"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type TransitionOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ActiveTransition = {
  id: number;
  href: string;
  kind: "forward" | "back";
  label: string;
  origin: TransitionOrigin;
};

type RouteTransitionContextType = {
  startTransition: (href: string, origin?: TransitionOrigin) => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextType>({
  startTransition: () => {},
});

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const COVER_DURATION = 0.62;
const REVEAL_DURATION = 0.72;
const CURTAIN_CURVE = "50% 14%";

export function useRouteTransition() {
  return useContext(RouteTransitionContext);
}

function getFallbackOrigin(): TransitionOrigin {
  return {
    x: window.innerWidth / 2 - 40,
    y: window.innerHeight / 2 - 40,
    width: 80,
    height: 80,
  };
}

function getTransitionLabel(targetPath: string, kind: ActiveTransition["kind"]) {
  if (targetPath === "/morework") return "Morework";
  if (targetPath === "/") return "Home";
  return kind === "back" ? "Home" : "Work";
}

export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [transition, setTransition] = useState<ActiveTransition | null>(null);
  const pendingPath = useRef<string | null>(null);
  const idRef = useRef(0);

  const startTransition = useCallback(
    (href: string, origin?: TransitionOrigin) => {
      const targetPath = href.split("#")[0] || "/";
      if (targetPath === pathname && !href.includes("#")) return;

      const kind = targetPath === "/" && pathname !== "/" ? "back" : "forward";
      const nextTransition: ActiveTransition = {
        id: idRef.current + 1,
        href,
        kind,
        label: getTransitionLabel(targetPath, kind),
        origin: origin ?? getFallbackOrigin(),
      };

      idRef.current = nextTransition.id;
      pendingPath.current = targetPath;
      setTransition(nextTransition);

      window.setTimeout(() => router.push(href), COVER_DURATION * 1000 - 70);
    },
    [pathname, router]
  );

  useEffect(() => {
    if (!transition) return;
    if (!pendingPath.current || pathname !== pendingPath.current) return;

    const timeout = window.setTimeout(() => {
      setTransition(null);
      pendingPath.current = null;
    }, 210);

    return () => window.clearTimeout(timeout);
  }, [pathname, transition]);

  useEffect(() => {
    function handlePopState() {
      if (transition) return;

      const targetPath = window.location.pathname || "/";
      if (targetPath === pathname) return;

      const kind = targetPath === "/" && pathname !== "/" ? "back" : "forward";
      const nextTransition: ActiveTransition = {
        id: idRef.current + 1,
        href: targetPath,
        kind,
        label: getTransitionLabel(targetPath, kind),
        origin: getFallbackOrigin(),
      };

      idRef.current = nextTransition.id;
      pendingPath.current = targetPath;
      setTransition(nextTransition);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [pathname, transition]);

  return (
    <RouteTransitionContext.Provider value={{ startTransition }}>
      {children}
      <AnimatePresence>
        {transition && (
          <>
            <motion.div
              key={`layer-${transition.id}`}
              aria-hidden="true"
              className="pointer-events-none fixed inset-x-0 top-0 z-[220] h-[122dvh] bg-[#1C1D20]"
              initial={{
                y: "100%",
                borderTopLeftRadius: CURTAIN_CURVE,
                borderTopRightRadius: CURTAIN_CURVE,
                borderBottomLeftRadius: "0% 0%",
                borderBottomRightRadius: "0% 0%",
              }}
              animate={{
                y: "0%",
                borderTopLeftRadius: "0% 0%",
                borderTopRightRadius: "0% 0%",
                borderBottomLeftRadius: "0% 0%",
                borderBottomRightRadius: "0% 0%",
              }}
              exit={{
                y: "-100%",
                borderBottomLeftRadius: CURTAIN_CURVE,
                borderBottomRightRadius: CURTAIN_CURVE,
                transition: { duration: REVEAL_DURATION, ease: EASE },
              }}
              transition={{
                duration: COVER_DURATION,
                ease: EASE,
              }}
            />
            <motion.div
              key={`label-${transition.id}`}
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-[221] flex items-center justify-center gap-3 text-white"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.2, ease: EASE } }}
              transition={{ duration: 0.42, delay: 0.12, ease: EASE }}
            >
              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-white/85" />
              <span className="select-none text-[clamp(24px,4vw,48px)] font-medium leading-none tracking-[0.06em]">
                {transition.label}
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </RouteTransitionContext.Provider>
  );
}
