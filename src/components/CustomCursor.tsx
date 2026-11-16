"use client";

import { useEffect, useRef } from "react";
import { soundManager } from "@/utils/audio";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    const dotEl = dotRef.current;

    // Immediate 1:1 hardware pointer tracking (Zero lag, zero RAF queuing)
    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotEl) {
        dotEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Hover state detection via event delegation
    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        "a, button, [role='button'], input, textarea, [data-cursor], [data-cursor-label]"
      );

      if (interactiveEl && dotEl) {
        dotEl.classList.add("dot-hovered");
      }
    };

    const onPointerOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        "a, button, [role='button'], input, textarea, [data-cursor], [data-cursor-label]"
      );

      if (interactiveEl && dotEl) {
        dotEl.classList.remove("dot-hovered");
      }
    };

    const onPointerDown = () => {
      if (dotEl) dotEl.classList.add("dot-clicked");
      soundManager.playClick();
    };

    const onPointerUp = () => {
      if (dotEl) dotEl.classList.remove("dot-clicked");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseover", onPointerOver, { passive: true });
    document.addEventListener("mouseout", onPointerOut, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseover", onPointerOver);
      document.removeEventListener("mouseout", onPointerOut);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <>
      {/* Precision small cursor dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform flex items-center justify-center"
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      >
        <div className="dot-inner w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] transition-all duration-150 ease-out" />
      </div>

      <style jsx global>{`
        .dot-hovered .dot-inner {
          transform: scale(2.2);
          background: #ffffff;
          box-shadow: 0 0 16px rgba(255, 255, 255, 1);
        }
        .dot-clicked .dot-inner {
          transform: scale(1.4);
          opacity: 0.8;
        }
      `}</style>
    </>
  );
}
