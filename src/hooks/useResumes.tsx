
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Resume, ResumeData, isResumeData } from "@/types/resume";
import { toast } from "sonner";
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

      // Type-safe conversion from database records to Resume[]
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
    mutationFn: async ({ id, title, template_id, content }: { 
      id: string;
      title?: string;
      template_id?: string;
      content?: ResumeData;
    }) => {
      const updateData: any = {};
      
      if (title !== undefined) updateData.title = title;
      if (template_id !== undefined) updateData.template_id = template_id;
      if (content !== undefined) updateData.content = content as unknown as Json;
      
      const { data: updatedResume, error } = await supabase
        .from("resumes")
        .update(updateData)
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
