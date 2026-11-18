"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { soundManager } from "@/utils/audio";
import { Terminal, Database, Code2, Server, Wrench, Sparkles, CheckCircle2 } from "lucide-react";

const SkillsOrbit = dynamic(() => import("@/components/3d/SkillsOrbit"), {
  ssr: false,
});

interface SkillCategory {
  id: string;
  title: string;
  icon: typeof Terminal;
  skills: { name: string; tag: string }[];
}

const categories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "Java", tag: "Core JVM & Enterprise Development" },
      { name: "Python", tag: "APIs, Scripting & Machine Learning" },
      { name: "C++", tag: "Data Structures & Problem Solving" },
      { name: "SQL", tag: "Relational Queries, DDL & DML" },
      { name: "JavaScript", tag: "Web & Application Development" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: Server,
    skills: [
      { name: "Spring Boot", tag: "Enterprise REST APIs & Microservices" },
      { name: "Spring Data JPA", tag: "Object-Relational Mapping & Persistence" },
      { name: "FastAPI", tag: "High-Performance Asynchronous APIs" },
      { name: "Flask", tag: "Lightweight Python Web Services" },
      { name: "REST API Development", tag: "API Architecture & Integration" },
    ],
  },
  {
    id: "testing",
    title: "Testing & Quality Tools",
    icon: CheckCircle2,
    skills: [
      { name: "Swagger / OpenAPI", tag: "Interactive API Testing & Documentation" },
      { name: "Application Logging", tag: "Structured Logging (SLF4J / Logback) & Debugging" },
      { name: "Postman", tag: "REST API Endpoint Validation & Response Verification" },
      { name: "JUnit 5", tag: "Java Unit Testing & Test Automation" },
      { name: "Mockito", tag: "Mocking Framework & Service Layer Isolation" },
    ],
  },
  {
    id: "database",
    title: "Databases",
    icon: Database,
    skills: [
      { name: "MySQL", tag: "Relational Schema Design & Indexing" },
      { name: "MongoDB", tag: "Document Datastores & NoSQL" },
      { name: "SQLite", tag: "Embedded Relational Database" },
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: Sparkles,
    skills: [
      { name: "Scikit-learn", tag: "Machine Learning Algorithms & Pipelines" },
      { name: "XGBoost", tag: "Gradient Boosting Models" },
      { name: "Pandas", tag: "Data Ingestion & Transformation" },
      { name: "NumPy", tag: "Numerical Arrays & Operations" },
      { name: "LangChain", tag: "LLM Workflows & Agent Chains" },
      { name: "Generative AI Integration", tag: "RAG Pipelines & API Integrations" },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    icon: Wrench,
    skills: [
      { name: "Git", tag: "Version Control & Branching" },
      { name: "GitHub", tag: "Repository Hosting & Collaboration" },
      { name: "Maven", tag: "Build Automation & Dependencies" },
      { name: "Docker", tag: "Application Containerization" },
      { name: "VS Code", tag: "Primary Code Editor" },
      { name: "IntelliJ IDEA", tag: "Java & Spring Boot IDE" },
    ],
  },
];

export default function SkillsVisualizer() {
  const [selectedId, setSelectedId] = useState("languages");

  const activeCategory =
    categories.find((c) => c.id === selectedId) || categories[0];

  return (
    <section
      id="skills"
      className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#F3F0E9] text-[#111111] overflow-hidden transition-colors"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 sm:pb-8 border-b border-[#111111]/15 mb-10 sm:mb-16">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#666666] flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#111111]" />
            <span>04 // TECHNICAL SKILLS</span>
          </div>
          <div className="font-mono text-xs tracking-widest text-[#777777] uppercase mt-2 sm:mt-0">
            CORE COMPETENCIES &amp; TOOLING
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-8 sm:mb-14">
          <h2 className="section-clamp font-serif font-light text-[#050505] tracking-tight">
            Technical <span className="italic font-normal">Skills.</span>
          </h2>
          <p className="mt-3 sm:mt-4 font-sans text-base sm:text-lg text-[#555555] max-w-2xl font-light">
            Technologies and tools I use to build backend applications, manage databases,
            develop APIs, and integrate intelligent systems.
          </p>
        </div>

        {/* Interactive Layout: Left Category Tabs + Right Detailed Grid & 3D Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Category Navigation Buttons */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-2">
            {categories.map((cat, idx) => {
              const isSelected = cat.id === selectedId;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedId(cat.id);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between transition-all duration-300 text-left border ${
                    isSelected
                      ? "bg-[#050505] text-white border-[#050505] shadow-lg"
                      : "bg-white/60 text-[#333333] border-[#111111]/10 hover:bg-white hover:border-[#111111]/30"
                  }`}
                  data-cursor-label="SELECT"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-[#666666]"}`} />
                    <span className="font-sans text-xs sm:text-sm font-medium">
                      {cat.title}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[9px] sm:text-[10px] tracking-widest uppercase shrink-0 ${
                      isSelected ? "text-[#AFAFAF]" : "text-[#888888]"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </button>
              );
            })}

            {/* Micro 3D Orbit Node Preview */}
            <div className="mt-4 sm:mt-6 rounded-2xl bg-[#E6E6E6]/60 border border-[#111111]/10 p-4 hidden lg:flex flex-col items-center col-span-full">
              <div className="font-mono text-[10px] text-[#666666] tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                3D MODEL // SKILLS ORBIT
              </div>
              <div className="w-full h-52 flex items-center justify-center">
                <SkillsOrbit />
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Skill Cells */}
          <div className="lg:col-span-8 flex flex-col w-full">
            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#111111]/10 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 sm:pb-6 border-b border-[#111111]/10 mb-6 sm:mb-8 font-mono text-xs text-[#777777] uppercase">
                <span className="flex items-center gap-2 text-[#111111] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#111111]" />
                  CATEGORY // {activeCategory.title.toUpperCase()}
                </span>
                <span>{activeCategory.skills.length} TECHNOLOGIES</span>
              </div>

              {/* Skills Matrix Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {activeCategory.skills.map((skill, sIdx) => (
                  <div
                    key={skill.name}
                    className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F3F0E9]/70 border border-[#111111]/08 hover:border-[#111111]/25 hover:bg-[#F3F0E9] transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-serif text-xl sm:text-2xl text-[#050505] font-normal group-hover:italic transition-all">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#888888]">
                        #{sIdx + 1}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] sm:text-xs text-[#666666]">
                      {skill.tag}
                    </p>
                  </div>
                ))}
              </div>

              {/* Engineering note */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#111111]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] text-[#777777]">
                <span>PRACTICAL EXPERIENCE &amp; PROJECTS</span>
                <span className="text-[#111111]">
                  PROJECT CODE AVAILABLE ON GITHUB ↗
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
