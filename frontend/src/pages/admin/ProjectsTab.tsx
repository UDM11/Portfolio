import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Loader2, X, Upload, Check, LayoutGrid, Eye, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ProjectsTabProps {
  items: any[];
  API_BASE: string;
  onRefresh: () => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ items, API_BASE, onRefresh }) => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);

  // Form Field States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tech, setTech] = useState("");
  const [category, setCategory] = useState("Web");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [features, setFeatures] = useState("");
  const [status, setStatus] = useState("Completed");

  const openForm = (item: any = null) => {
    if (item) {
      setEditingId(item.id);
      setTitle(item.title || "");
      setDescription(item.description || "");
      setImage(item.image || "");
      setTech(item.tech?.join(", ") || "");
      setCategory(item.category || "Web");
      setGithub(item.github || "");
      setDemo(item.demo || "");
      setFeatures(item.features?.join("\n") || "");
      setStatus(item.status || "Completed");
    } else {
      setEditingId(null);
      setTitle("");
      setDescription("");
      setImage("");
      setTech("");
      setCategory("Web");
      setGithub("");
      setDemo("");
      setFeatures("");
      setStatus("Completed");
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImage(data.url);
        toast({
          title: "Upload Successful",
          description: "Project screenshot successfully saved to Supabase storage.",
        });
      } else {
        toast({
          title: "Upload Failed",
          description: "Ensure Supabase 'project-images' storage bucket is public.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Upload Error",
        description: "Failed to connect to storage API.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAIGenerate = async () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a project title first before generating with AI.",
        variant: "destructive"
      });
      return;
    }

    setGeneratingAI(true);
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/ai/generate-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ title, description })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.description) setDescription(data.description);
        if (Array.isArray(data.tech)) setTech(data.tech.join(", "));
        if (Array.isArray(data.features)) setFeatures(data.features.join("\n"));
        toast({
          title: "AI Generation Success",
          description: "Populated description, tech badges, and key features."
        });
      } else {
        const errData = await res.json().catch(() => ({}));
        toast({
          title: "AI Generation Failed",
          description: errData.detail || "Failed to contact Gemini engine.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Communication with AI services failed.",
        variant: "destructive"
      });
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      description,
      image,
      tech: tech.split(",").map((t) => t.trim()).filter((t) => t),
      category,
      github,
      demo,
      features: features.split("\n").map((f) => f.trim()).filter((f) => f),
      status,
    };

    try {
      let url = `${API_BASE}/projects`;
      let method = "POST";

      if (editingId) {
        url = `${API_BASE}/projects/${editingId}`;
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
          title: editingId ? "Project Updated" : "Project Created",
          description: `Successfully saved "${title}" properties.`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save project settings.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Connection Error",
        description: "Communication with database failed.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
      });

      if (res.ok) {
        onRefresh();
        toast({
          title: "Project Deleted",
          description: "The project has been successfully deleted from your database.",
        });
      } else {
        toast({
          title: "Error",
          description: "Deletion failed.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Connection Failure",
        description: "Could not contact database server.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-border/60">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground font-outfit">Project Showcase</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage details of applications displayed on your public portfolio.</p>
        </div>
        <Button
          onClick={() => openForm()}
          className="bg-primary hover:bg-primary/95 text-white gap-2 rounded-xl shadow-lg shadow-primary/15 transition-all duration-300 font-semibold"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border rounded-2xl bg-card/45 backdrop-blur">
          <LayoutGrid className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4 animate-pulse" />
          <h3 className="font-semibold text-foreground">No Projects Found</h3>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
            Build parameters to showcase your applications.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="flex flex-col justify-between bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
            >
              {/* Image Preview */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-muted shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  item.status === "Completed"
                    ? "bg-emerald-500/90 text-white"
                    : "bg-amber-500/90 text-white"
                }`}>
                  {item.status || "Completed"}
                </span>
                <span className="absolute top-3 left-3 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-black/60 text-white border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground text-base tracking-wide font-outfit line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2">
                  {item.tech?.slice(0, 4).map((t: string) => (
                    <span key={t} className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-bold uppercase">
                      {t}
                    </span>
                  ))}
                  {item.tech?.length > 4 && (
                    <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-bold">
                      +{item.tech.length - 4} More
                    </span>
                  )}
                </div>
              </div>

              {/* Utility actions */}
              <div className="flex items-center gap-2 p-5 pt-3 border-t border-border bg-muted/20 relative z-10 shrink-0">
                {item.demo && (
                  <a 
                    href={item.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Live Demo"
                    className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300"
                  >
                    <Eye className="h-4.5 w-4.5" />
                  </a>
                )}
                {item.github && (
                  <a 
                    href={item.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="GitHub Repository"
                    className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300"
                  >
                    <Github className="h-4.5 w-4.5" />
                  </a>
                )}

                <div className="ml-auto flex items-center gap-1.5">
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
                    {editingId ? "Edit Project Details" : "Create Showcase Project"}
                  </h2>
                  <p className="text-xs text-muted-foreground">Setup target application screenshots and attributes.</p>
                </div>
                <Button variant="ghost" size="icon" onClick={closeForm} className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Title *</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="e.g., My Awesome Platform"
                      className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full flex h-10 rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      <option value="Web" className="bg-card text-foreground">Web Development</option>
                      <option value="App" className="bg-card text-foreground">Mobile App</option>
                      <option value="AI" className="bg-card text-foreground">AI / ML Solution</option>
                      <option value="Other" className="bg-card text-foreground">Other Category</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-muted-foreground">Description *</label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleAIGenerate}
                      disabled={generatingAI}
                      className="h-7 gap-1.5 text-xs text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg px-2.5 font-bold"
                    >
                      {generatingAI ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5" />
                      )}
                      Generate with AI
                    </Button>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={3}
                    placeholder="Describe key duties or applications details..."
                    className="w-full flex rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Image URL *</label>
                  <div className="flex gap-2">
                    <Input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      required
                      placeholder="e.g., https://link-to-screenshot.png"
                      className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50 flex-1"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="proj-file-up"
                        disabled={uploading}
                      />
                      <label htmlFor="proj-file-up">
                        <Button
                          type="button"
                          variant="outline"
                          className="gap-2 pointer-events-none rounded-xl border-border hover:bg-muted text-foreground"
                          disabled={uploading}
                        >
                          {uploading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="h-4 w-4" />
                          )}
                          Upload
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Tech Stack (comma separated) *</label>
                    <Input
                      value={tech}
                      onChange={(e) => setTech(e.target.value)}
                      required
                      placeholder="e.g., React, TailwindCSS, Supabase"
                      className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Status *</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full flex h-10 rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      <option value="Completed" className="bg-card text-foreground">Completed</option>
                      <option value="In Progress" className="bg-card text-foreground">In Progress</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">GitHub URL</label>
                    <Input
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/..."
                      className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Demo URL</label>
                    <Input
                      value={demo}
                      onChange={(e) => setDemo(e.target.value)}
                      placeholder="https://..."
                      className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Key Features (One feature per line)
                  </label>
                  <textarea
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    rows={3}
                    placeholder="Feature 1&#10;Feature 2"
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
