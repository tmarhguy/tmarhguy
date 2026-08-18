export interface Degree {
  school: string;
  degree: string;
  link: string;
  startDate: string;
  endDate: string;
  startLabel: string;
  endLabel: string;
  year: number;
}

const degrees: Degree[] = [
  {
    school: 'University of Pennsylvania',
    degree: 'B.S.E. Computer Engineering',
    link: 'https://www.upenn.edu',
    startDate: '2024-08',
    endDate: '2028-05',
    startLabel: 'Aug 2024',
    endLabel: 'May 2028',
    year: 2028,
  },
];

export default degrees;
