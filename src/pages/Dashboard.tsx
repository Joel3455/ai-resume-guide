
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Edit, Download } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Link } from "react-router-dom";
import { useResumes } from "@/hooks/useResumes";
import { toast } from "sonner";

const Dashboard = () => {
  const { resumes, isLoading, deleteResume } = useResumes();
  
  const handleDeleteResume = async (id: string) => {
    try {
      await deleteResume.mutateAsync(id);
      toast.success("Resume deleted successfully");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };
  
  const handleDownloadResume = (id: string) => {
    toast.success("Resume would be downloaded as PDF in a real application");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="bg-primary-50 py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-gray-500 mt-2">
              Manage your resumes and track your job applications
            </p>
          </div>
        </div>
      </div>
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Resumes</h2>
            <Link to="/builder">
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Create New Resume
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
            </div>
          ) : resumes && resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-gray-100 p-2">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{resume.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(resume.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadResume(resume.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Link to={`/builder?resume=${resume.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteResume(resume.id)}
                      disabled={deleteResume.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No resumes yet</h3>
              <p className="mt-1 text-gray-500">
                Create your first resume to get started
              </p>
              <Link to="/builder">
                <Button className="mt-4">Create Resume</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
