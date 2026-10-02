export default function PublisherMark({ publisher }: { publisher: string }) {
  if (publisher === 'BBC Pidgin') {
    return (
      <span className="press-publisher-mark" aria-label="BBC Pidgin">
        <svg aria-hidden="true" viewBox="0 0 96 30" width="64" height="20">
          <rect width="30" height="30" fill="currentColor" />
          <rect x="33" width="30" height="30" fill="currentColor" />
          <rect x="66" width="30" height="30" fill="currentColor" />
          <g
            fill="var(--color-bg)"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="25"
            textAnchor="middle"
          >
            <text x="15" y="24">
              B
            </text>
            <text x="48" y="24">
              B
            </text>
            <text x="81" y="24">
              C
            </text>
          </g>
        </svg>
        <span>Pidgin</span>
      </span>
    );
  }
  if (publisher === 'Deutsche Welle') {
    return (
      <span className="press-publisher-mark" aria-label="Deutsche Welle">
        <svg aria-hidden="true" viewBox="0 0 74 36" width="49" height="24">
          <g fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="21" cy="18" r="16" />
            <circle cx="51" cy="18" r="16" />
          </g>
          <g
            fill="currentColor"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="21"
            textAnchor="middle"
          >
            <text x="21" y="25">
              D
            </text>
            <text x="51" y="25">
              W
            </text>
          </g>
        </svg>
      </span>
    );
  }
  return (
    <span
      className="press-publisher-mark press-joy-mark"
      aria-label={publisher}
    >
      myjoy<span>online</span>
    </span>
  );
}
