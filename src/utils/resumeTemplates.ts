
import { ResumeTemplate } from "@/types/resume";
import { ResumeData } from "@/types/resume";

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean and minimal design with a modern touch.',
    thumbnail: '/resume-templates/modern-professional.jpg',
    category: 'Professional'
  },
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    description: 'Sophisticated template ideal for senior positions.',
    thumbnail: '/resume-templates/executive-elite.jpg',
    category: 'Executive'
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Stand out with this vibrant and unique layout.',
    thumbnail: '/resume-templates/creative-bold.jpg',
    category: 'Creative'
  },
  {
    id: 'tech-minimal',
    name: 'Tech Minimal',
    description: 'Sleek design focused on technical skills display.',
    thumbnail: '/resume-templates/tech-minimal.jpg',
    category: 'Tech'
  },
  {
    id: 'academic-formal',
    name: 'Academic Formal',
    description: 'Traditional format suitable for academic positions.',
    thumbnail: '/resume-templates/academic-formal.jpg',
    category: 'Academic'
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    description: 'Perfect for recent graduates and early career professionals.',
    thumbnail: '/resume-templates/entry-level.jpg',
    category: 'Entry Level'
  },
  {
    id: 'minimal-elegant',
    name: 'Minimal Elegant',
    description: 'A clean and elegant design with perfect white space.',
    thumbnail: '/resume-templates/minimal-elegant.jpg',
    category: 'Professional'
  },
  {
    id: 'startup-modern',
    name: 'Startup Modern',
    description: 'Perfect for startup and tech industry professionals.',
    thumbnail: '/resume-templates/startup-modern.jpg',
    category: 'Tech'
  },
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    description: 'Traditional design trusted by corporate professionals.',
    thumbnail: '/resume-templates/corporate-classic.jpg',
    category: 'Executive'
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Showcase your creative work with style.',
    thumbnail: '/resume-templates/creative-portfolio.jpg',
    category: 'Creative'
  },
  {
    id: 'research-scholar',
    name: 'Research Scholar',
    description: 'Ideal for researchers and academics.',
    thumbnail: '/resume-templates/research-scholar.jpg',
    category: 'Academic'
  },
  {
    id: 'fresh-graduate',
    name: 'Fresh Graduate',
    description: 'Highlight your potential with this graduate-focused design.',
    thumbnail: '/resume-templates/fresh-graduate.jpg',
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

