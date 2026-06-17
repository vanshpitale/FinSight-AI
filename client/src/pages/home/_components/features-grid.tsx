

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
    color: "from-secondary-base/15 to-secondary-base/5 text-secondary-base",
  },
  {
    icon: Target,
    title: "Dynamic Smart Budgets",
    description:
      "Create category-based budgets that adapt to your historical spending and monthly income fluctuations to prevent overspending before it happens.",
    color: "from-tertiary-base/15 to-tertiary-base/5 text-tertiary-base",
  },
  {
    icon: Shield,
    title: "Bank-Grade Encryption",
    description:
      "Your privacy is our priority. We use AES-256 bank-level encryption. Your financial credentials are never stored, keeping your files completely secure.",
    color: "from-secondary-base/15 to-tertiary-base/5 text-secondary-base",
  },
  {
    icon: Activity,
    title: "Real-time Cash Flow",
    description:
      "Visualize your income against expenses in real time. Gain instant insights into your true net savings rate with high-fidelity charts.",
    color: "from-tertiary-base/15 to-secondary-base/5 text-tertiary-base",
  },
  {
    icon: Calendar,
    title: "Smart Bill Reminders",
    description:
      "Detect recurring subscription charges automatically. Get notified before transactions execute so you never get hit with a surprise bill.",
    color: "from-secondary-base/15 to-secondary-base/5 text-secondary-base",
  },
  {
    icon: Download,
    title: "Seamless Reports Export",
    description:
      "Filter transactions easily and generate detailed PDF or CSV reports for tax season, business expenses, or personal records in seconds.",
    color: "from-tertiary-base/15 to-tertiary-base/5 text-tertiary-base",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-20 bg-neutral-base dark:bg-primary-base/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-semibold tracking-wider text-secondary-base uppercase">
            Platform Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Smart tools to simplify your financial life
          </p>
          <p className="text-base text-muted-foreground">
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
                className="group relative bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-secondary-base/30 dark:hover:border-secondary-base/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Decorative Hover Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-base/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                {/* Icon Container */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6 relative z-10`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-3 relative z-10">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
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
