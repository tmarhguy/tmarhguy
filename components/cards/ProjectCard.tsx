"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, ExternalLink, Clock, CheckCircle, Lightbulb, Wrench, X } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  github: string;
  demo: string;
  tags: string[];
  status: "Complete" | "In Progress" | "Planning" | "Concept";
}

const statusConfig = {
  "Complete": { 
    icon: CheckCircle, 
    color: "text-green-400", 
    bg: "bg-green-400/10 border-green-400/30" 
  },
  "In Progress": { 
    icon: Wrench, 
    color: "text-blue-400", 
    bg: "bg-blue-400/10 border-blue-400/30" 
  },
  "Planning": { 
    icon: Clock, 
    color: "text-yellow-400", 
    bg: "bg-yellow-400/10 border-yellow-400/30" 
  },
  "Concept": { 
    icon: Lightbulb, 
    color: "text-purple-400", 
    bg: "bg-purple-400/10 border-purple-400/30" 
  },
};

export default function ProjectCard({
  title,
  description,
  image,
  github,
  demo,
  tags,
  status,
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const startX = useRef(0);
  const currentY = useRef(0);
  const currentX = useRef(0);
  const StatusIcon = statusConfig[status].icon;

  const openModal = () => {
    setIsModalOpen(true);
    setIsAnimating(true);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    // Smooth entry animation
    requestAnimationFrame(() => {
      setTimeout(() => setIsAnimating(false), 200);
    });
  };

  const closeModal = () => {
    setIsAnimating(true);
    // Restore body scroll
    document.body.style.overflow = '';
    setTimeout(() => {
      setIsModalOpen(false);
      setIsAnimating(false);
      setDragY(0);
      setDragX(0);
      setIsDragging(false);
    }, 200);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startY.current = touch.clientY;
    startX.current = touch.clientX;
    setIsDragging(true);
    
    // Prevent default to avoid scrolling
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    currentY.current = touch.clientY;
    currentX.current = touch.clientX;
    
    const deltaY = currentY.current - startY.current;
    const deltaX = currentX.current - startX.current;
    
    // Allow movement in any direction
    setDragY(deltaY);
    setDragX(deltaX);
    
    // Prevent default scrolling
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaY = currentY.current - startY.current;
    const deltaX = currentX.current - startX.current;
    
    // Calculate total distance moved
    const totalDistance = Math.sqrt(deltaY * deltaY + deltaX * deltaX);
    
    // Close if moved more than 80px in any direction or fast swipe
    if (totalDistance > 80 || Math.abs(deltaY) > 60 || Math.abs(deltaX) > 60) {
      closeModal();
    } else {
      // Smooth snap back to original position
      setDragY(0);
      setDragX(0);
    }
    
    setIsDragging(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <>
      <Card 
        className="group hover:scale-[1.02] transition-all duration-300 bg-gray-900 border-gray-800 hover:border-brand-600/50 hover:shadow-2xl hover:shadow-brand-600/20 cursor-pointer sm:cursor-default"
        onClick={() => {
          // Only open modal on mobile
          if (window.innerWidth < 640) {
            openModal();
          }
        }}
      >
        <div className="p-3 sm:p-6">
          {/* Header - Always visible */}
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-xl font-semibold text-white mb-1 sm:mb-2 group-hover:text-brand-400 transition-colors leading-tight line-clamp-2">
                {title}
              </h3>
              <div className={`inline-flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs border ${statusConfig[status].bg} ${statusConfig[status].color}`}>
                <StatusIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="hidden sm:inline">{status}</span>
                <span className="sm:hidden">{status.slice(0, 3)}</span>
              </div>
            </div>
          </div>

          {/* Image - if provided */}
          {image && (
            <div className="aspect-square sm:aspect-video relative overflow-hidden rounded-lg mb-2 sm:mb-4">
              <img
                src={image}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className="group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          )}

          {/* Mobile: Tap to view full details indicator */}
          <div className="sm:hidden mb-2">
            <span className="text-brand-400 text-xs">Tap to view details</span>
          </div>

          {/* Desktop: Show all details */}
          <div className="hidden sm:block">
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 flex-1 text-sm h-9 px-3"
                onClick={() => window.open(github, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 flex-1 text-sm h-9 px-3"
                onClick={() => window.open(demo, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Details
              </Button>
            </div>
          </div>

          {/* Mobile: Just show compact buttons */}
          <div className="sm:hidden flex gap-1.5">
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 flex-1 text-xs h-7 px-1.5"
              onClick={(e) => {
                e.stopPropagation();
                window.open(github, '_blank');
              }}
            >
              <Github className="w-3 h-3" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 flex-1 text-xs h-7 px-1.5"
              onClick={(e) => {
                e.stopPropagation();
                window.open(demo, '_blank');
              }}
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Mobile Modal Overlay */}
      {isModalOpen && (
        <div 
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:hidden transition-all duration-200 ease-out ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={closeModal}
          style={{
            opacity: isDragging ? Math.max(0.2, 1 - (Math.abs(dragY) + Math.abs(dragX)) / 200) : undefined
          }}
        >
          <div 
            ref={modalRef}
            className="bg-gray-900 border border-gray-700 rounded-xl max-w-sm w-full max-h-[80vh] overflow-y-auto will-change-transform"
            style={{
              transform: `translate(${dragX}px, ${dragY}px) scale(${
                isAnimating ? 0.9 : isDragging ? Math.max(0.95, 1 - (Math.abs(dragY) + Math.abs(dragX)) / 400) : 1
              })`,
              transition: isDragging ? 'none' : 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: isDragging ? Math.max(0.7, 1 - (Math.abs(dragY) + Math.abs(dragX)) / 300) : 1,
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Drag Indicator */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-600 rounded-full opacity-80"></div>
            </div>
            
            <div className="px-6 pb-6">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
                    {title}
                  </h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${statusConfig[status].bg} ${statusConfig[status].color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status}
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-all duration-150 p-2 rounded-full hover:bg-gray-800/50 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700 transition-transform duration-150 hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 flex-1 transition-all duration-150 hover:scale-[1.02] active:scale-95"
                    onClick={() => {
                      window.open(github, '_blank');
                      closeModal();
                    }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 flex-1 transition-all duration-150 hover:scale-[1.02] active:scale-95"
                    onClick={() => {
                      window.open(demo, '_blank');
                      closeModal();
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
