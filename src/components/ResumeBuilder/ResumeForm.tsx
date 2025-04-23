
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/types/resume";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: `edu-${resumeData.education.length + 1}`,
          institution: "",
          degree: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          id: `skill-${resumeData.skills.length + 1}`,
          name: "",
          level: "Intermediate" as const,
        },
      ],
    });
  };

  const updateSkill = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.map((skill) =>
        skill.id === id ? { 
          ...skill, 
          [field]: field === 'level' ? value as "Beginner" | "Intermediate" | "Advanced" : value 
        } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== skill),
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Full Name"
            value={resumeData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
          />
          <Input
            placeholder="Job Title"
            value={resumeData.personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={resumeData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
          />
          <Input
            placeholder="Location"
            value={resumeData.personalInfo.location}
            onChange={(e) => updatePersonalInfo("location", e.target.value)}
          />
          <Input
            placeholder="Website (optional)"
            value={resumeData.personalInfo.website || ""}
            onChange={(e) => updatePersonalInfo("website", e.target.value)}
          />
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

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Education</h3>
          <Button onClick={addEducation} variant="outline" size="sm">
            Add Education
          </Button>
        </div>
        
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="border rounded-lg p-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
              />
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
              />
              <Input
                placeholder="Location"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
              />
              <Input
                type="date"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
              />
              <Input
                type="date"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
              />
              <div className="md:col-span-2">
                <Textarea
                  placeholder="Description"
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <Button
              onClick={() => removeEducation(edu.id)}
              variant="destructive"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Skills</h3>
          <Button onClick={addSkill} variant="outline" size="sm">
            Add Skill
          </Button>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {resumeData.skills.map((skill) => (
            <div key={skill.id} className="flex gap-2 items-center border rounded-lg p-3">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Skill name"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                />
                <Select
                  value={skill.level}
                  onValueChange={(value) => updateSkill(skill.id, "level", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => removeSkill(skill.id)}
                variant="destructive"
                size="sm"
                className="self-start"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
