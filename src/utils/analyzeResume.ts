
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Helper function to extract text from PDF files
async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      fullText += strings.join(' ') + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    // Fallback to basic text extraction
    return await file.text();
  }
}

// Helper function to extract text from DOCX files
async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    // For now, use basic text extraction as a fallback
    // In a production app, you could use a DOCX parser that works in the browser
    return await file.text();
  } catch (error) {
    console.error("Error extracting text from DOCX:", error);
    return await file.text();
  }
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
    const words = resumeContent.toLowerCase().split(/\s+/).filter(w => w.length > 1);
    const wordCount = words.length;
    
    // Count character frequency for content statistics
    const charCount = resumeContent.replace(/\s/g, '').length;
    
    // Common keywords to look for in resumes
    const skillKeywords = [
      "javascript", "react", "typescript", "node", "python", "java", "sql",
      "aws", "docker", "kubernetes", "agile", "scrum", "leadership",
      "project management", "communication", "problem solving", "teamwork",
      "analytical", "strategic", "innovation", "research", "development",
      "testing", "deployment", "design", "architecture", "data analysis"
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
    
    // Extract unique words from the resume for better matching
    const resumeWords = new Set(resumeContent.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 2)
    );

    // More sophisticated keyword matching that looks for partial matches
    const matched = allKeywords.filter(keyword => {
      // Check for exact keyword match
      if (resumeWords.has(keyword)) return true;
      
      // Check if any word in resumeWords contains this keyword
      return Array.from(resumeWords).some(word => word.includes(keyword));
    });
    
    const missing = allKeywords.filter(keyword => 
      !matched.includes(keyword)
    );

    // Calculate scores based on content analysis
    const overallScore = Math.min(100, Math.round(((matched.length / allKeywords.length) * 70) + 
      (Math.min(wordCount, 500) / 500 * 30))); // Word count factor up to 500 words
      
    const atsScore = Math.min(100, Math.round(((matched.length / allKeywords.length) * 80) + 
      (Math.min(wordCount, 400) / 400 * 20))); // ATS puts more emphasis on keywords

    // Detect experience level based on content
    const experienceLevel = detectExperienceLevel(resumeContent);
    
    // Calculate section completeness
    const sections = [
      {
        name: "Contact Information",
        score: calculateSectionScore(resumeContent, "contact", hasContactInfo(resumeContent)),
        feedback: hasContactInfo(resumeContent) 
          ? "Contact information is present and well-formatted."
          : "Some contact information might be missing. Ensure you include email, phone, and location.",
        status: hasContactInfo(resumeContent) ? "good" as const : "warning" as const
      },
      {
        name: "Professional Summary",
        score: calculateSectionScore(resumeContent, "summary", hasSummary(resumeContent)),
        feedback: hasSummary(resumeContent)
          ? "Professional summary is present but could be more impactful."
          : "Consider adding a strong professional summary at the beginning of your resume.",
        status: hasSummary(resumeContent) ? "good" as const : "warning" as const
      },
      {
        name: "Work Experience",
        score: calculateSectionScore(resumeContent, "experience", hasWorkExperience(resumeContent)),
        feedback: hasWorkExperience(resumeContent)
          ? `Work experience section includes ${hasQuantifiableAchievements(resumeContent) ? "good quantifiable achievements" : "details but could use more quantifiable achievements"}.`
          : "Work experience section needs more detailed descriptions of your roles and achievements.",
        status: hasWorkExperience(resumeContent) ? "good" as const : "error" as const
      },
      {
        name: "Education",
        score: calculateSectionScore(resumeContent, "education", hasEducation(resumeContent)),
        feedback: hasEducation(resumeContent)
          ? "Education section is well-structured."
          : "Consider adding more details to your education section.",
        status: hasEducation(resumeContent) ? "good" as const : "warning" as const
      },
      {
        name: "Skills",
        score: Math.round((matched.length / Math.max(5, allKeywords.length)) * 100),
        feedback: matched.length > 5
          ? "Good range of skills listed, but consider adding more industry-specific keywords."
          : "Consider expanding your skills section with more relevant technologies and soft skills.",
        status: matched.length > 5 ? "good" as const : "warning" as const
      }
    ];

    // Content statistics
    const contentStats = {
      wordCount,
      charCount,
      experienceLevel,
      avgSentenceLength: calculateAverageSentenceLength(resumeContent),
      readabilityScore: calculateReadabilityScore(resumeContent)
    };

    // Generate relevant suggestions
    const suggestions = generateSuggestions(resumeContent, matched, missing, contentStats, jobDescription);

    return {
      overallScore,
      atsCompatibility: atsScore,
      keywordMatches: {
        matched,
        missing,
      },
      sections,
      suggestions,
      contentStats,
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

function hasQuantifiableAchievements(content: string): boolean {
  const quantifiablePatterns = [
    /%/,
    /increased|decreased|reduced|improved|grew|expanded/i,
    /\d+\s*(percent|%)/i,
    /\$\s*\d+/
  ];
  
  return quantifiablePatterns.some(pattern => pattern.test(content));
}

function calculateSectionScore(content: string, sectionType: string, hasSection: boolean): number {
  if (!hasSection) return 40; // Base score if section missing
  
  let score = 70; // Base score if section exists
  
  // Add points for section quality
  switch (sectionType) {
    case "contact":
      if (/linkedin\.com/i.test(content)) score += 10;
      if (/github\.com/i.test(content)) score += 10;
      break;
    case "summary":
      if (content.toLowerCase().includes("years of experience")) score += 10;
      if (/skilled|expertise|proficient/i.test(content)) score += 10;
      break;
    case "experience":
      if (hasQuantifiableAchievements(content)) score += 15;
      if (/led|managed|coordinated/i.test(content)) score += 10;
      break;
    case "education":
      if (/gpa|honors|cum laude/i.test(content)) score += 10;
      if (/certification|course|training/i.test(content)) score += 10;
      break;
  }
  
  return Math.min(100, score);
}

function detectExperienceLevel(content: string): string {
  const yearsPattern = /(\d+)\+?\s*years?\s*(?:of)?\s*experience/i;
  const match = content.match(yearsPattern);
  
  if (match) {
    const years = parseInt(match[1], 10);
    if (years < 2) return "Entry Level";
    if (years < 5) return "Mid Level";
    if (years < 10) return "Senior Level";
    return "Executive Level";
  }
  
  // If no explicit years mentioned, try to infer from content
  if (/senior|lead|principal|architect|manager|director|head/i.test(content)) {
    return "Senior Level or Higher";
  }
  
  if (/junior|entry|intern|assistant|associate/i.test(content)) {
    return "Entry Level";
  }
  
  return "Unknown (No experience indicators found)";
}

function calculateAverageSentenceLength(content: string): number {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length === 0) return 0;
  
  const totalWords = sentences.reduce((count, sentence) => {
    return count + sentence.split(/\s+/).filter(w => w.length > 0).length;
  }, 0);
  
  return Math.round(totalWords / sentences.length);
}

