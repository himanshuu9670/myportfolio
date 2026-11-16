"use client";

import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectShowcase from "@/components/ProjectShowcase";
import Experience from "@/components/Experience";
import SkillsVisualizer from "@/components/SkillsVisualizer";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Non-blocking fast preloader reveal */}
      <Preloader onComplete={() => {}} />

      {/* Atmospheric Film Grain */}
      <FilmGrain />

      {/* Ultra-Responsive Magnetic Custom Cursor (Hardware-Accelerated) */}
      <CustomCursor />

      {/* Global Navigation HUD */}
      <Navigation />

      {/* AI Assistant Chatbot with Looping 3D Matrix Logo */}
      <Chatbot />

      {/* Main Content Flow - Interactive from frame 1 */}
      <main className="w-full">
        <Hero />
        <About />
        <ProjectShowcase />
        <Experience />
        <SkillsVisualizer />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
