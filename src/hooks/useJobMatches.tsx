
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface JobMatch {
  id: string;
  job_posting_id: string;
  resume_analysis_id: string;
  match_score: number;
  skill_matches: string[];
  missing_skills: string[];
  recommendations: string[];
  created_at: string;
}

export function useJobMatches() {
  const queryClient = useQueryClient();

  const { data: jobMatches, isLoading } = useQuery({
    queryKey: ["jobMatches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_matches")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobMatch[];
    },
  });

  const createJobMatch = useMutation({
    mutationFn: async (match: Omit<JobMatch, "id" | "created_at" | "user_id">) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("job_matches")
        .insert({
          ...match,
          user_id: session.session.user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobMatches"] });
      toast.success("Job match created successfully");
    },
    onError: () => {
      toast.error("Failed to create job match");
    },
  });

  return {
    jobMatches,
    isLoading,
    createJobMatch,
  };
}