function calculateReadabilityScore(content: string): number {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/).filter(w => w.length > 0);
  
  if (sentences.length === 0 || words.length === 0) return 0;
  
  // Simple readability calculation based on average words per sentence
  // Lower is generally better, but with a bottom threshold
  const avgWordsPerSentence = words.length / sentences.length;
  
  if (avgWordsPerSentence < 8) return 70; // Too short/choppy
  if (avgWordsPerSentence > 25) return 60; // Too long/complex
  
  // Sweet spot is 12-18 words per sentence
  if (avgWordsPerSentence >= 12 && avgWordsPerSentence <= 18) {
    return 95;
  }
  
  // Scale between thresholds
  return avgWordsPerSentence < 12 
    ? 70 + (avgWordsPerSentence - 8) * (25 / 4) // Scale between 8-12 words
    : 95 - (avgWordsPerSentence - 18) * (35 / 7); // Scale between 18-25 words
}

function generateSuggestions(
  content: string, 
  matched: string[], 
  missing: string[], 
  stats: any,
  jobDescription?: string
): string[] {
  const suggestions: string[] = [];

  // Keyword-based suggestions
  if (missing.length > 0) {
    const relevantMissing = missing.slice(0, 5);
    suggestions.push(`Consider adding these relevant keywords: ${relevantMissing.join(", ")}`);
  }

  // Content-based suggestions
  if (!hasContactInfo(content)) {
    suggestions.push("Add complete contact information including email, phone, and location");
  }

  if (!hasSummary(content)) {
    suggestions.push("Add a compelling professional summary at the beginning of your resume");
  }

  // Length-based suggestions
  if (stats.wordCount < 300) {
    suggestions.push("Your resume is quite brief. Consider adding more details to your experience and achievements");
  } else if (stats.wordCount > 700) {
    suggestions.push("Your resume is quite lengthy. Consider focusing on most relevant experiences and achievements");
  }

  // Achievement-based suggestion
  if (!hasQuantifiableAchievements(content)) {
    suggestions.push("Add quantifiable achievements (e.g., 'Increased sales by 25%', 'Reduced costs by $10K')");
  }

  // Readability-based suggestions
  if (stats.avgSentenceLength > 20) {
    suggestions.push("Consider shortening sentences for improved readability");
  }

  // Job description alignment suggestion
  if (jobDescription && matched.length < missing.length) {
    suggestions.push("Your resume could be better tailored to the job description. Align your experience with the job requirements");
  }

  // Structure and formatting suggestions
  if (!/^[A-Z]/.test(content)) {
    suggestions.push("Ensure each bullet point and sentence begins with a capital letter");
  }

  if (/I |my |me /i.test(content)) {
    suggestions.push("Avoid using first-person pronouns (I, me, my) in your resume");
  }

  // Return 5 suggestions at most to avoid overwhelming the user
  return suggestions.slice(0, 5);
}
