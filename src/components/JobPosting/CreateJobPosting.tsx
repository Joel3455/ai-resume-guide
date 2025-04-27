
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useJobPostings } from "@/hooks/useJobPostings";
import { useAuth } from "@/hooks/useAuth";

export default function CreateJobPosting() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [requirements, setRequirements] = useState("");
  
  const { createJobPosting } = useJobPostings();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const requirementsArray = requirements
      .split("\n")
      .map(req => req.trim())
      .filter(req => req.length > 0);

    await createJobPosting.mutateAsync({
      title,
      company,
      description,
      location,
      salary_range: salaryRange,
      requirements: requirementsArray,
    });

    // Reset form
    setTitle("");
    setCompany("");
    setDescription("");
    setLocation("");
    setSalaryRange("");
    setRequirements("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements (one per line)</Label>
        <Textarea
          id="requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Bachelor's degree in Computer Science
3+ years of experience with React
Strong communication skills"
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location (Optional)</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Salary Range (Optional)</Label>
          <Input
            id="salary"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            placeholder="e.g. $80,000 - $100,000"
          />
        </div>
      </div>

      <Button type="submit" disabled={createJobPosting.isPending}>
        {createJobPosting.isPending ? "Creating..." : "Create Job Posting"}
      </Button>
    </form>
  );
}
