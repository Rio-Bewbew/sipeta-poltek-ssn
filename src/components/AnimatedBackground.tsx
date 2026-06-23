"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-krem/50">
      {/* Dynamic blurred orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, 30, 60, 30, 0],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-emas/10 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0, 80, 0],
          y: [0, 50, 0, -50, 0],
          scale: [1, 1.2, 1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-marun/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 40, 80, 40, 0],
          y: [0, -60, -30, -60, 0],
          scale: [0.8, 1, 1.1, 1, 0.8],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-navy/5 blur-[90px]"
      />
      
      {/* Light noise texture overlay to make it feel less flat and more "premium" */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" 
        }}
      ></div>
    </div>
  );
}
