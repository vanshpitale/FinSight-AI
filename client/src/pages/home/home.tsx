// Add a faq , testimonial section
// Change the website name to FinSight AI


import MarketingNavbar from "./_components/marketing-navbar";
import HeroSection from "./_components/hero-section";
import FeaturesGrid from "./_components/features-grid";
// import AiInsightsDemo from "./_components/ai-insights-demo";
import InteractiveCalculator from "./_components/interactive-calculator";
import PricingSection from "./_components/pricing-section";
import MarketingFooter from "./_components/marketing-footer";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
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
