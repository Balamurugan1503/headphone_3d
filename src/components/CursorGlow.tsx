"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full mix-blend-screen"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
        zIndex: 50
      }}
    />
  );
}
