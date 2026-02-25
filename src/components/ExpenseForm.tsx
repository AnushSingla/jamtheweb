import { useState } from "react";
import { z } from "zod";
import type { ExpenseData } from "./SolarSystem";

interface ExpenseFormProps {
  expenses: ExpenseData;
  onUpdate: (expenses: ExpenseData) => void;
}

const amountSchema = z.number().min(0, "Must be positive").max(999999, "Too large");

type CategoryKey = keyof ExpenseData;

const categories: { key: CategoryKey; label: string; icon: string; color: string; glowColor: string }[] = [
  { key: "grocery", label: "Grocery", icon: "🛒", color: "hsl(145, 65%, 50%)", glowColor: "hsl(145, 65%, 35%)" },
  { key: "shopping", label: "Shopping", icon: "🛍️", color: "hsl(200, 80%, 55%)", glowColor: "hsl(200, 80%, 40%)" },
  { key: "transport", label: "Transport", icon: "🚗", color: "hsl(42, 90%, 55%)", glowColor: "hsl(42, 90%, 40%)" },
  { key: "entertainment", label: "Entertainment", icon: "🎬", color: "hsl(320, 70%, 55%)", glowColor: "hsl(320, 70%, 40%)" },
];

function getStatus(budget: number, spent: number) {
  if (spent > budget) return { label: "🌧 Over Budget", cls: "text-destructive" };
  if (spent === budget) return { label: "⚡ At Limit", cls: "text-primary" };
  return { label: "☁ Under Budget", cls: "text-muted-foreground" };
}

const ExpenseForm = ({ expenses, onUpdate }: ExpenseFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: CategoryKey, field: "budget" | "spent", value: string) => {
    const num = value === "" ? 0 : parseFloat(value);
    const errKey = `${key}-${field}`;
    const result = amountSchema.safeParse(num);

    if (!result.success) {
      setErrors((prev) => ({ ...prev, [errKey]: result.error.errors[0].message }));
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next[errKey];
      return next;
    });

    onUpdate({
      ...expenses,
      [key]: { ...expenses[key], [field]: num },
    });
  };

  const totalBudget = Object.values(expenses).reduce((a, b) => a + b.budget, 0);
  const totalSpent = Object.values(expenses).reduce((a, b) => a + b.spent, 0);

  return (
    <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-gold">
          Track Your Expenses
        </h2>
        <p className="text-sm text-muted-foreground mt-2 font-body">
          Set budgets &amp; enter spending — clouds react in real time
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const status = getStatus(expenses[cat.key].budget, expenses[cat.key].spent);
          return (
            <div
              key={cat.key}
              className="relative rounded-xl p-4 border border-border bg-card/50 backdrop-blur-sm hover:border-muted-foreground/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${cat.color}, ${cat.glowColor})`,
                      boxShadow: `0 0 12px ${cat.glowColor}40`,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <span className="font-display text-xs font-semibold tracking-wider text-foreground">
                    {cat.label}
                  </span>
                </div>
                <span className={`text-[10px] font-display font-semibold ${status.cls}`}>
                  {status.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Budget */}
                <div>
                  <label className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mb-1 block">Budget</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                    <input
                      type="number"
                      min="0"
                      max="999999"
                      step="1"
                      placeholder="0"
                      value={expenses[cat.key].budget || ""}
                      onChange={(e) => handleChange(cat.key, "budget", e.target.value)}
                      className="w-full pl-6 pr-2 py-2 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  {errors[`${cat.key}-budget`] && (
                    <p className="text-destructive text-[10px] mt-0.5">{errors[`${cat.key}-budget`]}</p>
                  )}
                </div>

                {/* Spent */}
                <div>
                  <label className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mb-1 block">Spent</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                    <input
                      type="number"
                      min="0"
                      max="999999"
                      step="1"
                      placeholder="0"
                      value={expenses[cat.key].spent || ""}
                      onChange={(e) => handleChange(cat.key, "spent", e.target.value)}
                      className="w-full pl-6 pr-2 py-2 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  {errors[`${cat.key}-spent`] && (
                    <p className="text-destructive text-[10px] mt-0.5">{errors[`${cat.key}-spent`]}</p>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              {expenses[cat.key].budget > 0 && (
                <div className="mt-3">
                  <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((expenses[cat.key].spent / expenses[cat.key].budget) * 100, 100)}%`,
                        backgroundColor: expenses[cat.key].spent > expenses[cat.key].budget
                          ? "hsl(0, 70%, 55%)"
                          : expenses[cat.key].spent === expenses[cat.key].budget
                            ? "hsl(50, 100%, 55%)"
                            : cat.color,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-6 rounded-xl p-4 border border-border bg-card/50 backdrop-blur-sm flex items-center justify-around">
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mb-1">Total Budget</p>
          <p className="text-xl font-display font-bold text-foreground">${totalBudget.toLocaleString()}</p>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mb-1">Total Spent</p>
          <p className={`text-xl font-display font-bold ${totalSpent > totalBudget ? "text-destructive" : "text-gradient-gold"}`}>
            ${totalSpent.toLocaleString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExpenseForm;