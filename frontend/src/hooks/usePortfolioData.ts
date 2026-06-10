import { useQuery, useMutation } from '@tanstack/react-query';

const API_BASE = import.meta.env.DEV ? "http://localhost:5000/api" : "/api";


// 1. Skills Hook
export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/skills`);
      if (!res.ok) throw new Error("Failed to fetch skills");
      const data = await res.json();
      return data || [];
    },
  });
}

// 2. Experience Hook
export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/experience`);
      if (!res.ok) throw new Error("Failed to fetch experience");
      const data = await res.json();
      return data || [];
    },
  });
}

// 3. Highlights Hook
export function useHighlights() {
  return useQuery({
    queryKey: ['highlights'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/highlights`);
      if (!res.ok) throw new Error("Failed to fetch highlights");
      const data = await res.json();
      
      // Mapping Lucide icons string to components will be done inside the page.
      // We just return raw database details.
      return data || [];
    },
  });
}

// 4. Contact Info Hook
export function useContactInfo() {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/contact-info`);
      if (!res.ok) throw new Error("Failed to fetch contact-info");
      const data = await res.json();
      return data || [];
    },
  });
}

// 5. Submit Message Mutation
export function useSendMessage() {
  return useMutation({
    mutationFn: async (messageData: { name: string; email: string; subject: string; message: string }) => {
      const res = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    }
  });
}
