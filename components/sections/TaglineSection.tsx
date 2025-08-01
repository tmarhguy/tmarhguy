"use client";

import { openTimeCapsule } from "@/utils/timeCapsuleEvent";

export default function TaglineSection() {
  return (
    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
      I design <span className="text-brand-400 font-semibold">discrete-transistor processors</span> and build{" "}
      <span className="text-brand-400 font-semibold">AI-powered applications</span> that solve real-world problems. 
      From hardware architecture to full-stack development, I bridge the gap between silicon and software.{" "}
      
      <br className="hidden sm:block" /><br className="hidden sm:block" />
      
      Want to see my work? Explore my{" "}
      <a href="#projects" className="text-brand-400 hover:text-brand-300 underline">projects</a>, learn about my{" "}
      <a href="#about" className="text-brand-400 hover:text-brand-300 underline">journey</a>, download my{" "}
      <button onClick={openTimeCapsule} className="text-brand-400 hover:text-brand-300 underline bg-transparent border-none cursor-pointer">resume</button>, or connect with me on{" "}
      <a href="https://linkedin.com/in/tmarhguy" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 underline">LinkedIn</a>.
    </p>
  );
}
