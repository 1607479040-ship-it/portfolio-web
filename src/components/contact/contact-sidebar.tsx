import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/site-config";
import { MapPin, Clock } from "lucide-react";

export default function ContactSidebar() {
  return (
    <div className="flex flex-col gap-[clamp(28px,4vw,44px)] text-white/60">
      <div>
        <h3 className="text-white text-lg font-normal mb-[16px]">Get in touch</h3>
        <p className="text-sm leading-relaxed max-w-[280px]">
          欢迎沟通品牌、包装、活动视觉与空间导视项目。填写表单，我会在 48 小时内回复。
        </p>
      </div>

      <div className="flex flex-col gap-[20px] text-sm">
        <div className="flex items-start gap-[12px]">
          <MapPin size={16} className="shrink-0 mt-[3px] text-white/40" />
          <div>
            <p className="text-white text-sm">{SITE_CONFIG.location}</p>
          </div>
        </div>
        <div className="flex items-start gap-[12px]">
          <Clock size={16} className="shrink-0 mt-[3px] text-white/40" />
          <div>
            <p className="text-white text-sm">Response within 48h</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs text-white/30 uppercase tracking-wider mb-[16px]">Follow</h4>
        <div className="flex flex-wrap gap-[16px]">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-white transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div>
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="text-white text-lg hover:opacity-70 transition-opacity"
        >
          {SITE_CONFIG.email}
        </a>
      </div>
    </div>
  );
}
