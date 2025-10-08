import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="w-8 h-8 text-primary glow-cyan animate-glow-pulse" />
            <span className="text-2xl font-bold text-gradient">FutureSelf</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/dashboard") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/simulator" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/simulator") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Simulator
            </Link>
            <Link 
              to="/profile" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/profile") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Profile
            </Link>
          </div>
          
          <Button 
            variant="outline" 
            className="border-primary/50 text-primary hover:bg-primary/10 hover:glow-cyan transition-all"
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
