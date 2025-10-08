import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Award, GitBranch } from "lucide-react";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const savedScenarios = [
    {
      id: 1,
      title: "Career Switch to Tech",
      category: "Career",
      date: "2024-01-15",
      wisdomGained: 25,
      status: "Completed",
    },
    {
      id: 2,
      title: "Investment in Real Estate",
      category: "Finance",
      date: "2024-01-10",
      wisdomGained: 30,
      status: "In Progress",
    },
    {
      id: 3,
      title: "Start Morning Meditation",
      category: "Health",
      date: "2024-01-05",
      wisdomGained: 15,
      status: "Completed",
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", points: 2450 },
    { rank: 2, name: "Sam Rivera", points: 2180 },
    { rank: 3, name: "You", points: 1850 },
    { rank: 4, name: "Jordan Kim", points: 1620 },
    { rank: 5, name: "Taylor Swift", points: 1490 },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Your Dashboard
            </h1>
            <p className="text-lg text-foreground/70">
              Track your simulations and progress
            </p>
          </div>

          {/* Wisdom Points Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 mb-8 hover:glow-cyan transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-primary glow-cyan" />
                  <div>
                    <CardTitle className="text-2xl">Wisdom Points</CardTitle>
                    <CardDescription>Your total accumulated wisdom</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">1,850</div>
                  <div className="text-sm text-muted-foreground">+70 this week</div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Saved Scenarios */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                  Saved Scenarios
                </h2>
                <div className="space-y-4">
                  {savedScenarios.map((scenario) => (
                    <Card 
                      key={scenario.id}
                      className="bg-card/50 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 transition-all cursor-pointer"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{scenario.title}</CardTitle>
                            <CardDescription>{scenario.category} • {scenario.date}</CardDescription>
                          </div>
                          <Badge 
                            variant={scenario.status === "Completed" ? "default" : "secondary"}
                            className="bg-primary/20 text-primary border-primary/30"
                          >
                            {scenario.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Award className="w-4 h-4 text-primary" />
                          <span>+{scenario.wisdomGained} Wisdom Points</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Life Map Timeline */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <GitBranch className="w-6 h-6 text-primary" />
                  Visual Life Map
                </h2>
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardContent className="pt-6">
                    <div className="relative">
                      {/* Timeline visualization placeholder */}
                      <div className="flex items-center justify-between py-8">
                        <div className="text-center space-y-2">
                          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto glow-cyan">
                            <Sparkles className="w-8 h-8 text-primary" />
                          </div>
                          <div className="text-xs text-foreground/70">Present</div>
                        </div>
                        
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-secondary mx-4"></div>
                        
                        <div className="text-center space-y-2">
                          <div className="w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center mx-auto glow-violet">
                            <TrendingUp className="w-8 h-8 text-secondary" />
                          </div>
                          <div className="text-xs text-foreground/70">6 Months</div>
                        </div>
                        
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-secondary to-accent mx-4"></div>
                        
                        <div className="text-center space-y-2">
                          <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto">
                            <Award className="w-8 h-8 text-accent" />
                          </div>
                          <div className="text-xs text-foreground/70">1 Year</div>
                        </div>
                      </div>
                      <p className="text-center text-sm text-muted-foreground">
                        Interactive timeline showing your decision paths
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Award className="w-6 h-6 text-secondary" />
                Leaderboard
              </h2>
              <Card className="bg-card/50 backdrop-blur-sm border-secondary/20 sticky top-24">
                <CardHeader>
                  <CardTitle>Top Explorers</CardTitle>
                  <CardDescription>This month's wisdom leaders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((user) => (
                      <div 
                        key={user.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          user.name === "You" 
                            ? "bg-primary/10 border border-primary/30" 
                            : "bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1 ? "bg-primary/20 text-primary" :
                            user.rank === 2 ? "bg-secondary/20 text-secondary" :
                            user.rank === 3 ? "bg-accent/20 text-accent" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {user.rank}
                          </div>
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-primary">{user.points}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
