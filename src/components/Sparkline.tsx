import React, { useId } from 'react';

interface SparklineProps {
  data: number[];
  isPositive?: boolean;
  height?: number;
  width?: number;
  showFill?: boolean;
  strokeWidth?: number;
  className?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  isPositive = true,
  height = 56,
  width = 200,
  showFill = true,
  strokeWidth = 2.5,
  className = ''
}) => {
  const gradientId = useId();

  if (!data || data.length < 2) {
    return <div style={{ height, width }} className={className} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Map data to SVG points
  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    // in SVG y=0 is top, so we invert
    const y = height - ((val - min) / range) * (height * 0.75) - (height * 0.12);
    return { x, y };
  });

  // Construct smooth cubic or quadratic bezier curve path
  let pathD = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    pathD += ` Q ${controlX},${current.y} ${next.x},${next.y}`;
  }

  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  const strokeColor = isPositive ? '#089981' : '#f23645';
  const glowClass = isPositive ? 'sparkline-glow' : 'sparkline-glow-red';

  return (
    <div className={`relative w-full h-full ${glowClass} ${className}`}>
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {showFill && <path d={areaD} fill={`url(#${gradientId})`} />}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
