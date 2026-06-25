import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  PiggyBank,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface InsightItem {
  title: string;
  description: string;
  severity?: "low" | "medium" | "high" | string;
}

export interface RecommendationItem {
  title: string;
  description: string;
}

export interface AIInsightsCardProps {
  insights?: InsightItem[];
  recommendations?: RecommendationItem[];
  isLoading?: boolean;
}

// Helper to determine icon based on keywords
const getInsightIcon = (title: string, description: string, severity?: string) => {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("saving") || text.includes("saved") || text.includes("turnaround") || text.includes("momentum")) {
    return (
      <div className="p-2 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
        <PiggyBank className="size-5" />
      </div>
    );
  }
  if (text.includes("spending") || text.includes("spend") || text.includes("electronics") || text.includes("shopping") || text.includes("purchase")) {
    return (
      <div className="p-2 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
        <ShoppingBag className="size-5" />
      </div>
    );
  }
  if (text.includes("expense") || text.includes("housing") || text.includes("food") || text.includes("utilities") || text.includes("rent")) {
    return (
      <div className="p-2 bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-lg">
        <TrendingDown className="size-5" />
      </div>
    );
  }
  if (text.includes("income") || text.includes("salary") || text.includes("earning") || text.includes("earned")) {
    return (
      <div className="p-2 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
        <TrendingUp className="size-5" />
      </div>
    );
  }

  // Fallback by severity
  if (severity === "high") {
    return (
      <div className="p-2 bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-lg">
        <ShieldAlert className="size-5" />
      </div>
    );
  }
  if (severity === "medium") {
    return (
      <div className="p-2 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg">
        <AlertTriangle className="size-5" />
      </div>
    );
  }

  return (
    <div className="p-2 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg">
      <Sparkles className="size-5" />
    </div>
  );
};

// Helper to get severity accent border / ring colors
const getSeverityStyle = (title: string, description: string, severity?: string) => {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("saving") || text.includes("saved") || text.includes("turnaround") || text.includes("momentum")) {
    return "border-l-4 border-l-emerald-500 dark:border-l-emerald-400 hover:shadow-emerald-500/5";
  }
  if (text.includes("expense") || text.includes("housing") || text.includes("food") || text.includes("utilities") || text.includes("rent") || severity === "high") {
    return "border-l-4 border-l-rose-500 dark:border-l-rose-400 hover:shadow-rose-500/5";
  }
  if (text.includes("spending") || text.includes("spend") || severity === "medium") {
    return "border-l-4 border-l-indigo-500 dark:border-l-indigo-400 hover:shadow-indigo-500/5";
  }
  return "border-l-4 border-l-purple-500 dark:border-l-purple-400 hover:shadow-purple-500/5";
};

export const AIInsightsCard: React.FC<AIInsightsCardProps> = ({
  insights = [],
  recommendations = [],
  isLoading = false,
}) => {
  if (isLoading) {
    return <AIInsightsSkeleton />;
  }

  const hasInsights = insights.length > 0;
  const hasRecommendations = recommendations.length > 0;

  if (!hasInsights && !hasRecommendations) {
    return <AIInsightsEmptyState />;
  }

  return (
    <Card className="w-full border border-border/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 px-6 py-5">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
              AI Financial Insights
            </h2>
            <p className="text-xs text-muted-foreground">
              Personalized smart coaching based on your current activity
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-8">
        {/* Insights Section */}
        {hasInsights && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Key Insights
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {insights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={cn(
                    "flex flex-col justify-between gap-4 p-5 rounded-xl border border-border/40",
                    "bg-white/40 dark:bg-slate-950/20 hover:bg-white/80 dark:hover:bg-slate-950/40",
                    "transition-all duration-300 hover:shadow-lg shadow-sm backdrop-blur-sm",
                    getSeverityStyle(insight.title, insight.description, insight.severity)
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1.5">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                        {insight.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {insight.description}
                      </p>
                    </div>
                    {getInsightIcon(insight.title, insight.description, insight.severity)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {hasRecommendations && (
          <div className="space-y-4 pt-2 border-t border-border/40">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg shadow-inner">
                <Lightbulb className="size-5" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Recommendations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 + 0.3 }}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-xl border border-border/30",
                    "bg-gradient-to-r from-amber-500/5 to-transparent hover:from-amber-500/10",
                    "transition-all duration-200"
                  )}
                >
                  <div className="mt-1 flex items-center justify-center p-1 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full">
                    <ArrowRight className="size-3.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">
                      {rec.title}
                    </h4>
                    {rec.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {rec.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Skeleton Loader component
const AIInsightsSkeleton = () => {
  return (
    <Card className="w-full border border-border/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 px-6 py-5">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3 w-72" />
        </div>
      </div>

      <CardContent className="p-6 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-5 rounded-xl border border-border/40 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                  <Skeleton className="size-9 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-2 border-t border-border/40">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/30">
                <Skeleton className="size-5 rounded-full mt-1 shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Empty State component
const AIInsightsEmptyState = () => {
  return (
    <Card className="w-full border border-border/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-xl py-12 px-6">
      <CardContent className="flex flex-col items-center text-center max-w-md mx-auto space-y-5 p-0">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No AI Insights Yet
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We don't have enough transaction history to build your financial recommendations yet. Try logging more transactions or linking accounts.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightsCard;
