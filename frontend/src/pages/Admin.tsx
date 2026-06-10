import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Edit, Trash2, LogIn, Lock, FileCode, CheckCircle, 
  ExternalLink, Github, ArrowLeft, Upload, Loader2, Sparkles, X, LayoutGrid, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Premium background particles
const BackgroundGrid = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.15),transparent_60%)]" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
  </div>
);

const API_BASE = "http://localhost:5000/api";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState<any[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formTech, setFormTech] = useState("");
  const [formCategory, setFormCategory] = useState("Web");
  const [formGithub, setFormGithub] = useState("");
  const [formDemo, setFormDemo] = useState("");
  const [formFeatures, setFormFeatures] = useState("");
  const [formStatus, setFormStatus] = useState("Completed");

  const [uploading, setUploading] = useState(false);

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchProjects();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (res.ok && data.authenticated) {
        localStorage.setItem("admin_token", data.token);
        setIsAuthenticated(true);
        fetchProjects();
      } else {
        setLoginError(data.detail || "Authentication failed");
      }
    } catch (err) {
      setLoginError("Could not connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };

  const fetchProjects = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setFetchLoading(false);
    }
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
        setFormImage(data.url);
      } else {
        alert("Upload failed. Make sure the storage bucket is public.");
      }
    } catch (err) {
      alert("Error connecting to upload API");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const projectPayload = {
      title: formTitle,
      description: formDesc,
      image: formImage,
      tech: formTech.split(",").map(t => t.trim()).filter(t => t),
      category: formCategory,
      github: formGithub,
      demo: formDemo,
      features: formFeatures.split("\n").map(f => f.trim()).filter(f => f),
      status: formStatus
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
        body: JSON.stringify(projectPayload)
      });

      if (res.ok) {
        closeForm();
        fetchProjects();
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.detail || "Failed to save project"}`);
      }
    } catch (err) {
      alert("Network error. Could not connect to API");
    } finally {
      setLoading(false);
    }
  };

  const openForm = (project: any = null) => {
    if (project) {
      setEditingId(project.id);
      setFormTitle(project.title);
      setFormDesc(project.description);
      setFormImage(project.image);
      setFormTech(project.tech.join(", "));
      setFormCategory(project.category);
      setFormGithub(project.github || "");
      setFormDemo(project.demo || "");
      setFormFeatures((project.features || []).join("\n"));
      setFormStatus(project.status);
    } else {
      setEditingId(null);
      setFormTitle("");
      setFormDesc("");
      setFormImage("");
      setFormTech("");
      setFormCategory("Web");
      setFormGithub("");
      setFormDemo("");
      setFormFeatures("");
      setFormStatus("Completed");
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      alert("Error connecting to API");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen flex flex-col justify-center items-center px-4">
        <BackgroundGrid />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="border-border/30 bg-card/60 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Lock className="text-primary h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold">Admin Portal Login</CardTitle>
              <CardDescription>Enter your password to manage your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Enter Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 border-primary/20"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-sm text-red-500 font-medium text-center">{loginError}</p>
                )}
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/95 text-white" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGrid />
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-24 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-border/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="text-primary h-5 w-5" />
                <span className="text-sm font-semibold tracking-wider uppercase text-primary">Admin Control Center</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Manage Your <span className="gradient-text">Projects</span></h1>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => openForm()} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white gap-2 shadow-lg">
                <Plus className="h-4 w-4" />
                Add New Project
              </Button>
              <Button variant="outline" onClick={handleLogout} className="border-red-500/20 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground">
                Logout
              </Button>
            </div>
          </div>

          {/* Project Management Table */}
          {fetchLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Fetching project list...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 bg-card/20 border border-dashed border-border/30 rounded-2xl">
              <LayoutGrid className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-1">No Projects Found</h3>
              <p className="text-muted-foreground mb-6">Create your first database project to show it off on your portfolio.</p>
              <Button onClick={() => openForm()} className="bg-primary hover:bg-primary/90">Add Project</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-card/40 border border-border/20 rounded-xl hover:border-primary/20 transition-all duration-300 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-border/20 bg-muted" 
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        <Badge variant="secondary" className="text-[10px] py-0">{project.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-xl line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tech.map((t: string) => (
                          <span key={t} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col md:flex-row items-center gap-2 w-full sm:w-auto justify-end">
                    <Button onClick={() => openForm(project)} variant="outline" size="sm" className="gap-1.5 flex-1 sm:flex-none">
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(project.id)} variant="outline" size="sm" className="gap-1.5 border-red-500/20 hover:bg-red-500/10 hover:text-red-500 text-red-500/80 flex-1 sm:flex-none">
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

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
              className="bg-card border border-border/50 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-border/10 bg-muted/40">
                <h2 className="text-xl font-bold">{editingId ? "Edit Project" : "Add New Project"}</h2>
                <Button variant="ghost" size="icon" onClick={closeForm} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Title *</label>
                    <Input value={formTitle} onChange={e => setFormTitle(e.target.value)} required placeholder="My Awesome Project" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Category *</label>
                    <select 
                      value={formCategory} 
                      onChange={e => setFormCategory(e.target.value)}
                      className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                    value={formDesc} 
                    onChange={e => setFormDesc(e.target.value)} 
                    required 
                    rows={3} 
                    className="w-full flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Provide a detailed description of the project..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Image *</label>
                  <div className="flex gap-2">
                    <Input 
                      value={formImage} 
                      onChange={e => setFormImage(e.target.value)} 
                      required 
                      placeholder="https://example.com/image.jpg" 
                      className="flex-1"
                    />
                    <div className="relative">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload} 
                        className="hidden" 
                        id="image-file-upload" 
                        disabled={uploading}
                      />
                      <label htmlFor="image-file-upload">
                        <Button type="button" variant="outline" className="gap-2 pointer-events-none" disabled={uploading}>
                          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          Upload
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Tech Stack (comma separated) *</label>
                    <Input value={formTech} onChange={e => setFormTech(e.target.value)} required placeholder="React, Tailwind, Supabase" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Status *</label>
                    <select 
                      value={formStatus} 
                      onChange={e => setFormStatus(e.target.value)}
                      className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">GitHub URL</label>
                    <Input value={formGithub} onChange={e => setFormGithub(e.target.value)} placeholder="https://github.com/..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Demo URL</label>
                    <Input value={formDemo} onChange={e => setFormDemo(e.target.value)} placeholder="https://..." />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Key Features (One feature per line)</label>
                  <textarea 
                    value={formFeatures} 
                    onChange={e => setFormFeatures(e.target.value)} 
                    rows={4} 
                    className="w-full flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-border/10">
                  <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
                  <Button type="submit" className="bg-primary text-white hover:bg-primary/90 px-8" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                    Save Project
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Admin;
