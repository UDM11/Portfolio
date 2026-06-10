import { useQuery } from '@tanstack/react-query';

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

const API_BASE = import.meta.env.DEV ? "http://localhost:5000/api" : "/api";


export function useProjects() {
  return useQuery<DBProject[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      return data || [];
    },
  });
}
