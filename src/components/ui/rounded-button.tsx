"use client";

import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type MouseEvent } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Magnetic from "./magnetic";
import { useRouteTransition } from "@/providers/route-transition-provider";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "light" | "dark";
  magnetic?: boolean;
  external?: boolean;
  transitionLabel?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export default function RoundedButton({
  children,
  href,
  className,
  variant = "light",
  magnetic = true,
  external,
  transitionLabel,
  ...props
}: Props) {
  const { startTransition } = useRouteTransition();

  function handleTransitionClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!href || !transitionLabel || external) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.preventDefault();
    startTransition(href, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
  }

  const baseClass = cn(
    "relative inline-flex items-center justify-center rounded-full border transition-all duration-500 font-medium text-sm tracking-wide select-none group overflow-hidden",
    "h-[52px] px-[32px]",
    variant === "light"
      ? "border-black/15 text-black hover:text-black"
      : "border-white/20 text-white hover:text-black",
    className
  );

  const circle = (
    <span
      className={cn(
        "absolute inset-0 rounded-full scale-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100",
        variant === "light" ? "bg-[#FDE910]" : "bg-white"
      )}
      aria-hidden="true"
    />
  );

  const label = <span className="relative z-10">{children}</span>;

  const inner = (
    <>
      {circle}
      {label}
    </>
  );

  const wrapped = magnetic ? (
    <Magnetic intensity={0.3}>
      {href ? (
        <Link
          href={href}
          className={baseClass}
          onClick={handleTransitionClick}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {inner}
        </Link>
      ) : (
        <button className={baseClass} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
          {inner}
        </button>
      )}
    </Magnetic>
  ) : href ? (
    <Link
      href={href}
      className={baseClass}
      onClick={handleTransitionClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {inner}
    </Link>
  ) : (
    <button className={baseClass} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );

  return wrapped;
}
