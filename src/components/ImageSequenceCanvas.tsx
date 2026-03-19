"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, useSpring, useVelocity } from "framer-motion";

interface ImageSequenceCanvasProps {
  frameCount: number;
}

export default function ImageSequenceCanvas({ frameCount }: ImageSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress (0-1) to frame index (1 to frameCount)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);
  
  // Preload images
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Advanced Visual Effects
  const scrollVelocity = useVelocity(scrollYProgress);
  const velocityBlur = useTransform(scrollVelocity, [-0.5, 0, 0.5], [10, 0, 10]);
  const smoothVelocityBlur = useSpring(velocityBlur, { damping: 30, stiffness: 200 });

  const activeTextBlur = useTransform(
    scrollYProgress,
    [0.1, 0.15, 0.3, 0.4, 0.5, 0.65, 0.7, 0.85, 0.9],
    [0,   4,    4,   0,   4,   0,    4,   0,    4]
  );
  
  const blurAmount = useTransform([smoothVelocityBlur, activeTextBlur], ([vBlur, tBlur]) => {
    return `blur(${Number(vBlur) + Number(tBlur)}px)`;
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.15]);
  const smoothScale = useSpring(scale, { damping: 40, stiffness: 100 });

  const floatY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotation = useTransform(scrollYProgress, [0, 1], [-2, 3]);

  // Render logic
  const renderFrame = (index: number) => {
    if (!canvasRef.current || !imagesRef.current[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img) {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      
      // Clear canvas
      ctx.clearRect(0, 0, cw, ch);
      
      const scale = Math.max(cw / img.width, ch / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;
      
      ctx.drawImage(img, x, y, w, h);
    }
  };

  useEffect(() => {
    const preloadImages = () => {
      let loadedCount = 0;
      for (let i = 1; i <= frameCount; i++) {
        const img = new window.Image();
        const paddedIndex = i.toString().padStart(3, "0");
        img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
        
        img.onload = () => {
          imagesRef.current[i] = img;
          loadedCount++;
          if (i === 1) renderFrame(1);
          if (loadedCount === frameCount) {
             setLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
        };
      }
    };
    preloadImages();
  }, [frameCount]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => renderFrame(Math.round(latest)));
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);
        renderFrame(Math.round(frameIndex.get()));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-transparent overflow-hidden">
      {/* Studio Lighting OVERLAY (Top soft light & Side highlights) */}
      <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-40 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.3)_0%,_transparent_70%)]" />
      <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none z-10 mix-blend-screen opacity-20 bg-gradient-to-r from-blue-400/20 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none z-10 mix-blend-screen opacity-20 bg-gradient-to-l from-white/20 to-transparent" />
      
      {/* Dynamic rim lighting subtle glow */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full bg-white/5 blur-[120px] pointer-events-none z-0" 
      />

      <motion.canvas
        ref={canvasRef}
        className="w-full h-full object-cover relative z-10 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
        style={{
          width: "100%",
          height: "100%",
          scale: smoothScale,
          y: floatY,
          rotate: rotation,
          filter: blurAmount,
        }}
      />
      
      {/* Volumetric light beams behind the product */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[150vh] origin-top bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-[80px] opacity-30 pointer-events-none z-0 mix-blend-screen rotate-[15deg] scale-150" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[150vh] origin-top bg-gradient-to-b from-white/5 via-transparent to-transparent blur-[100px] opacity-20 pointer-events-none z-0 mix-blend-screen -rotate-[15deg] scale-150" />
    </div>
  );
}
