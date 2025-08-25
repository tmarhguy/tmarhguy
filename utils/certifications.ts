export type Certification = {
  title: string;
  course?: string;
  issuer: string;
  date: string;
  description?: string;
  link?: string | null;
  downloadUrl?: string | null;
  category: string;
};

export const CERTIFICATIONS: Certification[] = [
  // Machine Learning & AI
  {
    title: "Machine Learning I",
    course: "Machine Learning Fundamentals",
    issuer: "Columbia University",
    date: "Aug 2025",
    description:
      "Comprehensive understanding of supervised and unsupervised machine learning techniques including linear regression, classification, clustering, and dimensionality reduction. Covers mathematical foundations and practical coding projects.",
    link: "https://badges.plus.columbia.edu/882317c6-ea49-4c1e-b12b-8623bfe5db1c#acc.vg2zQre8",
    downloadUrl: null,
    category: "Machine Learning",
  },

  // Programming & Computer Science
  {
    title: "HTML: Metadata in the Head",
    course: "Web Development Fundamentals",
    issuer: "LinkedIn Learning",
    date: "Jun 2025",
    description:
      "Comprehensive understanding of HTML metadata and head elements for web development.",
    link:
      "https://www.linkedin.com/learning/certificates/fb8f1c4fc26cde49ee4c8c59f22346615c0755b34265c55f30771a03c8706138",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Complete Guide to C Programming Foundations",
    course: "C Programming Language",
    issuer: "LinkedIn Learning",
    date: "Dec 2024",
    description:
      "Complete foundation in C programming language covering core concepts and best practices.",
    link:
      "https://www.linkedin.com/learning/certificates/8d63c3fdcae1226eec9d996eb63f4c3e24f717826d6519c54b2a0911ccd19d83",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Java 8 Essential Training",
    course: "Java Programming",
    issuer: "LinkedIn Learning",
    date: "Nov 2024",
    description:
      "Essential Java 8 training covering syntax, structure, and programming concepts.",
    link:
      "https://www.linkedin.com/learning/certificates/61894ed39c9d065b58cfd67826af11d0845520833ad8ce0cb433010291d699ff",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Java Essential Training: Syntax and Structure",
    course: "Java Programming Fundamentals",
    issuer: "LinkedIn Learning",
    date: "Nov 2024",
    description:
      "Core Java syntax and structural programming concepts for building robust applications.",
    link:
      "https://www.linkedin.com/learning/certificates/2a6f5d2d59462d7b8330625860df56936718d29230d2bf6e101387c965b8e36d?trk=share_certificate",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Learning Git and GitHub",
    course: "Version Control Systems",
    issuer: "LinkedIn Learning",
    date: "Oct 2024",
    description:
      "Comprehensive training in Git version control and GitHub collaboration workflows.",
    link:
      "https://www.linkedin.com/learning/certificates/8c82d45c640cdca85a026439d647a6961f2c36124f98dbd60f150a03ff030e48?trk=share_certificate",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Learning Java 17",
    course: "Modern Java Development",
    issuer: "LinkedIn Learning",
    date: "Oct 2024",
    description:
      "Modern Java 17 features and programming techniques for contemporary development.",
    link:
      "https://www.linkedin.com/learning/certificates/5ff7512490bc6b8aa4d5a38d5cf7f8978e0b458496fddce77b8a18acdbee19bd?trk=share_certificate",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Practice It: Java",
    course: "Java Programming Practice",
    issuer: "LinkedIn Learning",
    date: "Oct 2024",
    description:
      "Hands-on Java programming practice and practical application exercises.",
    link:
      "https://www.linkedin.com/learning/certificates/5ff7512490bc6b8aa4d5a38d5cf7f8978e0b458496fddce77b8a18acdbee19bd?trk=share_certificate",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Crash Course on Python",
    course: "Python Programming",
    issuer: "Google",
    date: "Jun 2024",
    description:
      "Comprehensive Python crash course covering automation, data structures, and scripting fundamentals.",
    link: "https://www.coursera.org/account/accomplishments/verify/LFT2Y8N63M2Q",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Introduction to Python Programming",
    course: "Python Fundamentals",
    issuer: "University of Pennsylvania",
    date: "May 2024",
    description:
      "Core Python programming concepts including data structures, conditionals, loops, and functions.",
    link: "https://www.coursera.org/account/accomplishments/certificate/VSSGBG5QCXM7",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Python (Basic) Certificate",
    course: "Python Problem Solving",
    issuer: "HackerRank",
    date: "May 2024",
    description:
      "HackerRank certification demonstrating basic Python skills and problem-solving abilities.",
    link: "https://www.hackerrank.com/certificates/ff2e8c2b34eb",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "HTML - The Complete Guide to HTML for Beginners",
    course: "Web Development",
    issuer: "Udemy",
    date: "May 2024",
    description:
      "Complete HTML fundamentals including semantic tags, forms, and HTML5 modern techniques.",
    link: "https://www.udemy.com/certificate/UC-5009eb54-c157-49b5-99ee-b43644a78594/",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Java for Beginners - Learn all the Basics of Java",
    course: "Java Programming",
    issuer: "Udemy",
    date: "Apr 2024",
    description:
      "Comprehensive Java basics covering functions, program creation, and practical exercises.",
    link: "https://www.udemy.com/certificate/UC-b853157a-5c2b-45cf-a528-4da8f9f2f2f5/",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Programming Fundamentals",
    course: "Computer Science",
    issuer: "Duke University",
    date: "Mar 2024",
    description:
      "Core programming concepts including algorithms, problem-solving, and C programming language.",
    link: "https://www.coursera.org/account/accomplishments/verify/3GHWGX7LK6TT",
    downloadUrl: null,
    category: "Programming",
  },
  {
    title: "Introduction to Programming with MATLAB",
    course: "MATLAB Programming",
    issuer: "Vanderbilt University",
    date: "May 2024",
    description:
      "MATLAB programming fundamentals including variables, control structures, and matrix operations.",
    link: "https://www.coursera.org/account/accomplishments/verify/WEJV4XRWTJYD",
    downloadUrl: null,
    category: "Programming",
  },

  // C Programming Specialization
  {
    title: "C Programming - Getting Started - 1",
    course: "C Programming Fundamentals",
    issuer: "Dartmouth College",
    date: "Jan 2024",
    description:
      "Introduction to C programming covering hardware/software concepts and basic program structure.",
    link: "https://www.coursera.org/account/accomplishments/verify/MUTV8C953AFU",
    downloadUrl: null,
    category: "C Programming",
  },
  {
    title: "C Programming - Language Foundations - 2",
    course: "C Programming Intermediate",
    issuer: "Dartmouth College",
    date: "Feb 2024",
    description:
      "Advanced C concepts including arrays, loops, strings, and sorting algorithms.",
    link: "https://www.coursera.org/account/accomplishments/verify/JRFAQR899YL2",
    downloadUrl: null,
    category: "C Programming",
  },
  {
    title: "C Programming - Modular Programming and Memory Management - 3",
    course: "C Programming Advanced",
    issuer: "Dartmouth College",
    date: "Mar 2024",
    description:
      "Modular programming, functions, memory organization, and pointer fundamentals.",
    link: "https://www.coursera.org/account/accomplishments/verify/SHVUSM6RGN3J",
    downloadUrl: null,
    category: "C Programming",
  },
  {
    title: "C Programming: Pointers and Memory Management - 4",
    course: "C Programming Expert",
    issuer: "Dartmouth College",
    date: "Mar 2024",
    description:
      "Advanced pointer concepts, dynamic memory allocation, and string arrays.",
    link: "https://www.coursera.org/account/accomplishments/verify/CP8QASQSZ28C",
    downloadUrl: null,
    category: "C Programming",
  },
  {
    title: "C Programming - Advanced Data Types - 5",
    course: "C Programming Mastery",
    issuer: "Dartmouth College",
    date: "Apr 2024",
    description:
      "Advanced data types, structures, linked lists, and dynamic memory management.",
    link: "https://www.coursera.org/account/accomplishments/verify/Z24GAQ5PUWZU",
    downloadUrl: null,
    category: "C Programming",
  },

  // Engineering & Design
  {
    title: "Introduction to Parametric Feature-Based CAD",
    course: "Computer-Aided Design",
    issuer: "Onshape by PTC",
    date: "Jul 2024",
    description:
      "Professional CAD training in parametric feature-based design using Onshape software.",
    link: null,
    downloadUrl: null,
    category: "Engineering",
  },

  // Mathematics & AI
  {
    title: "Matrix Algebra for Engineers",
    course: "Advanced Mathematics",
    issuer: "The Hong Kong University of Science and Technology",
    date: "Jun 2024",
    description:
      "Comprehensive matrix algebra covering linear equations, vector spaces, and eigenvalues.",
    link: "https://www.coursera.org/account/accomplishments/verify/DV3EELMPZ24J",
    downloadUrl: null,
    category: "Mathematics",
  },
  {
    title: "Introduction to Generative AI",
    course: "Artificial Intelligence",
    issuer: "Google Cloud Skills Boost",
    date: "Feb 2024",
    description:
      "Fundamentals of generative AI including GANs, VAEs, and AI applications.",
    link: "https://www.coursera.org/account/accomplishments/verify/SC4N52PHGMJ8",
    downloadUrl: null,
    category: "AI/ML",
  },

  // Professional Development
  {
    title: "Leading Teams: Building Effective Team Cultures",
    course: "Leadership & Management",
    issuer: "Gies College of Business - University of Illinois Urbana-Champaign",
    date: "May 2024",
    description:
      "Team leadership skills including motivation, DEIB, culture building, and psychological safety.",
    link: "https://coursera.org/share/35667ea45c57ebf78668b50bc5d432c4",
    downloadUrl: null,
    category: "Leadership",
  },
  {
    title: "Master Course of Professional Ethics",
    course: "Professional Development",
    issuer: "Udemy",
    date: "Mar 2024",
    description:
      "Comprehensive professional ethics training covering workplace impact and ethical practices.",
    link: "https://www.udemy.com/certificate/UC-1d0bc2d7-648b-4c20-812c-4bff86dd8c51/",
    downloadUrl: null,
    category: "Professional",
  },
  
  {
    title:
      "Learning How to Learn: Powerful mental tools to help you master tough subjects",
    course: "Learning Strategies",
    issuer: "Coursera",
    date: "Feb 2024",
    description:
      "Advanced learning techniques including Pomodoro method, meta-learning, and test preparation.",
    link: "https://www.coursera.org/account/accomplishments/verify/65J6ARL9QNSN",
    downloadUrl: null,
    category: "Learning",
  },

  // Office & Productivity
  
  {
    title: "Create a Website Using WordPress - Free Hosting & Sub-domain",
    course: "Web Development",
    issuer: "WordPress",
    date: "2022",
    description:
      "WordPress website creation with free hosting and domain management.",
    link: "https://www.coursera.org/account/accomplishments/verify/WTZK2GRX7RXB",
    downloadUrl: null,
    category: "Web Development",
  },
];
