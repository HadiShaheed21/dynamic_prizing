import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, ArrowLeft, TrendingDown, TrendingUp, IndianRupee } from "lucide-react";
import type { PriceAnalysis } from "@/lib/pricing-engine";
import ProfileCard from "./ProfileCard";

interface PriceReportProps {
  analysis: PriceAnalysis;
  onBack: () => void;
}

const PriceReport = ({ analysis, onBack }: PriceReportProps) => {
  const userProfileIndex = 1; // "Returning User" is typically the user's scenario

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Analyze another
      </motion.button>

      {/* Verdict Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={`glass-card p-6 mb-6 ${
          analysis.isFair ? "border-primary/50" : "border-destructive/50"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            analysis.isFair ? "bg-primary/10" : "bg-destructive/10"
          }`}>
            {analysis.isFair ? (
              <CheckCircle className="w-8 h-8 text-primary" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-destructive" />
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${
              analysis.isFair ? "text-primary" : "text-destructive"
            }`}>
              {analysis.isFair ? "FAIR PRICING" : "UNFAIR PRICING DETECTED"}
            </div>
            <h2 className="text-xl font-bold text-foreground">{analysis.productName}</h2>
            <p className="text-sm text-muted-foreground mt-1 font-mono truncate max-w-md">{analysis.url}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-mono text-destructive">
              +{analysis.percentageOverpay}%
            </div>
            <div className="text-xs text-muted-foreground">overpaying</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Your Price", value: `₹${analysis.userPrice.toLocaleString('en-IN')}`, icon: IndianRupee, color: "text-destructive" },
          { label: "Lowest Found", value: `₹${analysis.lowestPrice.toLocaleString('en-IN')}`, icon: TrendingDown, color: "text-primary" },
          { label: "Highest Found", value: `₹${analysis.highestPrice.toLocaleString('en-IN')}`, icon: TrendingUp, color: "text-warning" },
          { label: "You Overpay", value: `₹${analysis.priceDifference.toLocaleString('en-IN')}`, icon: AlertTriangle, color: "text-destructive" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass-card p-4 text-center"
          >
            <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
            <div className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Price Bar Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 mb-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Price Distribution</h3>
        <div className="space-y-3">
          {analysis.profiles
            .slice()
            .sort((a, b) => a.price - b.price)
            .map((profile, i) => {
              const min = analysis.lowestPrice;
              const max = analysis.highestPrice;
              const range = max - min || 1;
              const width = 30 + ((profile.price - min) / range) * 70;
              const isUser = i === analysis.profiles.sort((a, b) => a.price - b.price).findIndex(p => p.price === analysis.userPrice && p.label.includes("Returning"));

              return (
                <div key={profile.id} className="flex items-center gap-3">
                  <span className="text-sm w-6 text-center">{profile.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground truncate max-w-[150px]">{profile.label}</span>
                      <span className={`text-xs font-mono font-bold ${
                        profile.price === min ? "text-primary" : profile.price === max ? "text-destructive" : "text-foreground"
                      }`}>
                        ₹{profile.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <motion.div
                      className="h-2 rounded-full overflow-hidden bg-secondary"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          profile.price === min
                            ? "bg-primary"
                            : profile.price === max
                            ? "bg-destructive"
                            : "bg-accent"
                        }`}
                      />
                    </motion.div>
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>

      {/* Profile Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Simulated User Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.profiles.map((profile, i) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isUser={i === userProfileIndex}
              lowestPrice={analysis.lowestPrice}
              index={i}
            />
          ))}
        </div>
      </motion.div>

      {/* Reasons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          Why This Happens
        </h3>
        <div className="space-y-3">
          {analysis.reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="flex gap-3 items-start"
            >
              <div className="w-5 h-5 rounded-full bg-warning/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-warning">{i + 1}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PriceReport;
