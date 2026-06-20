import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES } from "@/routes/common/routePath";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/theme-provider";

export default function MarketingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 theme-transition ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200/80 dark:border-slate-900/60 py-3.5 shadow-sm dark:shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 whitespace-nowrap text-slate-900 dark:text-white theme-transition">
            <Logo url="/" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <a
                href="#features"
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors theme-transition"
              >
                Features
              </a>

              <a
                href="#demo"
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors theme-transition"
              >
                AI Insights
              </a>

              <a
                href="#calculator"
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors theme-transition"
              >
                Savings Calc
              </a>

              <a
                href="#pricing"
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors theme-transition"
              >
                Pricing
              </a>
            </nav>

            {/* Buttons & Theme Switcher */}
            <div className="flex items-center gap-4">
              {/* Circular Theme Toggle Switch */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all duration-300 hover:scale-105 cursor-pointer theme-transition"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-400 animate-spin-slow" />
                ) : (
                  <Moon className="h-4 w-4 text-indigo-600" />
                )}
              </button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}
                className="cursor-pointer text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 px-4 theme-transition"
              >
                Sign In
              </Button>

              <Button
                size="sm"
                onClick={() => navigate(AUTH_ROUTES.SIGN_UP)}
                className="bg-secondary-base hover:bg-secondary-base/90 text-white font-bold cursor-pointer border-0 shadow-lg shadow-secondary-base/15 rounded-xl px-5 py-2.5 text-xs theme-transition"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 cursor-pointer theme-transition"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-600" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors theme-transition"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-2 theme-transition">
          <a
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors theme-transition"
          >
            Features
          </a>

          <a
            href="#demo"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors theme-transition"
          >
            AI Insights
          </a>

          <a
            href="#calculator"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors theme-transition"
          >
            Savings Calc
          </a>

          <a
            href="#pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors theme-transition"
          >
            Pricing
          </a>

          <div className="pt-4 flex flex-col gap-3 px-4 border-t border-slate-150 dark:border-slate-900">
            <Button
              variant="outline"
              className="w-full border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-transparent rounded-xl theme-transition"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate(AUTH_ROUTES.SIGN_IN);
              }}
            >
              Sign In
            </Button>

            <Button
              className="w-full bg-secondary-base hover:bg-secondary-base/90 text-white border-0 rounded-xl theme-transition"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate(AUTH_ROUTES.SIGN_UP);
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}