import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, User, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import profileImg from "@/assets/profile.webp";

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
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const API_BASE = (import.meta.env.VITE_API_BASE || "http://localhost:5000/api").replace(/\/$/, "");

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Handle email redirect command action
    if (textToSend === "email_link") {
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=darlamiumesh123@gmail.com", "_blank");
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Opening email client to mail darlamiumesh123@gmail.com. Let me know if you need anything else!",
          timestamp: new Date()
        }
      ]);
      return;
    }

    // Add user message
    const newMsg: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      const chatHistory = messages.map((m) => ({
        role: m.sender === "bot" ? "model" : "user",
        content: m.text
      }));

      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.response, timestamp: new Date() }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Sorry, I ran into an error connecting to my AI core. Please try again shortly.",
            timestamp: new Date()
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Connection failure. Ensure the backend server is running.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon Button */}
      <motion.div
        className="fixed bottom-[104px] right-4 sm:bottom-[80px] sm:right-4 z-[110]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Mobile Layout */}
        <div className="sm:hidden flex flex-col items-end gap-2">
          {/* Mobile Text */}
          <motion.div
            animate={{ y: [-1, 1, -1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-primary text-white px-2 py-1 rounded-md shadow-lg text-xs font-medium whitespace-nowrap">
              AI Assistant
            </div>
          </motion.div>
          
          {/* Mobile Button */}
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0 4px 20px rgba(14, 165, 233, 0.3)",
                "0 4px 30px rgba(14, 165, 233, 0.5)",
                "0 4px 20px rgba(14, 165, 233, 0.3)",
              ],
              y: [-1, 1, -1],
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="rounded-full"
          >
            <Button
              onClick={() => setIsOpen((prev) => !isOpen)}
              className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center border border-primary/20 relative overflow-hidden text-white"
            >
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{ scale: [0, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <X className="h-6 w-6 text-white relative z-10" key="close" />
                ) : (
                  <MessageSquare className="h-6 w-6 text-white relative z-10" key="open" />
                )}
              </AnimatePresence>
              <span className="absolute top-0 right-0 flex h-3 w-3 z-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center gap-3">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="bg-primary text-white px-3 py-2 rounded-lg shadow-lg relative"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm font-medium whitespace-nowrap text-white">
                    AI Assistant
                  </span>
                  <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-primary border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Button */}
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0 4px 20px rgba(14, 165, 233, 0.3)",
                "0 4px 30px rgba(14, 165, 233, 0.5)",
                "0 4px 20px rgba(14, 165, 233, 0.3)",
              ],
              y: [-1, 1, -1],
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="rounded-full"
          >
            <Button
              onClick={() => setIsOpen((prev) => !isOpen)}
              className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center border border-primary/20 relative overflow-hidden text-white"
            >
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{ scale: [0, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <X className="h-7 w-7 text-white relative z-10" key="close" />
                ) : (
                  <MessageSquare className="h-7 w-7 text-white relative z-10" key="open" />
                )}
              </AnimatePresence>
              <span className="absolute top-0 right-0 flex h-3 w-3 z-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-[160px] right-4 sm:bottom-[144px] sm:right-4 w-[calc(100vw-32px)] sm:w-[380px] h-[500px] rounded-2xl border border-primary/20 bg-background/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden z-[120]"
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
