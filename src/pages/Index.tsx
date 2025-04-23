
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, PieChart, Search, CheckCircle } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    AI-Powered Resume Builder & Analyzer
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Create ATS-optimized resumes with intelligent analysis and tailored suggestions to land your dream job.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/builder">
                    <Button className="bg-primary-700 hover:bg-primary-800">
                      Build Your Resume
                    </Button>
                  </Link>
                  <Link to="/analyzer">
                    <Button variant="outline">
                      Analyze Your Resume
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full md:h-[420px]">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="relative w-[280px] md:w-[350px]">
                      <div className="absolute -left-4 -top-4 h-[350px] w-[280px] rounded-lg bg-primary-100 md:h-[420px] md:w-[350px]"></div>
                      <div className="absolute -right-4 -top-8 h-[350px] w-[280px] rounded-lg bg-accent-amber-100 md:h-[420px] md:w-[350px]"></div>
                      <div className="relative h-[350px] w-[280px] overflow-hidden rounded-lg border border-border bg-white shadow-lg md:h-[420px] md:w-[350px]">
                        <div className="p-6">
                          <div className="mb-4 h-6 w-24 rounded bg-primary-200"></div>
                          <div className="mb-6 h-4 w-full rounded bg-gray-100"></div>
                          <div className="mb-3 h-3 w-3/4 rounded bg-gray-100"></div>
                          <div className="mb-3 h-3 w-full rounded bg-gray-100"></div>
                          <div className="mb-3 h-3 w-5/6 rounded bg-gray-100"></div>
                          <div className="mb-6 h-3 w-3/4 rounded bg-gray-100"></div>
                          <div className="mb-4 h-5 w-32 rounded bg-primary-200"></div>
                          <div className="mb-3 h-3 w-full rounded bg-gray-100"></div>
                          <div className="mb-3 h-3 w-3/4 rounded bg-gray-100"></div>
                          <div className="mb-6 h-3 w-5/6 rounded bg-gray-100"></div>
                          <div className="mb-4 h-5 w-32 rounded bg-primary-200"></div>
                          <div className="mb-3 h-3 w-full rounded bg-gray-100"></div>
                          <div className="mb-3 h-3 w-5/6 rounded bg-gray-100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Powerful Features
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl">
                Everything you need to create a professional, ATS-optimized resume that stands out.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary-100 p-3">
                  <FileText className="h-6 w-6 text-primary-700" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Resume Builder</h3>
                <p className="text-gray-500">
                  Create professional resumes with our intuitive, step-by-step builder and multiple templates.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-accent-amber-100 p-3">
                  <PieChart className="h-6 w-6 text-accent-amber-700" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">ATS Analysis</h3>
                <p className="text-gray-500">
                  Get detailed feedback on ATS compatibility and optimization suggestions for your resume.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-accent-teal-100 p-3">
                  <Search className="h-6 w-6 text-accent-teal-700" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Job Matching</h3>
                <p className="text-gray-500">
                  Compare your resume against job descriptions to identify gaps and optimize for specific roles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl">
                Our simple process helps you create an optimized resume in minutes.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="relative flex flex-col items-center rounded-lg bg-white p-6 shadow-sm">
                <div className="absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-white">
                  1
                </div>
                <h3 className="mt-4 mb-2 text-xl font-semibold">Choose a Template</h3>
                <p className="text-center text-gray-500">
                  Select from our collection of professional, ATS-friendly resume templates.
                </p>
              </div>
              <div className="relative flex flex-col items-center rounded-lg bg-white p-6 shadow-sm">
                <div className="absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-white">
                  2
                </div>
                <h3 className="mt-4 mb-2 text-xl font-semibold">Add Your Content</h3>
                <p className="text-center text-gray-500">
                  Fill in your details with our guided form and get AI-powered content suggestions.
                </p>
              </div>
              <div className="relative flex flex-col items-center rounded-lg bg-white p-6 shadow-sm">
                <div className="absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-white">
                  3
                </div>
                <h3 className="mt-4 mb-2 text-xl font-semibold">Optimize & Download</h3>
                <p className="text-center text-gray-500">
                  Review AI analysis, apply optimization suggestions, and download your perfect resume.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-800 py-16 md:py-24 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Ready to Land Your Dream Job?
                  </h2>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Start building your professional resume today and get noticed by employers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/builder">
                    <Button className="bg-white text-primary-800 hover:bg-gray-100">
                      Get Started Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent-amber-300" />
                  <p className="text-lg">ATS-optimized templates</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent-amber-300" />
                  <p className="text-lg">AI-powered content suggestions</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent-amber-300" />
                  <p className="text-lg">Detailed resume analysis</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent-amber-300" />
                  <p className="text-lg">Job description matching</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-accent-amber-300" />
                  <p className="text-lg">Multiple export formats</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
