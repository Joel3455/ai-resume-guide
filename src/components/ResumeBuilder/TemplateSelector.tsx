
import { useState } from "react";
import { resumeTemplates } from "@/utils/resumeTemplates";
import { ResumeTemplate } from "@/types/resume";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Award, Briefcase, Lightbulb, GraduationCap, BookOpen } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector = ({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...new Set(resumeTemplates.map(template => template.category))];
  
  const filteredTemplates = selectedCategory === "All" 
    ? resumeTemplates 
    : resumeTemplates.filter(template => template.category === selectedCategory);

  // Get icon for each template category
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
                        {/* Generate template preview dynamically instead of using images */}
                        <div className="h-full w-full p-3 border-b">
                          <div className={`h-full ${template.id === selectedTemplate ? 'border-2 border-primary-500' : 'border border-gray-200'} rounded-sm p-2 overflow-hidden`}>
                            {/* Template Header */}
                            <div className={`text-center ${template.id === 'creative-bold' ? 'bg-primary-50 p-2 rounded' : ''} ${template.id === 'tech-minimal' ? 'border-b-0' : 'border-b'} pb-2 mb-2`}>
                              <div className={`font-bold ${template.id === 'creative-bold' ? 'text-lg text-primary-600' : (template.id === 'tech-minimal' ? 'text-sm font-mono' : 'text-md')}`}>
                                JANE DOE
                              </div>
                              <div className={`text-xs text-gray-500 ${template.id === 'minimal-elegant' ? 'tracking-wide' : ''}`}>
                                {template.id === 'creative-bold' ? 'GRAPHIC DESIGNER' : 'UX Designer'}
                              </div>
                            </div>
                            
                            {/* Content Preview - simplified version */}
                            <div className="space-y-2">
                              <div className="h-1 bg-gray-200 w-full rounded"></div>
                              <div className="h-1 bg-gray-200 w-5/6 rounded"></div>
                              <div className="h-1 bg-gray-200 w-4/6 rounded"></div>
                              
                              {/* Skill dots for some templates */}
                              {['creative-bold', 'tech-minimal', 'startup-modern'].includes(template.id) && (
                                <div className="flex gap-1 mt-2">
                                  <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                                  <div className="h-2 w-2 rounded-full bg-primary-300"></div>
                                  <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                                </div>
                              )}
                            </div>
                          </div>
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
