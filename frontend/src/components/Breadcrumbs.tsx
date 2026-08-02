import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface BreadcrumbPath {
  name: string;
  url: string;
}

export function Breadcrumbs() {
  const location = useLocation();
  const [paths, setPaths] = useState<BreadcrumbPath[]>([]);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbPaths: BreadcrumbPath[] = pathnames.map((value, index) => {
      const url = `/${pathnames.slice(0, index + 1).join("/")}`;
      // Capitalize first letter and format name
      const name = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
      return { name, url };
    });
    setPaths(breadcrumbPaths);
  }, [location]);

  if (paths.length === 0) return null;

  // Generate Google BreadcrumbList JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://umeshdarlami.com.np"
      },
      ...paths.map((path, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": path.name,
        "item": `https://umeshdarlami.com.np${path.url}`
      }))
    ]
  };

  return (
    <>
      {/* Schema injection for search engines */}
      <script type="application/ld+json" id="breadcrumbs-schema">
        {JSON.stringify(schema)}
      </script>

      <nav aria-label="Breadcrumb" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-4">
        <motion.ol
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground"
        >
          <li className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-1.5 hover:text-primary transition-colors duration-300 group"
              aria-label="Home"
            >
              <Home className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>

          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            return (
              <li key={path.url} className="flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                {isLast ? (
                  <span className="text-foreground font-semibold px-2 py-0.5 rounded bg-primary/10 border border-primary/20" aria-current="page">
                    {path.name}
                  </span>
                ) : (
                  <Link
                    to={path.url}
                    className="hover:text-primary transition-colors duration-300 hover:underline"
                  >
                    {path.name}
                  </Link>
                )}
              </li>
            );
          })}
        </motion.ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
