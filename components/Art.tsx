/* Hand-drawn SVG illustrations used across Auralis. */

export function OrbitHero({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 420" className={className} role="img" aria-label="Sound waves orbiting a glowing core">
      <defs>
        <linearGradient id="oh-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5CF2C0" /><stop offset=".55" stopColor="#4CC9F0" /><stop offset="1" stopColor="#8B7BFF" />
        </linearGradient>
        <radialGradient id="oh-core" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#5CF2C0" stopOpacity=".55" /><stop offset="1" stopColor="#5CF2C0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="210" r="120" fill="url(#oh-core)" />
      <g fill="none" stroke="url(#oh-g)" strokeLinecap="round">
        <circle cx="210" cy="210" r="188" strokeOpacity=".18" strokeDasharray="2 9" />
        <circle cx="210" cy="210" r="150" strokeOpacity=".3" />
        <circle cx="210" cy="210" r="112" strokeOpacity=".5" />
        <ellipse cx="210" cy="210" rx="188" ry="70" strokeOpacity=".28" transform="rotate(-24 210 210)" />
      </g>
      <g className="origin-center animate-orbit" style={{ transformOrigin: "210px 210px" }}>
        <circle cx="210" cy="22" r="7" fill="#5CF2C0" />
        <circle cx="342" cy="288" r="5" fill="#8B7BFF" />
        <circle cx="70" cy="300" r="4" fill="#4CC9F0" />
      </g>
      <g fill="url(#oh-g)">
        {[[150,-14],[168,-30],[186,-52],[204,-72],[222,-52],[240,-34],[258,-16]].map(([x, h], i) => (
          <rect key={i} x={x} y={210 + h / 2 - Math.abs(h)} width="10" height={Math.abs(h) * 2} rx="5" />
        ))}
      </g>
    </svg>
  );
}

export function GenreArt({ index, from, to, className = "" }: { index: number; from: string; to: string; className?: string }) {
  const id = `ga-${index}`;
  const kind = index % 4;
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={from} /><stop offset="1" stopColor={to} /></linearGradient>
      </defs>
      <rect width="200" height="120" fill={`url(#${id})`} opacity=".92" />
      <g fill="none" stroke="#060A13" strokeOpacity=".28" strokeWidth="2" strokeLinecap="round">
        {kind === 0 && [0, 1, 2, 3].map((i) => <path key={i} d={`M-10 ${70 + i * 12} C 40 ${20 + i * 10}, 90 ${120 - i * 8}, 210 ${50 + i * 14}`} />)}
        {kind === 1 && [22, 44, 66, 88].map((r) => <circle key={r} cx="150" cy="86" r={r} />)}
        {kind === 2 && [0, 1, 2, 3, 4, 5, 6].map((i) => <path key={i} d={`M${20 + i * 26} 120 V ${90 - ((i * 37) % 55)}`} strokeWidth="9" />)}
        {kind === 3 && [0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3, 4, 5, 6, 7].map((c) => <circle key={`${r}-${c}`} cx={18 + c * 24} cy={20 + r * 26} r={(r + c) % 3 === 0 ? 4 : 2} fill="#060A13" fillOpacity=".25" stroke="none" />))}
      </g>
    </svg>
  );
}

export function EmptyOrbit({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none" strokeLinecap="round">
      <defs><linearGradient id="eo-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5CF2C0" /><stop offset="1" stopColor="#8B7BFF" /></linearGradient></defs>
      <circle cx="60" cy="60" r="46" stroke="url(#eo-g)" strokeOpacity=".35" strokeDasharray="2 7" />
      <circle cx="60" cy="60" r="30" stroke="url(#eo-g)" strokeOpacity=".6" />
      <circle cx="60" cy="60" r="8" fill="url(#eo-g)" />
      <circle cx="96" cy="38" r="4.5" fill="#4CC9F0" />
    </svg>
  );
}
