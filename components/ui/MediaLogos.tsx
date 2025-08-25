'use client';

import { useState } from 'react';
import { getAssetPath } from '@/utils/paths';

interface MediaLogoProps {
  src: string;
  alt: string;
  fallbackText: string;
  label: string;
  link?: string;
}

const MediaLogo = ({ src, alt, fallbackText, label, link }: MediaLogoProps) => {
  const [imageError, setImageError] = useState(false);

  const LogoContent = () => (
    <div className="flex flex-col items-center group flex-shrink-0">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg border border-surface flex items-center justify-center group-hover:border-brand-400/50 transition-colors duration-200 p-2 mx-2">
        {!imageError && src ? (
          <img 
            src={src.startsWith('http') || src === '' ? src : getAssetPath(src)} 
            alt={alt} 
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-lg sm:text-xl font-bold text-gray-800">{fallbackText}</div>
        )}
      </div>
      <span className="text-xs text-surface-muted mt-2 text-center">{label}</span>
    </div>
  );

  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:scale-105 transition-transform duration-200"
      >
        <LogoContent />
      </a>
    );
  }

  return <LogoContent />;
};

const MediaLogos = () => {
  const logos = [
    // Major International Media (Tier 1)
    {
      src: "/logos/bbc_news.png",
      alt: "BBC News Logo",
      fallbackText: "BBC",
      label: "BBC News",
      link: "https://www.bbc.co.uk/programmes/p09k80yx"
    },
    {
      src: "/logos/bbc_africa.jpeg",
      alt: "BBC Africa Logo",
      fallbackText: "BBC Africa",
      label: "BBC Africa",
      link: "https://www.bbc.com/pidgin/tori-57864466"
    },
    {
      src: "/logos/bbcpidgin.png",
      alt: "BBC News Pidgin Logo",
      fallbackText: "BBC Pidgin",
      label: "BBC News Pidgin",
      link: "https://www.bbc.com/pidgin/world-57306291"
    },
    {
      src: "/logos/voa.png",
      alt: "Voice of America Logo",
      fallbackText: "VOA",
      label: "Voice of America",
      link: "https://www.voanews.com/a/rastafarian-teen-fights-to-keep-dreadlocks/6276979.html"
    },
    {
      src: "/logos/apnews.png",
      alt: "Associated Press Logo",
      fallbackText: "AP",
      label: "Associated Press",
      link: "https://apnews.com/article/africa-religion-education-ghana-186c67bd473f892c054e5d1f9368b555"
    },
    {
      src: "/logos/dwnews.png",
      alt: "Deutsche Welle Logo",
      fallbackText: "DW",
      label: "Deutsche Welle",
      link: "https://www.dw.com/en/ghana-rastafarians-start-school-after-court-victory/video-57864466"
    },
    {
      src: "/logos/dw77.jpeg",
      alt: "DW The 77 Percent Logo",
      fallbackText: "DW77%",
      label: "DW The 77%",
      link: "https://www.dw.com/en/the-77-percent-does-your-hairstyle-decide-what-school-you-can-go-to/av-57061879"
    },
    {
      src: "/logos/indianapolisrecorder.png",
      alt: "Indianapolis Recorder Logo",
      fallbackText: "IR",
      label: "Indianapolis Recorder",
      link: "https://indianapolisrecorder.com/wp-content/uploads/2021/10/Oct-22-2021.pdf"
    },
    {
      src: "/logos/toronto-star.png",
      alt: "Toronto Star Logo",
      fallbackText: "TS",
      label: "Toronto Star",
      link: "https://www.thestar.com/news/world/2021/10/19/in-ghana-rastafarian-high-schooler-fights-to-keep-his-hair.html"
    },
    {
      src: "/logos/dailyherald.png",
      alt: "Daily Herald Logo",
      fallbackText: "DH",
      label: "Daily Herald",
      link: "https://www.dailyherald.com/20211019/news/in-ghana-rastafarian-high-schooler-fights-to-keep-his-hair/"
    },
    
    // Major Regional Media (Tier 2)
    {
      src: "/logos/joynews.jpeg",
      alt: "Joy News Logo",
      fallbackText: "JN",
      label: "Joy News",
      link: "https://www.myjoyonline.com/tyrone-marhguy-wins-american-math-olympiad-awards/"
    },
    {
      src: "/logos/3news.jpeg",
      alt: "3News Logo",
      fallbackText: "3N",
      label: "3News",
      link: "https://3news.com/featured/from-erics-diary-tyrone-marhguy-shock-fans"
    },
    {
      src: "/logos/citinews.png",
      alt: "Citi News Logo",
      fallbackText: "CN",
      label: "Citi News",
      link: "https://citinewsroom.com/2023/12/i-wasnt-discouraged-by-achimota-schools-rejection-tyrone-marhguy/"
    },
    {
      src: "/logos/ghanaweb.png",
      alt: "GhanaWeb Logo",
      fallbackText: "GW",
      label: "GhanaWeb",
      link: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/The-Tales-from-Achimota-School-The-story-of-the-Rastafarian-student-Tyrone-Marhguy-1948104"
    },
    {
      src: "/logos/dailygraphic.jpeg",
      alt: "Daily Graphic Logo",
      fallbackText: "DG",
      label: "Daily Graphic",
      link: "https://www.graphic.com.gh/news/general-news/video-watch-how-achimota-rastafarian-student-tyrone-marhguy-celebrated-his-wassce-8as-with-his-friends.html"
    },
    {
      src: "/logos/dailyguide.png",
      alt: "Daily Guide Logo",
      fallbackText: "DG",
      label: "Daily Guide",
      link: "https://dailyguidenetwork.com/achimota-rastafarian-fight-not-over"
    },
    {
      src: "/logos/cddghana.jpeg",
      alt: "CDD Ghana Logo",
      fallbackText: "CDD",
      label: "CDD Ghana",
      link: "https://cddgh.org/wp-content/uploads/2022/03/Democracy-Watch-40_ons_2022.pdf"
    },
    
    // Additional Notable Media - Now with actual logo files
    {
      src: "/logos/yen.png",
      alt: "YEN.COM.GH Logo",
      fallbackText: "YEN",
      label: "YEN.COM.GH",
      link: "https://yen.com.gh/education/265404-tyrone-marhguy-achimota-graduate-full-scholarship-study-penn/"
    },
    {
      src: "/logos/pulse.png",
      alt: "Pulse Ghana Logo",
      fallbackText: "PG",
      label: "Pulse Ghana",
      link: "https://www.pulse.com.gh/articles/entertainment/celebrities/tyrone-marhguy-awarded-full-scholarship-to-study-at-university-of-pennsylvania-2024092708493225450"
    },
    {
      src: "/logos/globalafricantimes.webp",
      alt: "Global African Times Logo",
      fallbackText: "GAT",
      label: "Global African Times",
      link: "https://globalafricantimes.com/tyrone-marhguy-rastafarian-achimota-school-alumnus-gets-full-scholarship-to-study-at-the-university-of-pennsylvania-usa/"
    },
    {
      src: "/logos/face2face.png",
      alt: "Face2Face Africa Logo",
      fallbackText: "F2FA",
      label: "Face2Face Africa",
      link: "https://face2faceafrica.com/article/ghana-student-initially-denied-admission-by-school-due-to-dreadlocks-scores-straight-as-in-final-exams"
    },
    
    // Additional Notable Media
    {
      src: "/logos/ghheadlines.png",
      alt: "GH Headlines Logo",
      fallbackText: "GHH",
      label: "GH Headlines",
      link: "https://ghheadlines.com/agency/pulse/20231219/163942876/tyrone-marhguy-popular-rastafarian-student-scores-a1-in-all-subjects-in-wassce"
    },
    
    // Academic & Research
    {
      src: "/logos/researchgate.png",
      alt: "ResearchGate Logo",
      fallbackText: "RG",
      label: "ResearchGate",
      link: "https://www.researchgate.net/figure/Tyrone-Iras-Marhguy-at-Pennsylvania-University-as-an-Engineering-Student-Photo-Credit_fig1_389320456"
    },
    {
      src: "/logos/wikipediaa.jpeg",
      alt: "Wikipedia Logo",
      fallbackText: "Wiki",
      label: "Wikipedia",
      link: "https://en.wikipedia.org/wiki/Tyrone_Marhguy"
    },
    {
      src: "/logos/westafrican journal.png",
      alt: "West African Journal Logo",
      fallbackText: "WAJ",
      label: "West African Journal",
      link: "https://journals.jozacpublishers.com/index.php/wajesp/article/view/870"
    },
    
    // Government & Educational Institutions - Now with actual logo files
    {
      src: "/logos/gstep.png",
      alt: "GSTEP Logo",
      fallbackText: "GSTEP",
      label: "GSTEP",
      link: "https://www.gstep.org.gh/youth-ambassador/tyrone-marhguy/"
    },
    {
      src: "/logos/judy.png",
      alt: "Judy Legal",
      fallbackText: "JL",
      label: "Judy Legal",
      link: "https://lite.judy.legal/amp/case/tyrone-marghuy-v-achimota-school"
    },
    
    // Social Media & Platforms
    {
      src: "",
      alt: "LinkedIn",
      fallbackText: "LI",
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/tmarhguy"
    }
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-transparent via-surface/5 to-transparent py-4">
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      
      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <div className="flex animate-scroll">
        {duplicatedLogos.map((logo, index) => (
          <MediaLogo
            key={index}
            src={logo.src}
            alt={logo.alt}
            fallbackText={logo.fallbackText}
            label={logo.label}
            link={logo.link}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaLogos;

