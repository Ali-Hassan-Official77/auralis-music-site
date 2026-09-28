export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id="au-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5CF2C0" />
          <stop offset=".55" stopColor="#4CC9F0" />
          <stop offset="1" stopColor="#8B7BFF" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="#0C1322" stroke="#fff" strokeOpacity=".1" />
      <g fill="url(#au-g)">
        <rect x="13" y="27" width="6" height="10" rx="3" />
        <rect x="22.5" y="19" width="6" height="26" rx="3" />
        <rect x="32" y="12" width="6" height="40" rx="3" />
        <rect x="41.5" y="21" width="6" height="22" rx="3" />
      </g>
      <path d="M8 40c6 12 18 17 30 13" fill="none" stroke="url(#au-g)" strokeWidth="2.4" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark />
      <span className="font-display text-[23px] font-bold leading-none tracking-[-.04em] text-snow">Auralis</span>
    </span>
  );
}
