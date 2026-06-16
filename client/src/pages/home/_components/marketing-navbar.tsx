import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES } from "@/routes/common/routePath";
import { Menu, X } from "lucide-react";

export default function MarketingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 py-3 shadow-sm"
          : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 whitespace-nowrap">
            <Logo url="/" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-6">
              <a
                href="#features"
                className="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
              >
                Features
              </a>

              <a
                href="#demo"
                className="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
              >
                AI Insights
              </a>

              <a
                href="#calculator"
                className="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
              >
                Savings Calc
              </a>

              <a
                href="#pricing"
                className="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
              >
                Pricing
              </a>
            </nav>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}
                className="cursor-pointer"
              >
                Sign In
              </Button>

              <Button
                size="sm"
                onClick={() => navigate(AUTH_ROUTES.SIGN_UP)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-4 space-y-1">
          <a
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            Features
          </a>

          <a
            href="#demo"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            AI Insights
          </a>

          <a
            href="#calculator"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            Savings Calc
          </a>

          <a
            href="#pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            Pricing
          </a>

          <div className="pt-4 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate(AUTH_ROUTES.SIGN_IN);
              }}
            >
              Sign In
            </Button>

            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
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