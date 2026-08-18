import type { ResumeOpenSourceEntry } from '@/data/resume/open-source';

import OpenSourceEntry from './OpenSource/OpenSourceEntry';

interface OpenSourceProps {
  data: ResumeOpenSourceEntry[];
}

export default function OpenSource({ data }: OpenSourceProps) {
  return (
    <div className="open-source">
      <div className="title">
        <h2>Open Source</h2>
      </div>
      <div className="experience-spine">
        {data.map((entry) => (
          <OpenSourceEntry data={entry} key={entry.title} />
        ))}
      </div>
    </div>
  );
}
