import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import AnalyzerResults from "@/components/ResumeAnalyzer/AnalyzerResults";
import { Upload, FileUp, FilePlus2, FileText, ArrowRight, X, Briefcase } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { generateAnalysisFromResume } from "@/utils/analyzeResume";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import CreateJobPosting from "@/components/JobPosting/CreateJobPosting";
import { useJobPostings } from "@/hooks/useJobPostings";

export default function Analyzer() {
  const [activeTab, setActiveTab] = useState("upload");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const { user } = useAuth();
  const { jobPostings } = useJobPostings();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

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
    
    if (!user) {
      toast.error("Please sign in to analyze resumes");
      return;
    }
    
    setAnalyzing(true);
    try {
      const analysis = await generateAnalysisFromResume(file, jobDescription);
      
      const { data, error } = await supabase
        .from('resume_analyses')
        .insert({
          overall_score: analysis.overallScore,
          ats_compatibility: analysis.atsCompatibility,
          keyword_matches: analysis.keywordMatches,
          sections: analysis.sections,
          suggestions: analysis.suggestions,
          resume_id: null,
          user_id: user.id
        })
        .select()
        .single();
        
      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }

      if (selectedJobId && data) {
        const selectedJob = jobPostings?.find(job => job.id === selectedJobId);
        if (selectedJob) {
          const { error: matchError } = await supabase
            .from('job_matches')
            .insert({
              user_id: user.id,
              job_posting_id: selectedJobId,
              resume_analysis_id: data.id,
              match_score: analysis.overallScore,
              skill_matches: analysis.keywordMatches.matched || [],
              missing_skills: analysis.keywordMatches.missing || [],
              recommendations: analysis.suggestions
            });

          if (matchError) {
            console.error("Error creating job match:", matchError);
            toast.error("Failed to create job match");
          } else {
            toast.success("Resume matched against job posting successfully");
          }
        }
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
                      <h2 className="text-xl font-semibold">Compare with Job</h2>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Briefcase className="mr-2 h-4 w-4" />
                            Post New Job
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <h2 className="text-lg font-semibold mb-4">Create Job Posting</h2>
                          <CreateJobPosting />
                        </SheetContent>
                      </Sheet>
                    </div>
                    
                    {jobPostings && jobPostings.length > 0 ? (
                      <div className="space-y-4">
                        {jobPostings.map((job) => (
                          <div
                            key={job.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedJobId === job.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50"
                            }`}
                            onClick={() => {
                              setSelectedJobId(job.id);
                              setJobDescription(job.description);
                            }}
                          >
                            <h3 className="font-medium">{job.title}</h3>
                            <p className="text-sm text-gray-500">{job.company}</p>
                            {job.location && (
                              <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium">No job postings yet</h3>
                        <p className="mt-1 text-gray-500">
                          Create a job posting to match against resumes
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="job-description">
                        Job Description {selectedJobId && "(Auto-filled from selected job)"}
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
}
