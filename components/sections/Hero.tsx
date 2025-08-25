"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Github, Mail, Linkedin, FileText } from "lucide-react";
import { openTimeCapsule } from "@/utils/timeCapsuleEvent";

const taglines = [
  "Computer Engineering @ UPenn",
  "Olympiad Gold Medalist • 8 A1s in WASSCE", 
  "Discrete Hardware Systems & Embedded Design",
  "Engineering with Math, Rigor & Imagination"
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState(taglines[0]);
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
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Simplified background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-gray-100 via-white to-gray-100" />
        
        {/* Subtle scanlines */}
        <div className="absolute inset-0 opacity-10">
          <style jsx>{`
            .scanlines {
              background: linear-gradient(transparent 50%, rgba(26, 127, 100, 0.02) 50%);
              background-size: 100% 6px;
              animation: scanlines 0.2s linear infinite;
            }
            
            @keyframes scanlines {
              0% { background-position: 0 0; }
              100% { background-position: 0 6px; }
            }
          `}</style>
          <div className="scanlines w-full h-full" />
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fadeUp">
          {/* Clean name display */}
          <div className="relative mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              I&apos;m Tyrone Marhguy
            </h1>
          </div>
          
          {/* Terminal-style typing effect for taglines */}
          <div className="text-xl sm:text-2xl md:text-3xl text-surface-secondary mb-6 sm:mb-8 h-10 sm:h-12 flex items-center justify-center">
            <div className="font-mono flex items-center" suppressHydrationWarning>
              <span className="text-brand-400 mr-2">&gt;</span>
              <span>{displayText}</span>
              <span className="animate-pulse ml-1 text-brand-400">█</span>
            </div>
          </div>
          
          {/* Clean description */}
          <div className="max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
            <div className="font-mono text-brand-400/60 text-xs sm:text-sm mb-2">
              {`// Building the future, one transistor at a time`}
            </div>
            <p className="text-base sm:text-lg md:text-xl text-surface-muted leading-relaxed">
  From 
  <span className="text-brand-400 font-medium bg-brand-400/10 px-1 rounded"> 700+ transistor-level CPUs </span> 
  soldered by hand 
  to 
  <span className="text-brand-400 font-medium bg-brand-400/10 px-1 rounded"> web platforms scaling to 350K+ users </span>. 
  UPenn Computer Engineering student and 
  <span className="text-brand-400 font-medium bg-brand-400/10 px-1 rounded"> Olympiad medalist </span>, 
  bridging silicon and software to engineer real-world impact.
</p>

          </div>
          
          <div className="flex flex-col gap-6 justify-center items-center px-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button 
                size="lg" 
                className="bg-brand-600 hover:bg-brand-500 text-white px-6 sm:px-8 py-3 text-base sm:text-lg transition-all duration-200 w-full sm:w-auto"
                onClick={() => document.getElementById('software-projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Projects
                <ChevronRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto transition-all duration-200"
                onClick={() => window.open('/academic-details', '_self')}
              >
                Academics
              </Button>

              <Button 
                size="lg" 
                variant="outline"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto transition-all duration-200"
                onClick={() => window.open('/about-me', '_self')}
              >
                About Me
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 w-full sm:w-auto max-w-sm sm:max-w-none">
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200"
                onClick={() => window.open('https://github.com/tmarhguy', '_blank')}
              >
                <Github className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden xs:inline">GitHub</span>
                <span className="xs:hidden">Github</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200"
                onClick={() => window.open('https://www.linkedin.com/in/tmarhguy', '_blank')}
              >
                <Linkedin className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden xs:inline">LinkedIn</span>
                <span className="xs:hidden">Linkedin</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200"
                onClick={openTimeCapsule}
              >
                <FileText className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden xs:inline">Resume</span>
                <span className="xs:hidden">Resume</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200"
                onClick={() => window.open('mailto:tmarhguy@seas.upenn.edu?subject=Let\'s Chat', '_blank')}
              >
                <Mail className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden xs:inline">Email</span>
                <span className="xs:hidden">Email</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
