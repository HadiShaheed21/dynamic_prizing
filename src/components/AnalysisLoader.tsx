import { motion } from "framer-motion";

const steps = [
  "Initializing browser profiles...",
  "Simulating First-Time Visitor...",
  "Simulating iPhone User...",
  "Simulating Desktop User...",
  "Simulating Urgent Buyer...",
  "Simulating Frequent Buyer...",
  "Comparing price snapshots...",
  "Generating fairness report...",
];

interface AnalysisLoaderProps {
  progress: number; // 0-100
}

const AnalysisLoader = ({ progress }: AnalysisLoaderProps) => {
  const currentStep = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-lg mx-auto px-4 py-16 text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-8">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="42"
            className="fill-none stroke-secondary"
            strokeWidth="4"
          />
          <motion.circle
            cx="50" cy="50" r="42"
            className="fill-none stroke-primary"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={264}
            strokeDashoffset={264 - (264 * progress) / 100}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold font-mono text-primary">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="space-y-2">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: i <= currentStep ? 1 : 0.2,
              x: 0,
            }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className={`text-sm font-mono flex items-center gap-2 justify-center ${
              i < currentStep
                ? "text-primary"
                : i === currentStep
                ? "text-foreground"
                : "text-muted-foreground/30"
            }`}
          >
            <span>{i < currentStep ? "✓" : i === currentStep ? "▸" : "○"}</span>
            {step}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnalysisLoader;
