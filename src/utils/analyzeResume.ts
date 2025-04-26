
// Helper function to extract text from PDF files
async function extractTextFromPDF(file: File): Promise<string> {
  // For now we'll just read as text, in a real app you'd use a PDF parsing library
  return await file.text();
}

// Helper function to extract text from DOCX files
async function extractTextFromDOCX(file: File): Promise<string> {
  // For now we'll just read as text, in a real app you'd use a DOCX parsing library
  return await file.text();
}

export async function generateAnalysisFromResume(file: File, jobDescription?: string): Promise<any> {
  try {
    // Extract text content from the resume file
    let resumeContent = '';
    if (file.type === 'application/pdf') {
      resumeContent = await extractTextFromPDF(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      resumeContent = await extractTextFromDOCX(file);
    } else {
      // Fallback to plain text
      resumeContent = await file.text();
    }

    // Basic content analysis
    const words = resumeContent.toLowerCase().split(/\s+/);
    const wordCount = words.length;
    
    // Common keywords to look for in resumes
    const skillKeywords = [
      "javascript", "react", "typescript", "node", "python", "java", "sql",
      "aws", "docker", "kubernetes", "agile", "scrum", "leadership",
      "project management", "communication", "problem solving"
    ];

    // Job description keywords if provided
    let jobKeywords: string[] = [];
    if (jobDescription) {
      jobKeywords = jobDescription.toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 3) // Filter out short words
        .filter((word, index, self) => self.indexOf(word) === index); // Remove duplicates
    }

    // Find matched and missing keywords
    const allKeywords = [...new Set([...skillKeywords, ...jobKeywords])];
    const matched = allKeywords.filter(keyword => 
      resumeContent.toLowerCase().includes(keyword)
    );
    const missing = allKeywords.filter(keyword => 
      !resumeContent.toLowerCase().includes(keyword)
    );

    // Calculate scores based on content analysis
    const overallScore = Math.min(100, Math.round((matched.length / allKeywords.length) * 100));
    const atsScore = Math.min(100, Math.round((wordCount / 400) * 100)); // Assuming 400 words is optimal

    // Analyze different sections
    const sections = [
      {
        name: "Contact Information",
        score: hasContactInfo(resumeContent) ? 90 : 60,
        feedback: hasContactInfo(resumeContent) 
          ? "Contact information is present and well-formatted."
          : "Some contact information might be missing. Ensure you include email, phone, and location.",
        status: hasContactInfo(resumeContent) ? "good" as const : "warning" as const
      },
      {
        name: "Professional Summary",
        score: hasSummary(resumeContent) ? 85 : 50,
        feedback: hasSummary(resumeContent)
          ? "Professional summary is present but could be more impactful."
          : "Consider adding a strong professional summary at the beginning of your resume.",
        status: hasSummary(resumeContent) ? "good" as const : "warning" as const
      },
      {
        name: "Work Experience",
        score: hasWorkExperience(resumeContent) ? 80 : 40,
        feedback: hasWorkExperience(resumeContent)
          ? "Work experience section includes key details but could use more quantifiable achievements."
          : "Work experience section needs more detailed descriptions of your roles and achievements.",
        status: hasWorkExperience(resumeContent) ? "good" as const : "error" as const
      },
      {
        name: "Education",
        score: hasEducation(resumeContent) ? 90 : 60,
        feedback: hasEducation(resumeContent)
          ? "Education section is well-structured."
          : "Consider adding more details to your education section.",
        status: hasEducation(resumeContent) ? "good" as const : "warning" as const
      },
      {
        name: "Skills",
        score: (matched.length / allKeywords.length) * 100,
        feedback: matched.length > 5
          ? "Good range of skills listed, but consider adding more industry-specific keywords."
          : "Consider expanding your skills section with more relevant technologies and soft skills.",
        status: matched.length > 5 ? "good" as const : "warning" as const
      }
    ];

    // Generate relevant suggestions
    const suggestions = generateSuggestions(resumeContent, matched, missing);

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
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Failed to analyze resume");
  }
}

// Helper functions for section analysis
function hasContactInfo(content: string): boolean {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;
  return emailRegex.test(content) || phoneRegex.test(content);
}

function hasSummary(content: string): boolean {
  const summaryKeywords = ["summary", "objective", "profile", "about"];
  return summaryKeywords.some(keyword => 
    content.toLowerCase().includes(keyword)
  );
}

function hasWorkExperience(content: string): boolean {
  const experienceKeywords = ["experience", "work history", "employment", "career"];
  return experienceKeywords.some(keyword => 
    content.toLowerCase().includes(keyword)
  );
}

function hasEducation(content: string): boolean {
  const educationKeywords = ["education", "university", "college", "degree", "diploma"];
  return educationKeywords.some(keyword => 
    content.toLowerCase().includes(keyword)
  );
}

function generateSuggestions(content: string, matched: string[], missing: string[]): string[] {
  const suggestions: string[] = [];

  if (missing.length > 0) {
    suggestions.push(`Consider adding these missing keywords: ${missing.slice(0, 3).join(", ")}`);
  }

  if (!hasContactInfo(content)) {
    suggestions.push("Add complete contact information including email, phone, and location");
  }

  if (!hasSummary(content)) {
    suggestions.push("Add a compelling professional summary at the beginning of your resume");
  }

  if (content.length < 2000) {
    suggestions.push("Your resume might be too short. Consider adding more details to your experience and achievements");
  }

  if (!content.includes("%") && !content.includes("increased") && !content.includes("decreased")) {
    suggestions.push("Add quantifiable achievements (e.g., 'Increased sales by 25%')");
  }

  return suggestions;
}
