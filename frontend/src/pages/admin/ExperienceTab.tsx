import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Loader2, X, Check, Briefcase, GraduationCap, Calendar, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ExperienceTabProps {
  items: any[];
  API_BASE: string;
  onRefresh: () => void;
}

export const ExperienceTab: React.FC<ExperienceTabProps> = ({ items, API_BASE, onRefresh }) => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form Field States
  const [type, setType] = useState("experience");
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");

  const openForm = (item: any = null) => {
    if (item) {
      setEditingId(item.id);
      setType(item.type || "experience");
      setTitle(item.title || "");
      setOrganization(item.organization || "");
      setPeriod(item.period || "");
      setDescription(item.description || "");
    } else {
      setEditingId(null);
      setType("experience");
      setTitle("");
      setOrganization("");
      setPeriod("");
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
      type,
      title,
      organization,
      period,
      description,
    };

    try {
      let url = `${API_BASE}/experience`;
      let method = "POST";

      if (editingId) {
        url = `${API_BASE}/experience/${editingId}`;
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
          title: editingId ? "Timeline Item Updated" : "Timeline Item Created",
          description: `Successfully saved "${title}" under ${type}.`,
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
    if (!confirm("Are you sure you want to delete this timeline item?")) return;

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/experience/${id}`, {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
      });

      if (res.ok) {
        onRefresh();
        toast({
          title: "Item Deleted",
          description: "Timeline record has been successfully deleted.",
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
          <h2 className="text-xl font-bold tracking-tight text-foreground font-outfit">Work & Education Timeline</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage your career experience and academic details.</p>
        </div>
        <Button
          onClick={() => openForm()}
          className="bg-primary hover:bg-primary/95 text-white gap-2 rounded-xl shadow-lg shadow-primary/15 transition-all duration-300 font-semibold"
        >
          <Plus className="h-4 w-4" />
          Add Timeline Event
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border rounded-2xl bg-card/45 backdrop-blur">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4 animate-pulse" />
          <h3 className="font-semibold text-foreground">No Timeline Items</h3>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
            Build parameters like developer positions or degree qualifications.
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
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 ${
                    item.type === "education"
                      ? "bg-blue-500/15 text-blue-600 border border-blue-500/25"
                      : "bg-emerald-500/15 text-emerald-600 border border-emerald-500/25"
                  }`}>
                    {item.type === "education" ? (
                      <GraduationCap className="h-3 w-3 shrink-0" />
                    ) : (
                      <Briefcase className="h-3 w-3 shrink-0" />
                    )}
                    {item.type}
                  </span>

                  <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.period}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-base tracking-wide font-outfit">{item.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-1">
                    <Building className="h-3.5 w-3.5 shrink-0" />
                    <span>{item.organization}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-3 bg-muted/30 p-3 rounded-xl border border-border">{item.description}</p>
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
                    {editingId ? "Edit Timeline Event" : "Create Timeline Event"}
                  </h2>
                  <p className="text-xs text-muted-foreground">Setup target category and details.</p>
                </div>
                <Button variant="ghost" size="icon" onClick={closeForm} className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Type *</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full flex h-10 rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      <option value="experience" className="bg-card text-foreground">Experience (Job)</option>
                      <option value="education" className="bg-card text-foreground">Education (School/College)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Period *</label>
                    <Input
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      required
                      placeholder="e.g., 2024 - Present"
                      className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Title *</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="e.g., Software Engineer, BCSIT Student"
                      className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Organization *</label>
                    <Input
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      required
                      placeholder="e.g., Liberty College"
                      className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe duties, courses, or achievements..."
                    className="w-full flex rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50"
                  />
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
