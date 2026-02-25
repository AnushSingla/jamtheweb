import Sun from "./Sun";
import Planet from "./Planet";

export interface ExpenseItem {
  budget: number;
  spent: number;
}

export interface ExpenseData {
  grocery: ExpenseItem;
  shopping: ExpenseItem;
  transport: ExpenseItem;
  entertainment: ExpenseItem;
}

interface SolarSystemProps {
  expenses: ExpenseData;
}

const SolarSystem = ({ expenses }: SolarSystemProps) => {
  const planets = [
    {
      name: "GROCERY",
      description: "Food & essentials",
      color: "hsl(145, 65%, 50%)",
      glowColor: "hsl(145, 65%, 35%)",
      size: 38,
      orbitRadius: 110,
      duration: 10,
      icon: "🛒",
      delay: 0,
      budget: expenses.grocery.budget,
      spent: expenses.grocery.spent,
    },
    {
      name: "SHOPPING",
      description: "Retail & online",
      color: "hsl(200, 80%, 55%)",
      glowColor: "hsl(200, 80%, 40%)",
      size: 44,
      orbitRadius: 180,
      duration: 16,
      icon: "🛍️",
      delay: 3,
      budget: expenses.shopping.budget,
      spent: expenses.shopping.spent,
    },
    {
      name: "TRANSPORT",
      description: "Travel & commute",
      color: "hsl(42, 90%, 55%)",
      glowColor: "hsl(42, 90%, 40%)",
      size: 34,
      orbitRadius: 250,
      duration: 22,
      icon: "🚗",
      delay: 6,
      budget: expenses.transport.budget,
      spent: expenses.transport.spent,
    },
    {
      name: "ENTERTAIN",
      description: "Fun & leisure",
      color: "hsl(320, 70%, 55%)",
      glowColor: "hsl(320, 70%, 40%)",
      size: 48,
      orbitRadius: 330,
      duration: 30,
      icon: "🎬",
      delay: 9,
      budget: expenses.entertainment.budget,
      spent: expenses.entertainment.spent,
    },
  ];

  return (
    <div className="relative w-full h-[700px] md:h-[800px] flex items-center justify-center">
      <Sun />
      {planets.map((planet) => (
        <Planet key={planet.name} {...planet} />
      ))}
    </div>
  );
};

export default SolarSystem;