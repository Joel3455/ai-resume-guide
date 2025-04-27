
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface JobPosting {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location?: string;
  salary_range?: string;
  created_at: string;
  user_id: string;
}

export function useJobPostings() {
  const queryClient = useQueryClient();

  const { data: jobPostings, isLoading } = useQuery({
    queryKey: ["jobPostings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobPosting[];
    },
  });

  const createJobPosting = useMutation({
    mutationFn: async (posting: Omit<JobPosting, "id" | "created_at" | "user_id">) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("job_postings")
        .insert({
          ...posting,
          user_id: session.session.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] });
      toast.success("Job posting created successfully");
    },
    onError: () => {
      toast.error("Failed to create job posting");
    },
  });

  return {
    jobPostings,
    isLoading,
    createJobPosting,
  };
}
