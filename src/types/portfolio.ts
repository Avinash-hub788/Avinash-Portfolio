export interface Social {
  github?: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface Profile {
  name: string;
  shortName: string;
  tagline: string;
  role: string;
  specialization: string;
  location: string;
  yearsOfExperience: number;
  bio: string;
  avatarSvg: string;
  social: Social;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface VideoProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  year: string;
  video: string;
  thumbnail: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  role: string;
  year: string;
  link: string;
  image: string;
  highlight: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  gpa?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarColor: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  testimonials: Testimonial[];
  videoProjects: VideoProject[];
}
