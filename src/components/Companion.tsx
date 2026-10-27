type Mood = 'welcome' | 'explain' | 'think' | 'practice' | 'feedback' | 'complete';

const details: Record<Mood, { brow: string; mouth: string; symbol: string }> = {
  welcome: { brow: 'M36 49c5-4 11-4 16 0M68 49c5-4 11-4 16 0', mouth: 'M48 72c8 8 16 8 24 0', symbol: '✦' },
  explain: { brow: 'M36 48h16M68 48h16', mouth: 'M52 75h16', symbol: 'i' },
  think: { brow: 'M36 51c6-6 11-6 16-1M68 50c5-5 11-5 16 0', mouth: 'M52 76c5-3 11-3 16 0', symbol: '?' },
  practice: { brow: 'M36 48h16M68 48h16', mouth: 'M48 73c8 6 16 6 24 0', symbol: '✓' },
  feedback: { brow: 'M36 49c5-4 11-4 16 0M68 49c5-4 11-4 16 0', mouth: 'M49 73c7 7 15 7 22 0', symbol: '↗' },
  complete: { brow: 'M36 49l8 5 8-5M68 49l8 5 8-5', mouth: 'M48 70c8 11 16 11 24 0', symbol: '★' },
};

export default function Companion({ mood = 'welcome', size = 'md', label = 'همراه، راهنمای یادگیری' }: { mood?: Mood; size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const face = details[mood];
  return <figure className={`companion companion-${size} companion-${mood}`} aria-label={label}>
    <svg viewBox="0 0 160 190" role="img" aria-hidden="true">
      <path className="comp-shadow" d="M28 168c20-12 84-12 104 0-7 14-96 14-104 0Z"/>
      <path className="comp-cover" d="M32 23c0-8 7-15 15-15h69c8 0 15 7 15 15v132c0 10-8 18-18 18H50c-10 0-18-8-18-18V23Z"/>
      <path className="comp-page" d="M43 17h70c5 0 9 4 9 9v123c0 7-6 13-13 13H43V17Z"/>
      <path className="comp-spine" d="M43 17v145"/>
      <path className="comp-line" d="M54 108h45M54 119h34M54 130h40"/>
      <circle className="comp-eye" cx="44" cy="60" r="5"/><circle className="comp-eye" cx="76" cy="60" r="5"/>
      <path className="comp-face" d={face.brow}/><path className="comp-face" d={face.mouth}/>
      <circle className="comp-badge" cx="112" cy="42" r="20"/><text className="comp-symbol" x="112" y="50" textAnchor="middle">{face.symbol}</text>
      <path className="comp-arm comp-arm-left" d="M33 96c-18 2-20 18-9 27"/><path className="comp-arm comp-arm-right" d="M130 96c17 2 19 18 9 27"/>
      <path className="comp-leg" d="M58 173v9M105 173v9"/>
    </svg>
  </figure>;
}
