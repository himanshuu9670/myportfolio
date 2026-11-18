"use client";

import dynamic from "next/dynamic";
import { soundManager } from "@/utils/audio";
import { ArrowUpRight, Code, Database, Cpu, Layers } from "lucide-react";

const ArchitecturalGyro = dynamic(
  () => import("@/components/3d/ArchitecturalGyro"),
  { ssr: false }
);

export default function About() {
  const pillars = [
    {
      icon: Database,
      title: "Backend Development",
      detail:
        "Developing structured REST APIs with Java, Spring Boot, and Python, implementing business logic, and handling centralized exception management.",
    },
    {
      icon: Cpu,
      title: "AI & API Integrations",
      detail:
        "Building retrieval-augmented generation (RAG) pipelines, integrating machine learning models, and serving async endpoints with FastAPI.",
    },
    {
      icon: Layers,
      title: "Database & System Design",
      detail:
        "Designing relational schemas in MySQL and SQLite, maintaining database consistency with ORMs, and writing clean, maintainable code.",
    },
    {
      icon: Code,
      title: "Testing & Code Quality",
      detail:
        "Writing unit and integration tests with JUnit and Mockito, testing and documenting APIs with Swagger/OpenAPI and Postman, and utilizing structured logging for debugging and diagnostics.",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#F3F0E9] text-[#111111] transition-colors duration-700 overflow-hidden"
    >
      {/* Editorial Watermark / Subtle Background Typography */}
      <div className="absolute top-12 right-4 sm:right-6 lg:right-16 select-none pointer-events-none opacity-[0.06] font-serif text-[16vw] sm:text-[18vw] leading-none text-[#050505] -z-0">
        ENGINEER
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Index Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 sm:pb-8 border-b border-[#111111]/15 mb-10 sm:mb-16">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#666666] flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#111111]" />
            <span>01 // ABOUT ME</span>
          </div>
          <div className="font-mono text-xs tracking-widest text-[#777777] uppercase mt-2 sm:mt-0">
            HIMANSHU VISHWAKARMA · 2026
          </div>
        </div>

        {/* Asymmetrical Editorial Statement Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Oversized Serif Headline */}
          <div className="lg:col-span-7 flex flex-col">
            <h2 className="section-clamp font-serif font-light text-[#050505] tracking-tight leading-[0.95]">
              &ldquo;I build systems <br />
              that bring ideas <br />
              <span className="italic font-normal">to life.&rdquo;</span>
            </h2>

            <div className="mt-8 sm:mt-12 space-y-5 sm:space-y-6 max-w-2xl font-sans text-base sm:text-lg lg:text-xl text-[#333333] font-light leading-relaxed">
              <p>
                I am a Software Engineer based in Hyderabad, India, with a Bachelor of
                Technology in Computer Science (Artificial Intelligence) from PSIT Kanpur.
                I specialize in backend development, REST APIs, database architecture, and
                AI integrations.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-[#555555]">
                I have worked on backend applications, AI-powered systems, financial
                document processing tools, and enterprise ERP software. My work involves
                developing APIs, managing databases, integrating services, testing
                application functionality with Swagger and Postman, analyzing logs, and resolving software issues.
              </p>
            </div>

            {/* Quick Metadata Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-[#111111]/15 font-mono text-xs">
              <div>
                <span className="block text-[#888888] tracking-widest uppercase mb-1">
                  LOCATION
                </span>
                <span className="text-[#111111] font-medium">Hyderabad, India</span>
              </div>
              <div>
                <span className="block text-[#888888] tracking-widest uppercase mb-1">
                  DEGREE
                </span>
                <span className="text-[#111111] font-medium">B.Tech — CSE (AI)</span>
                <span className="block text-[#777777] text-[10px] tracking-normal font-normal">PSIT Kanpur · 2022–2026</span>
              </div>
              <div>
                <span className="block text-[#888888] tracking-widest uppercase mb-1">
                  FOCUS
                </span>
                <span className="text-[#111111] font-medium">Backend &amp; REST APIs</span>
              </div>
              <div>
                <span className="block text-[#888888] tracking-widest uppercase mb-1">
                  GITHUB PROFILE
                </span>
                <a
                  href="https://github.com/himanshuu9670/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundManager.playHover()}
                  className="text-[#111111] font-medium underline underline-offset-4 flex items-center gap-1 hover:text-[#555555] break-all"
                  data-cursor-label="GITHUB"
                >
                  github.com/himanshuu9670
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Architectural Gyroscope & Philosophy */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
            {/* Interactive 3D Gyroscope Card */}
            <div className="w-full rounded-2xl bg-[#E6E6E6]/60 border border-[#111111]/10 p-4 sm:p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm">
              <div className="flex justify-between items-center font-mono text-[10px] sm:text-[11px] text-[#666666] uppercase tracking-wider pb-2 border-b border-[#111111]/10">
                <span>3D VISUALIZATION // SYSTEM ARCHITECTURE</span>
                <span>INTERACTIVE MODEL</span>
              </div>

              <div className="h-[230px] sm:h-[280px] w-full flex items-center justify-center">
                <ArchitecturalGyro />
              </div>

              <div className="font-mono text-[9px] sm:text-[10px] text-[#777777] uppercase tracking-widest text-center pt-2 border-t border-[#111111]/10">
                SYSTEM DESIGN &amp; ENGINEERING DISCIPLINE
              </div>
            </div>

            {/* Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-white/70 border border-[#111111]/10 hover:border-[#111111]/30 hover:bg-white transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-[#111111]">
                      <Icon className="w-4 h-4 text-[#444444] shrink-0" />
                      <span className="font-medium">{p.title}</span>
                    </div>
                    <p className="font-sans text-xs text-[#555555] leading-relaxed">
                      {p.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
