import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';

interface MetricCardProps {
  number: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  link: string;
}

export const MetricCard = ({ number, label, sublabel, icon, link }: MetricCardProps) => {
  const isExternal = link.startsWith('http');
  const cardContent = (
    <Card hoverEffect className="h-full min-w-0 sm:min-w-[220px] flex flex-col justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="text-gold-champagne mt-0.5 group-hover:text-gold-bright transition-colors">
          {icon}
        </div>
        <div>
          <div className="text-metric leading-tight mb-1">
            {number}
          </div>
          <div className="text-label text-cream-dim">
            {label}
          </div>
        </div>
      </div>
      <div className="text-[0.7rem] text-cream-dim font-mono tracking-[0.08em] uppercase opacity-90">
        {sublabel}
      </div>
    </Card>
  );

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={link} className="block group">
      {cardContent}
    </Link>
  );
};
