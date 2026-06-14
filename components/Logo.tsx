export default function Logo({
  className = "h-9 w-auto",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const textColor = variant === "light" ? "#FFFFFF" : "#0F1C2E";

  return (
    <svg
      viewBox="0 0 310 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rectronx Circuits"
    >
      {/* Wordmark */}
      <text
        x="0"
        y="48"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="50"
        fill={textColor}
        letterSpacing="-1.5"
      >
        Rectronx
      </text>

      {/* Chip icon — positioned to the right of the text */}
      <g transform="translate(248, 6)">
        {/* Chip body */}
        <rect x="8" y="8" width="44" height="44" rx="8" fill="#2B7FD4" />

        {/* Left pins */}
        <line x1="8" y1="18" x2="0" y2="18" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />
        <line x1="8" y1="30" x2="0" y2="30" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />
        <line x1="8" y1="42" x2="0" y2="42" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />

        {/* Right pins */}
        <line x1="52" y1="18" x2="60" y2="18" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />
        <line x1="52" y1="30" x2="60" y2="30" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />
        <line x1="52" y1="42" x2="60" y2="42" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />

        {/* Top pins */}
        <line x1="20" y1="8" x2="20" y2="0" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />
        <line x1="30" y1="8" x2="30" y2="0" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="8" x2="40" y2="0" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />

        {/* Bottom pins */}
        <line x1="20" y1="52" x2="20" y2="60" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />
        <line x1="30" y1="52" x2="30" y2="60" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="52" x2="40" y2="60" stroke="#2B7FD4" strokeWidth="3" strokeLinecap="round" />

        {/* ECG / heartbeat waveform inside chip */}
        <polyline
          points="11,30 17,30 21,18 25,42 29,24 33,36 37,30 49,30"
          fill="none"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
