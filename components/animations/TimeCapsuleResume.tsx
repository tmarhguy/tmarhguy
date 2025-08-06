"use client";

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Download, FileText, X, Cpu, Zap, Sparkles, Clock } from "lucide-react";
import { getAssetPath } from "@/utils/paths";

// Deterministic pseudo-random function based on seed
const getPseudoRandom = (seed: number, max: number = 1) => {
  const x = Math.sin(seed) * 10000;
  return (x - Math.floor(x)) * max;
};

/**
 * Ref interface for TimeCapsuleResume component
 * @interface TimeCapsuleResumeRef
 * @example
 * const timeCapsuleRef = useRef<TimeCapsuleResumeRef>(null);
 * timeCapsuleRef.current?.openCapsule();
 */
export interface TimeCapsuleResumeRef {
  /** Method to programmatically open the time capsule modal */
  openCapsule: () => void;
}

const TimeCapsuleResume = forwardRef<TimeCapsuleResumeRef>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [downloadEffect, setDownloadEffect] = useState<'hardware' | 'software' | null>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);

  const openCapsule = () => {
    setIsAnimating(true);
    setIsOpen(true);
    setShowStars(true);
    document.body.style.overflow = 'hidden';
    setTimeout(() => setIsAnimating(false), 400); // Reduced from 800ms to 400ms
  };

  const closeCapsule = () => {
    setIsAnimating(true);
    setShowStars(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
      setDownloadEffect(null);
    }, 250); // Reduced from 400ms to 250ms
  };

  useImperativeHandle(ref, () => ({
    openCapsule
  }));

  const handleDownload = (type: 'hardware' | 'software') => {
    setDownloadEffect(type);
    
    const url = type === 'hardware' ? getAssetPath('hardware_resume.pdf') : getAssetPath('software_resume.pdf');
    const filename = type === 'hardware' ? 'Tyrone_Marhguy_Hardware_Resume.pdf' : 'Tyrone_Marhguy_Software_Resume.pdf';
    
    console.log(`Downloading ${type} resume:`, { url, filename });
    
    // Faster download effect - reduced delay
    setTimeout(() => {
      // More reliable download approach
      try {
        // First try opening in a new tab (for better PDF viewing)
        const newWindow = window.open(url, '_blank');
        
        // If popup was blocked, fall back to direct download
        if (!newWindow || newWindow.closed) {
          console.log('Popup blocked, using download link');
          // Create a temporary link element for download
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          
          // Temporarily add to DOM and click
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.log('Opened in new tab successfully');
        }
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback: direct navigation
        window.location.href = url;
      }
      
      // Close faster after download
      setTimeout(() => closeCapsule(), 600); // Reduced from 1000ms to 600ms
    }, 300); // Reduced from 500ms to 300ms
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCapsule();
      }
    };

    const handleOpenTimeCapsule = () => {
      openCapsule();
    };

    document.addEventListener('keydown', handleEscape);
    window.addEventListener('openTimeCapsule', handleOpenTimeCapsule);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('openTimeCapsule', handleOpenTimeCapsule);
    };
  }, [isOpen]);

  return (
    <>
      {/* Enhanced Floating Time Capsule Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="relative">
          {/* Optimized floating particle swarm */}
          <div className="absolute -inset-8 opacity-70">
            {/* Generate 6 optimized particles using Tailwind classes */}
            <div className="absolute top-0 left-0 w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '1.5s' }}></div>
            <div className="absolute bottom-1 left-2 w-3 h-3 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-800 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '1.8s' }}></div>
            <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-spin" style={{ animationDelay: '0.2s', animationDuration: '3s' }}></div>
            <div className="absolute top-6 right-6 w-1 h-1 bg-blue-600 rounded-full animate-ping" style={{ animationDelay: '0.7s', animationDuration: '2s' }}></div>
          </div>
          
          <button
            onClick={openCapsule}
            className="group relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 rounded-full shadow-2xl hover:shadow-brand-500/50 transition-all duration-500 hover:scale-125 border-2 border-brand-500/30 overflow-hidden transform hover:rotate-12"
            aria-label="Download Resume Time Capsule"
          >
            {/* Spinning Background Animation with multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-400/30 to-brand-800/30 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-brand-800/20 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDuration: '3s' }}></div>
            
            {/* Main Icon with enhanced effects */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-brand-200 transition-colors duration-300 drop-shadow-lg" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-brand-400 rounded-full animate-pulse group-hover:bg-brand-300"></div>
              </div>
            </div>
            
            {/* Enhanced Hover Text */}
            <div className="absolute -top-16 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-brand-500/30 shadow-lg transform -translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-brand-400" />
                <span>Ready to time travel? 💎</span>
              </div>
              <div className="absolute bottom-0 right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800 transform translate-y-full"></div>
            </div>
            
            {/* Multiple Pulse Rings with enhanced orbital motion */}
            <div className="absolute inset-0 rounded-full border-2 border-brand-400 animate-ping opacity-75"></div>
            <div className="absolute inset-0 rounded-full border-2 border-brand-400 animate-ping opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-45" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-brand-300 animate-ping opacity-30" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-brand-200 animate-ping opacity-25" style={{ animationDelay: '2s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-brand-500 animate-ping opacity-20" style={{ animationDelay: '2.5s' }}></div>
            
            {/* Rotating orbital rings */}
            <div className="absolute inset-2 rounded-full border-2 border-brand-300 animate-spin opacity-40" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-1 rounded-full border-2 border-brand-300 animate-spin opacity-35" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-3 rounded-full border-2 border-cyan-300 animate-spin opacity-30" style={{ animationDuration: '8s' }}></div>
          </button>
        </div>
      </div>

      {/* Enhanced Time Capsule Modal with Cinematic Portal Effect */}
      {isOpen && (
        <div 
          className={`fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-1000 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={closeCapsule}
        >
          {/* Animated Star Field Background with massive particle count */}
          {showStars && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Optimized twinkling stars - reduced from 200 to 20 */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: `${getPseudoRandom(i * 7, 3) + 1}px`,
                    height: `${getPseudoRandom(i * 7, 3) + 1}px`,
                    left: `${getPseudoRandom(i * 13, 100)}%`,
                    top: `${getPseudoRandom(i * 17, 100)}%`,
                    backgroundColor: ['#3b82f6', '#1e40af', '#06b6d4', '#0891b2', '#1d4ed8', '#0284c7'][Math.floor(getPseudoRandom(i * 23, 6))],
                    animationDelay: `${getPseudoRandom(i * 29, 3)}s`,
                    animationDuration: `${1 + getPseudoRandom(i * 31, 3)}s`
                  }}
                />
              ))}
              
              {/* Optimized orbiting elements - reduced from 30 to 8 */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`orbit-${i}`}
                  className="absolute w-4 h-4 border-2 rounded-full animate-spin"
                  style={{
                    left: `${getPseudoRandom(i * 37 + 100, 100)}%`,
                    top: `${getPseudoRandom(i * 41 + 100, 100)}%`,
                    borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(30, 64, 175, 0.3)', 'rgba(6, 182, 212, 0.3)', 'rgba(8, 145, 178, 0.3)'][Math.floor(getPseudoRandom(i * 43 + 100, 4))],
                    animationDelay: `${getPseudoRandom(i * 47 + 100, 4)}s`,
                    animationDuration: `${3 + getPseudoRandom(i * 53 + 100, 5)}s`,
                    animationDirection: getPseudoRandom(i * 59 + 100, 1) > 0.5 ? 'normal' : 'reverse'
                  }}
                />
              ))}
              
              {/* Optimized floating particles - reduced from 50 to 12 */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`float-${i}`}
                  className="absolute rounded-full animate-bounce"
                  style={{
                    width: `${getPseudoRandom(i * 61 + 200, 6) + 2}px`,
                    height: `${getPseudoRandom(i * 61 + 200, 6) + 2}px`,
                    left: `${getPseudoRandom(i * 67 + 200, 100)}%`,
                    top: `${getPseudoRandom(i * 71 + 200, 100)}%`,
                    backgroundColor: ['#3b82f6', '#1e40af', '#06b6d4', '#0891b2', '#1d4ed8', '#0284c7', '#2563eb', '#0ea5e9'][Math.floor(getPseudoRandom(i * 73 + 200, 8))],
                    animationDelay: `${getPseudoRandom(i * 79 + 200, 5)}s`,
                    animationDuration: `${2 + getPseudoRandom(i * 83 + 200, 4)}s`,
                    opacity: 0.4 + getPseudoRandom(i * 89 + 200, 0.4)
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Cinematic Portal Container */}
          <div 
            style={{ perspective: '800px' }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div 
              ref={capsuleRef}
              className={`star-wars-skew max-w-lg w-full transform transition-all duration-500 ${
                isAnimating 
                  ? 'scale-0 rotateX-90 opacity-0' 
                  : 'scale-100 rotateX-0 opacity-100'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Portal Title with Typing Effect */}
              <div className="text-center mb-12">
                <h2 className="mx-auto max-w-xs text-center text-2xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-300 to-cyan-400 sm:text-3xl lg:max-w-md lg:text-4xl animate-pulse">
                  Looking for my resume?
                </h2>
                <p className="mt-4 text-lg text-slate-300 font-medium">
                  💎 Travel through time to find it... 🚀
                </p>
                <div className="mt-2 flex justify-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Enhanced Resume Portal Grid */}
              <div className="flex justify-center">
                <div className="inline-grid grid-cols-1 gap-8 md:grid-cols-2">
                  
                  {/* Hardware Resume Portal */}
                  <div className="group relative block transition-all duration-500 hover:scale-105">
                    <button
                      onClick={() => handleDownload('hardware')}
                      className="w-full focus:outline-none"
                      aria-label="Download Hardware Engineering Resume"
                      disabled={downloadEffect === 'hardware'}
                    >
                      {/* Animated border gradient */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-500 via-blue-500 to-brand-500 p-0.5 group-hover:animate-pulse">
                        <div className="rounded-lg bg-gray-900 h-full w-full"></div>
                      </div>
                      
                      <div className={`relative mx-auto rounded-lg border-2 border-zinc-700/50 drop-shadow-2xl group-hover:drop-shadow-brand-500/25 transition-all duration-500 bg-gradient-to-br from-brand-600/20 to-brand-800/40 p-8 min-h-[140px] flex flex-col items-center justify-center backdrop-blur-sm ${
                        downloadEffect === 'hardware' ? 'animate-pulse bg-brand-500/30' : ''
                      }`}>
                        
                        {/* Optimized floating particle system */}
                        <div className="relative">
                          <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-2 left-2 w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full animate-spin" style={{ animationDelay: '0.3s' }}></div>
                            <div className="absolute bottom-2 left-4 w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                            <div className="absolute bottom-4 right-2 w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                            <div className="absolute top-6 left-6 w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="absolute top-8 right-8 w-2 h-2 bg-blue-600 rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute bottom-6 left-8 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
                            <div className="absolute bottom-8 right-6 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1.1s' }}></div>
                          </div>
                          
                          <Cpu className={`w-14 h-14 text-brand-400 mb-4 group-hover:scale-125 group-hover:text-brand-300 transition-all duration-500 ${
                            downloadEffect === 'hardware' ? 'animate-spin text-brand-200' : ''
                          }`} />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-200 transition-colors duration-300">
                          Hardware Engineering
                        </h3>
                        <p className="text-sm text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">
                          🔹 Digital circuits • CPU design • Embedded systems
                        </p>
                        
                        {downloadEffect === 'hardware' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-8 h-8 border-4 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                              <p className="text-brand-300 text-sm font-medium">Time traveling...</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Enhanced Hover Overlay with Portal Effect */}
                      <div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center rounded-lg border-4 border-brand-400/0 bg-gradient-to-br from-brand-900/90 to-blue-900/90 align-middle opacity-0 backdrop-blur-lg transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:border-brand-400/60 lg:flex">
                        <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                          <div className="relative">
                            <Download className="w-10 h-10 text-brand-400 mx-auto mb-3 animate-bounce" />
                            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-400 animate-pulse" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-1">Enter Portal</h3>
                          <p className="text-sm text-brand-300">💎 Download Hardware Resume</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Software Resume Portal */}
                  <div className="group relative block transition-all duration-500 hover:scale-105">
                    <button
                      onClick={() => handleDownload('software')}
                      className="w-full focus:outline-none"
                      aria-label="Download Software Development Resume"
                      disabled={downloadEffect === 'software'}
                    >
                      {/* Animated border gradient */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-500 via-cyan-500 to-brand-500 p-0.5 group-hover:animate-pulse">
                        <div className="rounded-lg bg-gray-900 h-full w-full"></div>
                      </div>
                      
                      <div className={`relative mx-auto rounded-lg border-2 border-zinc-700/50 drop-shadow-2xl group-hover:drop-shadow-brand-500/25 transition-all duration-500 bg-gradient-to-br from-brand-600/20 to-brand-800/40 p-8 min-h-[140px] flex flex-col items-center justify-center backdrop-blur-sm ${
                        downloadEffect === 'software' ? 'animate-pulse bg-brand-500/30' : ''
                      }`}>
                        
                        {/* Optimized floating particle system */}
                        <div className="relative">
                          <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-spin" style={{ animationDelay: '0.3s' }}></div>
                            <div className="absolute bottom-2 left-4 w-1 h-1 bg-cyan-500 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                            <div className="absolute bottom-4 right-2 w-2 h-2 bg-cyan-600 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                            <div className="absolute top-6 left-6 w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="absolute top-8 right-8 w-2 h-2 bg-cyan-500 rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute bottom-6 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
                            <div className="absolute bottom-8 right-6 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1.1s' }}></div>
                          </div>
                          
                          <Zap className={`w-14 h-14 text-brand-400 mb-4 group-hover:scale-125 group-hover:text-brand-300 transition-all duration-500 ${
                            downloadEffect === 'software' ? 'animate-spin text-brand-200' : ''
                          }`} />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-200 transition-colors duration-300">
                          Software Development
                        </h3>
                        <p className="text-sm text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">
                          🚀 Full-stack • ML/AI • APIs • Automation
                        </p>
                        
                        {downloadEffect === 'software' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-8 h-8 border-4 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                              <p className="text-brand-300 text-sm font-medium">Time traveling...</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Enhanced Hover Overlay with Portal Effect */}
                      <div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center rounded-lg border-4 border-brand-400/0 bg-gradient-to-br from-brand-900/90 to-cyan-900/90 align-middle opacity-0 backdrop-blur-lg transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:border-brand-400/60 lg:flex">
                        <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                          <div className="relative">
                            <Download className="w-10 h-10 text-brand-400 mx-auto mb-3 animate-bounce" />
                            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-400 animate-pulse" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-1">Enter Portal</h3>
                          <p className="text-sm text-brand-300">💫 Download Software Resume</p>
                        </div>
                      </div>
                    </button>
                  </div>
                  
                </div>
              </div>

              {/* Enhanced Close Button */}
              <button
                onClick={closeCapsule}
                className="absolute right-0 top-0 p-4 hover:text-slate-200 focus-visible:text-slate-200 text-slate-400 transition-all duration-300 hover:scale-110 hover:rotate-90 group"
                aria-label="Close Time Capsule"
                type="button"
              >
                <X className="h-7 w-7 group-hover:text-brand-400 transition-colors duration-300" />
              </button>
            </div>
            
            {/* Enhanced Status Display */}
            <div className="absolute inset-x-0 bottom-0 z-40 block p-8 text-center text-xs text-slate-500">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700/50 inline-block">
                <p className="flex items-center justify-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse"></span>
                    <span className="text-brand-400 text-xs">ACTIVE</span>
                  </span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <span className="text-slate-400">🚀 Time capsule portal</span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <span className="text-slate-400">📄 ATS-optimized PDFs ready</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-15px) scale(1.1); opacity: 1; }
        }
        
        @keyframes portal-entrance {
          0% { 
            opacity: 0; 
            transform: perspective(800px) rotateX(90deg) scale(0.5);
            filter: blur(10px);
          }
          50% {
            opacity: 0.8;
            transform: perspective(800px) rotateX(45deg) scale(0.8);
            filter: blur(5px);
          }
          100% { 
            opacity: 1; 
            transform: perspective(800px) rotateX(0deg) scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes matrix-rain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes hologram-flicker {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.2) hue-rotate(10deg); }
        }
        
        @keyframes energy-pulse {
          0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(147, 51, 234, 0.4); }
          100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .star-wars-skew {
          transform-style: preserve-3d;
          animation: portal-entrance 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .hologram-effect {
          animation: hologram-flicker 2s ease-in-out infinite;
        }
        
        .energy-border {
          animation: energy-pulse 2s ease-in-out infinite;
        }
        
        /* Enhanced portal effects */
        .star-wars-skew::before {
          content: '';
          position: absolute;
          top: -100%;
          left: -100%;
          right: -100%;
          bottom: -100%;
          background: conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.2), transparent);
          animation: spin-slow 25s linear infinite;
          z-index: -1;
          border-radius: 50%;
          opacity: 0.7;
        }
        
        /* Matrix-style background */
        .matrix-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(90deg, transparent 79px, rgba(59, 130, 246, 0.03) 81px, rgba(59, 130, 246, 0.03) 96px, transparent 98px),
            linear-gradient(transparent 79px, rgba(59, 130, 246, 0.03) 81px, rgba(59, 130, 246, 0.03) 96px, transparent 98px);
          background-size: 100px 100px;
          animation: matrix-rain 20s linear infinite;
          z-index: -1;
        }
        
        /* Glowing text effect */
        .glow-text {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.1);
        }
        
        /* Portal grid hover effects */
        .portal-card:hover {
          transform: translateZ(20px) rotateX(-10deg);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Enhanced circular motion animations */
        @keyframes orbital-spin {
          0% { transform: rotate(0deg) translateX(20px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        
        @keyframes orbital-spin-reverse {
          0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(30px) rotate(360deg); }
        }
        
        @keyframes orbital-spin-large {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
        
        @keyframes spiral-motion {
          0% { 
            transform: rotate(0deg) translateX(10px) scale(0.5);
            opacity: 0;
          }
          50% { 
            transform: rotate(180deg) translateX(25px) scale(1.2);
            opacity: 1;
          }
          100% { 
            transform: rotate(360deg) translateX(10px) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes figure-eight {
          0% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(15px) translateY(-15px) rotate(90deg); }
          50% { transform: translateX(0) translateY(0) rotate(180deg); }
          75% { transform: translateX(-15px) translateY(15px) rotate(270deg); }
          100% { transform: translateX(0) translateY(0) rotate(360deg); }
        }
        
        @keyframes particle-swarm {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.7;
          }
          25% { 
            transform: translateY(-30px) translateX(20px) scale(1.5) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(-15px) translateX(-20px) scale(0.8) rotate(180deg);
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-25px) translateX(15px) scale(1.3) rotate(270deg);
            opacity: 0.9;
          }
        }
        
        .particle-effect {
          animation: particle-swarm 6s ease-in-out infinite;
        }
        
        .orbital-motion {
          animation: orbital-spin 8s linear infinite;
        }
        
        .orbital-motion-reverse {
          animation: orbital-spin-reverse 10s linear infinite;
        }
        
        .orbital-motion-large {
          animation: orbital-spin-large 12s linear infinite;
        }
        
        .spiral-effect {
          animation: spiral-motion 4s ease-in-out infinite;
        }
        
        .figure-eight-motion {
          animation: figure-eight 5s ease-in-out infinite;
        }
        
        /* Enhanced portal container with orbital elements */
        .star-wars-skew::after {
          content: '';
          position: absolute;
          top: -150%;
          left: -150%;
          right: -150%;
          bottom: -150%;
          background: radial-gradient(circle at center, transparent 40%, rgba(59, 130, 246, 0.1) 60%, transparent 80%);
          animation: orbital-spin-large 30s linear infinite;
          z-index: -2;
          border-radius: 50%;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
});

TimeCapsuleResume.displayName = 'TimeCapsuleResume';

export default TimeCapsuleResume;
