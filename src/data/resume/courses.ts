export interface Course {
  title: string;
  number: string;
  link: string;
  university: string;
}

function pennCatalogLink(number: string): string {
  return `https://catalog.upenn.edu/search/?search=${encodeURIComponent(number)}`;
}

/** Technical coursework — CIS, ESE, math, and science relevant to CMPE / EE. */
const courses: Course[] = [
  {
    title: 'Programming Languages and Techniques I',
    number: 'CIS 1200',
    link: pennCatalogLink('CIS 1200'),
    university: 'Penn',
  },
  {
    title: 'Programming Languages and Techniques II',
    number: 'CIS 1210',
    link: pennCatalogLink('CIS 1210'),
    university: 'Penn',
  },
  {
    title: 'Mathematical Foundations of Computer Science',
    number: 'CIS 1600',
    link: pennCatalogLink('CIS 1600'),
    university: 'Penn',
  },
  {
    title: 'Intro to Computer Systems',
    number: 'CIS 2400',
    link: pennCatalogLink('CIS 2400'),
    university: 'Penn',
  },
  {
    title: 'Big Data Analytics',
    number: 'CIS 2450',
    link: pennCatalogLink('CIS 2450'),
    university: 'Penn',
  },
  {
    title: 'Engineering Electromagnetics',
    number: 'ESE 1120',
    link: pennCatalogLink('ESE 1120'),
    university: 'Penn',
  },
  {
    title: 'Electrical Circuits and Systems',
    number: 'ESE 2150',
    link: pennCatalogLink('ESE 2150'),
    university: 'Penn',
  },
  {
    title: 'Embedded Systems / Microcontroller Lab',
    number: 'ESE 3500',
    link: pennCatalogLink('ESE 3500'),
    university: 'Penn',
  },
  {
    title: 'Digital Systems Design',
    number: 'ESE 3700',
    link: pennCatalogLink('ESE 3700'),
    university: 'Penn',
  },
  {
    title: 'Power Electronics',
    number: 'ESE 4800',
    link: pennCatalogLink('ESE 4800'),
    university: 'Penn',
  },
  {
    title: 'Digital Integrated Circuits and VLSI-Fundamentals',
    number: 'ESE 5700',
    link: pennCatalogLink('ESE 5700'),
    university: 'Penn',
  },
  {
    title: 'Computer Organization and Design',
    number: 'CIS 4710',
    link: pennCatalogLink('CIS 4710'),
    university: 'Penn',
  },
  {
    title: 'Calculus, Part I',
    number: 'MATH 1400',
    link: pennCatalogLink('MATH 1400'),
    university: 'Penn',
  },
  {
    title: 'Calculus Part II',
    number: 'MATH 1410',
    link: pennCatalogLink('MATH 1410'),
    university: 'Penn',
  },
  {
    title: 'Calculus Part III',
    number: 'MATH 2400',
    link: pennCatalogLink('MATH 2400'),
    university: 'Penn',
  },
  {
    title: 'Linear Algebra',
    number: 'MATH 3120',
    link: pennCatalogLink('MATH 3120'),
    university: 'Penn',
  },
  {
    title: 'Ordinary Differential Equations',
    number: 'MATH 4200',
    link: pennCatalogLink('MATH 4200'),
    university: 'Penn',
  },
  {
    title: 'Probability',
    number: 'STAT 4300',
    link: pennCatalogLink('STAT 4300'),
    university: 'Penn',
  },
  {
    title: 'Principles I',
    number: 'PHYS 0150',
    link: pennCatalogLink('PHYS 0150'),
    university: 'Penn',
  },
  {
    title: 'Independent Study',
    number: 'EAS 0099',
    link: pennCatalogLink('EAS 0099'),
    university: 'Penn',
  },
];

export default courses;
