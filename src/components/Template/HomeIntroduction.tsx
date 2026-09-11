import work from '@/data/resume/work';

export default function HomeIntroduction({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div className={`professional-summary ${className}`}>
      <p className="hero-statement">
        I build computers
        <br />
        from first principles.
      </p>
      <p>
        Computer Engineering junior at the{' '}
        <a href="https://www.upenn.edu">University of Pennsylvania</a>. I design
        processors, build the hardware, and write the software that runs on
        them. My independent 32-bit computer is{' '}
        <a href="https://tomato.tmarhguy.com">Tomato</a>.
      </p>
      <p className="hero-work">
        Engineering work & roles:{' '}
        {['Fluid Silicon', 'Aragorn', 'Vero'].map((name, index) => {
          const job = work.find((entry) => entry.name.includes(name));
          return job ? (
            <span key={name}>
              {index > 0 ? ' · ' : ''}
              <a href={job.url}>{job.name}</a>
              {job.upcoming ? ' (incoming)' : ''}
            </span>
          ) : null;
        })}
        .
      </p>
      <p className="hero-story-link">
        <a href="/about/">From Ghana to Penn: my story</a>
        <a href="https://en.wikipedia.org/wiki/Tyrone_Marhguy">Wikipedia</a>
      </p>
    </div>
  );
}
