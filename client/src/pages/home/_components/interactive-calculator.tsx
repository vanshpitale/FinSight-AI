import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Coffee,
  Home,
  ShoppingCart,
  Briefcase,
  Activity,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  title: string;
  type: "income" | "expense";
  amount: number;
  time: string;
  category: string;
  icon: React.ReactNode;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    title: "Uber Ride",
    type: "expense",
    amount: 450,
    time: "2 hours ago",
    category: "Transport",
    icon: <Activity className="h-4 w-4 text-blue-500" />,
  },
  {
    id: "tx-2",
    title: "Electricity Bill",
    type: "expense",
    amount: 3500,
    time: "1 day ago",
    category: "Utilities",
    icon: <Activity className="h-4 w-4 text-amber-500" />,
  },
  {
    id: "tx-3",
    title: "Dinner Out",
    type: "expense",
    amount: 1800,
    time: "2 days ago",
    category: "Food",
    icon: <Coffee className="h-4 w-4 text-rose-500" />,
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
    emoji: "☕",
    amountText: "-₹250",
    amount: 250,
    type: "expense",
    category: "Food",
    color: "border-rose-500/25 dark:border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  {
    id: "act-rent",
    title: "Rent Received",
    icon: <Home className="h-4 w-4" />,
    emoji: "🏠",
    amountText: "+₹18,000",
    amount: 18000,
    type: "income",
    category: "Housing",
    color: "border-emerald-500/25 dark:border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  {
    id: "act-grocery",
    title: "Grocery Shopping",
    icon: <ShoppingCart className="h-4 w-4" />,
    emoji: "🛒",
    amountText: "-₹3,200",
    amount: 3200,
    type: "expense",
    category: "Groceries",
    color: "border-blue-500/25 dark:border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-700 dark:text-blue-300",
  },
  {
    id: "act-salary",
    title: "Salary Credited",
    icon: <Briefcase className="h-4 w-4" />,
    emoji: "💰",
    amountText: "+₹75,000",
    amount: 75000,
    type: "income",
    category: "Salary",
    color: "border-teal-500/25 dark:border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 text-teal-700 dark:text-teal-300",
  },
];

