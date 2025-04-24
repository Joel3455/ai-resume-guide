
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import TemplateSelector from "@/components/ResumeBuilder/TemplateSelector";
import ResumeForm from "@/components/ResumeBuilder/ResumeForm";
import ResumePreview from "@/components/ResumeBuilder/ResumePreview";
import { FileDown, PieChart } from "lucide-react";
import { useResumes } from "@/hooks/useResumes";
import { initialResumeData } from "@/utils/resumeTemplates";
import { ResumeData } from "@/types/resume";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Builder = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState("modern-professional");
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const { createResume } = useResumes();
  const navigate = useNavigate();
  
  const handleSaveResume = async () => {
    try {
      await createResume.mutateAsync({
        title: resumeData.personalInfo.fullName ? 
          `${resumeData.personalInfo.fullName}'s Resume` : 
          "My Resume",
        template_id: selectedTemplate,
        content: resumeData,
      });
      toast.success("Resume saved successfully");
    } catch (error) {
      toast.error("Error saving resume");
      console.error("Error saving resume:", error);
    }
  };

  const handleNextStep = () => {
    if (activeTab === "templates") {
      setActiveTab("content");
    } else if (activeTab === "content") {
      setActiveTab("preview");
    }
  };

  const handlePreviousStep = () => {
    if (activeTab === "content") {
      setActiveTab("templates");
    } else if (activeTab === "preview") {
      setActiveTab("content");
    }
  };

  const handleExport = () => {
    toast.success("Resume would be downloaded as PDF in a real application");
  };

  const handleAnalyze = () => {
    toast.success("Navigating to analyzer with current resume");
    navigate("/analyzer");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="bg-primary-50 py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold">Resume Builder</h1>
            <p className="text-gray-500 mt-2">
              Create a professional resume in minutes with our easy-to-use builder
            </p>
          </div>
        </div>
      </div>
      <main className="flex-1 py-10">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="templates" className="flex gap-2">
                <span className="hidden sm:inline">Choose Template</span>
                <span className="inline sm:hidden">Template</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex gap-2">
                <span className="hidden sm:inline">Add Content</span>
                <span className="inline sm:hidden">Content</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex gap-2">
                <span className="hidden sm:inline">Review & Export</span>
                <span className="inline sm:hidden">Review</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="max-w-5xl mx-auto">
              <TemplateSelector 
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
              />
              <div className="mt-8 flex justify-end">
                <Button onClick={handleNextStep}>
                  Continue to Content
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="max-w-3xl mx-auto">
              <ResumeForm 
                resumeData={resumeData} 
                setResumeData={(data: ResumeData) => setResumeData(data)} 
              />
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  Back to Templates
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleSaveResume}>
                    Save Resume
                  </Button>
                  <Button onClick={handleNextStep}>
                    Preview Resume
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="max-w-5xl mx-auto">
              <div className="mb-8 flex justify-center gap-4 flex-wrap">
                <Button variant="outline" onClick={handleExport}>
                  <FileDown className="mr-2 h-4 w-4" /> Download PDF
                </Button>
                <Link to="/analyzer">
                  <Button variant="outline" onClick={handleAnalyze}>
                    <PieChart className="mr-2 h-4 w-4" /> Analyze Resume
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleSaveResume}>
                  Save Resume
                </Button>
              </div>
              
              <div className="p-4 md:p-8 bg-gray-50 rounded-lg">
                <ResumePreview resumeData={resumeData} templateId={selectedTemplate} />
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  Edit Content
                </Button>
                <Button onClick={handleExport}>
                  <FileDown className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Builder;
