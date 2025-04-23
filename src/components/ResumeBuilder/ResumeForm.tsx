
import { useState } from "react";
import { useResumes } from "@/hooks/useResumes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/types/resume";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

const ResumeForm = ({ resumeData, setResumeData }: ResumeFormProps) => {
  const updatePersonalInfo = (field: keyof ResumeData["personalInfo"], value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: `exp-${resumeData.experience.length + 1}`,
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Input
              placeholder="Full Name"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Job Title"
              value={resumeData.personalInfo.jobTitle}
              onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Email"
              type="email"
              value={resumeData.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Phone"
              value={resumeData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Location"
              value={resumeData.personalInfo.location}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Website (optional)"
              value={resumeData.personalInfo.website || ""}
              onChange={(e) => updatePersonalInfo("website", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Textarea
              placeholder="Professional Summary"
              value={resumeData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Work Experience</h3>
          <Button onClick={addExperience} variant="outline" size="sm">
            Add Experience
          </Button>
        </div>
        
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
              />
              <Input
                placeholder="Position"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
              />
              <Input
                placeholder="Location"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
              />
              <Input
                type="date"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
              />
              <Input
                type="date"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                disabled={exp.current}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                  id={`current-${exp.id}`}
                />
                <label htmlFor={`current-${exp.id}`}>Current Position</label>
              </div>
              <div className="md:col-span-2">
                <Textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <Button
              onClick={() => removeExperience(exp.id)}
              variant="destructive"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeForm;
