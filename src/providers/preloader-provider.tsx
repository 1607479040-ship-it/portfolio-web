"use client";

import { createContext, useContext, useRef, useState, useCallback, type ReactNode } from "react";

interface PreloaderContextType {
  isComplete: boolean;
  isExiting: boolean;
  onExiting: () => void;
  onComplete: () => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isComplete: false,
  isExiting: false,
  onExiting: () => {},
  onComplete: () => {},
});

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const hasRun = useRef(false);

  const onExiting = useCallback(() => {
    setIsExiting(true);
  }, []);

  const onComplete = useCallback(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    setIsComplete(true);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isComplete, isExiting, onExiting, onComplete }}>
      {children}
    </PreloaderContext.Provider>
  );
}
