import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES } from "@/routes/common/routePath";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ArrowDownRight,
  Percent,
  Lock
} from "lucide-react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { motion } from "framer-motion";
import NetworkParticles from "@/components/effects/network-particles";

export default function HeroSection() {
  const navigate = useNavigate();
  const mouse = useMousePosition();

  // Gentle 3D rotation based on mouse coordinates
  const rotateX = mouse.y * 18; // maps to -9 to +9 degrees
  const rotateY = -mouse.x * 18; // maps to -9 to +9 degrees

  return (
    <section className="relative min-h-screen pt-32 pb-24 flex items-center overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 theme-transition">
      {/* Network Particle Canvas Backing */}
      <NetworkParticles />

      {/* Decorative Gradient Mesh Drifting Blobs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-[450px] h-[450px] bg-secondary-base/5 dark:bg-secondary-base/10 blur-[130px] rounded-full pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 30, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-tertiary-base/5 dark:bg-tertiary-base/10 blur-[110px] rounded-full pointer-events-none -z-10"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.06)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-slate-900 dark:text-white theme-transition">
              Take Control of Your Wealth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-base via-indigo-500 to-tertiary-base">
                Guided by Intelligence.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed theme-transition">
              Track expenses, build budgets, receive AI-powered optimization advice, and scan invoices automatically. Elevate your personal accounting with bank-grade security and intelligent automation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                onClick={() => navigate(AUTH_ROUTES.SIGN_UP)}
                className="w-full sm:w-auto bg-secondary-base hover:bg-secondary-base/90 text-white gap-2 font-bold shadow-lg shadow-secondary-base/20 hover:shadow-secondary-base/35 transition-all duration-300 cursor-pointer border-0 rounded-xl px-8 py-6 text-sm theme-transition"
              >
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto cursor-pointer border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-white/5 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 backdrop-blur-md transition-all duration-300 rounded-xl px-8 py-6 text-sm theme-transition"
              >
                <a href="#calculator">Try Live Simulator</a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-900 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 theme-transition">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight theme-transition">
                  50,000+
                </span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Active Users
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight theme-transition">
                  99.9%
                </span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Uptime Guarantee
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight theme-transition">
                  ₹100Cr+
                </span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Tracked
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Dashboard Mockup with 3D Depth */}
          <div className="lg:col-span-6 flex justify-center items-center py-10 relative">

            {/* Holographic Glowing Backlight */}
            <div className="absolute w-[380px] h-[380px] bg-secondary-base/5 dark:bg-secondary-base/15 blur-[60px] dark:blur-[90px] rounded-full pointer-events-none" />

            {/* 3D Scene Container */}
            <div className="perspective-[1200px] w-full max-w-[500px] aspect-square flex items-center justify-center scale-[0.8] min-[375px]:scale-[0.85] sm:scale-100">

              {/* Floating Dashboard Wrapper */}
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  rotateX: rotateX,
                  rotateY: rotateY,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative w-full max-w-[280px] min-[375px]:max-w-[320px] sm:max-w-[400px] aspect-square bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl dark:shadow-2xl flex flex-col justify-between theme-transition"
              >
                {/* Mini Glass Header */}
                <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800/80 pb-4 theme-transition">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/40 rounded-full theme-transition">
                    <Lock className="h-3 w-3 text-secondary-base" /> FINSIGHT AI
                  </div>
                </div>

                {/* Dashboard Chart Mockup (Middle) */}
                <div className="flex-1 my-4 flex flex-col justify-end space-y-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Net Asset Value</span>
                    <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-baseline gap-1.5 theme-transition">
                      ₹12,48,500.00
                      <span className="text-xs text-green-500 dark:text-green-400 font-semibold flex items-center">
                        <TrendingUp className="h-3 w-3" /> +15.2%
                      </span>
                    </div>
                  </div>

                  {/* High fidelity mini SVG chart */}
                  <div className="h-20 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="navGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,25 C15,22 20,10 35,16 C50,22 65,5 80,10 C90,13 95,2 100,5"
                        fill="none"
                        stroke="url(#gradient-line)"
                        strokeWidth="1.5"
                        className="stroke-secondary-base"
                      />
                      <path
                        d="M0,25 C15,22 20,10 35,16 C50,22 65,5 80,10 C90,13 95,2 100,5 L100,30 L0,30 Z"
                        fill="url(#navGlow)"
                      />
                      {/* Interactive dot */}
                      <circle cx="80" cy="10" r="2.5" fill="#8B5CF6" className="animate-ping" />
                      <circle cx="80" cy="10" r="1.5" fill="#ffffff" />
                    </svg>
                  </div>
                </div>

                {/* Sub-layers floating inside (translateZ properties to look true 3D) */}

                {/* FLOATING CARD 1: INCOME (Top Left) */}
                <motion.div
                  style={{ transform: "translateZ(55px)" }}
                  className="absolute -top-6 -left-10 bg-white/95 dark:bg-slate-900/90 border border-slate-150 dark:border-slate-800 p-3.5 rounded-2xl shadow-md dark:shadow-xl backdrop-blur-md flex items-center gap-3 w-40 hover:border-secondary-base/40 transition-all duration-300 theme-transition"
                >
                  <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 dark:text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-semibold block uppercase">Total Income</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 theme-transition">₹1,25,000</span>
                  </div>
                </motion.div>

                {/* FLOATING CARD 2: AI SCORE (Top Right) */}
                <motion.div
                  style={{ transform: "translateZ(75px)" }}
                  className="absolute -top-8 -right-8 bg-white/95 dark:bg-slate-900/90 border border-slate-150 dark:border-slate-800 p-3.5 rounded-2xl shadow-md dark:shadow-xl backdrop-blur-md flex items-center gap-3 w-44 hover:border-tertiary-base/40 transition-all duration-300 theme-transition"
                >
                  <div className="p-2 bg-tertiary-base/10 rounded-xl text-tertiary-base">
                    <Sparkles className="h-4 w-4 animate-spin-slow" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-semibold block uppercase">AI Health Score</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200 theme-transition">96</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-tertiary-base/20 text-tertiary-base font-bold">Excellent</span>
                    </div>
                  </div>
                </motion.div>

                {/* FLOATING CARD 3: SAVINGS RATE (Bottom Left) */}
                <motion.div
                  style={{ transform: "translateZ(65px)" }}
                  className="absolute -bottom-8 -left-8 bg-white/95 dark:bg-slate-900/90 border border-slate-150 dark:border-slate-800 p-3.5 rounded-2xl shadow-md dark:shadow-xl backdrop-blur-md flex items-center gap-3 w-44 hover:border-indigo-400/40 transition-all duration-300 theme-transition"
                >
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500 dark:text-indigo-400">
                    <Percent className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-semibold block uppercase">Savings Rate</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 theme-transition">66.1% <span className="text-[9px] text-green-500 dark:text-green-400 font-medium">Good</span></span>
                  </div>
                </motion.div>

                {/* FLOATING CARD 4: EXPENSES (Bottom Right) */}
                <motion.div
                  style={{ transform: "translateZ(45px)" }}
                  className="absolute -bottom-6 -right-6 bg-white/95 dark:bg-slate-900/90 border border-slate-150 dark:border-slate-800 p-3.5 rounded-2xl shadow-md dark:shadow-xl backdrop-blur-md flex flex-col gap-1.5 w-44 hover:border-red-400/40 transition-all duration-300 theme-transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-red-500/10 rounded-lg text-red-500 dark:text-red-400">
                        <ArrowDownRight className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[9px] text-slate-500 font-semibold uppercase">Expenses</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 dark:text-slate-300 theme-transition">₹42,300</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden theme-transition">
                    <div className="bg-red-500 h-full w-[34%]" />
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
