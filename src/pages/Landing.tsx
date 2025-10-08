import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Brain, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8 inline-block">
            <Sparkles className="w-20 h-20 text-primary mx-auto mb-4 glow-cyan animate-float" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Explore Your Future,
            <br />
            One Choice at a Time
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-2xl mx-auto">
            Simulate life decisions with AI-powered insights. Visualize outcomes, 
            gain wisdom, and make confident choices for your future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/simulator">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan text-lg px-8 py-6 transition-all hover:scale-105"
              >
                Get Started
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:glow-violet text-lg px-8 py-6 transition-all hover:scale-105"
            >
              Login
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-primary/20 hover:border-primary/40 transition-all hover:glow-cyan">
              <Brain className="w-12 h-12 text-primary mb-4 glow-cyan" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">AI Simulation</h3>
              <p className="text-foreground/70">
                Advanced AI models predict outcomes based on your choices and current life context.
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-secondary/20 hover:border-secondary/40 transition-all hover:glow-violet">
              <TrendingUp className="w-12 h-12 text-secondary mb-4 glow-violet" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Life Timeline</h3>
              <p className="text-foreground/70">
                Visualize your decisions as a branching timeline. Track paths taken and paths not taken.
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-primary/20 hover:border-primary/40 transition-all hover:glow-cyan">
              <Zap className="w-12 h-12 text-primary mb-4 glow-cyan" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Wisdom Points</h3>
              <p className="text-foreground/70">
                Earn points for exploring scenarios. Unlock AI mentor tips and compete on leaderboards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
