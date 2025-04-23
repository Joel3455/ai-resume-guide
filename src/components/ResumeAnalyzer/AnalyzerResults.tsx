
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnalyzerResultsProps {
  analysisData: {
    overallScore: number;
    atsCompatibility: number;
    keywordMatches: {
      matched: string[];
      missing: string[];
    };
    sections: {
      name: string;
      score: number;
      feedback: string;
      status: "good" | "warning" | "error";
    }[];
    suggestions: string[];
  };
}

const AnalyzerResults = ({ analysisData }: AnalyzerResultsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Overall Resume Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold">{analysisData.overallScore}%</span>
            <span className="text-sm text-gray-500 pb-1">Resume Effectiveness</span>
          </div>
          <Progress value={analysisData.overallScore} className="h-3" />
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">ATS Compatibility Score</span>
              <span className="font-semibold">{analysisData.atsCompatibility}%</span>
            </div>
            <Progress value={analysisData.atsCompatibility} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Keyword Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Matched Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {analysisData.keywordMatches.matched.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {keyword}
                  </Badge>
                ))}
                {analysisData.keywordMatches.matched.length === 0 && (
                  <p className="text-sm text-gray-500">No matched keywords found.</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {analysisData.keywordMatches.missing.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {keyword}
                  </Badge>
                ))}
                {analysisData.keywordMatches.missing.length === 0 && (
                  <p className="text-sm text-gray-500">No missing keywords identified.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Section Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisData.sections.map((section, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {section.status === "good" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {section.status === "warning" && (
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    )}
                    {section.status === "error" && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <h3 className="font-medium">{section.name}</h3>
                  </div>
                  <span className="font-semibold">{section.score}%</span>
                </div>
                <Progress value={section.score} className="h-2 mb-2" />
                <p className="text-sm text-gray-600">{section.feedback}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Improvement Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysisData.suggestions.map((suggestion, index) => (
              <li key={index} className="flex gap-2">
                <Info className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{suggestion}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyzerResults;