const formatINR = (val: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900/95 dark:bg-zinc-950/95 border border-zinc-800 p-2.5 rounded-lg shadow-xl text-xs text-white space-y-1">
        <p className="font-semibold text-zinc-400">{payload[0].payload.name}</p>
        {payload.map((entry: any) => {
          const isExpense = entry.dataKey === "expenses";
          return (
            <div key={entry.dataKey} className="flex items-center gap-4 justify-between">
              <span className="capitalize">{entry.name}:</span>
              <span className={isExpense ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
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

export default function InteractiveCalculator() {
  const [balance, setBalance] = useState(124500);
  const [prevBalance, setPrevBalance] = useState(124500);

  const [income, setIncome] = useState(95000);
  const [prevIncome, setPrevIncome] = useState(95000);

  const [expenses, setExpenses] = useState(42000);
  const [prevExpenses, setPrevExpenses] = useState(42000);

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [chartData, setChartData] = useState(INITIAL_CHART_DATA);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
  const prevSavingsRate = prevIncome > 0 ? ((prevIncome - prevExpenses) / prevIncome) * 100 : 0;

  const handleActionClick = (action: typeof ACTIONS[0]) => {
    setActiveActionId(action.id);
    setTimeout(() => setActiveActionId(null), 300);

    setPrevBalance(balance);
    setPrevIncome(income);
    setPrevExpenses(expenses);

    const isIncome = action.type === "income";
    const newBalance = isIncome ? balance + action.amount : balance - action.amount;
    const newIncome = isIncome ? income + action.amount : income;
    const newExpenses = isIncome ? expenses : expenses + action.amount;

    setBalance(newBalance);
    setIncome(newIncome);
    setExpenses(newExpenses);

    // Add new transaction at top
    const newTx: Transaction = {
      id: `sim-tx-${Date.now()}`,
      title: action.title,
      type: action.type as "income" | "expense",
      amount: action.amount,
      time: "Just now",
      category: action.category,
      icon: action.icon,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Add another point to chart
    setChartData((prev) => {
      const nextData = [...prev];
      const newIndex = nextData.length + 1;
      nextData.push({
        name: `Week ${newIndex}`,
        income: newIncome,
        expenses: newExpenses,
      });
      // Keep viewport to last 5 values for clean styling
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
  };

  return (
    <section id="calculator" className="py-24 bg-white dark:bg-zinc-900/40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title / Description */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
            Live Simulator
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Try FinSight AI Live
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Get hands-on and experience how logging cash actions updates balances, calculates savings, and maps analytics instantly.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Action Cards */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Simulate an Action
              </span>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Choose a Transaction
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Click any card to post the transaction and see the dashboard preview respond instantly.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              {ACTIONS.map((action) => {
                const isActive = activeActionId === action.id;
                return (
                  <motion.button
                    key={action.id}
                    onClick={() => handleActionClick(action)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-left cursor-pointer transition-colors shadow-sm relative overflow-hidden group ${action.color}`}
                  >
                    {/* Ripple/Active Overlay */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId={`ripple-${action.id}`}
                          className="absolute inset-0 bg-white/20 dark:bg-black/10 z-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="text-xl sm:text-2xl shrink-0 p-1 rounded-lg bg-white/30 dark:bg-zinc-900/30">
                        {action.emoji}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {action.title}
                        </h4>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          Category: {action.category}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm font-black tracking-tight relative z-10 shrink-0">
                      {action.amountText}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Reset Button */}
            <div className="flex justify-center lg:justify-start pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer flex items-center gap-1.5"
              >
                Reset Dashboard Data
              </Button>
            </div>
          </div>

          {/* Right Column: Dashboard Preview */}
          <div className="lg:col-span-7 bg-[#f6f7f9] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between">
            {/* Top Header Section (mimicking PageHeader) */}
            <div className="bg-[#1a1e2a] text-white p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-semibold">Welcome back, Alex</h3>
                  <p className="text-white/60 text-xs">This is your overview report for the selected period</p>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 border border-white/10">
                  This Month
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Available Balance */}
                <div className="bg-white/5 border-0 p-3 rounded-xl space-y-2 text-white">
                  <span className="text-[10px] text-gray-300 font-medium block">Available Balance</span>
                  <div className="text-lg font-bold leading-tight">
                    <CountUp start={prevBalance} end={balance} duration={1} formattingFn={formatINR} />
                  </div>
                  <div className="text-[9px] text-green-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Good Stand
                  </div>
                </div>

                {/* Total Income */}
                <div className="bg-white/5 border-0 p-3 rounded-xl space-y-2 text-white">
                  <span className="text-[10px] text-gray-300 font-medium block">Total Income</span>
                  <div className="text-lg font-bold text-white leading-tight">
                    <CountUp start={prevIncome} end={income} duration={1} formattingFn={formatINR} />
                  </div>
                  <div className="text-[9px] text-green-400 flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" /> +12.8%
                  </div>
                </div>

                {/* Total Expenses */}
                <div className="bg-white/5 border-0 p-3 rounded-xl space-y-2 text-white">
                  <span className="text-[10px] text-gray-300 font-medium block">Total Expenses</span>
                  <div className="text-lg font-bold text-white leading-tight">
                    <CountUp start={prevExpenses} end={expenses} duration={1} formattingFn={formatINR} />
                  </div>
                  <div className="text-[9px] text-rose-450 flex items-center gap-0.5">
                    <TrendingDown className="h-3 w-3" /> +3.5%
                  </div>
                </div>

                {/* Savings Rate */}
                <div className="bg-white/5 border-0 p-3 rounded-xl space-y-2 text-white">
                  <span className="text-[10px] text-gray-300 font-medium block">Savings Rate</span>
                  <div className="text-lg font-bold text-white leading-tight">
                    <CountUp start={prevSavingsRate} end={savingsRate} duration={1} decimals={1} suffix="%" />
                  </div>
                  <div className="text-[9px] text-green-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Good Savings
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Content Section (mimicking main dashboard layout) */}
            <div className="p-6 sm:p-8 space-y-6 bg-[#f6f7f9] dark:bg-zinc-900/60 flex-1 flex flex-col justify-between">
              
              {/* Transaction Overview Card (Chart) */}
              <div className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 p-5 rounded-2xl shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 pb-3">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Transaction Overview</h4>
                    <p className="text-[10px] text-zinc-400 font-medium">Showing total transactions</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <span className="text-[9px] text-zinc-400 font-medium block">No of Income</span>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1 justify-center">
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                        {transactions.filter(t => t.type === 'income').length + 20}
                      </span>
                    </div>
                    <div className="border-l border-zinc-150 dark:border-zinc-800 h-8"></div>
                    <div className="text-center">
                      <span className="text-[9px] text-zinc-400 font-medium block">No of Expenses</span>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1 justify-center">
                        <TrendingDown className="h-3 w-3 text-rose-500" />
                        {transactions.filter(t => t.type === 'expense').length + 10}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-zinc-800" />
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={9}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={9}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(val) => `₹${val / 1000}k`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="step"
                        dataKey="expenses"
                        stackId="1"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fill="url(#expensesGradient)"
                      />
                      <Area
                        type="step"
                        dataKey="income"
                        stackId="1"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#incomeGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Transactions Card */}
              <div className="bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 p-5 rounded-2xl shadow-xs space-y-3 flex-1 flex flex-col justify-start overflow-hidden">
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 pb-2.5">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Recent Transactions</h4>
                    <p className="text-[10px] text-zinc-400 font-medium">Showing all recent transactions</p>
                  </div>
                  <div className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-semibold cursor-pointer">
                    View all
                  </div>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-[140px] flex-1 pr-1 scrollbar-thin">
                  <AnimatePresence initial={false}>
                    {transactions.map((tx) => {
                      const isIncome = tx.type === "income";
                      return (
                        <motion.div
                          key={tx.id}
                          initial={{ opacity: 0, y: -15, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-900/50 last:border-none overflow-hidden"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center shrink-0">
                              {tx.icon}
                            </div>
                            <div>
                              <div className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
                                {tx.title}
                              </div>
                              <div className="text-[9px] text-zinc-400 font-medium">
                                {tx.category} &bull; {tx.time}
                              </div>
                            </div>
                          </div>

                          <div className={`text-[11px] font-black tracking-tight shrink-0 ${isIncome ? "text-emerald-600" : "text-zinc-600 dark:text-zinc-400"}`}>
                            {isIncome ? "+" : "-"}{formatINR(tx.amount)}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
