export function ProseAddrPipe({
  caption = 'Superbank latch prefixes every ordinary register access',
}: {
  caption?: string;
}) {
  return (
    <figure className="prose-addr">
      <svg
        className="prose-addr__svg"
        viewBox="0 0 640 168"
        role="img"
        aria-label={caption}
      >
        <title>{caption}</title>
        <defs>
          <marker
            id="prose-addr-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="prose-addr__marker" />
          </marker>
        </defs>

        <rect
          x="40"
          y="16"
          width="200"
          height="52"
          rx="6"
          className="prose-addr__node prose-addr__node--accent"
        />
        <text x="140" y="38" textAnchor="middle" className="prose-addr__text">
          superbank latch
        </text>
        <text x="140" y="54" textAnchor="middle" className="prose-addr__sub">
          7 bits · SETBANK2
        </text>

        <path
          d="M 140 68 V 96"
          className="prose-addr__wire"
          markerEnd="url(#prose-addr-arrow)"
        />

        <rect
          x="40"
          y="100"
          width="200"
          height="52"
          rx="6"
          className="prose-addr__node"
        />
        <text x="140" y="122" textAnchor="middle" className="prose-addr__text">
          instruction fields
        </text>
        <text x="140" y="138" textAnchor="middle" className="prose-addr__sub">
          bank:3 · register:5
        </text>

        <path
          d="M 240 126 H 300"
          className="prose-addr__wire"
          markerEnd="url(#prose-addr-arrow)"
        />
        <path d="M 240 42 H 270 V 126" className="prose-addr__wire" />

        <rect
          x="300"
          y="84"
          width="180"
          height="84"
          rx="6"
          className="prose-addr__node prose-addr__node--accent"
        />
        <text x="390" y="118" textAnchor="middle" className="prose-addr__text">
          15-bit SRAM addr
        </text>
        <text x="390" y="136" textAnchor="middle" className="prose-addr__sub">
          {`{ superbank, bank, reg }`}
        </text>

        <path
          d="M 480 126 H 520"
          className="prose-addr__wire"
          markerEnd="url(#prose-addr-arrow)"
        />

        <rect
          x="520"
          y="100"
          width="100"
          height="52"
          rx="6"
          className="prose-addr__node"
        />
        <text x="570" y="122" textAnchor="middle" className="prose-addr__text">
          1 of
        </text>
        <text x="570" y="138" textAnchor="middle" className="prose-addr__sub">
          32,768
        </text>
      </svg>
      <figcaption className="prose-addr__caption">{caption}</figcaption>
    </figure>
  );
}
