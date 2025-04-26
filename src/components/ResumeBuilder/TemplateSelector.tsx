import { useState } from "react";
import { resumeTemplates } from "@/utils/resumeTemplates";
import { ResumeTemplate } from "@/types/resume";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Award, Briefcase, Lightbulb, GraduationCap, BookOpen, User, SlidersHorizontal, Mail, Phone, MapPin } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Professional': return <FileText className="h-4 w-4" />;
    case 'Executive': return <Award className="h-4 w-4" />;
    case 'Creative': return <Lightbulb className="h-4 w-4" />;
    case 'Tech': return <Briefcase className="h-4 w-4" />;
    case 'Academic': return <GraduationCap className="h-4 w-4" />;
    case 'Entry Level': return <BookOpen className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const TemplateSelector = ({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...new Set(resumeTemplates.map(template => template.category))];
  
  const filteredTemplates = selectedCategory === "All" 
    ? resumeTemplates 
    : resumeTemplates.filter(template => template.category === selectedCategory);

  const getSampleData = (template: ResumeTemplate) => {
    switch (template.category) {
      case 'Tech':
        return {
          name: 'SARAH PARKER',
          title: 'SENIOR SOFTWARE ENGINEER',
          experience: 'Full Stack Developer at Google',
          education: 'M.S. Computer Science',
          skills: ['React', 'Node.js', 'Python']
        };
      case 'Creative':
        return {
          name: 'EMMA WILSON',
          title: 'UI/UX DESIGNER',
          experience: 'Lead Designer at Apple',
          education: 'BFA in Design',
          skills: ['Figma', 'Adobe XD', 'Sketch']
        };
      case 'Executive':
        return {
          name: 'MICHAEL CHEN',
          title: 'CHIEF TECHNOLOGY OFFICER',
          experience: 'VP of Engineering at Amazon',
          education: 'MBA, Technology Management',
          skills: ['Leadership', 'Strategy', 'Innovation']
        };
      case 'Academic':
        return {
          name: 'DR. ANNA SMITH',
          title: 'RESEARCH SCIENTIST',
          experience: 'Senior Researcher at MIT',
          education: 'Ph.D. in Physics',
          skills: ['Research', 'Data Analysis', 'Publishing']
        };
      case 'Entry Level':
        return {
          name: 'JAMES WILSON',
          title: 'JUNIOR DEVELOPER',
          experience: 'Software Intern',
          education: 'B.S. Computer Science',
          skills: ['HTML/CSS', 'JavaScript', 'Git']
        };
      default:
        return {
          name: 'JOHN DOE',
          title: 'MARKETING MANAGER',
          experience: 'Senior Marketing Role',
          education: 'Bachelor in Marketing',
          skills: ['Digital Marketing', 'Analytics', 'SEO']
        };
    }
  };

  const renderTemplatePreview = (template: ResumeTemplate) => {
    const isCreative = template.id.includes('creative');
    const isTech = template.id.includes('tech');
    const isMinimal = template.id.includes('minimal');
    const sampleData = getSampleData(template);
    
    return (
      <div className={`h-full ${template.id === selectedTemplate ? 'border-2 border-primary-500' : 'border border-gray-200'} rounded-sm p-2 overflow-hidden`}>
        {/* Header Section */}
        <div className={`${isCreative ? 'bg-primary-50 p-2 rounded' : ''} ${isTech ? 'border-b-0' : 'border-b'} pb-2 mb-2`}>
          <div className={`font-bold ${isCreative ? 'text-lg text-primary-600' : (isTech ? 'text-sm font-mono' : 'text-md')} text-center`}>
            {sampleData.name}
          </div>
          <div className={`text-xs text-gray-500 ${isMinimal ? 'tracking-wide' : ''} text-center mb-1`}>
            {sampleData.title}
          </div>
        </div>

        {/* Content Preview */}
        <div className="space-y-2 text-xs">
          {/* Contact Info Section */}
          <div className="flex flex-wrap gap-2 text-primary-600 justify-center mb-2">
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span className="text-gray-600">email@example.com</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span className="text-gray-600">(555) 123-4567</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="text-gray-600">New York, NY</span>
            </span>
          </div>

          {/* Experience Section */}
          <div className="flex items-center gap-1 text-primary-600">
            <Briefcase className="h-3 w-3" />
            <div className="flex-1">
              <div className="text-gray-700 font-medium">Experience</div>
              <div className="text-gray-600">{sampleData.experience}</div>
            </div>
          </div>

          {/* Education Section */}
          <div className="flex items-center gap-1 text-primary-600">
            <GraduationCap className="h-3 w-3" />
            <div className="flex-1">
              <div className="text-gray-700 font-medium">Education</div>
              <div className="text-gray-600">{sampleData.education}</div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="flex items-center gap-1 text-primary-600">
            <SlidersHorizontal className="h-3 w-3" />
            <div className="flex-1">
              <div className="text-gray-700 font-medium">Skills</div>
              <div className="flex flex-wrap gap-1">
                {sampleData.skills.map((skill, index) => (
                  <span key={index} className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isCreative ? 'bg-primary-50 text-primary-600' :
                    isTech ? 'bg-gray-100 font-mono' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Choose a Template</h2>
      
      <Tabs defaultValue="All" onValueChange={setSelectedCategory}>
        <TabsList className="mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="flex items-center gap-2">
              {category !== "All" && getCategoryIcon(category)}
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedCategory}>
          <RadioGroup
            value={selectedTemplate}
            onValueChange={onSelectTemplate}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredTemplates.map((template) => (
              <div key={template.id}>
                <RadioGroupItem
                  id={template.id}
                  value={template.id}
                  className="sr-only"
                />
                <Label
                  htmlFor={template.id}
                  className="cursor-pointer [&:has([data-state=checked])>div]:ring-2 [&:has([data-state=checked])>div]:ring-primary-600"
                >
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="aspect-[3/4] relative bg-white">
                        <div className="h-full w-full p-3 border-b">
                          {renderTemplatePreview(template)}
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                          <h3 className="text-lg font-medium text-white">{template.name}</h3>
                          <p className="text-sm text-gray-200">{template.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateSelector;
