import { useState } from "react";
import StarField from "@/components/StarField";
import SolarSystem from "@/components/SolarSystem";
import ExpenseForm from "@/components/ExpenseForm";
import type { ExpenseData } from "@/components/SolarSystem";
interface IndexProps {
  onLogout: () => void;
}

const Index: React.FC<IndexProps> = ({ onLogout }) => {
  const [expenses, setExpenses] = useState<ExpenseData>({
    grocery: { budget: 10000, spent: 12000 },
    shopping: { budget: 12000, spent: 12000 },
    transport: { budget: 5000, spent: 10000 },
    entertainment: { budget: 4000, spent: 3500 },
  });

  return (
    <div className="min-h-screen bg-space-gradient relative overflow-hidden">
      <StarField />

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <h2 className="font-display text-xl md:text-2xl font-bold text-gradient-gold">
          MoneyOrbit
        </h2>
       <div className="flex gap-6 items-center">
  <a
    href="#track"
    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
  >
    Track
  </a>

  <button
    onClick={onLogout}
    className="px-4 py-2 rounded-lg bg-red-500 text-white font-display text-xs font-semibold tracking-wider hover:brightness-110 transition-all"
  >
    Logout
  </button>
</div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 text-center pt-8 md:pt-12 px-4">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gradient-gold animate-float-up tracking-tight"
          style={{ "--float-delay": "0s" } as React.CSSProperties}
        >
          MoneyOrbit
        </h1>
        <p
          className="mt-4 text-base md:text-lg text-muted-foreground max-w-md mx-auto font-body animate-float-up"
          style={{ "--float-delay": "0.2s" } as React.CSSProperties}
        >
          Your expenses in orbit. Clouds warn you when spending gets stormy.
        </p>
      </div>

      {/* Solar System */}
      <SolarSystem expenses={expenses} />

      {/* Expense Entry */}
      <div id="track">
        <ExpenseForm expenses={expenses} onUpdate={setExpenses} />
      </div>

      {/* Footer gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;