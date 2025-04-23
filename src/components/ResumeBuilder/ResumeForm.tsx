
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  User,
  Book,
  Briefcase,
  Award,
  Languages,
  Link,
  Plus,
  Trash2,
} from "lucide-react";

interface ResumeFormProps {
  resumeData: any;
  setResumeData: (data: any) => void;
}

const ResumeForm = ({ resumeData, setResumeData }: ResumeFormProps) => {
  const updatePersonalInfo = (field: string, value: string) => {
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
          id: `exp-${Date.now()}`,
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

  const updateExperience = (index: number, field: string, value: any) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: `edu-${Date.now()}`,
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

  const updateEducation = (index: number, field: string, value: any) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { id: `skill-${Date.now()}`, name: "", level: "Advanced" }],
    });
  };

  const updateSkill = (index: number, field: string, value: string) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Resume Information</h2>

      <Accordion type="single" collapsible defaultValue="personal-info">
        {/* Personal Information */}
        <AccordionItem value="personal-info">
          <AccordionTrigger className="text-lg font-medium">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 pb-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={resumeData.personalInfo.jobTitle}
                      onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
                      placeholder="Software Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo("email", e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                      placeholder="+1 555 123 4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => updatePersonalInfo("location", e.target.value)}
                      placeholder="New York, NY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website/LinkedIn</Label>
                    <Input
                      id="website"
                      value={resumeData.personalInfo.website}
                      onChange={(e) => updatePersonalInfo("website", e.target.value)}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={resumeData.personalInfo.summary}
                      onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                      placeholder="A brief summary of your professional background and career objectives..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Work Experience */}
        <AccordionItem value="experience">
          <AccordionTrigger className="text-lg font-medium">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>Work Experience</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 pb-4">
                {resumeData.experience.map((exp: any, index: number) => (
                  <div key={exp.id} className="mb-8 border-b pb-6 last:border-0 last:pb-0 last:mb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="ml-2">Remove</span>
                      </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          id={`company-${index}`}
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(index, "company", e.target.value)
                          }
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`position-${index}`}>Position</Label>
                        <Input
                          id={`position-${index}`}
                          value={exp.position}
                          onChange={(e) =>
                            updateExperience(index, "position", e.target.value)
                          }
                          placeholder="Job Title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`location-${index}`}>Location</Label>
                        <Input
                          id={`location-${index}`}
                          value={exp.location}
                          onChange={(e) =>
                            updateExperience(index, "location", e.target.value)
                          }
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                          <Input
                            id={`start-date-${index}`}
                            value={exp.startDate}
                            onChange={(e) =>
                              updateExperience(index, "startDate", e.target.value)
                            }
                            placeholder="MM/YYYY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`end-date-${index}`}>End Date</Label>
                          <Input
                            id={`end-date-${index}`}
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperience(index, "endDate", e.target.value)
                            }
                            placeholder="MM/YYYY or Present"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(index, "description", e.target.value)
                          }
                          placeholder="Describe your responsibilities and achievements..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addExperience} className="mt-4 w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" /> Add Work Experience
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Education */}
        <AccordionItem value="education">
          <AccordionTrigger className="text-lg font-medium">
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              <span>Education</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 pb-4">
                {resumeData.education.map((edu: any, index: number) => (
                  <div key={edu.id} className="mb-8 border-b pb-6 last:border-0 last:pb-0 last:mb-0">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Education {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="ml-2">Remove</span>
                      </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${index}`}>Institution</Label>
                        <Input
                          id={`institution-${index}`}
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(index, "institution", e.target.value)
                          }
                          placeholder="University Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(index, "degree", e.target.value)
                          }
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-location-${index}`}>Location</Label>
                        <Input
                          id={`edu-location-${index}`}
                          value={edu.location}
                          onChange={(e) =>
                            updateEducation(index, "location", e.target.value)
                          }
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor={`edu-start-date-${index}`}>Start Date</Label>
                          <Input
                            id={`edu-start-date-${index}`}
                            value={edu.startDate}
                            onChange={(e) =>
                              updateEducation(index, "startDate", e.target.value)
                            }
                            placeholder="MM/YYYY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edu-end-date-${index}`}>End Date</Label>
                          <Input
                            id={`edu-end-date-${index}`}
                            value={edu.endDate}
                            onChange={(e) =>
                              updateEducation(index, "endDate", e.target.value)
                            }
                            placeholder="MM/YYYY or Present"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`edu-description-${index}`}>Description</Label>
                        <Textarea
                          id={`edu-description-${index}`}
                          value={edu.description}
                          onChange={(e) =>
                            updateEducation(index, "description", e.target.value)
                          }
                          placeholder="Relevant coursework, achievements, etc."
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addEducation} className="mt-4 w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" /> Add Education
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem value="skills">
          <AccordionTrigger className="text-lg font-medium">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>Skills</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 pb-4">
                <div className="space-y-4">
                  {resumeData.skills.map((skill: any, index: number) => (
                    <div key={skill.id} className="flex items-center gap-2">
                      <Input
                        value={skill.name}
                        onChange={(e) => updateSkill(index, "name", e.target.value)}
                        placeholder="Skill name"
                        className="flex-grow"
                      />
                      <select
                        value={skill.level}
                        onChange={(e) => updateSkill(index, "level", e.target.value)}
                        className="flex-shrink-0 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSkill(index)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button onClick={addSkill} className="mt-4 w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" /> Add Skill
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResumeForm;
