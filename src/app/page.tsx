"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import ImageSequenceCanvas from "@/components/ImageSequenceCanvas";
import BackgroundEffects from "@/components/BackgroundEffects";
import CursorGlow from "@/components/CursorGlow";
import { CircularPulse, FrequencyBars } from "@/components/AudioVisualizer";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Smooth out scroll progress for text animations to feel cinematic
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 100,
  });

  // Section 1: Hero (0 - 0.15)
  // Adjusted timing to avoid overlap
  const heroOpacity = useTransform(smoothProgress, [0, 0.08, 0.12], [1, 1, 0]);
  const heroBlur = useTransform(smoothProgress, [0, 0.08, 0.12], ["blur(0px)", "blur(0px)", "blur(20px)"]);
  const heroScale = useTransform(smoothProgress, [0, 0.12], [1, 1.05]);
  const heroY = useTransform(smoothProgress, [0, 0.12], [0, -50]);

  // Section 2: Disassembly / Precision Engineering (0.18 - 0.4)
  const sec2Opacity = useTransform(smoothProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const sec2Blur = useTransform(smoothProgress, [0.15, 0.2, 0.35, 0.4], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);
  const sec2Scale = useTransform(smoothProgress, [0.15, 0.2, 0.35, 0.4], [0.9, 1, 1, 1.05]);
  const sec2Y = useTransform(smoothProgress, [0.15, 0.4], [50, -50]);

  // Section 3: Technical Highlights / Chip (0.45 - 0.65)
  const sec3Opacity = useTransform(smoothProgress, [0.42, 0.48, 0.6, 0.65], [0, 1, 1, 0]);
  const sec3Blur = useTransform(smoothProgress, [0.42, 0.48, 0.6, 0.65], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);
  const sec3Scale = useTransform(smoothProgress, [0.42, 0.48, 0.6, 0.65], [0.9, 1, 1, 1.05]);
  const sec3Y = useTransform(smoothProgress, [0.42, 0.65], [50, -50]);

  // Section 4: Reassembly (0.68 - 0.85)
  const sec4Opacity = useTransform(smoothProgress, [0.68, 0.72, 0.8, 0.85], [0, 1, 1, 0]);
  const sec4Blur = useTransform(smoothProgress, [0.68, 0.72, 0.8, 0.85], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);
  const sec4Scale = useTransform(smoothProgress, [0.68, 0.72, 0.8, 0.85], [0.9, 1, 1, 1.05]);
  const sec4Y = useTransform(smoothProgress, [0.68, 0.85], [50, -50]);

  // Section 5: CTA / Final (0.88 - 1.0)
  const ctaOpacity = useTransform(smoothProgress, [0.88, 0.92, 1], [0, 1, 1]);
  const ctaBlur = useTransform(smoothProgress, [0.88, 0.92, 1], ["blur(20px)", "blur(0px)", "blur(0px)"]);
  const ctaScale = useTransform(smoothProgress, [0.88, 0.92, 1], [0.9, 1, 1]);
  const ctaY = useTransform(smoothProgress, [0.88, 1], [50, 0]);

  return (
    <main className="relative w-full h-[1000vh] bg-root text-foreground selection:bg-accent selection:text-white">
      <CursorGlow />
      <BackgroundEffects />
      
      {/* Background Canvas */}
      <ImageSequenceCanvas frameCount={224} />

      {/* Narrative Overlay Containers */}
      <div className="fixed inset-0 pointer-events-none flex flex-col justify-center items-center z-10 px-6">
        
        {/* HERO SECTION */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY, filter: heroBlur, scale: heroScale }}
          className="absolute text-center max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Hear the Unseen.
          </h1>
          <p className="mt-6 text-xl md:text-3xl font-medium text-text-muted">
            The next generation of high-fidelity spatial audio.
          </p>
        </motion.div>

        {/* SECTION 2: Disassembly */}
        <motion.div 
          style={{ opacity: sec2Opacity, y: sec2Y, filter: sec2Blur, scale: sec2Scale }}
          className="absolute text-left max-w-xl md:left-[10%] lg:left-[15%]"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Uncompromised Engineering.
          </h2>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-6">
            Every component mathematically placed. We didn't just redesign the driver; we re-imagined how sound waves travel through space. Built with aerospace-grade anodized aluminum.
          </p>
          <FrequencyBars />
        </motion.div>

        {/* SECTION 3: Technical Highlights */}
        <motion.div 
          style={{ opacity: sec3Opacity, y: sec3Y, filter: sec3Blur, scale: sec3Scale }}
          className="absolute text-right max-w-xl md:right-[10%] lg:right-[15%]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CircularPulse />
          </div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Powered by the M-Series Array.
          </h2>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed relative z-10">
            A custom silicon architecture that processes millions of operations per second, delivering zero-latency active noise cancellation that adapts 48,000 times a second.
          </p>
        </motion.div>

        {/* SECTION 4: Reassembly */}
        <motion.div 
          style={{ opacity: sec4Opacity, y: sec4Y, filter: sec4Blur, scale: sec4Scale }}
          className="absolute text-center max-w-3xl"
        >
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Seamless Design.
          </h2>
          <p className="text-xl md:text-2xl text-text-muted">
            Flawless execution from the inside out. Visually striking, acoustically perfect.
          </p>
        </motion.div>

        {/* SECTION 5: CTA */}
        <motion.div 
          style={{ opacity: ctaOpacity, y: ctaY, filter: ctaBlur, scale: ctaScale }}
          className="absolute mt-64 md:mt-96 text-center max-w-2xl pointer-events-auto flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">
            Experience it.
          </h2>
          
          <button className="group relative overflow-hidden bg-white text-black px-12 py-5 rounded-full font-semibold text-lg md:text-xl transition-all duration-500 hover:scale-110 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(255,255,255,0.6)]">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10">Pre-order Now</span>
          </button>
          <p className="mt-8 text-sm text-text-muted tracking-wider uppercase">Available starting at $549.</p>
        </motion.div>

      </div>
    </main>
  );
}
