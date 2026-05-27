"use client";

import { useEffect, useRef } from "react";

type Tilt3DProps = {
  children: React.ReactNode;
  /** Maximum tilt in degrees. Default 6 — keeps it subtle and premium. */
  max?: number;
  /** Scale-up while hovering. Default 1 = no scaling. */
  scale?: number;
  /** Perspective in pixels. Higher = subtler tilt. */
  perspective?: number;
  /** Class names applied to the tilt wrapper */
  className?: string;
  /** Inner classes applied to children-wrapper if needed */
  innerClassName?: string;
};

/**
 * Wraps children in a 3D-tilt scene. On mouse move within the element
 * we apply rotateX/Y based on cursor position, creating a parallax feel.
 * Children with `.depth-1/2/3` classes will pop out at increasing depths.
 *
 * - Throttled to requestAnimationFrame for smoothness.
 * - Disabled on touch / reduced-motion.
 */
export function Tilt3D({
  children,
  max = 6,
  scale = 1,
  perspective = 1200,
  className = "",
  innerClassName = "",
}: Tilt3DProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const disabledRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    disabledRef.current = mq.matches || isCoarse;

    const handler = (e: MediaQueryListEvent) => {
      disabledRef.current = e.matches || isCoarse;
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabledRef.current) return;
    const scene = sceneRef.current;
    const card = cardRef.current;
    if (!scene || !card) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      const rect = scene.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (clientY - rect.top) / rect.height - 0.5;
      const rotY = x * 2 * max;
      const rotX = -y * 2 * max;
      card.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
        2
      )}deg) scale(${scale})`;
    });
  }

  function onLeave() {
    const card = cardRef.current;
    if (!card) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={sceneRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-scene ${className}`}
    >
      <div ref={cardRef} className={`tilt-card ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
