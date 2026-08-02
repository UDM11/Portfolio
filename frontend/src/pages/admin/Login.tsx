import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, LogIn, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import profileImg from "@/assets/profile.webp";

interface LoginProps {
  API_BASE: string;
  onSuccess: (token: string) => void;
}

export const Login: React.FC<LoginProps> = ({ API_BASE, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.authenticated) {
        onSuccess(data.token);
      } else {
        setLoginError(data.detail || "Authentication failed");
      }
    } catch (err) {
      setLoginError("Could not connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        {/* Profile Avatar Header */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/40 shadow-xl mb-4 shrink-0">
          <img src={profileImg} alt="Umesh Darlami" className="w-full h-full object-cover" />
        </div>

        <Card className="w-full border-border bg-card/65 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center space-y-2 pb-4">
            <div className="mx-auto w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-1 text-primary border border-primary/20 shadow-inner">
              <Lock className="h-5 w-5" />
            </div>
            <CardTitle className="text-2xl font-extrabold font-outfit tracking-tight text-foreground">Admin Portal Login</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Enter admin credentials to access database control center.</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-border bg-background text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50 text-center tracking-wider text-base"
                  required
                />
              </div>
              
              {loginError && (
                <p className="text-xs text-red-500 font-bold text-center bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">{loginError}</p>
              )}
              
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white rounded-xl py-5 shadow-lg shadow-primary/15 font-semibold transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Access Dashboard
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 mt-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Return to Portfolio
        </Link>
      </motion.div>
    </div>
  );
};
