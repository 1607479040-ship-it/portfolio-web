export interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  services: string[];
  location: string;
  coverImage: string;
  images: string[];
  description: string;
  challenge: string;
  approach: string;
  outcome: string;
  url?: string;
  nextSlug?: string;
}

export interface ArchiveProject {
  title: string;
  location: string;
  services: string;
  year: string;
  url?: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
}

export interface Award {
  title: string;
  from: string;
  year: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}
