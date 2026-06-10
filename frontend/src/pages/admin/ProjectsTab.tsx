import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Loader2, X, Upload, Check, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ProjectsTabProps {
  items: any[];
  API_BASE: string;
  onRefresh: () => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ items, API_BASE, onRefresh }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImage(data.url);
      } else {
        alert("Upload failed. Ensure Supabase 'project-images' storage bucket is public.");
      }
    } catch (err) {
      alert("Error uploading file");
    } finally {
      setUploading(false);
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
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
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
        <h2 className="text-xl font-bold">Projects List</h2>
        <Button
          onClick={() => openForm()}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white gap-2 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border/30 rounded-2xl">
          <LayoutGrid className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">No projects found. Add one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-card/40 border border-border/20 rounded-xl hover:border-primary/20 gap-4 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg border bg-muted"
                />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge className="text-[9px] px-1 py-0">{item.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <Button onClick={() => openForm(item)} variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
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
                <h2 className="text-xl font-bold">{editingId ? "Edit Project" : "Create Project"}</h2>
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
                      placeholder="My Awesome Project"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="Web">Web Development</option>
                      <option value="App">Mobile App</option>
                      <option value="AI">AI / ML</option>
                      <option value="Other">Other</option>
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
                    className="w-full flex rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Describe the project..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Image URL *</label>
                  <div className="flex gap-2">
                    <Input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      required
                      placeholder="Image link"
                      className="flex-1"
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
                          className="gap-2 pointer-events-none"
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
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Tech Stack (comma separated) *
                    </label>
                    <Input
                      value={tech}
                      onChange={(e) => setTech(e.target.value)}
                      required
                      placeholder="React, Tailwind, Supabase"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Status *</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">GitHub URL</label>
                    <Input
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Demo URL</label>
                    <Input
                      value={demo}
                      onChange={(e) => setDemo(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Key Features (One feature per line)
                  </label>
                  <textarea
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    rows={3}
                    className="w-full flex rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Feature 1&#10;Feature 2"
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
