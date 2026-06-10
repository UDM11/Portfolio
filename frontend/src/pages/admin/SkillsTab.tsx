import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Loader2, X, Check, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SkillsTabProps {
  items: any[];
  API_BASE: string;
  onRefresh: () => void;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({ items, API_BASE, onRefresh }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form Field States
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");

  const openForm = (item: any = null) => {
    if (item) {
      setEditingId(item.id);
      setCategory(item.category || "");
      setSkills(item.skills?.join(", ") || "");
    } else {
      setEditingId(null);
      setCategory("");
      setSkills("");
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
      category,
      skills: skills.split(",").map((s) => s.trim()).filter((s) => s),
    };

    try {
      let url = `${API_BASE}/skills`;
      let method = "POST";

      if (editingId) {
        url = `${API_BASE}/skills/${editingId}`;
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
    if (!confirm("Are you sure you want to delete this skill category?")) return;

    try {
      const res = await fetch(`${API_BASE}/skills/${id}`, {
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
        <h2 className="text-xl font-bold">Skills List</h2>
        <Button
          onClick={() => openForm()}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white gap-2 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Add New Category
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border/30 rounded-2xl">
          <Code2 className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">No skills categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-card/40 border border-border/20 rounded-xl hover:border-primary/20 gap-4 transition-all duration-300"
            >
              <div>
                <h3 className="font-bold text-lg mb-1">{item.category}</h3>
                <div className="flex flex-wrap gap-1">
                  {item.skills.map((s: string) => (
                    <span
                      key={s}
                      className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold"
                    >
                      {s}
                    </span>
                  ))}
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
                <h2 className="text-xl font-bold">{editingId ? "Edit Category" : "Create Category"}</h2>
                <Button variant="ghost" size="icon" onClick={closeForm} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Category Name *</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    placeholder="Frontend, Backend, etc."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Skills (comma separated) *
                  </label>
                  <textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    required
                    rows={4}
                    className="w-full flex rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="React, TypeScript, CSS"
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
