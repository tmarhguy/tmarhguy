import degrees from '@/data/resume/degrees';

export default function ResumeEducationHeadline() {
  const degree = degrees[0];
  if (!degree) {
    return null;
  }

  const program = degree.degree.replace(/^B\.S\.E\.\s+/, '');

  return (
    <p className="resume-education-headline">
      <strong>{program}</strong>
      <span aria-hidden="true"> · </span>
      <a href={degree.link}>{degree.school}</a>
      <span aria-hidden="true"> · </span>
      <time dateTime={degree.startDate}>{degree.startLabel}</time>
      <span aria-hidden="true"> – </span>
      <time dateTime={degree.endDate}>{degree.endLabel}</time>
    </p>
  );
}
