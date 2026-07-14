"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Branding", "Packaging", "Campaign", "Environmental", "Digital", "Type Design"];

interface Props {
  active: string;
  onChange: (f: string) => void;
}

export default function WorkFilterBar({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-[clamp(16px,3vw,32px)]">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={cn(
            "type-body-small relative transition-colors duration-300 pb-[6px]",
            active === f ? "text-[#1C1D20]" : "text-[#999D9E] hover:text-[#1C1D20]"
          )}
        >
          {f}
          {active === f && (
            <motion.span
              layoutId="filter-underline"
              className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1C1D20]"
            />
          )}
        </button>
      ))}
    </div>
  );
}
