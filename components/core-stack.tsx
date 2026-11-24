const technologies = [
  {
    name: "Flutter",
    mark: (
      <>
        <path fill="currentColor" d="M13.2 2h7.1L7 15.2l-3.6-3.6zm-.1 11.1h7.1l-7.5 7.5-3.5-3.5z" />
        <path fill="currentColor" opacity=".65" d="m9.2 17.1 3.5-3.5 7.6 7.6h-7.1z" />
      </>
    ),
  },
  {
    name: "React",
    mark: (
      <>
        <g fill="none" stroke="currentColor" strokeWidth="1.4">
          {[0, 60, 120].map((angle) => (
            <ellipse key={angle} cx="12" cy="12" rx="10.5" ry="4" transform={`rotate(${angle} 12 12)`} />
          ))}
        </g>
        <circle fill="currentColor" cx="12" cy="12" r="1.8" />
      </>
    ),
  },
  {
    name: "Next.js",
    mark: (
      <>
        <circle cx="12" cy="12" r="10.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7.8 16.6V7.8l10.9 13.6M15.8 7.8v5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </>
    ),
  },
  {
    name: "TypeScript",
    mark: (
      <>
        <rect x="1" y="1" width="22" height="22" rx="2" fill="currentColor" />
        <text
          x="4"
          y="18.8"
          fill="var(--color-panel)"
          fontFamily="Arial, sans-serif"
          fontSize="14"
          fontWeight="bold"
        >
          TS
        </text>
      </>
    ),
  },
  {
    name: "Firebase",
    mark: (
      <>
        <path d="M3.6 17.9 6.6 1.7l4.6 8.2 2.6-5.3 2.3 4.3z" fill="currentColor" opacity=".65" />
        <path d="m3.6 18.6 15-14.3 2.2 14.2-8.4 4.2z" fill="currentColor" />
      </>
    ),
  },
]

export default function CoreStack() {
  return (
    <div className="stack-band">
      <div className="container stack-inner">
        <p>Core stack</p>
        <ul>
          {technologies.map(({ name, mark }) => (
            <li key={name}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {mark}
              </svg>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
