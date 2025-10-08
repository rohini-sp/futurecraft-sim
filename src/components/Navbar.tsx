import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully logged out.",
    });
    navigate("/");
  };
  
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
            {user && (
              <>
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
              </>
            )}
          </div>
          
          {user ? (
            <Button 
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary/10 hover:glow-cyan transition-all"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary/10 hover:glow-cyan transition-all"
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
