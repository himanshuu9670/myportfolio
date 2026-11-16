"use client";

import { CheckCircle2, GitCommit, ShieldCheck, Terminal } from "lucide-react";

export default function Experience() {
  const achievements = [
    {
      title: "ERP Application Testing & Debugging",
      detail:
        "Performed functional testing and debugging across multiple modules of a Laravel-based ERP application, identifying and resolving issues in inventory, finance, and user management.",
      metric: "FUNCTIONAL TESTING",
      icon: ShieldCheck,
    },
    {
      title: "Database Management & Optimization",
      detail:
        "Worked with MySQL and Laravel Eloquent ORM to maintain database consistency, improve query efficiency, and resolve data-related issues.",
      metric: "DATABASE INTEGRITY",
      icon: Terminal,
    },
    {
      title: "Messaging & Notifications",
      detail:
        "Worked on an in-app messaging and notification system with unread message indicators, real-time alerts, and conversation history.",
      metric: "FEATURE DEVELOPMENT",
      icon: GitCommit,
    },
    {
      title: "Deployment & Release Management",
      detail:
        "Investigated deployment issues, resolved database migration problems, and helped improve application release reliability.",
      metric: "SYSTEM RELIABILITY",
      icon: CheckCircle2,
    },
  ];

  return (
    <section
      id="experience"
      className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#090909] text-white overflow-hidden border-t border-b border-white/[0.08]"
    >
      {/* Background Reticle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-grain" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 sm:pb-8 border-b border-white/10 mb-10 sm:mb-16">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#AFAFAF] flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>03 // WORK EXPERIENCE</span>
          </div>
          <div className="font-mono text-xs tracking-widest text-[#777777] uppercase mt-2 sm:mt-0">
            DELHI NCR, INDIA · SOFTWARE ENGINEERING
          </div>
        </div>

        {/* Chronology Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Role Overview & Company Horizon */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#AFAFAF] tracking-widest uppercase mb-2 sm:mb-3">
                CURRENT POSITION
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-tight">
                Software Engineer <br />
                <span className="italic font-normal chrome-text">Trainee</span>
              </h2>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-[#AFAFAF]">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
                  AUGUST 2026 – PRESENT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE</span>
              </div>

              <p className="mt-6 sm:mt-8 font-sans text-base sm:text-lg text-[#CCCCCC] font-light leading-relaxed max-w-md">
                Working as part of an engineering team maintaining and improving
                enterprise ERP software, focusing on functional testing, database
                operations, and system stability.
              </p>
            </div>

            {/* Micro Metadata */}
            <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/10 font-mono text-[11px] sm:text-xs text-[#888888] space-y-2">
              <div className="flex justify-between">
                <span>APPLICATION TYPE</span>
                <span className="text-white">LARAVEL ERP SYSTEM</span>
              </div>
              <div className="flex justify-between">
                <span>DATABASE</span>
                <span className="text-white">MYSQL / ELOQUENT ORM</span>
              </div>
              <div className="flex justify-between">
                <span>CORE FOCUS</span>
                <span className="text-white">TESTING, BUG FIXES &amp; STABILITY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Responsibilities Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
            {achievements.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-5 sm:p-7 md:p-8 rounded-2xl metallic-card flex flex-col justify-between transition-all duration-300"
                >
                  {/* Top Bar inside card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2.5 font-mono text-xs tracking-wider text-white">
                      <Icon className="w-4 h-4 text-[#AFAFAF] group-hover:text-white transition-colors shrink-0" />
                      <span className="font-medium uppercase">{item.title}</span>
                    </div>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-[#888888] px-2.5 py-1 rounded-full border border-white/10 self-start sm:self-auto shrink-0">
                      {item.metric}
                    </span>
                  </div>

                  {/* Body Text */}
                  <p className="font-sans text-xs sm:text-sm md:text-base text-[#CCCCCC] font-light leading-relaxed">
                    {item.detail}
                  </p>

                  {/* Bottom Line Accent */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex justify-between items-center font-mono text-[9px] sm:text-[10px] text-[#777777]">
                    <span>RESPONSIBILITY 0{idx + 1}</span>
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      ENGINEERING PRACTICE ↗
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
