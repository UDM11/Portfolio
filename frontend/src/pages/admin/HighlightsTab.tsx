import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Loader2, X, Check, Lightbulb, Sparkles } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HighlightsTabProps {
  items: any[];
  API_BASE: string;
  onRefresh: () => void;
}

const AVAILABLE_ICONS = [
  "GraduationCap", "Code2", "Lightbulb", "Mail", "Phone", "MapPin", 
  "Globe", "Star", "Award", "Briefcase", "BookOpen", "MessageSquare", "Settings"
];

const renderIconByName = (name: string) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />;
};

export const HighlightsTab: React.FC<HighlightsTabProps> = ({ items, API_BASE, onRefresh }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form Field States
  const [iconName, setIconName] = useState("GraduationCap");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const openForm = (item: any = null) => {
    if (item) {
      setEditingId(item.id);
      setIconName(item.icon_name || "GraduationCap");
      setTitle(item.title || "");
      setDescription(item.description || "");
    } else {
      setEditingId(null);
      setIconName("GraduationCap");
      setTitle("");
      setDescription("");
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      icon_name: iconName,
      title,
      description,
    };

    try {
      let url = `${API_BASE}/highlights`;
      let method = "POST";

      if (editingId) {
        url = `${API_BASE}/highlights/${editingId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        closeForm();
        onRefresh();
      } else {
        alert("Failed to save entry");
      }
    } catch (err) {
      alert("Error sending update to database");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this highlight?")) return;

    try {
      const res = await fetch(`${API_BASE}/highlights/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onRefresh();
      } else {
        alert("Deletion failed");
      }
    } catch (err) {
      alert("Connection failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">About Highlights List</h2>
        <Button
          onClick={() => openForm()}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white gap-2 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Add New Highlight
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border/30 rounded-2xl">
          <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">No highlights found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-card/40 border border-border/20 rounded-xl hover:border-primary/20 gap-4 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {renderIconByName(item.icon_name || item.icon)}
                </div>
                <div>
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => openForm(item)} variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="outline"
                  size="sm"
                  className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border/50 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-border/10 bg-muted/40">
                <h2 className="text-xl font-bold">{editingId ? "Edit Highlight" : "Create Highlight"}</h2>
                <Button variant="ghost" size="icon" onClick={closeForm} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Title *</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="Education"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Icon *</label>
                    <select
                      value={iconName}
                      onChange={(e) => setIconName(e.target.value)}
                      className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {AVAILABLE_ICONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={3}
                    className="w-full flex rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Brief summary highlight description..."
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-border/10">
                  <Button type="button" variant="outline" onClick={closeForm}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary text-white hover:bg-primary/90 px-8"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Check className="h-4 w-4 mr-2" />
                    )}
                    Save Details
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
