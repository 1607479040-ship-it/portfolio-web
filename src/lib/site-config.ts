import type { NavItem, Service, Award } from "@/types";

export const SITE_CONFIG = {
  name: "Wei Bowen",
  title: "Brand Visual Designer",
  tagline: "让品牌开口说话",
  description:
    "魏博文 — 品牌视觉设计师，专注于品牌秩序、视觉系统与商业表达。",
  email: "weibw02@163.com",
  phone: "+86 173 2620 1536",
  location: "Beijing, China",
  timezone: "Asia/Shanghai",
  baseUrl: "https://weibowen.design",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "More Work", href: "/morework" },
];

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "品牌识别系统",
    description:
      "从标志、辅助图形、色彩、字体到版式规范，建立可被长期使用的品牌视觉资产。",
  },
  {
    number: "02",
    title: "包装视觉设计",
    description:
      "以货架识别和系列层级为中心，完成包装系统的信息秩序与视觉延展。",
  },
  {
    number: "03",
    title: "品牌活动视觉",
    description:
      "围绕传播场景建立主视觉、物料系统与线上线下触点的一致表达。",
  },
];

export const AWARDS: Award[] = [
  { title: "Young Guns Award", from: "ADC", year: "2024" },
  { title: "Brand Design Excellence", from: "GDC", year: "2023" },
  { title: "Packaging Design Award", from: "Pentawards", year: "2023" },
  { title: "New Talent Award", from: "Tokyo TDC", year: "2022" },
];

export const SOCIAL_LINKS = [
  { label: "Behance", url: "https://www.behance.net/" },
  { label: "Dribbble", url: "https://dribbble.com/" },
  { label: "小红书", url: "https://www.xiaohongshu.com/" },
  { label: "站酷", url: "https://www.zcool.com.cn/" },
];

export const PRELOADER_WORDS = [
  "品牌",
  "系统",
  "视觉",
  "符号",
  "语言",
  "秩序",
  "美学",
  "魏博文",
];
