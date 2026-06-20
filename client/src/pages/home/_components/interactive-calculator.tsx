import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Coffee,
  Home,
  Briefcase,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";

interface Transaction {
  id: string;
  title: string;
  type: "income" | "expense" | "investment";
  amount: number;
  time: string;
  category: string;
  icon: React.ReactNode;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    title: "Uber Cab",
    type: "expense",
    amount: 450,
    time: "2 hours ago",
    category: "Transport",
    icon: <TrendingDown className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />,
  },
  {
    id: "tx-2",
    title: "Electricity Bill",
    type: "expense",
    amount: 3500,
    time: "1 day ago",
    category: "Utilities",
    icon: <TrendingDown className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />,
  },
  {
    id: "tx-3",
    title: "Dinner Out",
    type: "expense",
    amount: 1800,
    time: "2 days ago",
    category: "Food",
    icon: <Coffee className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />,
  },
];

const INITIAL_CHART_DATA = [
  { name: "Week 1", income: 65000, expenses: 28000 },
  { name: "Week 2", income: 75000, expenses: 32000 },
  { name: "Week 3", income: 85000, expenses: 38000 },
  { name: "Week 4", income: 95000, expenses: 42000 },
];

const ACTIONS = [
  {
    id: "act-coffee",
    title: "Bought Coffee",
    icon: <Coffee className="h-4 w-4" />,
    amountText: "-₹250",
    amount: 250,
    type: "expense" as const,
    category: "Food",
    color: "border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-600 dark:text-red-400 hover:border-red-500/40 shadow-sm",
  },
  {
    id: "act-rent",
    title: "Paid Rent",
    icon: <Home className="h-4 w-4" />,
    amountText: "-₹15,000",
    amount: 15000,
    type: "expense" as const,
    category: "Housing",
    color: "border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-600 dark:text-red-400 hover:border-red-500/40 shadow-sm",
  },
  {
    id: "act-salary",
    title: "Received Salary",
    icon: <Briefcase className="h-4 w-4" />,
    amountText: "+₹75,000",
    amount: 75000,
    type: "income" as const,
    category: "Salary",
    color: "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/40 shadow-sm",
  },
  {
    id: "act-sip",
    title: "SIP Investment",
    icon: <TrendingUp className="h-4 w-4" />,
    amountText: "-₹5,000",
    amount: 5000,
    type: "investment" as const,
    category: "Investments",
    color: "border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:border-violet-500/40 shadow-sm",
  },
];

const INSIGHTS: Record<string, { text: string; score: string }> = {
  "act-coffee": {
    text: "Daily cafe visits spotted. Brewing at home instead could redirect ₹7,500/yr to your SIP goals.",
    score: "+2.4% Budget Efficiency",
  },
  "act-rent": {
    text: "Rent payment logged. Rent is 20% of your total income, keeping you safely under the 30% advisory ceiling.",
    score: "Optimal Housing Load",
  },
  "act-salary": {
    text: "Salary credited! Excellent. 20% (₹15,000) has been flagged for automated transfer to your SIP portfolio.",
    score: "Wealth Velocity Peak",
  },
  "act-sip": {
    text: "SIP Investment registered. Consistency is key! Your portfolio health indicates you'll hit your target 3 weeks early.",
    score: "100% Consistent Health",
  },
};

const formatINR = (val: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
};

interface FlyingCard {
  id: string;
  title: string;
  amountText: string;
  isIncome: boolean;
  startX: number;
  startY: number;
  actionId: string;
}

