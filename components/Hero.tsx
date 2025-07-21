"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Github, Mail } from "lucide-react";

const taglines = [
  "Hardware Hacker",
  "ML Researcher", 
  "Civic-Tech Builder"
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const current = taglines[currentTagline];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTagline((prev) => (prev + 1) % taglines.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTagline, mounted]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 text-center">
        <div className="animate-fadeUp">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
            Tyrone Marhguy
          </h1>
          
          <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-12 flex items-center justify-center">
            <span className="font-mono">
              {mounted ? displayText : "Hardware Hacker"}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Building everything from <span className="text-brand-400 font-medium">transistor-level CPUs</span> to 
            <span className="text-brand-400 font-medium"> ML-powered applications</span>. 
            Passionate about bridging hardware and software to create impactful solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 text-lg transition-swift"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Projects
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10"
                onClick={() => window.open('https://github.com/tmarhguy', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10"
                onClick={() => window.open('mailto:tmarhguy@gmail.com?subject=Let\'s Chat', '_blank')}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
