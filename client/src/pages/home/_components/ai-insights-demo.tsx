import { useState, useEffect } from "react";
import { Send, User, Brain, HelpCircle, CheckCircle } from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
  recommendations?: string[];
  metric?: { label: string; value: string; extra?: string };
}

const CONVERSATIONS: Record<string, Message[]> = {
  leakage: [
    { sender: "user", text: "Scan my accounts for subscription leaks." },
    {
      sender: "ai",
      text: "I analyzed your connected accounts and found 3 redundant subscriptions costing you money without active use:",
      recommendations: [
        "StreamPass Premium (₹999/mo) — No activity recorded in 90+ days.",
        "FitLife Pro App (₹2,499/mo) — Only 1 login tracked in the last 60 days.",
        "CloudStore Extra (₹699/mo) — Duplicate backup system detected.",
      ],
      metric: {
        label: "Annual Potential Savings",
        value: "₹50,364.00",
        extra: "Cancel these to save ₹4,197/mo",
      },
    },
  ],
  vacation: [
    { sender: "user", text: "Can I save ₹2,00,000 for a December vacation?" },
    {
      sender: "ai",
      text: "To hit your ₹2,00,000 goal by Dec 15 (6 months remaining), you need to deposit ₹33,333/month. Your current average savings is ₹20,000/month.",
      recommendations: [
        "Optimizing Dining Out: Limit restaurant visits to 2x/week to free up ₹10,000/mo.",
        "Adjusting Entertainment: Switch to basic tiers on streaming to save ₹2,000/mo.",
        "Auto-Transfer: Schedule a ₹33,333 direct deposit to your vacation vault on paydays.",
      ],
      metric: {
        label: "Feasibility Score",
        value: "94%",
        extra: "Highly achievable with suggested tweaks",
      },
    },
  ],
  dining: [
    { sender: "user", text: "Why did my food spending spike last month?" },
    {
      sender: "ai",
      text: "Your dining out expense hit ₹45,000 last month (+45% above your average). Here is the breakdown:",
      recommendations: [
        "Late-Night Delivery: 6 transactions were food delivery apps after 9 PM (₹12,000 total).",
        "Weekend Dinners: Saturday night average tab was ₹4,500 (spiked due to group checks).",
        "Daily Coffee Run: Minor but frequent morning cafe charges added up to ₹5,000.",
      ],
      metric: {
        label: "Over-Budget Leak",
        value: "+₹14,000.00",
        extra: "Set a weekly delivery cap of ₹2,000 to fix",
      },
    },
  ],
};

export default function AiInsightsDemo() {
  const [activeTab, setActiveTab] = useState<"leakage" | "vacation" | "dining">("leakage");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Reset conversation and simulate writing
    setMessages([CONVERSATIONS[activeTab][0]]);
    setIsTyping(true);

    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, CONVERSATIONS[activeTab][1]]);
    }, 1200);

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <section id="demo" className="py-24 bg-zinc-50 dark:bg-zinc-950/40 relative">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-emerald-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/5 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
            Artificial Intelligence
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Meet your smart financial co-pilot
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Ask questions, uncover patterns, and get structured advice to optimize your budgets and investments.
          </p>
        </div>

        {/* Chat Simulator */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Controls / Options Sidebar (Left) */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-2">
              Select a Query
            </span>
            <button
              onClick={() => setActiveTab("leakage")}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeTab === "leakage"
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/10"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
              }`}
            >
              <div className="font-semibold text-sm flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Analyze Subscription Leaks
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${activeTab === "leakage" ? "text-emerald-100" : "text-zinc-500"}`}>
                Find double bills or inactive streaming profiles.
              </p>
            </button>

            <button
              onClick={() => setActiveTab("vacation")}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeTab === "vacation"
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/10"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
              }`}
            >
              <div className="font-semibold text-sm flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Plan Vacation Savings Goal
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${activeTab === "vacation" ? "text-emerald-100" : "text-zinc-500"}`}>
                Calculate timelines and find spending cuts.
              </p>
            </button>

            <button
              onClick={() => setActiveTab("dining")}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeTab === "dining"
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/10"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
              }`}
            >
              <div className="font-semibold text-sm flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Explain Spending Spikes
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${activeTab === "dining" ? "text-emerald-100" : "text-zinc-500"}`}>
                Break down category increases over the past month.
              </p>
            </button>
          </div>

          {/* Chat Window (Right) */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden min-h-[460px]">
            {/* Window Header */}
            <div className="bg-zinc-50 dark:bg-zinc-950 px-6 py-4 border-b border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-emerald-500 text-white p-2 rounded-xl">
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
                    FinSight AI Assistant
                  </h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Online & Analyzing Feeds
                  </span>
                </div>
              </div>
              <span className="text-[10px] bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400 font-mono">
                GPT-4o Finance Core
              </span>
            </div>

            {/* Conversation Flow */}
            <div className="p-6 flex-1 flex flex-col justify-start gap-6 overflow-y-auto">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${
                    message.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-white shrink-0 ${
                      message.sender === "user"
                        ? "bg-zinc-500"
                        : "bg-emerald-500"
                    }`}
                  >
                    {message.sender === "user" ? <User className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className="space-y-3">
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        message.sender === "user"
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tr-none"
                          : "bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15 text-zinc-700 dark:text-zinc-300 rounded-tl-none"
                      }`}
                    >
                      {message.text}
                    </div>

                    {/* Recommendations Block */}
                    {message.recommendations && (
                      <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl p-4 space-y-3">
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
                          Recommendations
                        </span>
                        <ul className="space-y-2">
                          {message.recommendations.map((rec, k) => (
                            <li key={k} className="text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Metric Card */}
                    {message.metric && (
                      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl p-4 shadow-md flex justify-between items-center">
                        <div>
                          <div className="text-[10px] text-emerald-100 font-semibold uppercase">
                            {message.metric.label}
                          </div>
                          <div className="text-2xl font-black mt-0.5">
                            {message.metric.value}
                          </div>
                        </div>
                        <span className="text-[11px] bg-white/20 px-2.5 py-1 rounded-full font-medium">
                          {message.metric.extra}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 mr-auto items-center">
                  <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-9">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar Mock */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/60 dark:border-zinc-800 flex gap-2">
              <input
                type="text"
                disabled
                placeholder="Ask FinSight AI something..."
                className="flex-grow bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-xs text-zinc-400 cursor-not-allowed"
              />
              <button disabled className="bg-zinc-200 dark:bg-zinc-800 text-zinc-400 p-2 rounded-xl cursor-not-allowed">
                <Send className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
