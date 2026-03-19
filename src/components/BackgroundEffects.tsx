"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParticleStyle {
  top: string;
  left: string;
  width: string;
  height: string;
  filter: string;
}

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const particleY2 = useTransform(scrollYProgress, [0, 1], [0, -800]);

  const [mounted, setMounted] = useState(false);
  const [particles1, setParticles1] = useState<ParticleStyle[]>([]);
  const [particles2, setParticles2] = useState<ParticleStyle[]>([]);

  useEffect(() => {
    setParticles1(
      Array.from({ length: 40 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        filter: `blur(${Math.random() * 2}px)`,
      }))
    );
    setParticles2(
      Array.from({ length: 30 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        filter: `blur(${Math.random() * 3}px)`,
      }))
    );
    setMounted(true);
  }, []);

  return (
    <>
      {/* Soft radial gradient */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(40,40,45,0.4)_0%,_rgba(5,5,5,0.9)_60%,_#050505_100%)] z-0" />
      
      {/* Grid pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Animated noise texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Particles reacting to scroll */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Layer 1 */}
          <motion.div style={{ y: particleY }} className="absolute inset-x-0 h-[200vh]">
            {particles1.map((p, i) => (
              <div
                key={`p1-${i}`}
                className="absolute rounded-full bg-white opacity-[0.1]"
                style={p}
              />
            ))}
          </motion.div>
          
          {/* Layer 2 (Faster) */}
          <motion.div style={{ y: particleY2 }} className="absolute inset-x-0 h-[200vh]">
            {particles2.map((p, i) => (
              <div
                key={`p2-${i}`}
                className="absolute rounded-full bg-white opacity-[0.2]"
                style={p}
              />
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
}
