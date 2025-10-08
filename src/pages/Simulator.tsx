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
import { Sparkles, TrendingUp, TrendingDown, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";

const Simulator = () => {
  const [scenario, setScenario] = useState("");
  const [category, setCategory] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSimulate = () => {
    if (scenario && category) {
      setShowResults(true);
    }
  };

  const outcomes = [
    {
      title: "Optimistic Path",
      icon: TrendingUp,
      probability: "65%",
      description: "You excel in your new role, quickly adapting to challenges. Within 6 months, you're leading key projects and earning recognition.",
      impact: "High Growth",
      color: "primary",
    },
    {
      title: "Realistic Path",
      icon: Sparkles,
      probability: "25%",
      description: "The transition is smooth but gradual. You face a learning curve but maintain work-life balance. Progress is steady over 12-18 months.",
      impact: "Moderate Growth",
      color: "secondary",
    },
    {
      title: "Cautionary Path",
      icon: TrendingDown,
      probability: "10%",
      description: "The new environment proves challenging. You struggle with company culture fit, leading to stress. May require additional support or pivot.",
      impact: "Requires Adaptation",
      color: "destructive",
    },
  ];

  const mentorTips = [
    "Research the company culture thoroughly before making the leap",
    "Network with current employees to get insider perspectives",
    "Negotiate for a trial period or probation clause",
    "Ensure the role aligns with your long-term career goals",
    "Have a financial safety net for at least 6 months",
  ];

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
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan transition-all"
                    size="lg"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Simulate My Future
                  </Button>
                </CardContent>
              </Card>

              {/* Results Section */}
              {showResults && (
                <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Possible Outcomes</h2>
                  {outcomes.map((outcome, index) => (
                    <Card 
                      key={index}
                      className={`bg-card/50 backdrop-blur-sm border-${outcome.color}/30 hover:border-${outcome.color}/50 transition-all`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <outcome.icon className={`w-8 h-8 text-${outcome.color}`} />
                            <div>
                              <CardTitle className="text-xl">{outcome.title}</CardTitle>
                              <CardDescription>Probability: {outcome.probability}</CardDescription>
                            </div>
                          </div>
                          <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-${outcome.color}/20 text-${outcome.color}`}>
                            {outcome.impact}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/80">{outcome.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar - AI Mentor Tips */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
