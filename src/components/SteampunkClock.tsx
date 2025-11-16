import { useState, useEffect } from "react";

const SteampunkClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (hours * 30) + (minutes * 0.5);
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  const romanNumerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

  return (
    <div className="relative flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
        {/* Outer decorative ring */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          opacity="0.3"
        />
        
        {/* Main clock face */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--accent))"
          strokeWidth="4"
        />
        
        {/* Inner decorative ring */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* Hour markers and Roman numerals */}
        {romanNumerals.map((numeral, index) => {
          const angle = (index * 30 - 90) * (Math.PI / 180);
          const x = 100 + 65 * Math.cos(angle);
          const y = 100 + 65 * Math.sin(angle);
          
          return (
            <g key={index}>
              {/* Hour marker line */}
              <line
                x1={100 + 75 * Math.cos(angle)}
                y1={100 + 75 * Math.sin(angle)}
                x2={100 + 80 * Math.cos(angle)}
                y2={100 + 80 * Math.sin(angle)}
                stroke="hsl(var(--primary-foreground))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Roman numeral */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="hsl(var(--primary-foreground))"
                fontSize="14"
                fontFamily="serif"
                fontWeight="bold"
              >
                {numeral}
              </text>
            </g>
          );
        })}

        {/* Minute markers */}
        {[...Array(60)].map((_, i) => {
          if (i % 5 !== 0) {
            const angle = (i * 6 - 90) * (Math.PI / 180);
            return (
              <line
                key={`min-${i}`}
                x1={100 + 78 * Math.cos(angle)}
                y1={100 + 78 * Math.sin(angle)}
                x2={100 + 80 * Math.cos(angle)}
                y2={100 + 80 * Math.sin(angle)}
                stroke="hsl(var(--primary-foreground))"
                strokeWidth="1"
                opacity="0.6"
              />
            );
          }
          return null;
        })}

        {/* Hour hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + 40 * Math.sin(hourAngle * (Math.PI / 180))}
          y2={100 - 40 * Math.cos(hourAngle * (Math.PI / 180))}
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="6"
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}
        />

        {/* Minute hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + 55 * Math.sin(minuteAngle * (Math.PI / 180))}
          y2={100 - 55 * Math.cos(minuteAngle * (Math.PI / 180))}
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}
        />

        {/* Second hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + 65 * Math.sin(secondAngle * (Math.PI / 180))}
          y2={100 - 65 * Math.cos(secondAngle * (Math.PI / 180))}
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Center decorative elements */}
        <circle
          cx="100"
          cy="100"
          r="8"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="2"
        />
        <circle
          cx="100"
          cy="100"
          r="3"
          fill="hsl(var(--primary-foreground))"
        />

        {/* Decorative corner screws */}
        {[45, 135, 225, 315].map((angle) => {
          const x = 100 + 88 * Math.cos((angle - 90) * (Math.PI / 180));
          const y = 100 + 88 * Math.sin((angle - 90) * (Math.PI / 180));
          return (
            <g key={angle}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="hsl(var(--accent))"
                stroke="hsl(var(--primary-foreground))"
                strokeWidth="1"
              />
              <line
                x1={x - 2}
                y1={y}
                x2={x + 2}
                y2={y}
                stroke="hsl(var(--primary-foreground))"
                strokeWidth="1"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SteampunkClock;
