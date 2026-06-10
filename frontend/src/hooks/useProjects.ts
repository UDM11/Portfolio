import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { projects as staticProjects } from '@/constants/projects';

export interface DBProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  github?: string;
  demo?: string;
  features?: string[];
  status: string;
  created_at?: string;
}

export function useProjects() {
  return useQuery<DBProject[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    // Fallback to static projects if Supabase fetch fails or credentials aren't set
    initialData: staticProjects as any,
  });
}
