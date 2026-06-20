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
        "Weekend Dinners: Saturday night average tab was ₹4,550 (spiked due to group checks).",
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
    <section id="demo" className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 theme-transition relative overflow-hidden">
      {/* Grid Backing */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />

      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-secondary-base/3 dark:bg-secondary-base/5 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-tertiary-base/3 dark:bg-tertiary-base/5 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary-base/10 border border-tertiary-base/20 text-tertiary-base text-xs font-semibold">
            Artificial Intelligence
          </div>
          <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white theme-transition">
            Meet your smart financial co-pilot
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium theme-transition">
            Ask questions, uncover patterns, and get structured advice to optimize your budgets and investments.
          </p>
        </div>

        {/* Chat Simulator */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Controls / Options Sidebar (Left) */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-3.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 block mb-1">
              Select a Query
            </span>
            <button
              onClick={() => setActiveTab("leakage")}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-350 cursor-pointer ${
                activeTab === "leakage"
                  ? "bg-secondary-base border-secondary-base text-white shadow-lg shadow-secondary-base/15"
                  : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-800"
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-2">
                <HelpCircle className="h-4 w-4 shrink-0" />
                Analyze Subscription Leaks
              </div>
              <p className={`text-[11px] mt-1.5 leading-relaxed font-medium ${activeTab === "leakage" ? "text-slate-200" : "text-slate-500 dark:text-slate-400"}`}>
                Find double bills or inactive streaming profiles.
              </p>
            </button>

            <button
              onClick={() => setActiveTab("vacation")}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-350 cursor-pointer ${
                activeTab === "vacation"
                  ? "bg-secondary-base border-secondary-base text-white shadow-lg shadow-secondary-base/15"
                  : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-800"
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-2">
                <HelpCircle className="h-4 w-4 shrink-0" />
                Plan Vacation Savings Goal
              </div>
              <p className={`text-[11px] mt-1.5 leading-relaxed font-medium ${activeTab === "vacation" ? "text-slate-200" : "text-slate-500 dark:text-slate-400"}`}>
                Calculate timelines and find spending cuts.
              </p>
            </button>

            <button
              onClick={() => setActiveTab("dining")}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-350 cursor-pointer ${
                activeTab === "dining"
                  ? "bg-secondary-base border-secondary-base text-white shadow-lg shadow-secondary-base/15"
                  : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-800"
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-2">
                <HelpCircle className="h-4 w-4 shrink-0" />
                Explain Spending Spikes
              </div>
              <p className={`text-[11px] mt-1.5 leading-relaxed font-medium ${activeTab === "dining" ? "text-slate-200" : "text-slate-500 dark:text-slate-400"}`}>
                Break down category increases over the past month.
              </p>
            </button>
          </div>
 
          {/* Chat Window (Right) */}
          <div className="lg:col-span-8 bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-3xl shadow-xl dark:shadow-2xl flex flex-col justify-between overflow-hidden min-h-[480px] backdrop-blur-md theme-transition">
            {/* Window Header */}
            <div className="bg-slate-50/80 dark:bg-slate-900/50 px-6 py-4.5 border-b border-slate-200 dark:border-slate-900 flex items-center justify-between theme-transition">
              <div className="flex items-center gap-3">
                <div className="bg-secondary-base text-white p-2 rounded-xl">
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 theme-transition">
                    FinSight AI Assistant
                  </h4>
                  <span className="text-[9px] text-secondary-base font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary-base animate-ping" />
                    Online & Analyzing Feed
                  </span>
                </div>
              </div>
              <span className="text-[9px] bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-900 px-3 py-1 rounded-full text-slate-500 dark:text-slate-400 font-mono font-bold uppercase tracking-wider theme-transition">
                Finance Core
              </span>
            </div>

            {/* Conversation Flow */}
            <div className="p-6 flex-1 flex flex-col justify-start gap-6 overflow-y-auto max-h-[380px]">
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
                        ? "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        : "bg-secondary-base"
                    }`}
                  >
                    {message.sender === "user" ? <User className="h-4 w-4 text-slate-600 dark:text-slate-300" /> : <Brain className="h-4 w-4 text-white" />}
                  </div>

                  {/* Message Bubble */}
                  <div className="space-y-3">
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs leading-relaxed font-medium ${
                        message.sender === "user"
                          ? "bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 rounded-tr-none border border-slate-200 dark:border-slate-750"
                          : "bg-secondary-base/5 dark:bg-secondary-base/10 border border-secondary-base/15 text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      {message.text}
                    </div>

                    {/* Recommendations Block */}
                    {message.recommendations && (
                      <div className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900 rounded-2xl p-4.5 space-y-3 theme-transition">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                          Recommendations
                        </span>
                        <ul className="space-y-2.5">
                          {message.recommendations.map((rec, k) => (
                            <li key={k} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 font-medium theme-transition">
                              <CheckCircle className="h-4 w-4 text-secondary-base shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Metric Card */}
                    {message.metric && (
                      <div className="bg-gradient-to-r from-secondary-base to-tertiary-base text-white rounded-2xl p-4.5 shadow-lg flex justify-between items-center">
                        <div>
                          <div className="text-[9px] text-white/70 font-bold uppercase tracking-wider">
                            {message.metric.label}
                          </div>
                          <div className="text-xl font-black mt-0.5 tracking-tight">
                            {message.metric.value}
                          </div>
                        </div>
                        <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full font-bold">
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
                  <div className="h-8 w-8 rounded-full bg-secondary-base flex items-center justify-center text-white shrink-0">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-9">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar Mock */}
            <div className="p-4 bg-slate-50/80 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-900 flex gap-2 theme-transition">
              <input
                type="text"
                disabled
                placeholder="Ask FinSight AI something..."
                className="flex-grow bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-850 px-4 py-2.5 rounded-xl text-xs text-slate-400 dark:text-slate-500 cursor-not-allowed font-medium theme-transition"
              />
              <button disabled className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-400 dark:text-slate-650 p-2.5 rounded-xl cursor-not-allowed theme-transition">
                <Send className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
