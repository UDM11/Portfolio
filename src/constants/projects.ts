import bcsthub from '@/assets/bcsithub.jpg';
import travelAssistant from '@/assets/travel_assistant.jpg';
import fastAndFuries from '@/assets/fast_and_furies.jpg';
import ltgAdminPanel from '@/assets/ltg_admin.jpg';

export const projects = [
  {
    title: "BCSITHub Online Learning Platform",
    description: "A full-featured online learning platform with courses, notes, past papers, student/admin dashboards, and secure access.",
    image: bcsthub,
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    category: "Web",
    github: "https://github.com/UDM11/BCSITHub_Website",
    demo: "https://bcsithub.web.app",
    features: ["Course and notes management", "past papers repository", "student/teacher/admin dashboards", "secure OTP login", "advanced search/filtering"],
    status: "Completed",
  },
  {
    title: "Travel Assistant System",
    description: "Smart travel assistant with itinerary planning, real-time updates, and multi-platform support.",
    image: travelAssistant,
    tech: ["Python", "LangChain", "OpenAI API", "FastAPI", "React"],
    category: "AI",
    github: "https://github.com/UDM11/Travel_Assistant_System",
    demo: "",
    features: ["Itinerary Planning", "Flight & Hotel Booking", "Real-Time Updates", "Interactive Chatbot", "Location-Based Suggestions", "Notifications & Reminders", "User Profiles", "Analytics Dashboard"],
    status: "Completed",
  },
  {
    title: "Fast and Furies Car Showroom",
    description: "Dynamic car showroom platform with vehicle listings, real-time availability, interactive user experience, and AI-powered chatbot assistance.",
    image: fastAndFuries,
    tech: ["Python", "LangChain", "OpenAI API", "FastAPI", "express", "React", "ai-chatbot"],
    category: "AI",
    github: "",
    demo: "",
    features: ["Chatbot Assistance", "Vehicle Listings", "Maintenance", "Services", "Real-Time Availability", "User-Friendly Interface", "Interactive Experience", "AI-Powered Features"],
    status: "In Progress",
  },
  {
    title: "LTG admin panel",
    description: "LTG admin panel which includes all the features like admin dashboard, tasks management, interns management, certificate management etc.",
    image: ltgAdminPanel,
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Express", "Firebase", "backendless"],
    category: "Web",
    github: "https://github.com/UDM11/LTG_admin_Panel",
    demo: "https://ltg-admin-b325a.web.app/",
    features: ["Admin dashboard", "Tasks management", "Interns management", "Certificate management", "Secure login"],
    status: "Completed",
  },
];

export const categories = ["All", "Web", "App", "UI/UX", "AI"];