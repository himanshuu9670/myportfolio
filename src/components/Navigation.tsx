"use client";

import { useEffect, useState } from "react";
import { soundManager } from "@/utils/audio";
import { Volume2, VolumeX, Menu, X } from "lucide-react";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [istTime, setIstTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "HOME", href: "#hero", id: "hero" },
    { label: "ABOUT", href: "#about", id: "about" },
    { label: "WORK", href: "#work", id: "work" },
    { label: "EXPERIENCE", href: "#experience", id: "experience" },
    { label: "SKILLS", href: "#skills", id: "skills" },
    { label: "CONTACT", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    // Update live IST time
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeStr = new Intl.DateTimeFormat("en-GB", options).format(new Date());
      setIstTime(`${timeStr} IST`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // ScrollSpy
      const sections = ["hero", "about", "work", "experience", "skills", "contact"];
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundActive(newState);
  };

  const scrollTo = (href: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-2.5 sm:py-3 bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.08]"
            : "py-4 sm:py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#hero");
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="group flex items-center gap-2.5 sm:gap-3"
            data-cursor-label="HV"
          >
            <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white transition-opacity group-hover:opacity-75">
              HV.
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.25em] text-[#AFAFAF] uppercase border-l border-white/20 pl-3">
              SOFTWARE ENGINEER
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 glass-panel px-6 py-2 rounded-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive ? "text-white font-medium" : "text-[#AFAFAF] hover:text-white"
                  }`}
                  data-cursor-label="NAV"
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status & Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Live IST clock */}
            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#AFAFAF] border border-white/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{istTime || "HYDERABAD, IN"}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => soundManager.playHover()}
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase border border-white/10 px-2.5 sm:px-3 py-1.5 rounded-full text-[#AFAFAF] hover:text-white hover:border-white/30 transition-all duration-200"
              title="Toggle Micro-Audio Feedback"
              data-cursor-label="AUDIO"
            >
              {soundActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white" />
                  <span className="hidden sm:inline">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">AUDIO OFF</span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 text-white border border-white/15 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-3xl flex flex-col justify-center px-6 sm:px-12 py-10 overflow-y-auto transition-all duration-500 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-5 sm:gap-7 my-auto max-w-lg mx-auto w-full">
          <div className="font-mono text-xs tracking-[0.3em] text-[#AFAFAF] uppercase mb-1">
            NAVIGATION // 2026
          </div>
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.href)}
              className="flex items-baseline justify-between text-left group py-1"
            >
              <span className="font-serif text-3xl sm:text-5xl text-white group-hover:italic group-hover:translate-x-3 transition-all duration-300">
                {item.label}
              </span>
              <span className="font-mono text-xs text-[#AFAFAF]">
                0{idx + 1}
              </span>
            </button>
          ))}
          <div className="pt-6 mt-2 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[11px] text-[#AFAFAF]">
            <span>HIMANSHU VISHWAKARMA</span>
            <span>{istTime}</span>
          </div>
        </div>
      </div>
    </>
  );
}
