"use client";

import ImageReveal from "@/components/ui/image-reveal";

interface Props {
  images: string[];
  title: string;
}

export default function CaseGallery({ images, title }: Props) {
  return (
    <section className="max-w-[1400px] mx-auto" style={{ padding: "0 5vw clamp(80px, 10vw, 120px)" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(16px,2vw,28px)]">
        {images.map((src, i) => (
          <div key={i} className={i === 0 ? "md:col-span-2" : ""}>
            <ImageReveal
              src={src}
              alt={`${title} — image ${i + 1}`}
              aspectRatio={i === 0 ? "16/9" : "4/3"}
              scale={1.08}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
