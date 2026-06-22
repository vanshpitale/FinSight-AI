// Add a faq , testimonial section

import MarketingNavbar from "./_components/marketing-navbar";
import HeroSection from "./_components/hero-section";
import FeaturesGrid from "./_components/features-grid";
// import AiInsightsDemo from "./_components/ai-insights-demo";
import InteractiveCalculator from "./_components/interactive-calculator";
import PricingSection from "./_components/pricing-section";
import MarketingFooter from "./_components/marketing-footer";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-secondary-base selection:text-white overflow-x-hidden theme-transition">
      <MarketingNavbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
        {/* <AiInsightsDemo /> */}
        <InteractiveCalculator />
        <PricingSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
