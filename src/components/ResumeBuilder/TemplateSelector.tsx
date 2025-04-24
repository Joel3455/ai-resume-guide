
import { useState } from "react";
import { resumeTemplates } from "@/utils/resumeTemplates";
import { ResumeTemplate } from "@/types/resume";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder/resume-template-placeholder.jpg";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Choose a Template</h2>
      
      <Tabs defaultValue="All" onValueChange={setSelectedCategory}>
        <TabsList className="mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
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
                      <div className="aspect-[3/4] relative">
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="h-full w-full object-cover"
                          onError={handleImageError}
                        />
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
