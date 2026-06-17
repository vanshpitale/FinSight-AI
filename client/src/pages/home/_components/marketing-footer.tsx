import Logo from "@/components/logo/logo";
import { Github, Twitter, Linkedin, Sparkles } from "lucide-react";

export default function MarketingFooter() {
  return (
    <footer className="bg-primary-base text-muted-foreground border-t border-border/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
        
        {/* Brand Column */}
        <div className="col-span-2 space-y-4">
          <div className="text-white">
            <Logo url="/" />
          </div>
          <p className="text-xs leading-relaxed max-w-sm text-muted-foreground">
            FinSight AI empowers you to track your money, gain detailed insights, and automate budgeting with cutting-edge artificial intelligence. Take charge of your financial horizon.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Sitemap 1: Product */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
            </li>
            <li>
              <a href="#demo" className="hover:text-white transition-colors">AI Advisor</a>
            </li>
            <li>
              <a href="#calculator" className="hover:text-white transition-colors">Savings Calc</a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </li>
          </ul>
        </div>

        {/* Sitemap 2: Resources */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Safety Guides</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Financial Blog</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Developer API</a>
            </li>
          </ul>
        </div>

        {/* Sitemap 3: Legal */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Security Disclosures</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-border/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground/60">
        <div>
          &copy; {new Date().getFullYear()} FinSight AI (Branded as Finora). All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-secondary-base" />
          <span>Secured with AES-256 and SSL bank-grade pipelines</span>
        </div>
      </div>
    </footer>
  );
}
