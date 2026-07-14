import Hero from "@/components/home/hero";
import WorkInline from "@/components/home/work-inline";
import WorkMediaDrift from "@/components/home/work-media-drift";
import AboutPageContent from "@/components/home/about-inline";

export default function HomePage() {
  return (
    <>
      <div
        className="relative"
        style={{ height: "calc(100dvh + clamp(84px, 10dvh, 132px))" }}
      >
        <Hero />
      </div>
      <div
        className="sticky top-0 z-10 rounded-t-[16px] bg-[#F5F5F3] pt-[1px]"
        style={{ marginTop: "calc(-1 * clamp(84px, 10dvh, 132px))" }}
      >
        <WorkInline />
        <WorkMediaDrift />
        <AboutPageContent />
      </div>
    </>
  );
}
