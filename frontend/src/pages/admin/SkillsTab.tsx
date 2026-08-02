import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Loader2, X, Check, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SkillsTabProps {
  items: any[];
  API_BASE: string;
  onRefresh: () => void;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({ items, API_BASE, onRefresh }) => {
  const { toast } = useToast();
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

      const token = localStorage.getItem("admin_token");
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        closeForm();
        onRefresh();
        toast({
          title: editingId ? "Category Updated" : "Category Created",
          description: `Successfully saved "${category}" skills list details.`,
        });
      } else {
        toast({
          title: "Error Saving Entry",
          description: "Something went wrong saving the details to the database.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Connection Failure",
        description: "Failed to communicate with database server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill category?")) return;

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/skills/${id}`, {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
      });

      if (res.ok) {
        onRefresh();
        toast({
          title: "Category Deleted",
          description: "Skills category and associated tokens deleted.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete timeline entry.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Connection Failure",
        description: "Communication failure with database server.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-border/60">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground font-outfit">Technical Skills Matrix</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage your core developer stack, tools, and platforms.</p>
        </div>
        <Button
          onClick={() => openForm()}
          className="bg-primary hover:bg-primary/95 text-white gap-2 rounded-xl shadow-lg shadow-primary/15 transition-all duration-300 font-semibold"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border rounded-2xl bg-card/45 backdrop-blur">
          <Code2 className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4 animate-pulse" />
          <h3 className="font-semibold text-foreground">No Skill Categories</h3>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
            Build parameters like Frontend, Backend, or Cloud DevOps categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="flex flex-col justify-between p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
            >
              {/* Card background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <Code2 className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-bold text-foreground text-base tracking-wide font-outfit">{item.category}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.skills.map((s: string) => (
                    <span
                      key={s}
                      className="text-[11px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full font-bold transition-transform duration-300 hover:scale-105 select-none"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Utility actions */}
              <div className="flex items-center justify-end gap-1.5 mt-5 pt-3 border-t border-border relative z-10">
                <Button 
                  onClick={() => openForm(item)} 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-lg h-8 w-8 hover:bg-muted text-muted-foreground hover:text-primary"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="ghost"
                  size="icon"
                  className="rounded-lg h-8 w-8 hover:bg-red-500/10 text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
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
            className="fixed -top-2 -bottom-2 -left-2 -right-2 z-[100] flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-border bg-muted/40">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground font-outfit">
                    {editingId ? "Edit Skill Group" : "Create Skill Group"}
                  </h2>
                  <p className="text-xs text-muted-foreground">Setup target category and individual technology tokens.</p>
                </div>
                <Button variant="ghost" size="icon" onClick={closeForm} className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Category Name *</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    placeholder="e.g., Frontend, Backend, Tools & Devops"
                    className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Skills Tokens (comma separated) *
                  </label>
                  <textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    required
                    rows={5}
                    placeholder="e.g., React, TypeScript, TailwindCSS, Next.js"
                    className="w-full flex rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Separate individual skills using commas. Example: <code>React, TypeScript, Node.js</code>
                  </p>
                </div>

                <div className="flex gap-3 justify-end pt-5 border-t border-border">
                  <Button type="button" variant="outline" onClick={closeForm} className="rounded-xl border-border hover:bg-muted text-foreground">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary text-white hover:bg-primary/90 px-8 rounded-xl shadow-lg shadow-primary/15 font-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Check className="h-4 w-4 mr-2" />
                    )}
                    Save Skills Matrix
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
