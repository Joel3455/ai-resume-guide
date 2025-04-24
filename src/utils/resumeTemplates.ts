import { ResumeData } from "@/types/resume";

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean and minimal design with a modern touch.',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    category: 'Professional'
  },
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    description: 'Sophisticated template ideal for senior positions.',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    category: 'Executive'
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Stand out with this vibrant and unique layout.',
    thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    category: 'Creative'
  },
  {
    id: 'tech-minimal',
    name: 'Tech Minimal',
    description: 'Sleek design focused on technical skills display.',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Tech'
  },
  {
    id: 'academic-formal',
    name: 'Academic Formal',
    description: 'Traditional format suitable for academic positions.',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    category: 'Academic'
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    description: 'Perfect for recent graduates and early career professionals.',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    category: 'Entry Level'
  },
  {
    id: 'minimal-elegant',
    name: 'Minimal Elegant',
    description: 'A clean and elegant design with perfect white space.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    category: 'Professional'
  },
  {
    id: 'startup-modern',
    name: 'Startup Modern',
    description: 'Perfect for startup and tech industry professionals.',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    category: 'Tech'
  },
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    description: 'Traditional design trusted by corporate professionals.',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    category: 'Executive'
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Showcase your creative work with style.',
    thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    category: 'Creative'
  },
  {
    id: 'research-scholar',
    name: 'Research Scholar',
    description: 'Ideal for researchers and academics.',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    category: 'Academic'
  },
  {
    id: 'fresh-graduate',
    name: 'Fresh Graduate',
    description: 'Highlight your potential with this graduate-focused design.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    category: 'Entry Level'
  }
];

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
  },
  experience: [
    {
      id: "exp-1",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  skills: [
    { id: "skill-1", name: "", level: "Advanced" },
    { id: "skill-2", name: "", level: "Intermediate" },
    { id: "skill-3", name: "", level: "Beginner" },
  ],
};
