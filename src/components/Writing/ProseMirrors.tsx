export function ProseMirrors({
  caption = 'Three mirrored SRAM banks — broadcast write, independent reads',
}: {
  caption?: string;
}) {
  return (
    <figure className="prose-mirrors">
      <svg
        className="prose-mirrors__svg"
        viewBox="0 0 640 220"
        role="img"
        aria-label={caption}
      >
        <title>{caption}</title>
        <defs>
          <marker
            id="prose-mirrors-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="prose-mirrors__marker" />
          </marker>
        </defs>

        <rect
          x="24"
          y="86"
          width="88"
          height="48"
          rx="6"
          className="prose-mirrors__node prose-mirrors__node--write"
        />
        <text
          x="68"
          y="108"
          textAnchor="middle"
          className="prose-mirrors__text"
        >
          write
        </text>
        <text x="68" y="124" textAnchor="middle" className="prose-mirrors__sub">
          addr + data
        </text>

        <path
          d="M 112 110 H 168"
          className="prose-mirrors__wire"
          markerEnd="url(#prose-mirrors-arrow)"
        />
        <path
          d="M 168 110 V 40 H 220"
          className="prose-mirrors__wire"
          markerEnd="url(#prose-mirrors-arrow)"
        />
        <path
          d="M 168 110 H 220"
          className="prose-mirrors__wire"
          markerEnd="url(#prose-mirrors-arrow)"
        />
        <path
          d="M 168 110 V 180 H 220"
          className="prose-mirrors__wire"
          markerEnd="url(#prose-mirrors-arrow)"
        />

        {[
          { y: 16, label: 'Mirror A', port: 'READ A' },
          { y: 86, label: 'Mirror B', port: 'READ B' },
          { y: 156, label: 'Mirror C', port: 'READ C' },
        ].map((mirror) => (
          <g key={mirror.label}>
            <rect
              x="220"
              y={mirror.y}
              width="200"
              height="48"
              rx="6"
              className="prose-mirrors__node"
            />
            <text
              x="320"
              y={mirror.y + 22}
              textAnchor="middle"
              className="prose-mirrors__text"
            >
              {mirror.label}
            </text>
            <text
              x="320"
              y={mirror.y + 38}
              textAnchor="middle"
              className="prose-mirrors__sub"
            >
              4 × AS6C62256 · 32K × 32
            </text>
            <path
              d={`M 420 ${mirror.y + 24} H 470`}
              className="prose-mirrors__wire"
              markerEnd="url(#prose-mirrors-arrow)"
            />
            <rect
              x="470"
              y={mirror.y}
              width="146"
              height="48"
              rx="6"
              className="prose-mirrors__node prose-mirrors__node--port"
            />
            <text
              x="543"
              y={mirror.y + 28}
              textAnchor="middle"
              className="prose-mirrors__text"
            >
              {mirror.port}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="prose-mirrors__caption">{caption}</figcaption>
    </figure>
  );
}
