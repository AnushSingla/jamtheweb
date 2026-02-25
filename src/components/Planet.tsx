import ExpenseCloud from "./ExpenseCloud";

export type CloudState = "normal" | "thunder" | "rain";

interface PlanetProps {
  name: string;
  description: string;
  color: string;
  glowColor: string;
  size: number;
  orbitRadius: number;
  duration: number;
  icon: string;
  budget?: number;
  spent?: number;
  delay?: number;
}

function getCloudState(budget?: number, spent?: number): CloudState {
  if (budget === undefined || spent === undefined) return "normal";
  if (spent > budget) return "rain";
  if (spent === budget) return "thunder";
  return "normal";
}

const Planet = ({ name, description, color, glowColor, size, orbitRadius, duration, icon, budget, spent, delay = 0 }: PlanetProps) => {
  const cloudState = getCloudState(budget, spent);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 0, height: 0 }}>
      {/* Orbit ring SVG */}
      <svg
        className="absolute"
        style={{
          width: orbitRadius * 2 + 4,
          height: orbitRadius * 2 + 4,
          left: -(orbitRadius + 2),
          top: -(orbitRadius + 2),
        }}
      >
        <circle
          cx={orbitRadius + 2}
          cy={orbitRadius + 2}
          r={orbitRadius}
          fill="none"
          stroke={glowColor}
          strokeWidth="1.5"
          strokeOpacity="0.15"
          filter="url(#orbit-blur)"
        />
        <circle
          cx={orbitRadius + 2}
          cy={orbitRadius + 2}
          r={orbitRadius}
          fill="none"
          stroke={cloudState === "rain" ? "hsl(0, 60%, 50%)" : cloudState === "thunder" ? "hsl(50, 100%, 55%)" : glowColor}
          strokeWidth="1"
          strokeOpacity={cloudState === "normal" ? "0.4" : "0.6"}
          strokeDasharray="8 6"
          className="animate-[orbit-dash_2s_linear_infinite]"
        />
        <defs>
          <filter id="orbit-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
      </svg>

      {/* Planet container - orbiting */}
      <div
        className="absolute animate-orbit z-10"
        style={{
          "--orbit-radius": `${orbitRadius}px`,
          "--orbit-duration": `${duration}s`,
          animationDelay: `${delay}s`,
          left: 0,
          top: 0,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        } as React.CSSProperties}
      >
        <div className="group relative cursor-pointer">
          {/* Cloud above planet */}
          <ExpenseCloud state={cloudState} color={color} />

          {/* Glow */}
          <div
            className="absolute -inset-3 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"
            style={{ backgroundColor: glowColor }}
          />
          
          {/* Planet sphere */}
          <div
            className="relative rounded-full flex items-center justify-center transition-transform group-hover:scale-125 duration-300"
            style={{
              width: size,
              height: size,
              background: `radial-gradient(circle at 30% 30%, ${color}, ${glowColor})`,
              boxShadow: `inset -4px -4px 10px rgba(0,0,0,0.5), 0 0 25px ${glowColor}50`,
            }}
          >
            <span className="text-base md:text-lg drop-shadow-lg">{icon}</span>
          </div>
          
          {/* Label */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap text-center pointer-events-none">
            <p className="font-display text-[10px] md:text-xs font-semibold tracking-wider" style={{ color }}>
              {name}
            </p>
            {spent !== undefined && spent > 0 && (
              <p className={`text-[10px] md:text-xs font-body font-semibold mt-0.5 ${
                cloudState === "rain" ? "text-destructive" : cloudState === "thunder" ? "text-primary" : "text-foreground"
              }`}>
                ${spent.toLocaleString()} / ${budget?.toLocaleString()}
              </p>
            )}
            <p className="text-[8px] md:text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planet;