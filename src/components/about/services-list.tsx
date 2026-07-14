"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SERVICES } from "@/lib/site-config";

export default function ServicesList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section ref={ref} className="max-w-[1400px] mx-auto" style={{ padding: "clamp(60px, 10vw, 120px) 5vw" }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(20px,3vw,40px)]">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.number}
            className="border-t border-black/8 pt-[clamp(24px,3vw,36px)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * i }}
          >
            <span className="block text-xs text-[#999D9E] mb-[16px]">{service.number}</span>
            <h3 className="text-[#1C1D20] text-[clamp(20px,1.8vw,28px)] font-normal mb-[12px]">{service.title}</h3>
            <p className="text-[#999D9E] text-sm leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
