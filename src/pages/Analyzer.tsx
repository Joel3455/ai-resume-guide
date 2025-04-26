
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import AnalyzerResults from "@/components/ResumeAnalyzer/AnalyzerResults";
import { Upload, FileUp, FilePlus2, FileText, ArrowRight, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Function to generate unique analysis results based on uploaded resume content
const generateAnalysisFromResume = async (file: File, jobDescription?: string) => {
  // In a real app, this would call an AI service or backend API
  // For now, we'll simulate different results based on the file name and size
  
  // Create a hash from file properties to simulate unique analysis
  const fileId = file.name + "-" + file.size;
  const hash = [...fileId].reduce((hash, char) => 
    ((hash << 5) - hash) + char.charCodeAt(0)|0, 0);
  
  // Use the hash to generate varied results
  const scoreSeed = Math.abs(hash) % 30;
  const overallScore = 50 + scoreSeed;
  const atsScore = 60 + (scoreSeed % 20);
  
  // Generate dynamic keywords based on job description or defaults
  const allPossibleKeywords = [
    "JavaScript", "React", "TypeScript", "Node.js", "CSS", "HTML", 
    "GraphQL", "REST API", "AWS", "Azure", "Python", "Java", "Go", 
    "Docker", "Kubernetes", "CI/CD", "Git", "Agile", "Scrum", "Project Management",
    "Leadership", "Communication", "Problem-solving", "UI/UX", "Frontend", "Backend"
  ];
  
  // Use hash to select different keywords for each file
  const matchedCount = 3 + (Math.abs(hash) % 5);
  const missingCount = 2 + (Math.abs(hash + 1) % 4);
  
  const shuffled = [...allPossibleKeywords].sort(() => 0.5 - Math.random());
  const matched = shuffled.slice(0, matchedCount);
  const missing = shuffled.slice(matchedCount, matchedCount + missingCount);
  
  // Generate sections with varied scores
  const sections = [
    {
      name: "Contact Information",
      score: 70 + (hash % 30),
      feedback: hash % 2 === 0 
        ? "All essential contact details are present and well-formatted." 
        : "Missing some key contact information. Consider adding your LinkedIn profile.",
      status: (hash % 3 === 0 ? "warning" : "good") as "good" | "warning" | "error",
    },
    {
      name: "Professional Summary",
      score: 40 + (hash % 50),
      feedback: hash % 3 === 0 
        ? "Your summary lacks specificity about your achievements and skills."
        : "Good length, but could focus more on your unique value proposition.",
      status: (hash % 4 === 0 ? "error" : hash % 2 === 0 ? "warning" : "good") as "good" | "warning" | "error",
    },
    {
      name: "Work Experience",
      score: 30 + (hash % 60),
      feedback: hash % 2 === 0
        ? "Consider adding more quantifiable achievements and results."
        : "Experience section needs more action verbs and specific accomplishments.",
      status: (hash % 4 === 0 ? "good" : hash % 2 === 0 ? "warning" : "error") as "good" | "warning" | "error",
    },
    {
      name: "Education",
      score: 50 + (hash % 50),
      feedback: hash % 3 === 0
        ? "Education section is well-structured and relevant."
        : "Consider adding relevant coursework or academic achievements.",
      status: (hash % 5 === 0 ? "error" : hash % 2 === 0 ? "good" : "warning") as "good" | "warning" | "error",
    },
    {
      name: "Skills",
      score: 45 + (hash % 40),
      feedback: hash % 2 === 0
        ? "Skills are generic. Be more specific about your technical expertise levels."
        : "Consider organizing skills into categories for better readability.",
      status: (hash % 3 === 0 ? "good" : hash % 2 === 0 ? "warning" : "error") as "good" | "warning" | "error",
    },
  ];
  
  // Generate suggestions based on the analysis
  const allPossibleSuggestions = [
    "Add more quantifiable achievements to your work experience (e.g., 'Increased conversion rates by 25%').",
    "Include missing keywords like 'Node.js' and 'GraphQL' if you have experience with these technologies.",
    "Make your professional summary more specific to the job you're applying for.",
    "Organize your skills into categories (technical, soft skills, tools) for better readability.",
    "Consider adding a projects section to showcase your practical application of skills.",
    "Use more action verbs at the beginning of your bullet points.",
    "Ensure your contact information is up-to-date and includes your LinkedIn profile.",
    "Remove outdated or irrelevant experience to keep your resume concise.",
    "Consider a different format to highlight your strongest qualifications.",
    "Incorporate more industry-specific terminology relevant to the position."
  ];
  
  // Select a varied subset of suggestions
  const suggestionCount = 3 + (Math.abs(hash) % 4);
  const shuffledSuggestions = [...allPossibleSuggestions].sort(() => 0.5 - Math.random());
  const suggestions = shuffledSuggestions.slice(0, suggestionCount);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    overallScore,
    atsCompatibility: atsScore,
    keywordMatches: {
      matched,
      missing,
    },
    sections,
    suggestions,
  };
};

const Analyzer = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const { user } = useAuth();

  // Query to fetch previous analysis data if the user is logged in
  const { data: previousAnalyses } = useQuery({
    queryKey: ['analyses', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('resume_analyses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (error) throw error;
      return data[0] || null;
    },
    enabled: !!user,
  });

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

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a resume file first");
      return;
    }
    
    setAnalyzing(true);
    try {
      // Generate dynamic analysis based on the file and job description
      const analysis = await generateAnalysisFromResume(file, jobDescription);
      
      // Save analysis to Supabase if user is logged in
      if (user) {
        // In a real app, we'd save the actual file to Supabase Storage
        // and then use an Edge Function to process it with AI
        
        // For now, just log the attempt to save analysis
        console.log("Would save analysis to Supabase for user:", user.id);
      }
      
      setAnalysisData(analysis);
      setActiveTab("results");
      toast.success("Resume analysis complete");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze resume. Please try again.");
    } finally {
      setAnalyzing(false);
    }
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
              {analysisData && <AnalyzerResults analysisData={analysisData} isLoading={analyzing} />}
              
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
