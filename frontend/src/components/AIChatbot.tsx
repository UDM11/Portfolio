import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, User, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  actions?: { label: string; value: string }[];
}

export const AIChatbot = () => {
  const location = useLocation();
  
  // Hide chatbot on admin dashboard pages
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const profileImg = "https://jivvormqzmqjwehkqpne.supabase.co/storage/v1/object/public/project-images/profile.jpg";

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "Hi! I am Umesh's AI Assistant. Ask me anything about his skills, projects, experience, or how to contact him directly!",
          timestamp: new Date(),
          actions: [
            { label: "🚀 Core Projects", value: "projects" },
            { label: "⚡ Key Tech Skills", value: "skills" },
            { label: "📞 Get Contact Info", value: "contact" },
            { label: "🎓 Education & Experience", value: "experience" }
          ]
        }
      ]);
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const newMsg: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(textToSend);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1200);
  };

  // Conversational response engine matching keywords
  const generateAIResponse = (input: string): Message => {
    const text = input.toLowerCase();
    const timestamp = new Date();

    // 1. Projects
    if (text.includes("project") || text.includes("work") || text.includes("build") || text.includes("make")) {
      return {
        sender: "bot",
        text: "Umesh has engineered several full-stack and AI applications. Here are some key projects:\n\n• **BCSITHub**: An online learning platform with dynamic resource sharing.\n• **Travel Assistant**: A smart trip planning assistant.\n• **Fast and Furies**: An interactive car showroom catalog.\n\nAll project data is dynamically managed via his custom FastAPI + Supabase backend!",
        timestamp,
        actions: [
          { label: "💬 View Contact", value: "contact" },
          { label: "⚡ Tech Skills", value: "skills" }
        ]
      };
    }

    // 2. Skills
    if (text.includes("skill") || text.includes("tech") || text.includes("language") || text.includes("code")) {
      return {
        sender: "bot",
        text: "Umesh is a multi-talented Full-Stack Developer with expertise in:\n\n• **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion.\n• **Backend**: Python, FastAPI, Node.js, Express, REST APIs.\n• **Databases**: Supabase, PostgreSQL, MongoDB, Vector DBs.\n• **AI Specialization**: LangChain, LLMs integration, WhatsApp API automation, and Custom AI Chatbots.",
        timestamp,
        actions: [
          { label: "📁 View Projects", value: "projects" },
          { label: "🎓 Experience Details", value: "experience" }
        ]
      };
    }

    // 3. Contact
    if (text.includes("contact") || text.includes("hire") || text.includes("email") || text.includes("mail") || text.includes("phone") || text.includes("call")) {
      return {
        sender: "bot",
        text: "You can reach out to Umesh directly using these details:\n\n• **Email**: darlamiumesh123@gmail.com\n• **WhatsApp**: +977 9863755744\n• **Location**: Kathmandu, Nepal\n\nFeel free to write to him on the contact section or directly click the green WhatsApp bubble on the bottom right!",
        timestamp,
        actions: [
          { label: "✉️ Send an Email", value: "email_link" },
          { label: "🎓 Experience", value: "experience" }
        ]
      };
    }

    // 4. Experience / Education
    if (text.includes("experience") || text.includes("education") || text.includes("study") || text.includes("college") || text.includes("bcsit")) {
      return {
        sender: "bot",
        text: "Here is Umesh's academic and development background:\n\n• **Education**: Currently pursuing BCSIT (Bachelor of Computer Science & Information Technology) at **Liberty College** (Kathmandu, Nepal).\n• **Work**: Freelance Full-Stack Developer & Chatbot Integrator specializing in automated business assistant chatbots and custom API structures.\n\nAll details are stored dynamically in the Supabase database.",
        timestamp,
        actions: [
          { label: "📁 Projects", value: "projects" },
          { label: "📞 Contact Info", value: "contact" }
        ]
      };
    }

    // 5. Email click fallback
    if (text === "email_link") {
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=darlamiumesh123@gmail.com", "_blank");
      return {
        sender: "bot",
        text: "Opening email client to mail darlamiumesh123@gmail.com. Let me know if you need anything else!",
        timestamp
      };
    }

    // 6. Generic Greeting
    if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text.includes("namaste")) {
      return {
        sender: "bot",
        text: "Hello! Hope you are doing great. How can I assist you in learning more about Umesh's skills and projects today?",
        timestamp,
        actions: [
          { label: "🚀 Core Projects", value: "projects" },
          { label: "⚡ Key Tech Skills", value: "skills" }
        ]
      };
    }

    // 7. Fallback Default
    return {
      sender: "bot",
      text: "I want to make sure I answer you accurately! Try asking me about his 'projects', 'tech skills', 'work experience', or 'how to contact him'.",
      timestamp,
      actions: [
        { label: "🚀 Projects List", value: "projects" },
        { label: "📞 Get Contact Info", value: "contact" }
      ]
    };
  };

  return (
    <>
      {/* Floating Chat Icon Button */}
      <motion.div
        className="fixed bottom-4 right-20 sm:right-24 z-[110]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => setIsOpen((prev) => !isOpen)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] border border-primary/20 relative overflow-hidden text-white"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <X className="h-6 w-6 text-white" key="close" />
              ) : (
                <MessageSquare className="h-6 w-6 text-white" key="open" />
              )}
            </AnimatePresence>
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-20 right-4 sm:right-24 w-[350px] sm:w-[380px] h-[500px] rounded-2xl border border-primary/20 bg-background/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden z-[120]"
          >
            {/* Header */}
            <div className="p-4 bg-muted/50 border-b border-border/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={profileImg}
                    alt="Umesh AI Avatar"
                    className="w-9 h-9 rounded-full object-cover border border-primary/30"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-background" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm text-foreground">Umesh Magar</h3>
                    <Sparkles className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">AI Portfolio Assistant</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                      msg.sender === "user" ? "bg-primary text-white" : "bg-muted border border-border/10"
                    }`}>
                      {msg.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5 text-primary" />}
                    </div>
                    <div className="space-y-2">
                      <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-muted/50 border border-border/10 rounded-tl-none text-foreground"
                      }`}>
                        {msg.text}
                      </div>

                      {/* Quick Action Suggestion Buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.actions.map((act) => (
                            <button
                              key={act.label}
                              onClick={() => handleSend(act.value)}
                              className="text-[10px] px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200 text-primary font-medium flex items-center gap-1"
                            >
                              {act.label}
                              <ArrowRight className="h-2.5 w-2.5" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Bot Typing Animation */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-6 h-6 rounded-full bg-muted border border-border/10 flex items-center justify-center">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="px-4 py-2.5 bg-muted/50 border border-border/10 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputText);
              }}
              className="p-3 bg-muted/30 border-t border-border/10 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything about Umesh..."
                className="flex-1 bg-muted/60 border border-border/20 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground"
              />
              <Button type="submit" size="icon" className="h-8 w-8 rounded-xl bg-primary text-white">
                <Send className="h-3.5 w-3.5 text-white" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
