import React from "react";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  resumeData: any;
  templateId: string;
}

const ResumePreview = ({ resumeData, templateId }: ResumePreviewProps) => {
  const getTemplateStyles = () => {
    switch (templateId) {
      case 'modern-professional':
        return "font-sans";
      case 'executive-elite':
        return "font-serif";
      case 'creative-bold':
        return "font-sans space-y-8";
      case 'tech-minimal':
        return "font-mono";
      case 'academic-formal':
        return "font-serif leading-relaxed";
      case 'entry-level':
        return "font-sans space-y-6";
      case 'minimal-elegant':
        return "font-sans tracking-wide";
      case 'startup-modern':
        return "font-sans space-y-6";
      case 'corporate-classic':
        return "font-serif leading-relaxed";
      case 'creative-portfolio':
        return "font-sans space-y-8";
      case 'research-scholar':
        return "font-serif leading-loose";
      case 'fresh-graduate':
        return "font-sans space-y-4";
      default:
        return "font-sans";
    }
  };

  return (
    <div className={cn(
      "border rounded-md shadow-sm bg-white p-8 max-w-[800px] mx-auto",
      getTemplateStyles()
    )}>
      <div className={cn(
        "mb-6 pb-6 border-b",
        templateId === 'creative-bold' && "text-center bg-primary-50 p-6 rounded-lg",
        templateId === 'tech-minimal' && "border-none",
        templateId === 'minimal-elegant' && "border-none pt-8"
      )}>
        <h1 className={cn(
          "text-3xl font-bold",
          templateId === 'creative-bold' && "text-4xl",
          templateId === 'tech-minimal' && "text-2xl",
          templateId === 'minimal-elegant' && "text-4xl tracking-wider"
        )}>
          {resumeData.personalInfo.fullName}
        </h1>
        <p className={cn(
          "text-xl text-gray-500",
          templateId === 'creative-bold' && "text-primary-600",
          templateId === 'tech-minimal' && "text-lg",
          templateId === 'minimal-elegant' && "text-xl tracking-wide"
        )}>
          {resumeData.personalInfo.jobTitle}
        </p>
        
        <div className={cn(
          "flex flex-wrap justify-center gap-3 mt-3 text-sm",
          templateId === 'tech-minimal' && "justify-start",
          templateId === 'minimal-elegant' && "gap-6"
        )}>
          {resumeData.personalInfo.email && (
            <div>{resumeData.personalInfo.email}</div>
          )}
          {resumeData.personalInfo.phone && (
            <div>{resumeData.personalInfo.phone}</div>
          )}
          {resumeData.personalInfo.location && (
            <div>{resumeData.personalInfo.location}</div>
          )}
          {resumeData.personalInfo.website && (
            <div>{resumeData.personalInfo.website}</div>
          )}
        </div>
      </div>
      
      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Professional Summary</h2>
          <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
        </div>
      )}
      
      {resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Work Experience</h2>
          {resumeData.experience.map((exp: any, index: number) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-medium">{exp.position}</h3>
                <div className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-700">{exp.company}</div>
                <div className="text-sm text-gray-600">{exp.location}</div>
              </div>
              <p className="mt-2 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Education</h2>
          {resumeData.education.map((edu: any, index: number) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-medium">{edu.degree}</h3>
                <div className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-700">{edu.institution}</div>
                <div className="text-sm text-gray-600">{edu.location}</div>
              </div>
              {edu.description && (
                <p className="mt-2 text-sm">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {resumeData.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill: any) => (
              <div
                key={skill.id}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"
              >
                <span>{skill.name}</span>
                <span className="text-xs text-gray-500 ml-1">• {skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
