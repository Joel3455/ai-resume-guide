
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import AnalyzerResults from "@/components/ResumeAnalyzer/AnalyzerResults";
import { Upload, FileUp, FilePlus2, FileText, ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Mock analysis data for demonstration
const mockAnalysisData = {
  overallScore: 73,
  atsCompatibility: 82,
  keywordMatches: {
    matched: ["React", "JavaScript", "TypeScript", "UI/UX", "Frontend"],
    missing: ["Node.js", "GraphQL", "CI/CD", "Agile"],
  },
  sections: [
    {
      name: "Contact Information",
      score: 100,
      feedback: "All essential contact details are present and well-formatted.",
      status: "good" as const,
    },
    {
      name: "Professional Summary",
      score: 65,
      feedback: "Your summary is a good length, but could be more specific about your achievements and value proposition.",
      status: "warning" as const,
    },
    {
      name: "Work Experience",
      score: 80,
      feedback: "Strong action verbs and quantifiable achievements. Consider adding more metrics and results.",
      status: "good" as const,
    },
    {
      name: "Education",
      score: 90,
      feedback: "Education section is well-structured and relevant.",
      status: "good" as const,
    },
    {
      name: "Skills",
      score: 45,
      feedback: "Skills section needs improvement. Too generic and missing key technical skills relevant to the job.",
      status: "error" as const,
    },
  ],
  suggestions: [
    "Add more quantifiable achievements to your work experience (e.g., 'Increased conversion rates by 25%').",
    "Include missing keywords like 'Node.js' and 'GraphQL' if you have experience with these technologies.",
    "Make your professional summary more specific to the job you're applying for.",
    "Organize your skills into categories (technical, soft skills, tools) for better readability.",
    "Consider adding a projects section to showcase your practical application of skills.",
  ],
};

const Analyzer = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success(`File "${e.target.files[0].name}" selected`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      toast.success(`File "${e.dataTransfer.files[0].name}" uploaded`);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAnalyze = () => {
    if (!file) {
      toast.error("Please upload a resume file first");
      return;
    }
    
    setAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      setAnalysisData(mockAnalysisData);
      setActiveTab("results");
      setAnalyzing(false);
      toast.success("Resume analysis complete");
    }, 1500);
  };

  const handleExportPDF = () => {
    toast.success("Analysis report would be downloaded as PDF in a real application");
  };

  const handleCreateOptimizedResume = () => {
    toast.success("Creating optimized resume based on analysis");
    // In a real application, this would navigate to resume builder with pre-filled data
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="bg-primary-50 py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold">Resume Analyzer</h1>
            <p className="text-gray-500 mt-2">
              Get detailed insights and optimization suggestions for your resume
            </p>
          </div>
        </div>
      </div>
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
              <TabsTrigger value="upload">Upload Resume</TabsTrigger>
              <TabsTrigger value="results" disabled={!analysisData}>
                Analysis Results
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Upload Your Resume</h2>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                      <div className="mb-4 flex justify-center">
                        <div className="rounded-full bg-primary-100 p-3">
                          <Upload className="h-6 w-6 text-primary-700" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">
                          Drag and drop your resume or click to browse
                        </p>
                        <p className="text-xs text-gray-400">
                          Supports PDF, DOCX, TXT (Max 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        id="resume-upload"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.txt"
                        className="hidden"
                      />
                    </div>
                    {file && (
                      <div className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-md border">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary-600" />
                          <span className="text-sm truncate">{file.name}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => setFile(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Add Job Description</h2>
                      <span className="text-xs text-gray-400">Optional</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-description">
                        Paste the job description to optimize your resume for this specific role
                      </Label>
                      <Textarea
                        id="job-description"
                        placeholder="Paste job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleAnalyze}
                  disabled={!file || analyzing}
                  className="min-w-[120px]"
                >
                  {analyzing ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <>
                      Analyze Resume <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="results">
              {analysisData && <AnalyzerResults analysisData={analysisData} />}
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("upload")}>
                  Upload Different Resume
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleExportPDF}>
                    <FileUp className="mr-2 h-4 w-4" /> Download Analysis
                  </Button>
                  <Link to="/builder">
                    <Button onClick={handleCreateOptimizedResume}>
                      <FilePlus2 className="mr-2 h-4 w-4" /> Create Optimized Resume
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analyzer;
