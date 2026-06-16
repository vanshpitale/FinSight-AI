

import {
  Brain,
  Target,
  Shield,
  Activity,
  Calendar,
  Download,
} from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI Spending Insights",
    description:
      "Our customized AI models analyze your transactions daily to spot anomalies, flag subscription leaks, and suggest realistic optimization paths.",
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Target,
    title: "Dynamic Smart Budgets",
    description:
      "Create category-based budgets that adapt to your historical spending and monthly income fluctuations to prevent overspending before it happens.",
    color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Shield,
    title: "Bank-Grade Encryption",
    description:
      "Your privacy is our priority. We use AES-256 bank-level encryption. Your financial credentials are never stored, keeping your files completely secure.",
    color: "from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Activity,
    title: "Real-time Cash Flow",
    description:
      "Visualize your income against expenses in real time. Gain instant insights into your true net savings rate with high-fidelity charts.",
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Calendar,
    title: "Smart Bill Reminders",
    description:
      "Detect recurring subscription charges automatically. Get notified before transactions execute so you never get hit with a surprise bill.",
    color: "from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    icon: Download,
    title: "Seamless Reports Export",
    description:
      "Filter transactions easily and generate detailed PDF or CSV reports for tax season, business expenses, or personal records in seconds.",
    color: "from-cyan-500/10 to-sky-500/10 text-cyan-600 dark:text-cyan-400",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-20 bg-zinc-50 dark:bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
            Platform Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Smart tools to simplify your financial life
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Say goodbye to spreadsheets. FinSight AI automates tracking and pairs it
            with actionable artificial intelligence to grow your net worth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Decorative Hover Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                {/* Icon Container */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6 relative z-10`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3 relative z-10">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
