"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
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
  return (
    <Card className="group hover:scale-[1.02] transition-all duration-300 bg-gray-800 border-gray-700 hover:border-brand-600/50 hover:shadow-2xl hover:shadow-brand-600/20">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="aspect-video relative overflow-hidden rounded-lg mb-3 sm:mb-4">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <CardTitle className="text-lg sm:text-xl text-white group-hover:text-brand-400 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 sm:space-y-4">
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{description}</p>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg p-2 sm:p-3">
              <div className="text-brand-400 text-sm sm:text-lg font-semibold font-mono">
                {metric.value}
              </div>
              <div className="text-gray-400 text-xs">{metric.label}</div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-brand-600/20 text-brand-300 text-xs rounded-full border border-brand-600/30"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2 pt-1 sm:pt-2">
          {github && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-brand-600 text-brand-400 hover:bg-brand-600/10 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
              onClick={() => window.open(github, '_blank')}
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Code
            </Button>
          )}
          {demo && (
            <Button
              size="sm"
              className="flex-1 bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
              onClick={() => window.open(demo, '_blank')}
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
