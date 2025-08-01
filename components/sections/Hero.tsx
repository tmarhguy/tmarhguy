"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Github, Mail, Linkedin, FileText } from "lucide-react";
import { openTimeCapsule } from "@/utils/timeCapsuleEvent";

const taglines = [
  "Discrete-Transistor CPU Designer",
  "ML/AI Systems Researcher", 
  "Full-Stack Product Builder",
  "Hardware-Software Bridge Engineer"
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
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Terminal-style background with scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        
        {/* Terminal scanlines */}
        <div className="absolute inset-0 opacity-20">
          <style jsx>{`
            .scanlines {
              background: linear-gradient(transparent 50%, rgba(26, 127, 100, 0.03) 50%);
              background-size: 100% 4px;
              animation: scanlines 0.1s linear infinite;
            }
            
            @keyframes scanlines {
              0% { background-position: 0 0; }
              100% { background-position: 0 4px; }
            }
          `}</style>
          <div className="scanlines w-full h-full" />
        </div>
        
        {/* CRT glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-900/20" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fadeUp">
          {/* Glitch effect on name */}
          <div className="relative mb-4 sm:mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent relative z-10">
              I&apos;m Tyrone Marhguy
            </h1>
            
            {/* Glitch layers */}
            <h1 className="absolute top-0 left-0 right-0 text-4xl sm:text-5xl md:text-7xl font-bold text-brand-400 opacity-20 animate-pulse"
                style={{ 
                  animation: 'glitch1 2s infinite',
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
                }}>
              I&apos;m Tyrone Marhguy
            </h1>
            <h1 className="absolute top-0 left-0 right-0 text-4xl sm:text-5xl md:text-7xl font-bold text-red-400 opacity-20"
                style={{ 
                  animation: 'glitch2 2s infinite',
                  clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
                }}>
              I&apos;m Tyrone Marhguy
            </h1>
            
            <style jsx>{`
              @keyframes glitch1 {
                0%, 100% { transform: translateX(0); }
                10% { transform: translateX(-2px); }
                20% { transform: translateX(2px); }
                30% { transform: translateX(-1px); }
                40% { transform: translateX(1px); }
                50% { transform: translateX(0); }
              }
              
              @keyframes glitch2 {
                0%, 100% { transform: translateX(0); }
                15% { transform: translateX(2px); }
                25% { transform: translateX(-2px); }
                35% { transform: translateX(1px); }
                45% { transform: translateX(-1px); }
                55% { transform: translateX(0); }
              }
            `}</style>
          </div>
          
          {/* Terminal-style typing effect for taglines */}
          <div className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 sm:mb-8 h-10 sm:h-12 flex items-center justify-center">
            <div className="font-mono flex items-center" suppressHydrationWarning>
              <span className="text-brand-400 mr-2">&gt;</span>
              <span>{displayText}</span>
              <span className="animate-pulse ml-1 text-brand-400">█</span>
            </div>
          </div>
          
          {/* Enhanced description with terminal styling */}
          <div className="max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
            <div className="font-mono text-brand-400/60 text-xs sm:text-sm mb-2">
              {`// Building the future, one transistor at a time`}
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
              Designing everything from <span className="text-brand-400 font-medium bg-brand-400/10 px-1 rounded">discrete-transistor CPUs</span> to 
              <span className="text-brand-400 font-medium bg-brand-400/10 px-1 rounded"> AI-powered applications</span>. 
              Passionate about bridging the gap between silicon and software to create impactful solutions.
            </p>
          </div>
          
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
                onClick={openTimeCapsule}
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
