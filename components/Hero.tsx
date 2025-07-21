"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Github, Mail, Linkedin, FileText } from "lucide-react";

const taglines = [
  "Hardware Hacker",
  "ML Researcher", 
  "Civic-Tech Builder"
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState("Hardware Hacker");
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
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
            Tyrone Marhguy
          </h1>
          
          <div className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 sm:mb-8 h-10 sm:h-12 flex items-center justify-center">
            <span className="font-mono" suppressHydrationWarning>
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            Building everything from <span className="text-brand-400 font-medium">transistor-level CPUs</span> to 
            <span className="text-brand-400 font-medium"> ML-powered applications</span>. 
            Passionate about bridging hardware and software to create impactful solutions.
          </p>
          
          <div className="flex flex-col gap-6 justify-center items-center px-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button 
                size="lg" 
                className="bg-brand-600 hover:bg-brand-500 text-white px-6 sm:px-8 py-3 text-base sm:text-lg transition-swift w-full sm:w-auto"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Projects
                <ChevronRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                About Me
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 w-full sm:w-auto max-w-sm sm:max-w-none">
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
                onClick={() => window.open('https://github.com/tmarhguy', '_blank')}
              >
                <Github className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden xs:inline">GitHub</span>
                <span className="xs:hidden">Git</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
                onClick={() => window.open('https://linkedin.com/in/tmarhguy', '_blank')}
              >
                <Linkedin className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden xs:inline">LinkedIn</span>
                <span className="xs:hidden">In</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <FileText className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden xs:inline">Resume</span>
                <span className="xs:hidden">CV</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
                onClick={() => window.open('mailto:tmarhguy@gmail.com?subject=Let\'s Chat', '_blank')}
              >
                <Mail className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden xs:inline">Email</span>
                <span className="xs:hidden">@</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
