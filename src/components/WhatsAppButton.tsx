import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

const WhatsAppButton = () => {
  const whatsappNumber = "+9779863755744";
  const message = "Hi! I'm interested in discussing a project with you.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-[110]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
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
          <div className="bg-green-500 text-white px-2 py-1 rounded-md shadow-lg text-xs font-medium">
            WhatsApp me
          </div>
        </motion.div>
        
        {/* Mobile Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <motion.div
            className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            animate={{
              boxShadow: [
                "0 4px 20px rgba(34, 197, 94, 0.3)",
                "0 4px 30px rgba(34, 197, 94, 0.5)",
                "0 4px 20px rgba(34, 197, 94, 0.3)",
              ],
              y: [-1, 1, -1],
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              animate={{ scale: [0, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <MessageCircle className="h-6 w-6 text-white relative z-10" />
          </motion.div>
        </motion.a>
      </div>

      {/* Desktop Text - Left of button */}
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
                className="bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg relative"
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-medium whitespace-nowrap text-white">
                  WhatsApp me
                </span>
                <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-green-500 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Button */}
        <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <motion.div
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          animate={{
            boxShadow: [
              "0 4px 20px rgba(34, 197, 94, 0.3)",
              "0 4px 30px rgba(34, 197, 94, 0.5)",
              "0 4px 20px rgba(34, 197, 94, 0.3)",
            ],
            y: [-1, 1, -1],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{ scale: [0, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white relative z-10" />
        </motion.div>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default WhatsAppButton;