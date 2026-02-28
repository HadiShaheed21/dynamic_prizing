import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Link as LinkIcon } from "lucide-react";

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const URLInput = ({ onSubmit, isLoading }: URLInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onSubmit(url.trim());
  };

  const placeholders = [
    "https://www.booking.com/hotel/us/marriott-downtown...",
    "https://www.skyscanner.com/transport/flights/nyc/lon...",
    "https://www.amazon.com/dp/B0C8PSRWFM...",
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <div className="relative group">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm" />
        <div className="relative flex items-center bg-card border border-border rounded-xl overflow-hidden">
          <LinkIcon className="w-4 h-4 text-muted-foreground ml-4 shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholders[0]}
            className="flex-1 bg-transparent px-3 py-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none font-mono"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="m-1.5 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center gap-2 hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shrink-0"
          >
            {isLoading ? (
              <motion.div
                className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                Analyze
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
      <div className="flex gap-2 mt-3 justify-center flex-wrap">
        {["Flight", "Hotel", "Product"].map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              const urls: Record<string, string> = {
                Flight: "https://www.skyscanner.com/flights/nyc/lon/2025-03-15",
                Hotel: "https://www.marriott.com/hotels/downtown-suite",
                Product: "https://www.amazon.com/dp/B0C8PSRWFM",
              };
              setUrl(urls[label]);
            }}
            className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-200"
          >
            Try {label}
          </button>
        ))}
      </div>
    </motion.form>
  );
};

export default URLInput;
