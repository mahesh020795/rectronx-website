export default function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rectronx"
    >
      <text
        x="0"
        y="46"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="48"
        fill="#0F1C2E"
        letterSpacing="-1"
      >
        Rectronx
      </text>
      <g transform="translate(178, 4)">
        <rect x="0" y="0" width="40" height="40" rx="6" fill="#2B7FD4" />
        <rect x="3" y="3" width="34" height="34" rx="4" fill="white" fillOpacity="0.15" />
        <line x1="4" y1="10" x2="0" y2="10" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="4" y1="20" x2="0" y2="20" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="4" y1="30" x2="0" y2="30" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="36" y1="10" x2="40" y2="10" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="36" y1="20" x2="40" y2="20" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="36" y1="30" x2="40" y2="30" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="10" y1="4" x2="10" y2="0" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="4" x2="20" y2="0" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="4" x2="30" y2="0" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="10" y1="36" x2="10" y2="40" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="36" x2="20" y2="40" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="30" y1="36" x2="30" y2="40" stroke="#2B7FD4" strokeWidth="2.5" strokeLinecap="round" />
        <polyline
          points="6,20 11,20 14,12 18,28 22,16 26,24 29,20 34,20"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