export default function InteractiveCalculator() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const [balance, setBalance] = useState(124500);
  const [prevBalance, setPrevBalance] = useState(124500);

  const [income, setIncome] = useState(95000);
  const [prevIncome, setPrevIncome] = useState(95000);

  const [expenses, setExpenses] = useState(42000);
  const [prevExpenses, setPrevExpenses] = useState(42000);

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [chartData, setChartData] = useState(INITIAL_CHART_DATA);
  const [flyingCards, setFlyingCards] = useState<FlyingCard[]>([]);

  const [activeInsight, setActiveInsight] = useState<{ text: string; score: string }>({
    text: "Click any of the live actions on the left to simulate automated tracking & dynamic AI analysis.",
    score: "Interactive AI Agent",
  });

  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
  const prevSavingsRate = prevIncome > 0 ? ((prevIncome - prevExpenses) / prevIncome) * 100 : 0;

  // Detect dark theme status locally
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, action: typeof ACTIONS[0]) => {
    // Generate fly positions
    if (!containerRef.current || !targetRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();

    const startX = e.clientX - containerRect.left;
    const startY = e.clientY - containerRect.top;

    const newFlying: FlyingCard = {
      id: `fly-${Date.now()}`,
      title: action.title,
      amountText: action.amountText,
      isIncome: action.type === "income",
      startX,
      startY,
      actionId: action.id,
    };

    setFlyingCards((prev) => [...prev, newFlying]);
  };

  const completeFlying = (flying: FlyingCard) => {
    // Remove flying card
    setFlyingCards((prev) => prev.filter((item) => item.id !== flying.id));

    // Update real metrics
    const action = ACTIONS.find((a) => a.id === flying.actionId);
    if (!action) return;

    setPrevBalance(balance);
    setPrevIncome(income);
    setPrevExpenses(expenses);

    const isInc = action.type === "income";

    const newBalance = isInc ? balance + action.amount : balance - action.amount;
    const newIncome = isInc ? income + action.amount : income;
    const newExpenses = isInc ? expenses : expenses + action.amount;

    setBalance(newBalance);
    setIncome(newIncome);
    setExpenses(newExpenses);

    // Dynamic AI Insight update
    if (INSIGHTS[action.id]) {
      setActiveInsight(INSIGHTS[action.id]);
    }

    // Add recent transaction to the UI list
    const newTx: Transaction = {
      id: `sim-tx-${Date.now()}`,
      title: action.title,
      type: action.type,
      amount: action.amount,
      time: "Just now",
      category: action.category,
      icon: isInc ? (
        <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <TrendingDown className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
      ),
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Append Live chart data point
    setChartData((prev) => {
      const nextData = [...prev];
      const newIndex = nextData.length + 1;
      nextData.push({
        name: `Week ${newIndex}`,
        income: newIncome,
        expenses: newExpenses,
      });
      if (nextData.length > 5) {
        nextData.shift();
      }
      return nextData;
    });
  };

  const handleReset = () => {
    setPrevBalance(balance);
    setPrevIncome(income);
    setPrevExpenses(expenses);

    setBalance(124500);
    setIncome(95000);
    setExpenses(42000);
    setTransactions(INITIAL_TRANSACTIONS);
    setChartData(INITIAL_CHART_DATA);
    setActiveInsight({
      text: "Simulator reset. Click any of the live actions on the left to see analytics trigger.",
      score: "Interactive AI Agent",
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-xl text-xs text-slate-800 dark:text-white space-y-1 backdrop-blur-md theme-transition">
          <p className="font-semibold text-slate-400">{payload[0].payload.name}</p>
          {payload.map((entry: any) => {
            const isExpense = entry.dataKey === "expenses";
            return (
              <div key={entry.dataKey} className="flex items-center gap-4 justify-between">
                <span className="capitalize text-slate-500 dark:text-slate-300">{entry.name}:</span>
                <span className={isExpense ? "text-red-500 dark:text-red-400 font-bold" : "text-secondary-base font-bold"}>
                  {formatINR(entry.value)}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 theme-transition relative overflow-hidden">
      {/* Visual Backlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary-base/3 dark:bg-secondary-base/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />

      <div ref={containerRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Flying cards animation wrapper */}
        <AnimatePresence>
          {flyingCards.map((card) => {
            // Find destination position relative to container
            let destX = 400;
            let destY = 300;
            if (targetRef.current && containerRef.current) {
              const containerRect = containerRef.current.getBoundingClientRect();
              const targetRect = targetRef.current.getBoundingClientRect();
              destX = targetRect.left - containerRect.left + 50; // offset slightly inside
              destY = targetRect.top - containerRect.top + 100;
            }

            return (
              <motion.div
                key={card.id}
                initial={{ x: card.startX, y: card.startY, scale: 1.1, opacity: 1 }}
                animate={{
                  x: destX,
                  y: destY,
                  scale: 0.6,
                  opacity: [1, 0.9, 0.4, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
                onAnimationComplete={() => completeFlying(card)}
                className="absolute z-50 pointer-events-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-white shadow-2xl flex items-center gap-2"
              >
                <span>{card.title}</span>
                <span className={card.isIncome ? "text-green-500" : "text-red-500"}>
                  {card.amountText}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-base/10 border border-secondary-base/20 text-secondary-base">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary-base animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Live Sandbox Simulation</span>
          </div>
          <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white theme-transition">
            Interact with FinSight AI
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium theme-transition">
            Test how transactions are instantly compiled, visual graphs render, and customized AI reports optimize financial targets.
          </p>
        </div>

        {/* Sandbox Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Action Tiles (Interactive controls) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Simulate a Cash Event
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white theme-transition">
                Select a Transaction
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed theme-transition">
                Click any action card. Observe the item fly across the screen, post directly to the ledger, recalculate statistics, and launch a smart audit insight.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              {ACTIONS.map((action) => (
                <motion.button
                  key={action.id}
                  onClick={(e) => handleActionClick(e, action)}
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-between p-4.5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group ${action.color}`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="p-2 bg-white/60 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-transparent">
                      {action.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors theme-transition">
                        {action.title}
                      </h4>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">
                        Category: {action.category}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm font-black tracking-tight relative z-10 shrink-0">
                    {action.amountText}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Reset control */}
            <div className="flex justify-center lg:justify-start pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer flex items-center gap-2 border border-slate-200 dark:border-slate-900 hover:border-slate-350 dark:hover:border-slate-800 rounded-lg px-4 theme-transition"
              >
                <RefreshCw className="h-3 w-3" /> Reset Dashboard Ledger
              </Button>
            </div>
          </div>

          {/* Right Column: Mini-Dashboard Portal */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Dashboard Visual Frame */}
            <div 
              ref={targetRef} 
              className="bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl flex flex-col justify-between backdrop-blur-md theme-transition"
            >
              {/* Header metrics card */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 sm:p-8 space-y-6 border-b border-slate-200 dark:border-slate-850 theme-transition">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white theme-transition">Alex's Ledger Report</h3>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Dynamic Sandbox View</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 theme-transition">
                    Live Session
                  </div>
                </div>

                {/* Metrics display */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  {/* Cash Balance */}
                  <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-900 p-3 rounded-xl space-y-1 theme-transition">
                    <span className="text-[9px] text-slate-550 dark:text-slate-500 font-bold block uppercase tracking-wider">Available Balance</span>
                    <div className="text-base font-black text-slate-900 dark:text-slate-100 leading-tight theme-transition">
                      <CountUp start={prevBalance} end={balance} duration={0.8} formattingFn={formatINR} />
                    </div>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                      ● Active
                    </span>
                  </div>

                  {/* Income count */}
                  <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-900 p-3 rounded-xl space-y-1 theme-transition">
                    <span className="text-[9px] text-slate-550 dark:text-slate-500 font-bold block uppercase tracking-wider">Total Income</span>
                    <div className="text-base font-black text-slate-900 dark:text-slate-100 leading-tight theme-transition">
                      <CountUp start={prevIncome} end={income} duration={0.8} formattingFn={formatINR} />
                    </div>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                      +10.5%
                    </span>
                  </div>

                  {/* Expense count */}
                  <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-900 p-3 rounded-xl space-y-1 theme-transition">
                    <span className="text-[9px] text-slate-550 dark:text-slate-500 font-bold block uppercase tracking-wider">Expenses</span>
                    <div className="text-base font-black text-slate-900 dark:text-slate-100 leading-tight theme-transition">
                      <CountUp start={prevExpenses} end={expenses} duration={0.8} formattingFn={formatINR} />
                    </div>
                    <span className="text-[9px] text-red-500 dark:text-red-400 font-bold flex items-center gap-0.5">
                      +3.8%
                    </span>
                  </div>

                  {/* Savings % */}
                  <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-900 p-3 rounded-xl space-y-1 theme-transition">
                    <span className="text-[9px] text-slate-550 dark:text-slate-500 font-bold block uppercase tracking-wider">Savings Rate</span>
                    <div className="text-base font-black text-slate-900 dark:text-slate-100 leading-tight theme-transition">
                      <CountUp start={prevSavingsRate} end={savingsRate} duration={0.8} decimals={1} suffix="%" />
                    </div>
                    <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-0.5">
                      Healthy
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart & Ledgers details */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Area Chart view */}
                <div className="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-900 p-4.5 rounded-2xl space-y-4 theme-transition">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-150 dark:border-slate-900 theme-transition">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Transaction Graph</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">RECHARTS LIVE</span>
                  </div>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="sandboxIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="sandboxExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1E293B" : "#E2E8F0"} />
                        <XAxis dataKey="name" stroke={isDark ? "#64748B" : "#475569"} fontSize={8} tickLine={false} axisLine={false} />
                        <YAxis stroke={isDark ? "#64748B" : "#475569"} fontSize={8} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={1.5} fill="url(#sandboxExpenses)" />
                        <Area type="monotone" dataKey="income" name="Income" stroke="#4F46E5" strokeWidth={1.5} fill="url(#sandboxIncome)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Ledgers transactions list */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Ledger Feed</span>
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                    <AnimatePresence initial={false}>
                      {transactions.map((tx) => {
                        const isIncome = tx.type === "income";
                        return (
                          <motion.div
                            key={tx.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center justify-between p-2.5 bg-slate-50/50 dark:bg-slate-950/30 border border-slate-200/80 dark:border-slate-900/60 rounded-xl text-xs theme-transition"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="h-6 w-6 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 theme-transition">
                                {tx.type === "income" ? "💰" : tx.type === "investment" ? "📈" : "☕"}
                              </div>
                              <div>
                                <div className="font-bold text-slate-800 dark:text-slate-200 theme-transition">{tx.title}</div>
                                <div className="text-[9px] text-slate-450 dark:text-slate-500 font-semibold uppercase">{tx.category} &bull; {tx.time}</div>
                              </div>
                            </div>
                            <span className={`font-black ${isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                              {isIncome ? "+" : "-"}{formatINR(tx.amount)}
                            </span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>

            {/* FLOATING GLASS AI INSIGHT PANEL */}
            <motion.div
              layout
              className="bg-white/85 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-md dark:shadow-xl flex items-start gap-4 backdrop-blur-md relative theme-transition"
            >
              <div className="p-2.5 bg-tertiary-base/15 text-tertiary-base rounded-xl animate-pulse">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 theme-transition">FinSight AI Advisor</h4>
                  <span className="text-[9px] px-2 py-0.5 bg-tertiary-base/20 text-tertiary-base rounded-full font-bold uppercase tracking-wider">
                    {activeInsight.score}
                  </span>
                </div>
                {/* Typing/Fade transition */}
                <motion.p
                  key={activeInsight.text}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium theme-transition"
                >
                  "{activeInsight.text}"
                </motion.p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
