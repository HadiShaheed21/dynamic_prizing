import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import URLInput from "@/components/URLInput";
import FeatureCards from "@/components/FeatureCards";
import ProductGrid from "@/components/ProductGrid";
import AnalysisLoader from "@/components/AnalysisLoader";
import PriceReport from "@/components/PriceReport";
import ScanLine from "@/components/ScanLine";
import { generateAnalysis, type PriceAnalysis } from "@/lib/pricing-engine";

type AppState = "idle" | "loading" | "report";

const Index = () => {
  const [state, setState] = useState<AppState>("idle");
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<PriceAnalysis | null>(null);

  const handleSubmit = useCallback((url: string) => {
    setState("loading");
    setProgress(0);

    const result = generateAnalysis(url, 1);

    // Simulate progressive loading
    const duration = 3500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setAnalysis(result);
          setState("report");
        }, 300);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  const handleBack = () => {
    setState("idle");
    setAnalysis(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">
            Fair<span className="text-primary">Pay</span>
          </span>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          v1.0 — hackathon demo
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero */}
            <section className="relative pt-16 pb-8 text-center">
              <div className="relative z-10 overflow-hidden">
                <ScanLine />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border border-primary/30 text-primary bg-primary/5 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                    Price Discrimination Detector
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl mx-auto px-4"
                >
                  <span className="text-foreground">Are you paying </span>
                  <span className="text-gradient-danger">more</span>
                  <span className="text-foreground"> than everyone else?</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-muted-foreground mt-4 max-w-xl mx-auto px-4 text-sm md:text-base"
                >
                  Paste any product, flight, or hotel link. We'll show you how companies
                  charge different prices based on who you are.
                </motion.p>
              </div>
            </section>

            {/* Input */}
            <section className="py-6">
              <URLInput onSubmit={handleSubmit} isLoading={false} />
            </section>

            {/* Product Grid */}
            <ProductGrid onSelect={handleSubmit} />

            {/* Features */}
            <FeatureCards />
            <footer className="text-center pb-8 text-xs text-muted-foreground/50">
              Built for hackathon demonstration • Uses simulated pricing data
            </footer>
          </motion.div>
        )}

        {state === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnalysisLoader progress={progress} />
          </motion.div>
        )}

        {state === "report" && analysis && (
          <motion.div
            key="report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PriceReport analysis={analysis} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
