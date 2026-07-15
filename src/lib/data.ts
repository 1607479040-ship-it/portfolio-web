import type { Project } from "@/types";
import { withBasePath } from "@/lib/paths";

export const projects: Project[] = [
  {
    slug: "aurora-identity",
    title: "Aurora 品牌识别",
    client: "Aurora Tech",
    year: "2024",
    services: ["品牌策略", "视觉识别", "应用系统"],
    location: "Shanghai, China",
    coverImage: withBasePath("/images/projects/aurora-cover.jpg"),
    images: [
      withBasePath("/images/projects/aurora-01.jpg"),
      withBasePath("/images/projects/aurora-02.jpg"),
      withBasePath("/images/projects/aurora-03.jpg"),
      withBasePath("/images/projects/aurora-04.jpg"),
    ],
    description:
      "为 Aurora Tech 建立完整的品牌识别系统，从标志、色彩、字体到空间应用和数字触点。",
    challenge:
      "初创科技公司在品牌视觉上缺乏辨识度，需要建立一套具有科技感又不失人文温度的视觉体系。",
    approach:
      "以「极光」为灵感，提取流动的光谱色彩，将之转化为具有识别性的几何图形系统。在保持科技理性的同时注入有机的曲线语言。",
    outcome:
      "品牌上线后在行业内获得广泛认可，新品牌系统帮助客户在 6 个月内实现了 40% 的品牌认知度提升。",
    url: "https://aurora.design",
    nextSlug: "osmo-packaging",
  },
  {
    slug: "osmo-packaging",
    title: "Osmo 包装视觉",
    client: "Osmo Supply",
    year: "2024",
    services: ["包装设计", "系列延展", "印刷物料"],
    location: "Shenzhen, China",
    coverImage: withBasePath("/images/projects/osmo-cover.jpg"),
    images: [
      withBasePath("/images/projects/osmo-01.jpg"),
      withBasePath("/images/projects/osmo-02.jpg"),
      withBasePath("/images/projects/osmo-03.jpg"),
    ],
    description:
      "为新消费品牌 Osmo Supply 打造系列化包装系统，涵盖产品包装、物流箱和礼盒套装。",
    challenge:
      "品牌产品线丰富但包装缺乏统一的视觉语言，消费者在货架上难以识别产品系列。",
    approach:
      "建立以色彩分区和图形编码为核心的包装系统，通过不同的色块搭配和图形变化来区分产品线，保持统一的排版骨架。",
    outcome:
      "新包装系统使产品在零售终端的辨识度提升 60%，电商渠道的包装好评率提升了 35%。",
    nextSlug: "northline-campaign",
  },
  {
    slug: "northline-campaign",
    title: "Northline 活动视觉",
    client: "Northline Culture",
    year: "2023",
    services: ["活动主视觉", "社媒传播", "空间装置"],
    location: "Beijing, China",
    coverImage: withBasePath("/images/projects/northline-cover.jpg"),
    images: [
      withBasePath("/images/projects/northline-01.jpg"),
      withBasePath("/images/projects/northline-02.jpg"),
      withBasePath("/images/projects/northline-03.jpg"),
    ],
    description:
      "为 Northline Culture 2023 年度艺术节打造活动主视觉与全触点物料系统。",
    challenge:
      "艺术节面临线上线下多触点同步传播的挑战，主视觉需要兼顾印刷质感和数字屏幕的动态表现。",
    approach:
      "从展览空间的建筑线条中提取几何语言，设计了一套兼具静态力量和动态韵律的视觉系统。主视觉在不同媒介上保持一致的识别性。",
    outcome:
      "艺术节期间社交媒体曝光量超 200 万，线下参观人数突破预期 30%，主视觉被评为当年最佳活动视觉之一。",
    nextSlug: "flow-archive",
  },
  {
    slug: "flow-archive",
    title: "Flow 空间导视",
    client: "Flow Archive",
    year: "2023",
    services: ["空间导视", "环境图形", "品牌触点"],
    location: "Chengdu, China",
    coverImage: withBasePath("/images/projects/flow-cover.jpg"),
    images: [
      withBasePath("/images/projects/flow-01.jpg"),
      withBasePath("/images/projects/flow-02.jpg"),
      withBasePath("/images/projects/flow-03.jpg"),
    ],
    description:
      "为 Flow Archive 设计空间导视系统，将品牌识别延伸至物理空间。",
    challenge:
      "多层复合空间中游客容易迷失方向，导视需要既清晰又融入整体建筑设计。",
    approach:
      "以「流动」为概念，将导视信息嵌入空间动线之中。采用柔和的曲线造型与建筑语言呼应，在关键节点设置品牌触点。",
    outcome:
      "导视系统实施后，游客空间导航满意度提升 45%，品牌空间体验评分达到 4.8/5。",
    nextSlug: "studio-index",
  },
  {
    slug: "studio-index",
    title: "Studio Index 品牌",
    client: "Studio Index",
    year: "2022",
    services: ["品牌策略", "视觉系统", "数字设计"],
    location: "Hangzhou, China",
    coverImage: withBasePath("/images/projects/studio-index-cover.jpg"),
    images: [
      withBasePath("/images/projects/studio-index-01.jpg"),
      withBasePath("/images/projects/studio-index-02.jpg"),
      withBasePath("/images/projects/studio-index-03.jpg"),
    ],
    description:
      "为设计工作室 Studio Index 打造全新的品牌视觉系统和数字形象。",
    challenge:
      "工作室本身服务多元客户，品牌形象需要既专业又不失个性，同时精准传达其设计理念。",
    approach:
      "采用极简的视觉语言，用「索引」概念构建可弹性扩展的图形系统。设计了一套可随内容变化的动态识别规则。",
    outcome:
      "新品牌发布后工作室官网流量增长 120%，品牌提案中标率提升了 50%。",
    nextSlug: "penta-typeface",
  },
  {
    slug: "penta-typeface",
    title: "Penta 字体与版式",
    client: "Penta Foundry",
    year: "2022",
    services: ["字体设计", "版式规范", "品牌应用"],
    location: "Guangzhou, China",
    coverImage: withBasePath("/images/projects/penta-cover.jpg"),
    images: [
      withBasePath("/images/projects/penta-01.jpg"),
      withBasePath("/images/projects/penta-02.jpg"),
      withBasePath("/images/projects/penta-03.jpg"),
    ],
    description:
      "与 Penta Foundry 合作开发定制品牌字体，并建立完整的版式使用规范。",
    challenge:
      "品牌在多个语言环境中需要一致的视觉表达，现有字体无法满足品牌调性的特殊需求。",
    approach:
      "从品牌核心图形中提取笔画特征，设计了一套双语言品牌定制字体。拉丁字母和中文字符在视觉上保持统一的气质。",
    outcome:
      "定制字体已成为品牌最核心的识别资产，在全球 20 多个市场的应用中保持一致的品牌表达。",
    nextSlug: "meridian-space",
  },
  {
    slug: "meridian-space",
    title: "Meridian 空间体验",
    client: "Meridian Hotels",
    year: "2021",
    services: ["空间设计", "导视系统", "品牌体验"],
    location: "Sanya, China",
    coverImage: withBasePath("/images/projects/meridian-cover.jpg"),
    images: [
      withBasePath("/images/projects/meridian-01.jpg"),
      withBasePath("/images/projects/meridian-02.jpg"),
      withBasePath("/images/projects/meridian-03.jpg"),
    ],
    description:
      "为精品酒店品牌打造完整的空间品牌体验，从大堂到客房的每一个触点。",
    challenge:
      "酒店空间需要在不破坏度假氛围的前提下建立清晰的品牌识别和功能指引。",
    approach:
      "以「子午线」概念贯穿空间设计，用光线、材质和图形的变化来暗示空间分区和功能引导。",
    outcome:
      "酒店开业后成为当地设计地标，品牌空间体验在酒店行业媒体中获得多次报道。",
    nextSlug: "aurora-identity",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];
  return { prev, next };
}
