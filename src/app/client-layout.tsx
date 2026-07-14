"use client";

import { type ReactNode } from "react";
import Preloader from "@/components/preloader/preloader";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import PageTransition from "@/components/ui/page-transition";
import { RouteTransitionProvider } from "@/providers/route-transition-provider";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Preloader />
      <RouteTransitionProvider>
        <Header />
        <PageTransition>
          <main className="mx-auto max-w-[1920px] overflow-x-hidden bg-[#F5F5F3]">{children}</main>
        </PageTransition>
        <Footer />
      </RouteTransitionProvider>
    </>
  );
}
