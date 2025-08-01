"use client";

import { openTimeCapsule } from "@/utils/timeCapsuleEvent";

export default function BioSection() {
  return (
    <div className="bg-gradient-to-br from-brand-600/20 to-brand-800/20 rounded-lg p-4 sm:p-6 border border-brand-600/30">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
        <span className="text-brand-400">📄</span>
        Download My Resume!
      </h3>
      <p className="text-gray-300 text-sm mb-4">
        Specialized resumes tailored for hardware engineering and software development roles, showcasing relevant experience and projects.
      </p>
      <div className="flex justify-center">
        <button 
          onClick={openTimeCapsule}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
          </svg>
          Download Resume
        </button>
      </div>
    </div>
  );
}
