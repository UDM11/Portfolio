import React from "react";
import { Trash2, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessagesTabProps {
  items: any[];
  API_BASE: string;
  onRefresh: () => void;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({ items, API_BASE, onRefresh }) => {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`${API_BASE}/messages/${id}`, {
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
        <h2 className="text-xl font-bold">Inbox Messages</h2>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border/30 rounded-2xl">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-semibold text-lg mb-1">No Messages Yet</h3>
          <p className="text-muted-foreground text-sm">
            When visitors submit your contact form, their queries will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-6 bg-card/40 border border-border/20 rounded-xl relative hover:border-red-500/10 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/10 pb-3 mb-3">
                <div>
                  <span className="font-semibold text-base text-foreground mr-2">{item.name}</span>
                  <span className="text-xs text-muted-foreground">({item.email})</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {item.created_at ? new Date(item.created_at).toLocaleString() : ""}
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" />
                  Subject: {item.subject}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {item.message}
                </p>
              </div>
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-red-500/15 hover:text-red-500 rounded-full h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
