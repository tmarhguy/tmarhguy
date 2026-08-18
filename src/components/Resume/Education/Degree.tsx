import type { Degree as DegreeType } from '@/data/resume/degrees';

interface DegreeProps {
  data: DegreeType;
}

export default function Degree({ data }: DegreeProps) {
  return (
    <article className="degree-container">
      <header>
        <h3 className="degree">{data.degree}</h3>
        <p className="school">
          <a href={data.link}>{data.school}</a>,{' '}
          <time dateTime={data.startDate}>{data.startLabel}</time>
          {' – '}
          <time dateTime={data.endDate}>{data.endLabel}</time>
        </p>
      </header>
    </article>
  );
}
