
import React from "react";

interface ResumePreviewProps {
  resumeData: any;
  templateId: string;
}

const ResumePreview = ({ resumeData, templateId }: ResumePreviewProps) => {
  return (
    <div className="border rounded-md shadow-sm bg-white p-8 max-w-[800px] mx-auto">
      {/* This is a simplified preview. In a real application, you'd have specific layouts per template */}
      <div className="mb-6 pb-6 border-b">
        <h1 className="text-3xl font-bold text-center">{resumeData.personalInfo.fullName}</h1>
        <p className="text-xl text-center text-gray-500">{resumeData.personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-3 text-sm">
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
