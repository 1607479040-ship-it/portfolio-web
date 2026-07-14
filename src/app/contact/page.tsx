"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/site-config";
import ContactForm from "@/components/contact/contact-form";
import ContactSidebar from "@/components/contact/contact-sidebar";
import RoundedButton from "@/components/ui/rounded-button";

export default function ContactPage() {
  return (
    <section className="bg-[#1C1D20] min-h-screen" style={{ padding: "clamp(140px, 18vh, 220px) 5vw clamp(80px, 10vw, 120px)" }}>
      <div className="max-w-[1400px] mx-auto">
        <motion.h1
          className="text-white font-normal tracking-[-0.04em] leading-[0.94] mb-[clamp(48px,6vw,80px)]"
          style={{ fontSize: "clamp(48px, 8vw, 130px)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in
          <br />
          Touch
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-[clamp(40px,8vw,100px)]">
          <ContactForm />
          <ContactSidebar />
        </div>
      </div>
    </section>
  );
}
