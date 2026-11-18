"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Instant bypass if already visited in this session
    if (typeof window !== "undefined" && sessionStorage.getItem("hv_preloader_seen")) {
      onComplete();
      setIsRemoved(true);
      return;
    }

    const duration = 650; // Ultra-snappy cinematic reveal (under 0.7s)
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressPercent = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(progressPercent);

      if (progressPercent < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        setIsExiting(true);
        sessionStorage.setItem("hv_preloader_seen", "true");
        onComplete();
        setTimeout(() => {
          setIsRemoved(true);
        }, 400);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-5 sm:p-8 md:p-14 bg-[#050505] text-white transition-opacity duration-400 ease-out pointer-events-none ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#AFAFAF] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>HV / PORTFOLIO</span>
        </div>
        <div>HYDERABAD, INDIA · 17.3850° N</div>
      </div>

      {/* Centerpiece Luxury Monogram */}
      <div className="my-auto flex flex-col items-center justify-center text-center px-2">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#FFFFFF] italic font-light break-words">
          Himanshu Vishwakarma
        </h1>
        <p className="font-mono text-[11px] sm:text-xs md:text-sm text-[#AFAFAF] uppercase tracking-[0.25em] sm:tracking-[0.35em] mt-3">
          Software Engineer
        </p>
      </div>

      {/* Bottom Progress Counter */}
      <div className="w-full flex flex-col gap-2.5">
        <div className="flex justify-between items-end font-mono text-[11px] sm:text-xs text-[#AFAFAF]">
          <div className="tracking-wider">LOADING APPLICATION</div>
          <div className="text-lg sm:text-xl md:text-2xl font-light text-white font-serif">
            {progress < 10 ? `0${progress}` : progress}%
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-white transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
