"use client";

import dynamic from "next/dynamic";
import { soundManager } from "@/utils/audio";
import { ArrowDown, ArrowUpRight } from "lucide-react";

// Dynamically import 3D Canvas with ssr: false to prevent hydration mismatches
const HeroLiquidSculpture = dynamic(
  () => import("@/components/3d/HeroLiquidSculpture"),
  { ssr: false }
);

export default function Hero() {
  const scrollToWork = () => {
    soundManager.playClick();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    soundManager.playClick();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden bg-[#050505]"
    >
      {/* 3D Liquid Chrome Canvas Centerpiece */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-90 pointer-events-auto">
        <HeroLiquidSculpture />
      </div>

      {/* Editorial Coordinate Reticle & Radial Guide Lines (inspired by trnspr & senses) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-25">
        <svg className="w-[1000px] h-[1000px] max-w-none" viewBox="0 0 1000 1000" fill="none">
          <circle cx="500" cy="500" r="460" stroke="white" strokeWidth="0.75" strokeDasharray="3 6" opacity="0.35" />
          <circle cx="500" cy="500" r="340" stroke="white" strokeWidth="0.5" opacity="0.25" />
          <circle cx="500" cy="500" r="220" stroke="white" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.3" />
          <line x1="500" y1="30" x2="500" y2="970" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
          <line x1="30" y1="500" x2="970" y2="500" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
        </svg>
      </div>

      {/* Atmospheric Monochromatic Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-radial from-white/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Editorial Row */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
        {/* Name and Designation */}
        <div className="flex flex-col">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#AFAFAF] uppercase mb-1">
            PORTFOLIO // 2026 EDITION
          </div>
          <div className="font-serif text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
            Himanshu Vishwakarma
          </div>
        </div>

        {/* Technical Coordinates and Status */}
        <div className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#AFAFAF] text-left sm:text-right flex flex-col gap-1">
          <div className="text-white flex items-center sm:justify-end gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="break-words">AVAILABLE FOR SOFTWARE ENGINEERING &amp; BACKEND ROLES</span>
          </div>
          <div>DELHI NCR, INDIA · 28.6139° N, 77.2090° E</div>
        </div>
      </div>

      {/* Hero Headline & Asymmetrical Typography */}
      <div className="relative z-10 my-auto py-8 sm:py-12 flex flex-col items-start max-w-5xl pointer-events-none">
        <div className="font-mono text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.35em] text-[#AFAFAF] uppercase mb-2 sm:mb-3">
          BACKEND DEVELOPMENT · SOFTWARE ENGINEERING
        </div>

        {/* Large Luxury Serif Display */}
        <h1 className="hero-clamp font-serif text-white font-light tracking-tight pointer-events-auto selection:bg-white selection:text-black">
          Building Reliable <br />
          <span className="italic font-normal chrome-text">Software Solutions.</span>
        </h1>

        {/* Supporting statement */}
        <div className="mt-6 sm:mt-8 max-w-xl">
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#E6E6E6] font-light leading-relaxed">
            Software Engineer focused on backend development, REST APIs, database
            systems, and AI-powered applications.
          </p>

          {/* Interactive CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pointer-events-auto">
            <button
              onClick={scrollToWork}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-black font-sans text-xs tracking-wider uppercase font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center"
              data-cursor-label="EXPLORE"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Selected Projects
                <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
              </span>
            </button>

            <button
              onClick={scrollToContact}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-white/20 text-white font-sans text-xs tracking-wider uppercase hover:border-white hover:bg-white/5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
              data-cursor-label="TALK"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#AFAFAF]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Floating Metadata */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-6 pt-5 sm:pt-6 border-t border-white/10">
        <div className="flex flex-col gap-1 font-mono text-[10px] sm:text-[11px] text-[#AFAFAF]">
          <span className="text-white">CORE TECHNOLOGIES</span>
          <span className="tracking-normal sm:tracking-wider break-words">JAVA · SPRING BOOT · PYTHON · FASTAPI · REST APIS · MYSQL · DOCKER</span>
        </div>
      </div>
    </section>
  );
}
