import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "@/routes/common/routePath";

const TIERS = [
  {
    name: "Starter",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Essential tools to start tracking your personal finances.",
    features: [
      "Manual transaction tracking",
      "Up to 2 connected accounts",
      "3 monthly category budgets",
      "Basic cash flow dashboard",
      "Standard CSV report exports",
    ],
    cta: "Start Tracking Free",
    popular: false,
  },
  {
    name: "Wealth Pro",
    priceMonthly: 800,
    priceYearly: 600,
    description: "Fully automated tracking paired with deep AI insights.",
    features: [
      "Everything in Starter",
      "Unlimited connected accounts",
      "Full AI-Driven insights & anomaly alerts",
      "Subscription leakage & double bill flags",
      "Automated recurring bill calendar",
      "Unlimited dynamic budgets",
      "Premium PDF & CSV report generation",
    ],
    cta: "Unlock Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    priceMonthly: 2400,
    priceYearly: 1900,
    description: "Tailored multi-account tools for families and businesses.",
    features: [
      "Everything in Pro",
      "Multi-user shared books & collaboration",
      "Dedicated CPA AI advisor module",
      "Custom transaction categories & rules",
      "API integrations & developer webhooks",
      "Priority VIP customer support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-zinc-900/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
          <h2 className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
            Flexible Pricing
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            A plan designed for every net worth
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Select a pricing plan that fits your current goals. Upgrade or downgrade at any time.
          </p>

          {/* Toggle Button */}
          <div className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-full border border-zinc-200/60 dark:border-zinc-700/50">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingPeriod === "monthly"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingPeriod === "yearly"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
              }`}
            >
              Yearly
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full text-[9px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {TIERS.map((tier, idx) => {
            const price = billingPeriod === "monthly" ? tier.priceMonthly : tier.priceYearly;
            
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-300 ${
                  tier.popular
                    ? "bg-zinc-900 dark:bg-zinc-950 text-white border-zinc-900 dark:border-zinc-850 shadow-xl scale-105 md:scale-105 z-10"
                    : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:border-zinc-300"
                }`}
              >
                {/* Popular Tier Badge */}
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </span>
                )}

                {/* Plan Metadata */}
                <div>
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                  <p className={`text-xs mt-2 leading-relaxed ${tier.popular ? "text-zinc-400" : "text-zinc-500"}`}>
                    {tier.description}
                  </p>

                  {/* Pricing Value */}
                  <div className="mt-6 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight">
                      ₹{price}
                    </span>
                    <span className={`text-xs ml-1 ${tier.popular ? "text-zinc-400" : "text-zinc-500"}`}>
                      / month
                    </span>
                  </div>
                  {billingPeriod === "yearly" && price > 0 && (
                    <div className="text-[10px] mt-1 text-emerald-500 font-semibold">
                      Billed annually (₹{price * 12}/yr)
                    </div>
                  )}

                  {/* Divider */}
                  <div className={`my-6 border-t ${tier.popular ? "border-zinc-800" : "border-zinc-100 dark:border-zinc-800"}`} />

                  {/* Features List */}
                  <ul className="space-y-3">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs">
                        <Check className={`h-4 w-4 shrink-0 ${tier.popular ? "text-emerald-400" : "text-emerald-600"}`} />
                        <span className={tier.popular ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400"}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <div className="mt-8">
                  <Button
                    onClick={() => navigate(AUTH_ROUTES.SIGN_UP)}
                    className={`w-full py-5 text-xs font-semibold rounded-xl cursor-pointer transition-all duration-300 ${
                      tier.popular
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
