const Sun = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      {/* Outer glow */}
      <div className="absolute -inset-8 rounded-full bg-sun/10 blur-3xl" />
      <div className="absolute -inset-4 rounded-full bg-sun/20 blur-xl" />
      
      {/* Sun body */}
      <div
        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-sun-gradient animate-sun-pulse cursor-pointer"
      >
        {/* Inner texture */}
        <div className="absolute inset-2 rounded-full bg-sun-gradient opacity-80 animate-sun-rotate" 
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, hsl(50 100% 80% / 0.6), transparent 50%),
                              radial-gradient(circle at 70% 60%, hsl(35 100% 50% / 0.4), transparent 40%)`
          }}
        />
        
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xs md:text-sm font-bold text-primary-foreground/90 tracking-wider">
            MONEY
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sun;
