interface GearProps {
  size?: number;
  className?: string;
  reverse?: boolean;
}

const Gear = ({ size = 120, className = "", reverse = false }: GearProps) => {
  const teeth = 12;
  const innerRadius = size * 0.35;
  const outerRadius = size * 0.5;
  const toothHeight = size * 0.08;
  
  const points = [];
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (i * Math.PI) / teeth;
    const radius = i % 2 === 0 ? outerRadius + toothHeight : outerRadius;
    const x = size / 2 + radius * Math.cos(angle);
    const y = size / 2 + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  return (
    <div className={`${reverse ? 'gear-animate-reverse' : 'gear-animate'} ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id={`gearGradient-${size}`}>
            <stop offset="0%" className="[stop-color:hsl(var(--gear))]" />
            <stop offset="100%" className="[stop-color:hsl(var(--gear-dark))]" />
          </radialGradient>
        </defs>
        <polygon points={points.join(' ')} fill={`url(#gearGradient-${size})`} stroke="hsl(var(--gear-dark))" strokeWidth="2"/>
        <circle cx={size / 2} cy={size / 2} r={innerRadius} fill="hsl(var(--gear-dark))" stroke="hsl(var(--gear))" strokeWidth="2"/>
        <circle cx={size / 2} cy={size / 2} r={innerRadius * 0.3} fill="hsl(var(--primary))" stroke="hsl(var(--gear-dark))" strokeWidth="2"/>
      </svg>
    </div>
  );
};

export default Gear;
