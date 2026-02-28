import { motion } from "framer-motion";
import { useState } from "react";
import { PRODUCT_LISTINGS, type ProductListing } from "@/lib/pricing-engine";

const CATEGORIES = ["All", "Flights", "Hotels", "Electronics", "Fashion"];

interface ProductGridProps {
  onSelect: (url: string) => void;
}

const ProductGrid = ({ onSelect }: ProductGridProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? PRODUCT_LISTINGS
    : PRODUCT_LISTINGS.filter((p) => p.category === activeCategory);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h2 className="text-lg font-bold text-foreground text-center mb-1">
          Or pick a product to analyze
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Click any item to see how prices differ across user profiles
        </p>

        {/* Category Tabs */}
        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-4 py-1.5 rounded-full border font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((product, i) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
              onClick={() => onSelect(product.url)}
              className="glass-card p-4 text-left group hover:border-primary/40 transition-all duration-300 cursor-pointer"
            >
              <div className="text-3xl mb-3">{product.image}</div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-mono font-bold text-foreground">
                  ₹{product.basePrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                  {product.tag}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 uppercase tracking-wider">
                {product.category}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProductGrid;
