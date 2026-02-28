import { motion } from "framer-motion";
import type { UserProfile } from "@/lib/pricing-engine";

interface ProfileCardProps {
  profile: UserProfile;
  isUser: boolean;
  lowestPrice: number;
  index: number;
}

const ProfileCard = ({ profile, isUser, lowestPrice, index }: ProfileCardProps) => {
  const overpay = profile.price - lowestPrice;
  const overpayPct = Math.round((overpay / lowestPrice) * 100);
  const isLowest = profile.price === lowestPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
      className={`glass-card p-4 relative overflow-hidden transition-all duration-300 ${
        isUser
          ? "border-destructive/50 glow-destructive"
          : isLowest
          ? "border-primary/50 glow-primary"
          : ""
      }`}
    >
      {isUser && (
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-destructive/20 text-destructive text-[10px] font-bold uppercase tracking-wider rounded-full">
          Your Price
        </div>
      )}
      {isLowest && (
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
          Lowest
        </div>
      )}

      <div className="flex items-start gap-3">
        <span className="text-2xl">{profile.emoji}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-foreground truncate">{profile.label}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{profile.description}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-xl font-bold font-mono ${
              isLowest ? "text-primary" : isUser ? "text-destructive" : "text-foreground"
            }`}>
              ₹{profile.price.toLocaleString('en-IN')}
            </span>
            {overpay > 0 && (
              <span className="text-xs text-destructive font-mono">
                +₹{overpay.toLocaleString('en-IN')} ({overpayPct}%)
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-mono">
              {profile.device}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-mono">
              {profile.behavior}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
