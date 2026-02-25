export interface Certification {
  id: string;
  title: string;
  issuer: string;
  platform?: string;
  date: string;
  image: string;
  verifyUrl?: string;
  category: 'programming' | 'ml-ai' | 'math' | 'cad' | 'productivity' | 'leadership' | 'academic';
  featured?: boolean;
  /** Optional short title for featured card display */
  featuredTitle?: string;
}

export type PlatformGroup = 'coursera' | 'udemy' | 'onshape' | 'academic';

export function getPlatformGroup(c: Certification): PlatformGroup {
  if (c.platform === 'Onshape') return 'onshape';
  if (c.platform === 'Udemy') return 'udemy';
  if (c.category === 'academic') return 'academic';
  return 'coursera';
}

export const certificationsData: Certification[] = [
  // Programming — C
  {
    id: 'c-getting-started',
    title: 'C Programming: Getting Started - 1',
    issuer: 'Dartmouth College & Institut Mines-Télécom',
    platform: 'Coursera',
    date: 'Feb 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0009.jpg',
    verifyUrl: 'https://coursera.org/verify/MUTV8C953AFU',
    category: 'programming',
  },
  {
    id: 'c-language-foundations',
    title: 'C Programming: Language Foundations - 2',
    issuer: 'Dartmouth College & Institut Mines-Télécom',
    platform: 'Coursera',
    date: 'Feb 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0006.jpg',
    verifyUrl: 'https://coursera.org/verify/JRFAQR899YL2',
    category: 'programming',
  },
  {
    id: 'c-modular-memory',
    title: 'C Programming: Modular Programming and Memory Management - 3',
    issuer: 'Dartmouth College & Institut Mines-Télécom',
    platform: 'Coursera',
    date: 'Mar 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0010.jpg',
    verifyUrl: 'https://coursera.org/verify/SHVUSM6RGN3J',
    category: 'programming',
  },
  {
    id: 'c-pointers-memory',
    title: 'C Programming: Pointers and Memory Management - 4',
    issuer: 'Dartmouth College & Institut Mines-Télécom',
    platform: 'Coursera',
    date: 'Mar 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0008.jpg',
    verifyUrl: 'https://coursera.org/verify/CP8QASQSZ28C',
    category: 'programming',
  },
  {
    id: 'c-advanced-data-types',
    title: 'C Programming: Advanced Data Types - 5',
    issuer: 'Dartmouth College & Institut Mines-Télécom',
    platform: 'Coursera',
    date: 'Apr 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0007.jpg',
    verifyUrl: 'https://coursera.org/verify/Z24GAQ5PUWZU',
    category: 'programming',
    featured: true,
    featuredTitle: 'C Programming Series · 5 courses',
  },
  {
    id: 'c-pointers-udemy',
    title: 'Mastering Pointers in C: A Course on Efficient Programming',
    issuer: 'Udemy',
    platform: 'Udemy',
    date: 'Jun 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0021.jpg',
    verifyUrl: 'https://ude.my/UC-9ffe3445-5aab-4984-b07e-bf37bf10d5ce',
    category: 'programming',
  },
  // Programming — Python
  {
    id: 'python-intro-upenn',
    title: 'Introduction to Python Programming',
    issuer: 'University of Pennsylvania',
    platform: 'Coursera',
    date: 'May 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0001.jpg',
    verifyUrl: 'https://coursera.org/verify/VSSGBG5QCXM7',
    category: 'programming',
    featured: true,
  },
  {
    id: 'crash-course-python',
    title: 'Crash Course on Python',
    issuer: 'Google',
    platform: 'Coursera',
    date: 'Jun 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0002.jpg',
    verifyUrl: 'https://coursera.org/verify/LFT2Y8N63M2Q',
    category: 'programming',
  },
  // Programming — Other
  {
    id: 'programming-fundamentals',
    title: 'Programming Fundamentals',
    issuer: 'Duke University',
    platform: 'Coursera',
    date: 'Mar 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0004.jpg',
    verifyUrl: 'https://coursera.org/verify/3GHWGX7LK6TT',
    category: 'programming',
  },
  {
    id: 'matlab',
    title: 'Introduction to Programming with MATLAB',
    issuer: 'Vanderbilt University',
    platform: 'Coursera',
    date: 'May 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0011.jpg',
    verifyUrl: 'https://coursera.org/verify/WEJV4XRWTJYD',
    category: 'programming',
  },
  {
    id: 'java-beginners',
    title: 'Java for Beginners — Learn all the Basics of Java',
    issuer: 'Udemy',
    platform: 'Udemy',
    date: 'Apr 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0020.jpg',
    verifyUrl: 'https://ude.my/UC-b853157a-5c2b-45cf-a528-4da8f9f2f2f5',
    category: 'programming',
  },
  {
    id: 'html-complete-guide',
    title: 'HTML — The Complete Guide to HTML for Beginners',
    issuer: 'Udemy',
    platform: 'Udemy',
    date: 'May 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0018.jpg',
    verifyUrl: 'https://ude.my/UC-5009eb54-c157-49b5-99ee-b43644a78594',
    category: 'programming',
  },
  // ML & AI
  {
    id: 'intro-generative-ai',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    platform: 'Coursera',
    date: 'Feb 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0003.jpg',
    verifyUrl: 'https://coursera.org/verify/SC4N52PHGMJ8',
    category: 'ml-ai',
    featured: true,
  },
  // Math
  {
    id: 'matrix-algebra',
    title: 'Matrix Algebra for Engineers',
    issuer: 'The Hong Kong University of Science and Technology',
    platform: 'Coursera',
    date: 'Jun 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0005.jpg',
    verifyUrl: 'https://coursera.org/verify/DV3EELMPZ24J',
    category: 'math',
    featured: true,
  },
  // CAD & Design
  {
    id: 'onshape-parametric-cad',
    title: 'Introduction to Parametric Feature-Based CAD',
    issuer: 'Onshape',
    platform: 'Onshape',
    date: 'Jul 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0024.jpg',
    category: 'cad',
    featured: true,
    featuredTitle: 'Onshape CAD Suite · 4 courses',
  },
  {
    id: 'onshape-part-design',
    title: 'Introduction to Part Design',
    issuer: 'Onshape',
    platform: 'Onshape',
    date: 'Jul 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0025.jpg',
    category: 'cad',
  },
  {
    id: 'onshape-assembly',
    title: 'Introduction to Assembly Design',
    issuer: 'Onshape',
    platform: 'Onshape',
    date: 'Jul 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0022.jpg',
    category: 'cad',
  },
  {
    id: 'onshape-drawings',
    title: 'Introduction to Drawings',
    issuer: 'Onshape',
    platform: 'Onshape',
    date: 'Aug 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0023.jpg',
    category: 'cad',
  },
  // Productivity & Tools
  {
    id: 'excel',
    title: 'Introduction to Microsoft Excel',
    issuer: 'Coursera Project Network',
    platform: 'Coursera',
    date: 'May 2022',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0013.jpg',
    verifyUrl: 'https://coursera.org/verify/2WWFL8BUPKSV',
    category: 'productivity',
  },
  {
    id: 'google-docs',
    title: 'Introduction to Google Docs',
    issuer: 'Coursera Project Network',
    platform: 'Coursera',
    date: 'Mar 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0014.jpg',
    verifyUrl: 'https://coursera.org/verify/K83MKST5ZQYL',
    category: 'productivity',
  },
  {
    id: 'wordpress',
    title: 'Create a Website Using WordPress: Free Hosting & Sub-domain',
    issuer: 'Coursera Project Network',
    platform: 'Coursera',
    date: 'Feb 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0016.jpg',
    verifyUrl: 'https://coursera.org/verify/WTZK2GRX7RXB',
    category: 'productivity',
  },
  // Leadership & Soft Skills
  {
    id: 'leading-teams',
    title: 'Leading Teams: Building Effective Team Cultures',
    issuer: 'University of Illinois Urbana-Champaign',
    platform: 'Coursera',
    date: 'May 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0012.jpg',
    verifyUrl: 'https://coursera.org/verify/YRR3SNNFNHZ3',
    category: 'leadership',
  },
  {
    id: 'professional-ethics',
    title: 'Master Course of Professional Ethics',
    issuer: 'Udemy',
    platform: 'Udemy',
    date: 'Feb 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0017.jpg',
    category: 'leadership',
  },
  {
    id: 'first-principles-thinking',
    title: 'First Principles Thinking',
    issuer: 'Udemy',
    platform: 'Udemy',
    date: 'Jul 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0019.jpg',
    category: 'leadership',
  },
  // Learning & Meta
  {
    id: 'learning-how-to-learn',
    title: 'Learning How to Learn: Powerful mental tools to help you master tough subjects',
    issuer: 'Deep Teaching Solutions',
    platform: 'Coursera',
    date: 'Feb 2024',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0015.jpg',
    verifyUrl: 'https://coursera.org/verify/65J6ARL9QNSN',
    category: 'leadership',
  },
  // Academic
  {
    id: 'wassce-2023',
    title: 'WASSCE 2023 — 8 A1s (Excellent)',
    issuer: 'West African Examinations Council (Ghana)',
    platform: 'Achimota School',
    date: '2023',
    image: '/certifications/CERTIFICATION_pages-to-jpg-0026.jpg',
    category: 'academic',
    featured: true,
  },
];

