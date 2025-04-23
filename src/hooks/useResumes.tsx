
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Resume, ResumeData } from "@/types/resume";
import { toast } from "sonner";

export function useResumes() {
  const queryClient = useQueryClient();

  const { data: resumes, isLoading } = useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch resumes");
        throw error;
      }

      return data as Resume[];
    },
  });

  const createResume = useMutation({
    mutationFn: async ({ title, template_id, content }: { 
      title: string;
      template_id: string;
      content: ResumeData;
    }) => {
      const { data, error } = await supabase
        .from("resumes")
        .insert([{ title, template_id, content }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume created successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to create resume");
      console.error("Error creating resume:", error);
    },
  });

  const updateResume = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Resume> & { id: string }) => {
      const { data: updatedResume, error } = await supabase
        .from("resumes")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return updatedResume;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume updated successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to update resume");
      console.error("Error updating resume:", error);
    },
  });

  const deleteResume = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume deleted successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete resume");
      console.error("Error deleting resume:", error);
    },
  });

  return {
    resumes,
    isLoading,
    createResume,
    updateResume,
    deleteResume,
  };
}
