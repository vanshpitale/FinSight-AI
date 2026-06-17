import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES } from "@/routes/common/routePath";
import { ArrowRight, Sparkles, TrendingUp, BarChart3 } from "lucide-react";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen pt-30 pb-20 flex items-center overflow-hidden bg-[radial-gradient(circle_at_top_right,var(--color-primary-foreground),transparent_40%)] dark:bg-radial dark:from-secondary-base/10 dark:via-transparent dark:to-transparent">
      {/* Background Decorative Gradients */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary-base/10 dark:bg-secondary-base/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-tertiary-base/10 dark:bg-tertiary-base/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-none">
              Take Control of Your Wealth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-base to-tertiary-base">
                Guided by Intelligence.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Track expenses, create budgets, get AI-powered insights, and scan receipts automatically. Take control of your finances with intelligent automation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                onClick={() => navigate(AUTH_ROUTES.SIGN_UP)}
                className="w-full sm:w-auto bg-secondary-base hover:bg-secondary-base/90 text-white gap-2 font-semibold shadow-lg shadow-secondary-base/20 hover:shadow-secondary-base/30 transition-all cursor-pointer border-0"
              >
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
              {/* <Button variant="outline" size="lg" asChild className="w-full sm:w-auto cursor-pointer">
                <a href="#demo">See AI Advisor</a>
              </Button> */}
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-border grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl font-bold text-foreground">
                  50,000+
                </span>
                <span className="text-xs text-muted-foreground">
                  Active Users
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl font-bold text-foreground">
                  99.9%
                </span>
                <span className="text-xs text-muted-foreground">
                  Uptime Guarantee
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl font-bold text-foreground">
                  ₹100Cr+
                </span>
                <span className="text-xs text-muted-foreground">
                  Expenses Tracked
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Dashboard Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl bg-card border border-border p-6 backdrop-blur-sm shadow-2xl overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-base/20 blur-2xl rounded-full" />

              {/* Floating Card 1: Balance & Trend */}
              <div className="bg-card border border-border p-4 rounded-xl shadow-lg relative z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">
                    Net Wealth
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-base/10 dark:bg-secondary-base/20 text-[10px] font-semibold text-secondary-base flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" /> +12.4%
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  ₹8,42,500.00
                </div>
                <div className="mt-3 h-12 w-full flex items-end gap-1">
                  {[20, 35, 30, 45, 60, 50, 75, 90].map((height, i) => (
                    <div
                      key={i}
                      className="bg-secondary-base/80 dark:bg-secondary-base/60 w-full rounded-t-sm transition-all hover:bg-secondary-base"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Card 2: AI Budget Advisory */}
              <div className="bg-card border border-border p-4 rounded-xl shadow-lg relative z-20 mt-4 ml-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-tertiary-base/15 dark:bg-tertiary-base/20 rounded-lg text-tertiary-base">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    FinSight Advisor
                  </span>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  "Subscription leakage detected. Cancel 2 unused services to
                  save ₹3,000/mo."
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground">
                    Optimization Score
                  </span>
                  <span className="text-[11px] font-bold text-tertiary-base">
                    92%
                  </span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-tertiary-base h-full w-[92%]" />
                </div>
              </div>

              {/* Floating Card 3: Quick Metrics */}
              <div className="bg-card border border-border p-3.5 rounded-xl shadow-lg relative z-10 mt-4 mr-12 transform -rotate-1 hover:rotate-0 transition-transform duration-300 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-secondary-base/10 dark:bg-secondary-base/20 text-secondary-base rounded-lg">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground">Monthly Expenses</div>
                    <div className="text-sm font-semibold text-foreground">
                      ₹24,105.00
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Goal: ₹28,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
