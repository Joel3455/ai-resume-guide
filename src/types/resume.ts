
import { Json } from "@/integrations/supabase/types";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    summary: string;
  };
  experience: {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: {
    id: string;
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced";
  }[];
}

export interface Resume {
  id: string;
  title: string;
  template_id: string;
  content: ResumeData;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

// Type guard to check if a JSON value matches the ResumeData structure
// Updated to ensure correct TypeScript type compatibility
export function isResumeData(json: Json): json is Json {
  const data = json as any;
  return (
    data &&
    typeof data === 'object' &&
    'personalInfo' in data &&
    'experience' in data &&
    'education' in data &&
    'skills' in data
  );
}
