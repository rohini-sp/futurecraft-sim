import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Award, Target, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const stats = [
    {
      label: "Scenarios Explored",
      value: "47",
      icon: Target,
      color: "primary",
    },
    {
      label: "Wisdom Points",
      value: "1,850",
      icon: Sparkles,
      color: "secondary",
    },
    {
      label: "Days Active",
      value: "23",
      icon: Calendar,
      color: "accent",
    },
    {
      label: "Achievements",
      value: "12",
      icon: Award,
      color: "primary",
    },
  ];

  const achievements = [
    { title: "First Simulation", description: "Complete your first scenario", unlocked: true },
    { title: "Week Streak", description: "Active for 7 consecutive days", unlocked: true },
    { title: "Wisdom Seeker", description: "Earn 1,000 wisdom points", unlocked: true },
    { title: "Deep Thinker", description: "Explore 50+ scenarios", unlocked: false },
    { title: "Top 10 Explorer", description: "Reach top 10 on leaderboard", unlocked: false },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Your Profile
            </h1>
            <p className="text-lg text-foreground/70">
              Track your journey and achievements
            </p>
          </div>

          {/* Profile Header Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 mb-8">
            <CardContent className="pt-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Avatar className="w-32 h-32 border-4 border-primary/30 glow-cyan">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-4xl bg-primary/20 text-primary">JS</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Jordan Smith</h2>
                  <p className="text-muted-foreground mb-4">Future Explorer • Member since Jan 2024</p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card className="bg-card/50 backdrop-blur-sm border-secondary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    defaultValue="Jordan Smith"
                    className="bg-muted/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    defaultValue="jordan@example.com"
                    className="bg-muted/50 border-border"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input 
                  id="bio" 
                  defaultValue="Exploring future possibilities one scenario at a time"
                  className="bg-muted/50 border-border"
                />
              </div>
              
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-secondary glow-violet" />
                <CardTitle className="text-2xl">Achievements</CardTitle>
              </div>
              <CardDescription>Your unlocked milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      achievement.unlocked 
                        ? "bg-primary/10 border-primary/30 hover:border-primary/50" 
                        : "bg-muted/20 border-muted-foreground/20 opacity-50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.unlocked 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                    {achievement.unlocked && (
                      <Sparkles className="w-5 h-5 text-primary glow-cyan" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
