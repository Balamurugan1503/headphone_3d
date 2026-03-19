"use client";
import { motion } from "framer-motion";

export function CircularPulse() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none -z-10 w-full h-full">
      <motion.div
        className="w-32 md:w-64 h-32 md:h-64 border border-white/20 rounded-full"
        animate={{ scale: [1, 4], opacity: [0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-32 md:w-64 h-32 md:h-64 border border-white/20 rounded-full"
        animate={{ scale: [1, 4], opacity: [0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
      />
    </div>
  );
}

export function FrequencyBars() {
  return (
    <div className="flex items-end gap-[3px] h-6 opacity-60">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-white rounded-full origin-bottom"
          animate={{ height: ["20%", "100%", "40%", "90%", "30%"] }}
          transition={{
            duration: 0.8 + Math.random() * 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
