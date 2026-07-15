"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/paths";
import { useRouteTransition } from "@/providers/route-transition-provider";
import SideNav from "./side-nav";

const NAME_MARK_MASK: CSSProperties = {
  WebkitMaskImage: `url('${withBasePath("/images/weibowen.png")}')`,
  maskImage: `url('${withBasePath("/images/weibowen.png")}')`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "left center",
  maskPosition: "left center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

export default function Header() {
  const { startTransition } = useRouteTransition();
  const pathname = usePathname();
  const [isAtHeroScroll, setIsAtHeroScroll] = useState(true);
  const isHeroSurface = pathname === "/" && isAtHeroScroll;

  useEffect(() => {
    if (pathname !== "/") return;

    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setIsAtHeroScroll(window.scrollY < window.innerHeight - 24);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  function handleHomeClick(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.preventDefault();

    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    startTransition("/", {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
  }

  return (
    <>
      <header
        className={cn(
          "fixed left-1/2 top-0 z-50 flex w-full max-w-[1920px] -translate-x-1/2 items-center justify-between pointer-events-none",
          "py-[32px] pr-[5vw] pl-[calc(clamp(20px,4vw,48px)+80px)]",
          "max-md:py-[24px] max-md:pl-[20px] max-md:pr-[20px]"
        )}
      >
        <Link
          href="/"
          onClick={handleHomeClick}
          aria-label="Home"
          className="group pointer-events-auto relative block h-[26px] w-[100px] overflow-hidden select-none md:h-[28px] md:w-[108px]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 transition-transform duration-[0.58s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[112%]"
            style={{ ...NAME_MARK_MASK, backgroundColor: isHeroSurface ? "#FEFEFE" : "#1C1D20" }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-[112%] transition-transform duration-[0.58s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0"
            style={{ ...NAME_MARK_MASK, backgroundColor: "#FDE910" }}
          />
        </Link>

        <div />
      </header>

      <SideNav />
    </>
  );
}
