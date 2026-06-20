import { useState, useRef } from "react";
import { motion } from "framer-motion";
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
    color: "from-secondary-base/20 to-secondary-base/5 text-secondary-base",
  },
  {
    icon: Target,
    title: "Dynamic Smart Budgets",
    description:
      "Create category-based budgets that adapt to your historical spending and monthly income fluctuations to prevent overspending before it happens.",
    color: "from-tertiary-base/20 to-tertiary-base/5 text-tertiary-base",
  },
  {
    icon: Shield,
    title: "Bank-Grade Encryption",
    description:
      "Your privacy is our priority. We use AES-256 bank-level encryption. Your financial credentials are never stored, keeping your files completely secure.",
    color: "from-indigo-500/20 to-indigo-500/5 text-indigo-500 dark:text-indigo-400",
  },
  {
    icon: Activity,
    title: "Real-time Cash Flow",
    description:
      "Visualize your income against expenses in real time. Gain instant insights into your true net savings rate with high-fidelity charts.",
    color: "from-tertiary-base/20 to-secondary-base/5 text-tertiary-base",
  },
  {
    icon: Calendar,
    title: "Smart Bill Reminders",
    description:
      "Detect recurring subscription charges automatically. Get notified before transactions execute so you never get hit with a surprise bill.",
    color: "from-secondary-base/20 to-secondary-base/5 text-secondary-base",
  },
  {
    icon: Download,
    title: "Seamless Reports Export",
    description:
      "Filter transactions easily and generate detailed PDF or CSV reports for tax season, business expenses, or personal records in seconds.",
    color: "from-violet-500/20 to-violet-500/5 text-violet-500 dark:text-violet-400",
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className: string }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineStyle, setShineStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const x = (mouseX / width) - 0.5;
    const y = (mouseY / height) - 0.5;

    // Gentle 3D tilt (max 10 degrees)
    setRotateX(-y * 10);
    setRotateY(x * 10);

    // Calculate light reflection position
    const percentX = (mouseX / width) * 100;
    const percentY = (mouseY / height) * 100;
    setShineStyle({
      opacity: 0.12,
      background: `radial-gradient(circle 120px at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.45), transparent)`,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShineStyle({ opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={className}
    >
      {/* Light shine reflection effect layer */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 z-20" 
        style={shineStyle} 
      />
      {children}
    </motion.div>
  );
}

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 theme-transition relative overflow-hidden">
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />

      {/* Decorative Glow Blob */}
      <div className="absolute top-10 right-1/4 w-[380px] h-[380px] bg-tertiary-base/3 dark:bg-tertiary-base/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary-base/10 border border-tertiary-base/20 text-tertiary-base text-xs font-semibold">
            Capabilities
          </div>
          <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white theme-transition">
            Smart tools to simplify your financial life
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto theme-transition">
            Say goodbye to clunky spreadsheets. FinSight AI automates manual tracking, scanning bills with AI, and delivering custom advisory reports.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <TiltCard
                key={idx}
                className="group relative bg-white/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-850 p-8 rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgba(79,70,229,0.04)] dark:hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] hover:border-secondary-base/30 transition-all duration-300 flex flex-col justify-between theme-transition"
              >
                {/* Backlight glow on card hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-base/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none -z-10" />

                <div>
                  {/* Icon Container */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6 relative z-10`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 relative z-10 theme-transition">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed relative z-10 font-medium theme-transition">
                    {feature.description}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
