"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, X } from "lucide-react";
import Image from "next/image";

interface FlagshipCardProps {
  title: string;
  description: string;
  image: string;
  metrics: Array<{ label: string; value: string }>;
  github?: string;
  demo?: string;
  tags: string[];
}

export default function FlagshipCard({
  title,
  description,
  image,
  metrics,
  github,
  demo,
  tags,
}: FlagshipCardProps) {
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

  const openModal = () => {
    setIsModalOpen(true);
    setIsAnimating(true);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      setTimeout(() => setIsAnimating(false), 200);
    });
  };

  const closeModal = () => {
    setIsAnimating(true);
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
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    currentY.current = touch.clientY;
    currentX.current = touch.clientX;
    
    const deltaY = currentY.current - startY.current;
    const deltaX = currentX.current - startX.current;
    
    setDragY(deltaY);
    setDragX(deltaX);
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaY = currentY.current - startY.current;
    const deltaX = currentX.current - startX.current;
    const totalDistance = Math.sqrt(deltaY * deltaY + deltaX * deltaX);
    
    if (totalDistance > 80 || Math.abs(deltaY) > 60 || Math.abs(deltaX) > 60) {
      closeModal();
    } else {
      setDragY(0);
      setDragX(0);
    }
    
    setIsDragging(false);
  };

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
        className="group hover:scale-[1.02] transition-all duration-300 bg-gray-800 border-gray-700 hover:border-brand-600/50 hover:shadow-2xl hover:shadow-brand-600/20 cursor-pointer sm:cursor-default h-full flex flex-col"
        onClick={() => {
          // Only open modal on mobile
          if (window.innerWidth < 640) {
            openModal();
          }
        }}
      >
        <CardHeader className="pb-2 sm:pb-4">
          <div className="aspect-square sm:aspect-video relative overflow-hidden rounded-lg mb-2 sm:mb-4">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <CardTitle className="text-sm sm:text-xl text-white group-hover:text-brand-400 transition-colors line-clamp-2">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-2 sm:space-y-4 flex-1 flex flex-col">
          {/* Mobile: Tap to view indicator */}
          <div className="sm:hidden">
            <span className="text-brand-400 text-xs">Tap to view details</span>
          </div>

          {/* Desktop: Show all details */}
          <div className="hidden sm:block space-y-4 flex-1 flex flex-col">
            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
            
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-brand-400 text-lg font-semibold font-mono">
                    {metric.value}
                  </div>
                  <div className="text-gray-400 text-xs">{metric.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-brand-600/20 text-brand-300 text-xs rounded-full border border-brand-600/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2 pt-2 mt-auto">
              {github && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-brand-600 text-brand-400 hover:bg-brand-600/10 text-sm h-9 px-3"
                  onClick={() => window.open(github, '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
              )}
              {demo && (
                <Button
                  size="sm"
                  className="flex-1 bg-brand-600 hover:bg-brand-500 text-white text-sm h-9 px-3"
                  onClick={() => window.open(demo, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </Button>
              )}
            </div>
          </div>

          {/* Mobile: Just show compact buttons */}
          <div className="sm:hidden flex gap-1.5">
            {github && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-brand-600 text-brand-400 hover:bg-brand-600/10 text-xs h-7 px-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(github, '_blank');
                }}
              >
                <Github className="w-3 h-3" />
              </Button>
            )}
            {demo && (
              <Button
                size="sm"
                className="flex-1 bg-brand-600 hover:bg-brand-500 text-white text-xs h-7 px-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(demo, '_blank');
                }}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            )}
          </div>
        </CardContent>
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
            className="bg-gray-800 border border-gray-700 rounded-xl max-w-sm w-full max-h-[85vh] overflow-y-auto will-change-transform"
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
              {/* Modal Header with Image */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-4">
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-all duration-150 p-2 rounded-full hover:bg-gray-700/50 active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {description}
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((metric, index) => (
                    <div key={index} className="bg-gray-700/50 rounded-lg p-3 transition-transform duration-150 hover:scale-[1.02]">
                      <div className="text-brand-400 text-lg font-semibold font-mono">
                        {metric.value}
                      </div>
                      <div className="text-gray-400 text-xs">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-brand-600/20 text-brand-300 text-xs rounded-full border border-brand-600/30 transition-transform duration-150 hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  {github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-brand-600 text-brand-400 hover:bg-brand-600/10 transition-all duration-150 hover:scale-[1.02] active:scale-95"
                      onClick={() => {
                        window.open(github, '_blank');
                        closeModal();
                      }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  )}
                  {demo && (
                    <Button
                      size="sm"
                      className="flex-1 bg-brand-600 hover:bg-brand-500 text-white transition-all duration-150 hover:scale-[1.02] active:scale-95"
                      onClick={() => {
                        window.open(demo, '_blank');
                        closeModal();
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
