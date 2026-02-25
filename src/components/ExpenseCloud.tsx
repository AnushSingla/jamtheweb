import { useMemo } from "react";

type CloudState = "normal" | "thunder" | "rain";

interface ExpenseCloudProps {
  state: CloudState;
  color: string;
}

const ExpenseCloud = ({ state, color }: ExpenseCloudProps) => {
  const raindrops = useMemo(() => {
    if (state !== "rain") return [];
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 6 + (i % 4) * 10 + Math.random() * 6,
      delay: Math.random() * 1,
      duration: 0.6 + Math.random() * 0.4,
    }));
  }, [state]);

  return (
    <div className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: 56, height: 50 }}>
      {/* Cloud body */}
      <svg width="56" height="30" viewBox="0 0 56 30" className="drop-shadow-md">
        <defs>
          <linearGradient id={`cloud-grad-${state}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {state === "rain" && (
              <>
                <stop offset="0%" stopColor="hsl(220, 30%, 40%)" />
                <stop offset="100%" stopColor="hsl(220, 25%, 30%)" />
              </>
            )}
            {state === "thunder" && (
              <>
                <stop offset="0%" stopColor="hsl(240, 20%, 35%)" />
                <stop offset="100%" stopColor="hsl(250, 25%, 25%)" />
              </>
            )}
            {state === "normal" && (
              <>
                <stop offset="0%" stopColor="hsl(210, 15%, 75%)" />
                <stop offset="100%" stopColor="hsl(210, 10%, 60%)" />
              </>
            )}
          </linearGradient>
        </defs>
        {/* Main cloud shape */}
        <ellipse cx="28" cy="20" rx="22" ry="10" fill={`url(#cloud-grad-${state})`} opacity="0.9" />
        <ellipse cx="18" cy="16" rx="12" ry="10" fill={`url(#cloud-grad-${state})`} opacity="0.9" />
        <ellipse cx="36" cy="14" rx="14" ry="11" fill={`url(#cloud-grad-${state})`} opacity="0.9" />
        <ellipse cx="28" cy="12" rx="10" ry="9" fill={`url(#cloud-grad-${state})`} opacity="0.95" />
      </svg>

      {/* Thunder bolt */}
      {state === "thunder" && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 animate-thunder">
          <svg width="16" height="24" viewBox="0 0 16 24">
            <polygon
              points="9,0 4,10 8,10 5,24 14,9 9,9 12,0"
              fill="hsl(50, 100%, 60%)"
              className="drop-shadow-[0_0_6px_hsl(50,100%,60%)]"
            />
          </svg>
        </div>
      )}

      {/* Rain drops */}
      {state === "rain" && (
        <div className="absolute top-6 left-0 w-full h-20 overflow-hidden">
          {raindrops.map((drop) => (
            <div
              key={drop.id}
              className="absolute animate-rain"
              style={{
                left: `${drop.x}%`,
                top: 0,
                animationDelay: `${drop.delay}s`,
                animationDuration: `${drop.duration}s`,
              }}
            >
              <div
                className="w-[2px] h-[8px] rounded-full opacity-70"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${color})`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Status label */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className={`text-[8px] font-display font-bold tracking-widest uppercase ${
          state === "rain" ? "text-destructive" : state === "thunder" ? "text-primary" : "text-muted-foreground"
        }`}>
          {state === "rain" ? "⚠ OVER" : state === "thunder" ? "⚡ LIMIT" : "✓ OK"}
        </span>
      </div>
    </div>
  );
};

export default ExpenseCloud;