import { ResumeTemplate } from "@/types/resume";

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean and minimal design with a modern touch.',
    thumbnail: '/placeholder/modern-professional.png',
    category: 'Professional'
  },
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    description: 'Sophisticated template ideal for senior positions.',
    thumbnail: '/placeholder/executive-elite.png',
    category: 'Executive'
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Stand out with this vibrant and unique layout.',
    thumbnail: '/placeholder/creative-bold.png',
    category: 'Creative'
  },
  {
    id: 'tech-minimal',
    name: 'Tech Minimal',
    description: 'Sleek design focused on technical skills display.',
    thumbnail: '/placeholder/tech-minimal.png',
    category: 'Tech'
  },
  {
    id: 'academic-formal',
    name: 'Academic Formal',
    description: 'Traditional format suitable for academic positions.',
    thumbnail: '/placeholder/academic-formal.png',
    category: 'Academic'
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    description: 'Perfect for recent graduates and early career professionals.',
    thumbnail: '/placeholder/entry-level.png',
    category: 'Entry Level'
  },
  {
    id: 'minimal-elegant',
    name: 'Minimal Elegant',
    description: 'A clean and elegant design with perfect white space.',
    thumbnail: '/placeholder/minimal-elegant.png',
    category: 'Professional'
  },
  {
    id: 'startup-modern',
    name: 'Startup Modern',
    description: 'Perfect for startup and tech industry professionals.',
    thumbnail: '/placeholder/startup-modern.png',
    category: 'Tech'
  },
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    description: 'Traditional design trusted by corporate professionals.',
    thumbnail: '/placeholder/corporate-classic.png',
    category: 'Executive'
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Showcase your creative work with style.',
    thumbnail: '/placeholder/creative-portfolio.png',
    category: 'Creative'
  },
  {
    id: 'research-scholar',
    name: 'Research Scholar',
    description: 'Ideal for researchers and academics.',
    thumbnail: '/placeholder/research-scholar.png',
    category: 'Academic'
  },
  {
    id: 'fresh-graduate',
    name: 'Fresh Graduate',
    description: 'Highlight your potential with this graduate-focused design.',
    thumbnail: '/placeholder/fresh-graduate.png',
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
