"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types";

interface Props {
  prev: Project | null;
  next: Project | null;
}

export default function CaseNavigation({ prev, next }: Props) {
  return (
    <section className="max-w-[1400px] mx-auto border-t border-black/8" style={{ padding: "clamp(32px,4vw,56px) 5vw" }}>
      <div className="flex justify-between items-center gap-[24px]">
        <div>
          <Link href="/work" className="inline-flex items-center gap-[8px] text-sm text-[#999D9E] hover:text-[#1C1D20] transition-colors">
            <ArrowLeft size={16} />
            All Work
          </Link>
        </div>

        <div className="flex gap-[clamp(24px,4vw,60px)]">
          {prev && (
            <Link
              href={`/work/${prev.slug}`}
              className="group text-right"
            >
              <span className="block text-xs text-[#999D9E] mb-[8px]">Prev</span>
              <span className="text-[#1C1D20] text-lg group-hover:text-[#1C1D20] transition-colors flex items-center gap-[8px]">
                <ArrowLeft size={16} className="group-hover:-translate-x-[4px] transition-transform" />
                {prev.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group text-right"
            >
              <span className="block text-xs text-[#999D9E] mb-[8px]">Next</span>
              <span className="text-[#1C1D20] text-lg group-hover:text-[#1C1D20] transition-colors flex items-center gap-[8px]">
                {next.title}
                <ArrowRight size={16} className="group-hover:translate-x-[4px] transition-transform" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
