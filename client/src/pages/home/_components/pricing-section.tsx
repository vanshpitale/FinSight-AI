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
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 theme-transition relative overflow-hidden">
      {/* Inline styles for custom gradient animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rotate-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />

      {/* Glow effects */}
      <div className="absolute bottom-10 left-1/4 w-[380px] h-[380px] bg-secondary-base/3 dark:bg-secondary-base/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-base/10 border border-secondary-base/20 text-secondary-base text-xs font-semibold">
            Flexible Plans
          </div>
          <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white theme-transition">
            A plan designed for every net worth
          </p>
          <p className="text-sm text-slate-650 dark:text-slate-400 font-medium theme-transition">
            Select a pricing plan that fits your current goals. Upgrade or downgrade at any time.
          </p>

          {/* Toggle Button */}
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-full theme-transition">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                billingPeriod === "monthly"
                  ? "bg-secondary-base text-white shadow-lg shadow-secondary-base/20"
                  : "text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingPeriod === "yearly"
                  ? "bg-secondary-base text-white shadow-lg shadow-secondary-base/20"
                  : "text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Yearly
              <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[9px] font-black">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {TIERS.map((tier, idx) => {
            const price = billingPeriod === "monthly" ? tier.priceMonthly : tier.priceYearly;
            
            if (tier.popular) {
              return (
                /* Glowing Border Card (Wealth Pro - popular) */
                <div key={idx} className="relative group p-[1.5px] rounded-3xl overflow-hidden scale-105 z-10">
                  {/* Rotating Gradient Border */}
                  <div 
                    className="absolute inset-0 opacity-100" 
                    style={{
                      background: 'linear-gradient(270deg, #4F46E5, #8B5CF6, #4F46E5)',
                      backgroundSize: '200% 200%',
                      animation: 'rotate-gradient 5s linear infinite',
                    }}
                  />
                  {/* Backlight glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-secondary-base to-tertiary-base rounded-3xl opacity-10 dark:opacity-20 blur-2xl group-hover:opacity-30 transition-opacity pointer-events-none -z-20" />

                  {/* Inner Card content */}
                  <div className="relative bg-white dark:bg-slate-950 p-8 rounded-[23px] h-full flex flex-col justify-between text-slate-900 dark:text-white theme-transition">
                    {/* Popular Tier Badge */}
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-secondary-base to-tertiary-base text-white px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 border border-white/10 shadow-lg">
                      <Sparkles className="h-3 w-3 animate-pulse" /> Most Popular
                    </span>

                    <div>
                      <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white theme-transition">{tier.name}</h3>
                      <p className="text-xs mt-2 text-slate-500 dark:text-slate-400 font-medium leading-relaxed theme-transition">
                        {tier.description}
                      </p>

                      {/* Pricing Value */}
                      <div className="mt-6 flex items-baseline">
                        <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-white theme-transition">
                          ₹{price}
                        </span>
                        <span className="text-xs ml-1.5 text-slate-400 dark:text-slate-550 font-bold theme-transition">
                          / month
                        </span>
                      </div>
                      {billingPeriod === "yearly" && price > 0 && (
                        <div className="text-[10px] mt-1 text-tertiary-base font-bold">
                          Billed annually (₹{price * 12}/yr)
                        </div>
                      )}

                      {/* Divider */}
                      <div className="my-6 border-t border-slate-100 dark:border-slate-900 theme-transition" />

                      {/* Features List */}
                      <ul className="space-y-3.5">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                            <Check className="h-4 w-4 shrink-0 text-tertiary-base mt-0.5" />
                            <span className="text-slate-650 dark:text-slate-300 font-medium leading-relaxed theme-transition">
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
                        className="w-full py-5.5 text-xs font-bold rounded-xl cursor-pointer bg-gradient-to-r from-secondary-base to-tertiary-base hover:opacity-95 text-white shadow-lg shadow-secondary-base/20 transition-all duration-300 border-0"
                      >
                        {tier.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              /* Regular Cards (Starter & Enterprise) */
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-8 rounded-3xl border border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md text-slate-900 dark:text-white shadow-sm hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md dark:hover:shadow-lg theme-transition"
              >
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 theme-transition">{tier.name}</h3>
                  <p className="text-xs mt-2 text-slate-500 dark:text-slate-400 font-medium leading-relaxed theme-transition">
                    {tier.description}
                  </p>

                  {/* Pricing Value */}
                  <div className="mt-6 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 theme-transition">
                      ₹{price}
                    </span>
                    <span className="text-xs ml-1.5 text-slate-400 dark:text-slate-550 font-bold theme-transition">
                      / month
                    </span>
                  </div>
                  {billingPeriod === "yearly" && price > 0 && (
                    <div className="text-[10px] mt-1 text-secondary-base font-bold">
                      Billed annually (₹{price * 12}/yr)
                    </div>
                  )}

                  {/* Divider */}
                  <div className="my-6 border-t border-slate-150 dark:border-slate-850 theme-transition" />

                  {/* Features List */}
                  <ul className="space-y-3.5">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                        <Check className="h-4 w-4 shrink-0 text-secondary-base mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed theme-transition">
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
                    className="w-full py-5.5 text-xs font-bold rounded-xl cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white transition-all duration-300 border-0 theme-transition"
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
