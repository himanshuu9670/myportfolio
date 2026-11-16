"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { soundManager } from "@/utils/audio";
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers, Terminal } from "lucide-react";

const ProjectVisual = dynamic(() => import("@/components/3d/ProjectVisuals"), {
  ssr: false,
});

interface Project {
  id: string;
  index: string;
  year: string;
  title: string;
  tagline: string;
  description: string;
  architectureDetails: string[];
  techStack: string[];
  visualType: "neural" | "architecture" | "forecasting" | "mindcare";
  linkUrl: string;
  linkLabel?: string;
}

const projects: Project[] = [
  {
    id: "mindcare",
    index: "01",
    year: "2026",
    title: "HB MindCare",
    tagline: "Mental Wellness Support Platform",
    description:
      "A mental wellness platform supporting user care workflows, support requests, professional reviews, and appointment coordination.",
    architectureDetails: [
      "Asynchronous REST API backend built with Python and FastAPI supporting structured care workflows",
      "Support ticket lifecycle management with secure data handling and status tracking",
      "Relational database models for scheduling appointments, logging assessments, and managing user records",
      "Optimized API response times and request handling for active user workflows",
    ],
    techStack: ["Python", "FastAPI", "REST APIs", "SQL", "Database Design"],
    visualType: "mindcare",
    linkUrl: "https://mindcare.healthboat.org/",
    linkLabel: "Visit Live Website",
  },
  {
    id: "task-manager-api",
    index: "02",
    year: "2026",
    title: "Task Manager API",
    tagline: "REST API for Task Management",
    description:
      "A REST API for managing tasks with CRUD operations, database integration, and centralized exception handling. Built using Java and Spring Boot with Spring Data JPA and MySQL.",
    architectureDetails: [
      "Layered application architecture cleanly separating controllers, service interfaces, and data repositories",
      "Spring Data JPA integration with database indexing and relational constraints in MySQL",
      "Centralized exception handling using GlobalControllerAdvice and standard HTTP problem responses",
      "Automated unit and integration test coverage implemented with JUnit 5 and Mockito",
    ],
    techStack: ["Java", "Spring Boot", "Spring Data JPA", "MySQL", "JUnit"],
    visualType: "architecture",
    linkUrl: "https://github.com/himanshuu9670/task-manager-api",
    linkLabel: "View on GitHub",
  },
  {
    id: "sales-forecasting",
    index: "03",
    year: "2026",
    title: "Supermarket Sales",
    tagline: "Sales Analysis & Forecasting Dashboard",
    description:
      "An interactive data analytics application that processes supermarket transaction datasets, generates business insights, and forecasts sales to support inventory planning.",
    architectureDetails: [
      "Data processing pipeline for cleaning and aggregating transaction datasets with Pandas and NumPy",
      "Time-series forecasting model using Prophet to analyze seasonal trends and demand patterns",
      "Interactive web dashboard developed with Streamlit and Matplotlib for data visualization",
      "Calculates safety stock and reorder recommendations to assist inventory management",
    ],
    techStack: ["Python", "Streamlit", "Pandas", "NumPy", "Matplotlib", "Prophet"],
    visualType: "forecasting",
    linkUrl: "https://github.com/himanshuu9670/supermarket-sales-dashboard",
    linkLabel: "View on GitHub",
  },
  {
    id: "healthboat-ai",
    index: "04",
    year: "2026",
    title: "Healthboat AI",
    tagline: "Healthcare Chatbot & Knowledge Retrieval System",
    description:
      "An AI-powered chatbot system designed to provide context-aware responses across healthcare websites using retrieval-augmented generation and an embeddable widget.",
    architectureDetails: [
      "RAG retrieval pipeline providing fast context retrieval from medical knowledge documents",
      "Deterministic query routing to guide users to appropriate resources and prevent misleading answers",
      "Lightweight JavaScript widget easily embeddable into existing web portals",
      "FastAPI backend with database caching and asynchronous request handling",
    ],
    techStack: ["Python", "FastAPI", "RAG", "SQLite", "REST APIs", "JavaScript"],
    visualType: "neural",
    linkUrl: "https://github.com/himanshuu9670/",
    linkLabel: "View on GitHub",
  },
];

