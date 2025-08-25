'use client';

import { Button } from "@/components/ui/button";
import { Github, Mail, User } from "lucide-react";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-8 sm:py-12 relative">
      <AnimatedBackground variant="circuit" intensity="low" />
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-surface-muted mb-6 max-w-2xl mx-auto">
            From discrete transistor CPUs to scalable ML platforms - let&apos;s discuss how my engineering skills can contribute to your next breakthrough project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="outline"
              className="border-brand-600 text-brand-400 hover:bg-brand-600/10 px-8 py-4 text-lg transition-all duration-200"
              onClick={() => window.open('https://github.com/tmarhguy', '_blank')}
            >
              <Github className="mr-2 h-5 w-5" />
              View GitHub
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-brand-600 text-brand-400 hover:bg-brand-600/10 px-8 py-4 text-lg transition-all duration-200"
              onClick={() => window.open('mailto:tmarhguy@seas.upenn.edu?subject=Let\'s Discuss Engineering Opportunities', '_blank')}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get in Touch
            </Button>

            <Link href="/about-me">
              <Button 
                size="lg" 
                variant="outline"
                className="border-brand-600 text-brand-400 hover:bg-brand-600/10 px-8 py-4 text-lg transition-all duration-200"
              >
                <User className="mr-2 h-5 w-5" />
                About Me
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-surface-muted">
            <p className="mt-1">Expected graduation: May 2028 • Philadelphia, PA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
