import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, TrendingDown, Lightbulb, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Outcome = {
  type: string;
  title: string;
  description: string;
  probability: string;
  impact: string;
};

const Simulator = () => {
  const [scenario, setScenario] = useState("");
  const [category, setCategory] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [mentorTips, setMentorTips] = useState<string[]>([]);
  const { toast } = useToast();

  const getOutcomeIcon = (type: string) => {
    switch (type) {
      case "optimistic":
        return TrendingUp;
      case "realistic":
        return Sparkles;
      case "cautionary":
        return TrendingDown;
      default:
        return Sparkles;
    }
  };

  const getOutcomeColor = (type: string) => {
    switch (type) {
      case "optimistic":
        return "primary";
      case "realistic":
        return "secondary";
      case "cautionary":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handleSimulate = async () => {
    if (!scenario || !category) {
      toast({
        title: "Missing Information",
        description: "Please provide both a scenario and category.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    try {
      const { data, error } = await supabase.functions.invoke("simulate-scenario", {
        body: {
          title: scenario,
          description: scenario,
          category: category,
        },
      });

      if (error) throw error;

      setOutcomes(data.outcomes);
      setMentorTips(data.mentorTips);
      setShowResults(true);

      toast({
        title: "Simulation Complete! 🎉",
        description: "Your possible outcomes have been generated.",
      });
    } catch (error: any) {
      console.error("Simulation error:", error);
      toast({
        title: "Simulation Failed",
        description: error.message || "Failed to generate outcomes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Scenario Simulator
            </h1>
            <p className="text-lg text-foreground/70">
              Enter your life decision and let AI predict possible outcomes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Your Scenario</CardTitle>
                  <CardDescription>Describe the decision you're facing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="scenario" className="text-foreground">What are you considering?</Label>
                    <Input
                      id="scenario"
                      placeholder="e.g., Should I switch jobs to a startup?"
                      value={scenario}
                      onChange={(e) => setScenario(e.target.value)}
                      className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-foreground">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="bg-muted/50 border-border text-foreground">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="relationships">Relationships</SelectItem>
                        <SelectItem value="learning">Learning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleSimulate}
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan transition-all"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating Outcomes...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Simulate My Future
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Results Section */}
              {showResults && outcomes.length > 0 && (
                <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Possible Outcomes</h2>
                  {outcomes.map((outcome, index) => {
                    const Icon = getOutcomeIcon(outcome.type);
                    const color = getOutcomeColor(outcome.type);
                    
                    return (
                      <Card 
                        key={index}
                        className={`bg-card/50 backdrop-blur-sm border-${color}/30 hover:border-${color}/50 transition-all`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className={`w-8 h-8 text-${color}`} />
                              <div>
                                <CardTitle className="text-xl">{outcome.title}</CardTitle>
                                <CardDescription>Probability: {outcome.probability}</CardDescription>
                              </div>
                            </div>
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-${color}/20 text-${color}`}>
                              {outcome.impact}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-foreground/80">{outcome.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar - AI Mentor Tips */}
            {showResults && mentorTips.length > 0 && (
              <div className="lg:col-span-1">
                <Card className="bg-card/50 backdrop-blur-sm border-secondary/20 sticky top-24">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-secondary glow-violet" />
                      <CardTitle className="text-xl">AI Mentor Tips</CardTitle>
                    </div>
                    <CardDescription>Key considerations for your decision</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {mentorTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="text-secondary mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
