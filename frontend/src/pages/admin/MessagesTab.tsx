import React from "react";
import { 
  Trash2, MessageSquare, AlertCircle, Mail, Clock, 
  CornerUpLeft, Copy, User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MessagesTabProps {
  items: any[];
  API_BASE: string;
  onRefresh: () => void;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({ items, API_BASE, onRefresh }) => {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/messages/${id}`, {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
      });

      if (res.ok) {
        onRefresh();
        toast({
          title: "Message Deleted",
          description: "The message has been permanently removed from your inbox database.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete message.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Connection Failure",
        description: "Failed to establish a connection to the server.",
        variant: "destructive",
      });
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast({
      title: "Email Copied",
      description: `"${email}" copied to your clipboard.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-border/60">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground font-outfit">Inbox Messages</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Read and manage queries sent through your portfolio form.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border rounded-2xl bg-card/45 backdrop-blur">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4 animate-pulse" />
          <h3 className="font-semibold text-foreground">Inbox is Empty</h3>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
            When visitors submit your website's contact form, their queries will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col p-5 sm:p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all duration-300 relative group"
            >
              {/* Card Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm sm:text-base font-outfit tracking-wide">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                      <span>{item.email}</span>
                      <button 
                        onClick={() => copyEmail(item.email)}
                        className="p-1 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-all"
                        title="Copy Email"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-muted/60 p-2 rounded-xl border border-border">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{item.created_at ? new Date(item.created_at).toLocaleString() : "Date Unknown"}</span>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-primary text-xs font-semibold">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>Subject: {item.subject || "No Subject Specified"}</span>
                </div>
                
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap bg-muted/30 p-4 rounded-xl border border-border">
                  {item.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-5 pt-3 border-t border-border">
                <a
                  href={`mailto:${item.email}?subject=RE: ${item.subject || "Portfolio Query"}&body=Hi ${item.name},%0D%0A%0D%0AThank you for reaching out via my portfolio. ...`}
                  className="inline-flex h-9 items-center justify-center gap-2 px-4 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-semibold shadow-lg shadow-primary/15 transition-all duration-300"
                >
                  <CornerUpLeft className="h-3.5 w-3.5" />
                  Reply Email
                </a>

                <div className="ml-auto">
                  <Button
                    onClick={() => handleDelete(item.id)}
                    variant="ghost"
                    size="icon"
                    className="rounded-lg h-9 w-9 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all duration-300"
                    title="Delete Message"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