const categoryLabels: Record<Certification['category'], string> = {
  programming: 'Programming & Languages',
  'ml-ai': 'ML & AI',
  math: 'Mathematics',
  cad: 'CAD & Design',
  productivity: 'Productivity & Tools',
  leadership: 'Leadership & Learning',
  academic: 'Academic',
};

export const certificationCategories = Object.entries(categoryLabels).map(([key, label]) => ({
  key: key as Certification['category'],
  label,
}));

export function getCertificationsByCategory(): Record<Certification['category'], Certification[]> {
  const grouped: Record<string, Certification[]> = {};
  for (const cat of certificationCategories) {
    grouped[cat.key] = certificationsData.filter((c) => c.category === cat.key);
  }
  return grouped as Record<Certification['category'], Certification[]>;
}

export const platformGroups: { key: PlatformGroup; label: string }[] = [
  { key: 'coursera', label: 'Coursera' },
  { key: 'udemy', label: 'Udemy' },
  { key: 'onshape', label: 'Onshape' },
  { key: 'academic', label: 'Academic' },
];

export function getCertificationsByPlatform(): Record<PlatformGroup, Certification[]> {
  const grouped: Record<string, Certification[]> = {
    coursera: [],
    udemy: [],
    onshape: [],
    academic: [],
  };
  for (const cert of certificationsData) {
    const platform = getPlatformGroup(cert);
    grouped[platform].push(cert);
  }
  return grouped as Record<PlatformGroup, Certification[]>;
}

export const featuredCertifications = certificationsData.filter((c) => c.featured);
export const nonFeaturedCertifications = certificationsData.filter((c) => !c.featured);
