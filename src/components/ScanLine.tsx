import { motion } from "framer-motion";

const ScanLine = () => (
  <motion.div
    className="absolute inset-0 scan-line pointer-events-none z-10"
    animate={{ y: ["-100%", "100%"] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default ScanLine;
