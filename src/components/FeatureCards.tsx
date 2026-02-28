import { motion } from "framer-motion";
import { Shield, Eye, Search } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Expose Hidden Pricing",
    description: "See what others pay for the exact same product, flight, or hotel — at the same time.",
  },
  {
    icon: Search,
    title: "Multi-Profile Analysis",
    description: "We simulate different devices, behaviors, and user types to uncover price variations.",
  },
  {
    icon: Shield,
    title: "Transparent Reports",
    description: "Get a clear FAIR / UNFAIR verdict with human-readable explanations of why prices differ.",
  },
];

const FeatureCards = () => (
  <section className="w-full max-w-5xl mx-auto px-4 py-16">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
          className="glass-card p-6 group hover:border-primary/40 transition-colors duration-300"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow duration-300">
            <feature.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeatureCards;
