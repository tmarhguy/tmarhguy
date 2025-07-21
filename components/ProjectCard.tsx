"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, ExternalLink, Clock, CheckCircle, Lightbulb, Wrench } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
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
  const StatusIcon = statusConfig[status].icon;

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-brand-600/50 transition-colors group">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors leading-tight">
              {title}
            </h3>
            <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border ${statusConfig[status].bg} ${statusConfig[status].color}`}>
              <StatusIcon className="w-3 h-3" />
              {status}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 sm:gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 flex-1 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
            onClick={() => window.open(github, '_blank')}
          >
            <Github className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Code
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 flex-1 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
            onClick={() => window.open(demo, '_blank')}
          >
            <ExternalLink className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
