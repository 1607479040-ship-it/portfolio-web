"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { contactFormSchema, budgetOptions, type ContactFormValues } from "@/lib/validators";

export default function ContactForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  function onSubmit(data: ContactFormValues) {
    // Simulate submit — replace with real API later
    console.log("Form data:", data);
    router.push("/success");
  }

  const inputClass =
    "w-full bg-transparent border-b border-white/15 pb-[14px] text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[clamp(28px,4vw,44px)]">
      {/* Name */}
      <div>
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-[10px]">
          01 — Your Name
        </label>
        <input {...register("name")} placeholder="Full name" className={inputClass} />
        {errors.name && <p className="text-red-400 text-xs mt-[6px]">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-[10px]">
          02 — Email Address
        </label>
        <input {...register("email")} placeholder="you@company.com" className={inputClass} />
        {errors.email && <p className="text-red-400 text-xs mt-[6px]">{errors.email.message}</p>}
      </div>

      {/* Company */}
      <div>
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-[10px]">
          03 — Company
        </label>
        <input {...register("company")} placeholder="Company name" className={inputClass} />
        {errors.company && <p className="text-red-400 text-xs mt-[6px]">{errors.company.message}</p>}
      </div>

      {/* Budget */}
      <div>
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-[10px]">
          04 — Budget Range
        </label>
        <select {...register("budget")} className={inputClass} defaultValue="">
          <option value="" disabled className="text-black">
            Select a budget range
          </option>
          {budgetOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-black">
              {opt.label}
            </option>
          ))}
        </select>
        {errors.budget && <p className="text-red-400 text-xs mt-[6px]">{errors.budget.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-[10px]">
          05 — Project Details
        </label>
        <textarea
          {...register("message")}
          placeholder="Tell me about your project..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className="text-red-400 text-xs mt-[6px]">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-[12px] text-white text-lg font-medium group disabled:opacity-50 mt-[16px]"
      >
        <span className="w-[48px] h-[48px] rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#1C1D20] transition-all duration-500">
          <ArrowRight size={18} />
        </span>
        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
      </button>
    </form>
  );
}
