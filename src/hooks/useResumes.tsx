
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Resume, ResumeData, isResumeData } from "@/types/resume";
import { toast } from "@/components/ui/sonner"; // Use sonner toast 
import { Json } from "@/integrations/supabase/types";

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

      // Convert the database response to Resume types with proper typing
      return data.map(item => ({
        ...item,
        content: item.content as unknown as ResumeData
      })) as Resume[];
    },
  });

  const createResume = useMutation({
    mutationFn: async ({ title, template_id, content }: { 
      title: string;
      template_id: string;
      content: ResumeData;
    }) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("resumes")
        .insert({
          title, 
          template_id, 
          content: content as unknown as Json,
          user_id: session.session.user.id
        })
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
    mutationFn: async ({ id, ...updateData }: { 
      id: string;
      title?: string;
      template_id?: string;
      content?: ResumeData;
    }) => {
      // Convert content to Json type for Supabase
      const supabaseUpdateData = {
        ...updateData,
        content: updateData.content ? (updateData.content as unknown as Json) : undefined
      };

      const { data, error } = await supabase
        .from("resumes")
        .update(supabaseUpdateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
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
