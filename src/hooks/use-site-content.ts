import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type SiteContent = Record<string, string>;

export function useSiteContent() {
  return useQuery({
    queryKey: ["site-content"],
    queryFn: async (): Promise<SiteContent> => {
      const { data, error } = await supabase
        .from("site_content")
        .select("key, value");
      if (error) throw error;
      const map: SiteContent = {};
      (data as any[])?.forEach((row: { key: string; value: string }) => {
        map[row.key] = row.value;
      });
      return map;
    },
    staleTime: 1000 * 60 * 5,
  });
}

/** Parse a JSON content key safely */
export function parseJson<T>(content: SiteContent | undefined, key: string, fallback: T): T {
  if (!content?.[key]) return fallback;
  try {
    return JSON.parse(content[key]) as T;
  } catch {
    return fallback;
  }
}

export function useUpdateSiteContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from("site_content")
        .update({ value })
        .eq("key", key);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site-content"] }),
  });
}

export function useUploadSiteImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, file }: { key: string; file: File }) => {
      const ext = file.name.split(".").pop();
      const path = `${key}.${ext}`;
      
      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(path);

      const { error: dbError } = await supabase
        .from("site_images")
        .upsert({ key, url: urlData.publicUrl } as any, { onConflict: "key" });
      if (dbError) throw dbError;

      return urlData.publicUrl;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site-images"] }),
  });
}

export function useSiteImages() {
  return useQuery({
    queryKey: ["site-images"],
    queryFn: async (): Promise<Record<string, string>> => {
      const { data, error } = await supabase
        .from("site_images")
        .select("key, url");
      if (error) throw error;
      const map: Record<string, string> = {};
      (data as any[])?.forEach((row: { key: string; url: string }) => {
        map[row.key] = row.url;
      });
      return map;
    },
    staleTime: 1000 * 60 * 5,
  });
}
