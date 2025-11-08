import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-slate-200 dark:text-slate-700 -z-10 blur-sm">
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-slate-200">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md inline-block">
            {location.pathname}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="group">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Go Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="group">
            <button onClick={() => window.history.back()} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="relative mt-12">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
            <Search className="w-32 h-32 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
