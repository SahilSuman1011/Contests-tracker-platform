
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookmarkIcon, Code2, Settings, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui-custom/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors pattern-bg">
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? 
          "bg-white/90 dark:bg-tle-navy/95 backdrop-blur-lg shadow-md border-b border-opacity-50" : 
          "bg-transparent"
      )}>
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-tle-blue to-tle-lightblue rounded-lg p-1.5 transition-transform group-hover:scale-105">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading font-bold text-lg hidden sm:inline-block text-tle-navy dark:text-white">
                Contest Tracker
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            <Link to="/contests">
              <Button 
                variant={isActive("/contests") ? "default" : "ghost"} 
                className={cn(
                  "gap-2 rounded-full transition-all duration-200",
                  isActive("/contests") 
                    ? "bg-gradient-to-r from-tle-blue to-tle-lightblue hover:opacity-90 text-white" 
                    : "hover:text-tle-blue dark:hover:text-tle-lightblue"
                )}
                size="sm"
              >
                <Code2 className="h-4 w-4" />
                <span>Contests</span>
              </Button>
            </Link>
            
            <Link to="/bookmarks">
              <Button 
                variant={isActive("/bookmarks") ? "default" : "ghost"} 
                className={cn(
                  "gap-2 rounded-full transition-all duration-200",
                  isActive("/bookmarks") 
                    ? "bg-gradient-to-r from-tle-blue to-tle-lightblue hover:opacity-90 text-white" 
                    : "hover:text-tle-blue dark:hover:text-tle-lightblue"
                )}
                size="sm"
              >
                <BookmarkIcon className="h-4 w-4" />
                <span>Bookmarks</span>
              </Button>
            </Link>
            
            <Link to="/admin">
              <Button 
                variant={isActive("/admin") ? "default" : "ghost"} 
                className={cn(
                  "gap-2 rounded-full transition-all duration-200",
                  isActive("/admin") 
                    ? "bg-gradient-to-r from-tle-blue to-tle-lightblue hover:opacity-90 text-white" 
                    : "hover:text-tle-blue dark:hover:text-tle-lightblue"
                )}
                size="sm"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Button>
            </Link>
            
            <div className="border-l h-6 mx-2 border-border" />
            <ThemeToggle />
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-opacity-50",
          isMobileMenuOpen ? "max-h-[500px] border-border" : "max-h-0 border-transparent"
        )}>
          <div className="container px-4 py-4 flex flex-col gap-2 bg-background/95 backdrop-blur-lg">
            <Link to="/contests">
              <Button 
                variant={isActive("/contests") ? "default" : "ghost"} 
                className={cn(
                  "w-full justify-start gap-2 rounded-lg",
                  isActive("/contests") 
                    ? "bg-gradient-to-r from-tle-blue to-tle-lightblue hover:opacity-90 text-white" 
                    : ""
                )}
              >
                <Code2 className="h-4 w-4" />
                <span>Contests</span>
              </Button>
            </Link>
            
            <Link to="/bookmarks">
              <Button 
                variant={isActive("/bookmarks") ? "default" : "ghost"} 
                className={cn(
                  "w-full justify-start gap-2 rounded-lg",
                  isActive("/bookmarks") 
                    ? "bg-gradient-to-r from-tle-blue to-tle-lightblue hover:opacity-90 text-white" 
                    : ""
                )}
              >
                <BookmarkIcon className="h-4 w-4" />
                <span>Bookmarks</span>
              </Button>
            </Link>
            
            <Link to="/admin">
              <Button 
                variant={isActive("/admin") ? "default" : "ghost"} 
                className={cn(
                  "w-full justify-start gap-2 rounded-lg",
                  isActive("/admin") 
                    ? "bg-gradient-to-r from-tle-blue to-tle-lightblue hover:opacity-90 text-white" 
                    : ""
                )}
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-code-pattern opacity-5 pointer-events-none"></div>
        <div className={cn("container py-6 px-4 sm:px-8 mx-auto relative")}>
          {children}
        </div>
      </main>
      
      <footer className="border-t py-6 md:py-0 bg-white/90 dark:bg-tle-navy/90 backdrop-blur-md">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-8 md:h-16">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Contest Tracker
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/SahilSuman1011/Contests-tracker-platform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <Link 
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