export default function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture">("overview");

  const project = projects[currentIndex];

  const handleNext = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="work"
      className="relative min-h-screen w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#050505] text-white flex flex-col justify-between overflow-hidden"
    >
      {/* Background Reticle and Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] reticle-circle" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] reticle-circle" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-6 sm:pb-8 border-b border-white/10 mb-8 sm:mb-12">
        <div>
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#AFAFAF] flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>02 // SELECTED PROJECTS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
            Selected Projects
          </h2>
        </div>

        {/* Index Selector & Controls */}
        <div className="flex items-center gap-4 sm:gap-6 mt-4 md:mt-0">
          <div className="font-mono text-xs text-[#AFAFAF] tracking-widest">
            <span className="text-white text-base sm:text-lg font-serif">{project.index}</span> / 0{projects.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2.5 sm:p-3 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-colors"
              aria-label="Previous Project"
              data-cursor-label="PREV"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2.5 sm:p-3 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-colors"
              aria-label="Next Project"
              data-cursor-label="NEXT"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Feature Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Column: Project Editorial Typography & Data */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Metadata pill row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 font-mono text-[10px] sm:text-[11px] text-[#AFAFAF] tracking-widest uppercase">
            <span>PROJECT {project.index}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span className="text-white font-medium">{project.tagline}</span>
          </div>

          {/* Huge Cormorant Garamond Project Title */}
          <h3 className="project-clamp font-serif text-white font-normal tracking-tight mb-4 sm:mb-6 transition-all duration-500">
            {project.title}
          </h3>

          {/* Tab Switcher: Overview vs Deep Architectural Specs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6 font-mono text-[11px] sm:text-xs">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("overview");
              }}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full border transition-all ${
                activeTab === "overview"
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-[#AFAFAF] hover:text-white"
              }`}
            >
              OVERVIEW
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab("architecture");
              }}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                activeTab === "architecture"
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-[#AFAFAF] hover:text-white"
              }`}
            >
              <Terminal className="w-3 h-3" />
              SYSTEM ARCHITECTURE
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" ? (
            <div className="space-y-5 sm:space-y-6">
              <p className="font-sans text-base sm:text-lg lg:text-xl text-[#E6E6E6] font-light leading-relaxed max-w-xl">
                {project.description}
              </p>

              {/* Technology Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] sm:text-[11px] text-[#AFAFAF] tracking-wider uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 font-mono text-[11px] sm:text-xs text-[#E6E6E6]">
              <div className="text-[10px] tracking-widest text-[#AFAFAF] uppercase pb-2 border-b border-white/10 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-white shrink-0" />
                <span>SYSTEM ARCHITECTURE &amp; IMPLEMENTATION</span>
              </div>
              <ul className="space-y-2 pt-1">
                {project.architectureDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#AFAFAF] mt-0.5">❯</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Link Row */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <a
              href={project.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-black font-sans text-xs tracking-wider uppercase font-medium hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              data-cursor-label="VISIT"
            >
              <span>{project.linkLabel || "View on GitHub"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <span className="font-mono text-[10px] sm:text-xs text-[#AFAFAF] tracking-widest uppercase">
              STATUS: APPLICATION READY
            </span>
          </div>
        </div>

        {/* Right Column: Dedicated Interactive 3D Representation */}
        <div className="lg:col-span-5 flex flex-col items-center w-full">
          <div className="relative w-full aspect-square max-w-[440px] rounded-2xl sm:rounded-3xl metallic-card p-4 sm:p-6 flex flex-col justify-between overflow-hidden group">
            {/* Corner Metadata */}
            <div className="flex justify-between items-center font-mono text-[9px] sm:text-[10px] text-[#AFAFAF] tracking-widest uppercase z-10">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                3D VISUALIZATION // {project.visualType.toUpperCase()}
              </span>
              <span>RENDER: THREE.JS</span>
            </div>

            {/* 3D Scene */}
            <div className="relative w-full h-full flex items-center justify-center my-auto min-h-[200px]">
              <ProjectVisual key={project.id} type={project.visualType} />
            </div>

            {/* Bottom Subtitle / Instruction */}
            <div className="flex justify-between items-center font-mono text-[9px] text-[#888888] tracking-widest uppercase z-10 pt-2 border-t border-white/[0.08]">
              <span>PROCEDURAL VISUALIZATION</span>
              <span>INTERACTIVE 3D</span>
            </div>
          </div>

          {/* Quick Project Select Thumbnails / Direct Jump Tabs */}
          <div className="flex items-center gap-2 mt-4 sm:mt-6">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentIndex(idx);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`h-2 transition-all duration-300 rounded-full ${
                  currentIndex === idx ? "w-8 sm:w-10 bg-white" : "w-3 bg-white/20 hover:bg-white/50"
                }`}
                aria-label={`Jump to ${p.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Project Index Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 sm:pt-16 mt-10 sm:mt-16 border-t border-white/10 hidden md:grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {projects.map((p, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={p.id}
              onClick={() => {
                soundManager.playClick();
                setCurrentIndex(idx);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`text-left p-3.5 sm:p-4 rounded-xl transition-all duration-300 border ${
                isActive
                  ? "bg-white/[0.06] border-white/40 text-white"
                  : "bg-transparent border-transparent text-[#777777] hover:text-[#AFAFAF] hover:border-white/10"
              }`}
            >
              <div className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase mb-1">
                0{idx + 1} // {p.year}
              </div>
              <div className="font-serif text-base sm:text-lg font-light tracking-tight truncate">
                {p.title}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
