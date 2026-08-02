import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Edit, Trash2, Loader2, X, Check, Mail, Sparkles, 
  Copy, ExternalLink 
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ContactInfoTabProps {
  items: any[];
  API_BASE: string;
  onRefresh: () => void;
}

const AVAILABLE_ICONS = [
  "Mail", "Phone", "MapPin", "Globe", "MessageSquare", "Github", 
  "Linkedin", "Twitter", "Instagram", "Facebook", "Send", "Award"
];

const renderIconByName = (name: string) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />;
};

export const ContactInfoTab: React.FC<ContactInfoTabProps> = ({ items, API_BASE, onRefresh }) => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form Field States
  const [iconName, setIconName] = useState("Mail");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [href, setHref] = useState("");

  const openForm = (item: any = null) => {
    if (item) {
      setEditingId(item.id);
      setIconName(item.icon_name || "Mail");
      setTitle(item.title || "");
      setValue(item.value || "");
      setHref(item.href || "");
    } else {
      setEditingId(null);
      setIconName("Mail");
      setTitle("");
      setValue("");
      setHref("");
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Value Copied",
      description: `"${text}" copied to your clipboard.`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      icon_name: iconName,
      title,
      value,
      href,
    };

    try {
      let url = `${API_BASE}/contact-info`;
      let method = "POST";

      if (editingId) {
        url = `${API_BASE}/contact-info/${editingId}`;
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
          title: editingId ? "Item Updated" : "Item Created",
          description: `Successfully saved "${title}" link contact settings.`,
        });
      } else {
        toast({
          title: "Error Saving Details",
          description: "Something went wrong saving the contact configuration.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Connection Failure",
        description: "Could not connect to database API.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact item?")) return;

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/contact-info/${id}`, {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
      });

      if (res.ok) {
        onRefresh();
        toast({
          title: "Item Deleted",
          description: "Successfully removed connection parameters from database.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete record.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Connection Failure",
        description: "Failed to establish a connection to database.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-border/60">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground font-outfit">Contact Info Parameters</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage details showing in footer and contact panels.</p>
        </div>
        <Button
          onClick={() => openForm()}
          className="bg-primary hover:bg-primary/95 text-white gap-2 rounded-xl shadow-lg shadow-primary/15 transition-all duration-300 font-semibold"
        >
          <Plus className="h-4 w-4" />
          Add Parameter
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border rounded-2xl bg-card/45 backdrop-blur">
          <Mail className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4 animate-pulse" />
          <h3 className="font-semibold text-foreground">No Contact Channels</h3>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
            Build parameters like Email, Location, or LinkedIn links so users can get in touch with you.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="flex flex-col justify-between p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
            >
              {/* Dynamic card backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0 shadow-inner">
                    {renderIconByName(item.icon_name || item.icon)}
                  </div>
                  <BadgeIcon title={item.title} />
                </div>
                
                <div>
                  <h3 className="font-bold text-foreground text-base tracking-wide font-outfit">{item.title}</h3>
                  <p className="text-xs text-foreground font-mono break-all mt-1.5 bg-muted/60 p-2.5 rounded-xl border border-border">{item.value}</p>
                </div>
              </div>

              {/* Utility actions */}
              <div className="flex items-center gap-2 mt-5 pt-3 border-t border-border relative z-10">
                <Button 
                  onClick={() => copyToClipboard(item.value)} 
                  variant="ghost" 
                  size="icon" 
                  title="Copy value" 
                  className="rounded-lg h-8 w-8 hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                
                {item.href && (
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Test Link"
                    className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300"
                  >
                    <ExternalLink className="h-4 w-4" />
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
                    {editingId ? "Edit Contact Channel" : "Add Contact Channel"}
                  </h2>
                  <p className="text-xs text-muted-foreground">Setup target routes and branding markers.</p>
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
                      placeholder="e.g., Email, GitHub, Phone"
                      className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Icon *</label>
                    <div className="flex gap-2">
                      <select
                        value={iconName}
                        onChange={(e) => setIconName(e.target.value)}
                        className="flex-1 flex h-10 rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      >
                        {AVAILABLE_ICONS.map((icon) => (
                          <option key={icon} value={icon} className="bg-card text-foreground">
                            {icon}
                          </option>
                        ))}
                      </select>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        {renderIconByName(iconName)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Display Value *</label>
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    placeholder="e.g., darlamiumesh123@gmail.com, Kathmandu, Nepal"
                    className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Action Link Href *
                  </label>
                  <Input
                    value={href}
                    onChange={(e) => setHref(e.target.value)}
                    required
                    placeholder="e.g., mailto:darlamiumesh123@gmail.com, https://github.com/UDM11"
                    className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Include URL prefix protocols: <code>mailto:</code> for email, <code>tel:</code> for phone numbers, <code>https://</code> for websites.
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
                    Save Parameters
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

// Helper badge component
const BadgeIcon: React.FC<{ title: string }> = ({ title }) => {
  const isSocial = ["github", "linkedin", "twitter", "instagram", "facebook"].includes(title.toLowerCase());
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
      isSocial 
        ? "bg-accent/15 text-accent border border-accent/25" 
        : "bg-primary/15 text-primary border border-primary/25"
    }`}>
      {isSocial ? "Social Link" : "Direct Contact"}
    </span>
  );
};
