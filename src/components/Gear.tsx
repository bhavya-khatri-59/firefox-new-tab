import { useState } from "react";

interface GearProps {
  size?: number;
  className?: string;
  reverse?: boolean;
  onClick?: () => void;
}

const Gear = ({ size = 80, className = "", reverse: initialReverse = false, onClick }: GearProps) => {
  const [reverse, setReverse] = useState(initialReverse);

  const handleClick = () => {
    setReverse(!reverse);
    onClick?.();
  };
  const teeth = 16;
  const innerRadius = size * 0.3;
  const outerRadius = size * 0.42;
  const toothDepth = size * 0.08;
  
  // Create gear teeth path
  const points = [];
  for (let i = 0; i < teeth; i++) {
    const baseAngle = (i * 2 * Math.PI) / teeth;
    const nextAngle = ((i + 1) * 2 * Math.PI) / teeth;
    const toothAngle = (nextAngle - baseAngle) * 0.4;
    
    // Outer tooth edge
    const angle1 = baseAngle - toothAngle / 2;
    const angle2 = baseAngle + toothAngle / 2;
    const angle3 = nextAngle - toothAngle / 2;
    
    const x1 = size / 2 + (outerRadius + toothDepth) * Math.cos(angle1);
    const y1 = size / 2 + (outerRadius + toothDepth) * Math.sin(angle1);
    const x2 = size / 2 + (outerRadius + toothDepth) * Math.cos(angle2);
    const y2 = size / 2 + (outerRadius + toothDepth) * Math.sin(angle2);
    
    // Base between teeth
    const x3 = size / 2 + outerRadius * Math.cos(angle2);
    const y3 = size / 2 + outerRadius * Math.sin(angle2);
    const x4 = size / 2 + outerRadius * Math.cos(angle3);
    const y4 = size / 2 + outerRadius * Math.sin(angle3);
    
    points.push(`${x1},${y1}`, `${x2},${y2}`, `${x3},${y3}`, `${x4},${y4}`);
  }

  return (
    <div 
      className={`absolute ${reverse ? 'gear-animate-reverse' : 'gear-animate'} ${className} cursor-pointer hover:opacity-100 transition-opacity`}
      onClick={handleClick}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id={`gearGradient-${size}-${reverse ? 'r' : 'f'}`}>
            <stop offset="20%" stopColor="hsl(35, 28%, 62%)" />
            <stop offset="100%" stopColor="hsl(30, 22%, 38%)" />
          </radialGradient>
          <filter id={`shadow-${size}`}>
            <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.35"/>
          </filter>
        </defs>
        
        {/* Outer gear teeth */}
        <polygon 
          points={points.join(' ')} 
          fill={`url(#gearGradient-${size}-${reverse ? 'r' : 'f'})`}
          stroke="hsl(30, 18%, 28%)" 
          strokeWidth="1.5"
          filter={`url(#shadow-${size})`}
        />
        
        {/* Inner circle */}
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={innerRadius} 
          fill="hsl(30, 22%, 48%)" 
          stroke="hsl(30, 18%, 28%)" 
          strokeWidth="2"
        />
        
        {/* Center hole */}
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={innerRadius * 0.35} 
          fill="hsl(30, 15%, 22%)" 
          stroke="hsl(30, 12%, 18%)" 
          strokeWidth="2"
        />
        
        {/* Spokes */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = size / 2 + (innerRadius * 0.4) * Math.cos(rad);
          const y1 = size / 2 + (innerRadius * 0.4) * Math.sin(rad);
          const x2 = size / 2 + (innerRadius * 0.95) * Math.cos(rad);
          const y2 = size / 2 + (innerRadius * 0.95) * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(30, 18%, 28%)"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Gear;