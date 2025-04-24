
import { ResumeTemplate } from "@/types/resume";
import { ResumeData } from "@/types/resume";

// Now we generate unique identifier strings for thumbnails
// instead of relying on actual image files that might be missing
export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean and minimal design with a modern touch.',
    thumbnail: 'modern-professional',
    category: 'Professional'
  },
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    description: 'Sophisticated template ideal for senior positions.',
    thumbnail: 'executive-elite',
    category: 'Executive'
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Stand out with this vibrant and unique layout.',
    thumbnail: 'creative-bold',
    category: 'Creative'
  },
  {
    id: 'tech-minimal',
    name: 'Tech Minimal',
    description: 'Sleek design focused on technical skills display.',
    thumbnail: 'tech-minimal',
    category: 'Tech'
  },
  {
    id: 'academic-formal',
    name: 'Academic Formal',
    description: 'Traditional format suitable for academic positions.',
    thumbnail: 'academic-formal',
    category: 'Academic'
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    description: 'Perfect for recent graduates and early career professionals.',
    thumbnail: 'entry-level',
    category: 'Entry Level'
  },
  {
    id: 'minimal-elegant',
    name: 'Minimal Elegant',
    description: 'A clean and elegant design with perfect white space.',
    thumbnail: 'minimal-elegant',
    category: 'Professional'
  },
  {
    id: 'startup-modern',
    name: 'Startup Modern',
    description: 'Perfect for startup and tech industry professionals.',
    thumbnail: 'startup-modern',
    category: 'Tech'
  },
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    description: 'Traditional design trusted by corporate professionals.',
    thumbnail: 'corporate-classic',
    category: 'Executive'
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Showcase your creative work with style.',
    thumbnail: 'creative-portfolio',
    category: 'Creative'
  },
  {
    id: 'research-scholar',
    name: 'Research Scholar',
    description: 'Ideal for researchers and academics.',
    thumbnail: 'research-scholar',
    category: 'Academic'
  },
  {
    id: 'fresh-graduate',
    name: 'Fresh Graduate',
    description: 'Highlight your potential with this graduate-focused design.',
    thumbnail: 'fresh-graduate',
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

