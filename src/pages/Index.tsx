
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Home, Book, Image, User, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success("Sign up successful! Check your email for verification.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success("Logged in successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A2E] text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-10 backdrop-blur-md bg-[#001233]/90 border-b border-[#00F5FF]/20 px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-['Orbitron'] text-2xl font-bold text-[#00F5FF]">MESL</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-[#00F5FF] hover:text-white transition-colors">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/projects" className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors">
              <Book size={18} />
              <span>Projects</span>
            </Link>
            <Link to="/gallery" className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors">
              <Image size={18} />
              <span>Gallery</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors">
              <User size={18} />
              <span>Profile</span>
            </Link>
          </div>
          
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-[#0466C8] hover:bg-[#0466C8]/80 text-white border-none">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-[#1A1A2E] text-white border border-[#00F5FF]/30">
                <DialogHeader>
                  <DialogTitle className="font-['Orbitron'] text-[#00F5FF]">
                    {isSignUp ? "Create Account" : "Login to MESL"}
                  </DialogTitle>
                  <DialogDescription className="text-white/70">
                    {isSignUp 
                      ? "Sign up to share your projects and connect with the lab." 
                      : "Access your profile and projects."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAuth} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-white/90">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="bg-[#001233] border-[#0466C8]/50 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-white/90">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-[#001233] border-[#0466C8]/50 text-white"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0466C8] hover:bg-[#0466C8]/80 text-white"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
                  </Button>
                  <div className="text-center text-sm">
                    <span className="text-white/70">
                      {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="ml-1 text-[#00F5FF] hover:underline"
                    >
                      {isSignUp ? "Login instead" : "Sign up"}
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="text-center mb-12">
          <h1 className="font-['Orbitron'] text-4xl md:text-6xl font-bold mb-4 text-[#00F5FF]">
            Modern Engineering Systems Laboratory
          </h1>
          <p className="text-xl md:text-2xl font-['Rajdhani'] text-white/80 max-w-3xl mx-auto">
            Pioneering advanced engineering solutions through cutting-edge research and innovative technologies.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="font-['Orbitron'] text-2xl mb-4 text-[#0466C8]">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="bg-[#001233] border border-[#0466C8]/30 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-['Orbitron'] text-[#00F5FF]">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">{project.description}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-[#0466C8]/20 text-[#00F5FF] text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button className="bg-[#0466C8] hover:bg-[#0466C8]/80 text-white">
              View All Projects
            </Button>
          </div>
        </div>
        
        <Separator className="my-12 bg-[#00F5FF]/20" />
        
        <div className="mb-16">
          <h2 className="font-['Orbitron'] text-2xl mb-4 text-[#0466C8]">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {updates.map((update) => (
              <Card key={update.id} className="bg-[#001233] border border-[#0466C8]/30">
                <CardHeader>
                  <CardTitle className="font-['Orbitron'] text-[#00F5FF]">{update.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">{update.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-xs text-white/60">{update.date}</span>
                  <span className="text-xs text-[#00F5FF]">By {update.author}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#001233] py-6 border-t border-[#00F5FF]/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60 font-['Rajdhani']">
            © 2025 Modern Engineering Systems Laboratory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Demo data for featured projects
const featuredProjects = [
  {
    id: 1,
    title: "Quantum Neural Networks",
    description: "A breakthrough approach combining quantum computing principles with neural network architectures.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    technologies: ["Quantum", "AI", "Python"]
  },
  {
    id: 2,
    title: "Autonomous Drone Swarm",
    description: "Self-organizing drone swarm utilizing distributed intelligence for complex environmental monitoring.",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    technologies: ["Robotics", "Control Systems", "C++"]
  },
  {
    id: 3,
    title: "Advanced Material Simulation",
    description: "Computer simulation of novel materials with unique properties for aerospace applications.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    technologies: ["Material Science", "Simulation", "CUDA"]
  }
];

// Demo data for latest updates
const updates = [
  {
    id: 1,
    title: "New Research Grant Awarded",
    content: "Our lab has received a prestigious $2M grant to continue research on autonomous systems integration for urban environments.",
    date: "May 1, 2025",
    author: "Dr. Sarah Chen"
  },
  {
    id: 2,
    title: "Paper Published in Nature",
    content: "Our team's groundbreaking research on quantum neural networks has been published in Nature. This marks a significant milestone for our lab.",
    date: "April 15, 2025",
    author: "Dr. Michael Rodriguez"
  }
];

export default Index;
