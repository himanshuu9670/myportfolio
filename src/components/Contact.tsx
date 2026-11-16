"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { soundManager } from "@/utils/audio";
import { sendContactMessage } from "@/lib/emailjs";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  ArrowUp,
  Send,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const ContactSculpture = dynamic(
  () => import("@/components/3d/ContactSculpture"),
  { ssr: false }
);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const email = "himanshuu9670@gmail.com";
  const github = "https://github.com/himanshuu9670/";
  const linkedin = "https://www.linkedin.com/in/himanshu-vishwakarma07/";

  const copyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    soundManager.playClick();
    setIsSubmitting(true);
    setFormError("");
    setSentMessage("");

    const formElement = e.currentTarget;

    try {
      // 1. Primary: Direct EmailJS transmission
      await sendContactMessage(formElement, email);
      setSentMessage("Message sent successfully! Delivered directly to Himanshu's Gmail inbox.");
      setFormSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormSent(false), 8000);
    } catch (err: unknown) {
      console.warn("Client EmailJS submission encountered an issue, attempting secondary route:", err);
      try {
        // 2. Secondary: Internal Next.js API route dispatch
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Portfolio Message from ${formData.name}`,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          setSentMessage("Message sent successfully! Delivered directly to Himanshu's Gmail inbox.");
          setFormSent(true);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setFormSent(false), 8000);
        } else {
          throw new Error(data.error || "Email service temporary issue");
        }
      } catch {
        // 3. Fallback: Pre-filled mailto
        const subject = encodeURIComponent(`Collaboration Inquiry from ${formData.name}`);
        const body = encodeURIComponent(
          `Hello Himanshu,\n\n${formData.message}\n\nBest regards,\n${formData.name} (${formData.email})`
        );
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        setSentMessage("Opening mail client to complete message delivery...");
        setFormSent(true);
        setTimeout(() => setFormSent(false), 8000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#050505] text-white flex flex-col justify-between overflow-hidden"
    >
      {/* 3D Background Sculpture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[500px] sm:h-[700px] pointer-events-none opacity-40 z-0">
        <ContactSculpture />
      </div>

      {/* Atmospheric Radial Shading */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-white/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 sm:pb-8 border-b border-white/10 mb-10 sm:mb-16">
        <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#AFAFAF] flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>05 // CONTACT</span>
        </div>
        <div className="font-mono text-xs tracking-widest text-[#777777] uppercase mt-2 sm:mt-0">
          RESPONSIVE WITHIN 24 HOURS
        </div>
      </div>

      {/* Main Headline & Interaction */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Big Headline & Direct Channels */}
        <div className="lg:col-span-7 flex flex-col">
          <h2 className="section-clamp font-serif font-light text-white tracking-tight leading-[0.95]">
            Let&apos;s Build <br />
            Something <br />
            <span className="italic font-normal chrome-text">Together.</span>
          </h2>

          <p className="mt-6 sm:mt-8 font-sans text-base sm:text-lg lg:text-xl text-[#CCCCCC] font-light leading-relaxed max-w-xl">
            I&apos;m open to software engineering opportunities, backend development
            roles, and projects involving practical software solutions. Feel free to
            get in touch.
          </p>

          {/* Email Quick-Copy Card */}
          <div className="mt-8 sm:mt-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl metallic-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-xl">
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
              <div className="p-2.5 sm:p-3 rounded-full bg-white/10 text-white shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-[9px] sm:text-[10px] text-[#888888] tracking-widest uppercase">
                  EMAIL
                </span>
                <span className="font-mono text-xs sm:text-sm md:text-base text-white font-medium break-all selection:bg-white selection:text-black">
                  {email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={copyEmail}
                onMouseEnter={() => soundManager.playHover()}
                className="w-full sm:w-auto px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/10 font-mono text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2"
                data-cursor-label="COPY"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Verified Social Connects */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/15 bg-white/[0.02] hover:bg-white/10 hover:border-white text-white font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2"
              data-cursor-label="GITHUB"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#888888]" />
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/15 bg-white/[0.02] hover:bg-white/10 hover:border-white text-white font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2"
              data-cursor-label="LINKEDIN"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-[#888888]" />
            </a>
          </div>
        </div>

        {/* Right Column: Direct Transmission Form */}
        <div className="lg:col-span-5 w-full">
          <div className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl metallic-card">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs text-[#AFAFAF] uppercase tracking-wider">
              <span>SEND A MESSAGE</span>
              <span>DIRECT INQUIRY</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="to_name" value="Himanshu Vishwakarma" />
              <input type="hidden" name="to_email" value={email} />
              <input type="hidden" name="subject" value={`Portfolio Message from ${formData.name || "Visitor"}`} />

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-1.5">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 font-sans text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 font-sans text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-1.5">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  placeholder="Hello Himanshu, I would like to discuss a software engineering opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 font-sans text-sm focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => soundManager.playHover()}
                className="w-full py-3.5 rounded-full bg-white text-black font-sans text-xs uppercase tracking-widest font-medium hover:bg-[#E6E6E6] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:pointer-events-none"
                data-cursor-label={isSubmitting ? "SENDING" : "SEND"}
              >
                <span>{isSubmitting ? "SENDING MESSAGE..." : "SEND MESSAGE"}</span>
                <Send className={`w-3.5 h-3.5 ${isSubmitting ? "animate-pulse" : ""}`} />
              </button>

              {formSent && (
                <div className="font-mono text-xs text-emerald-400 text-center pt-2 flex items-center justify-center gap-1.5 animate-in fade-in duration-300">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{sentMessage || "Message dispatched directly to Himanshu's email inbox!"}</span>
                </div>
              )}

              {formError && (
                <div className="font-mono text-xs text-rose-400 text-center pt-2 animate-in fade-in duration-300">
                  {formError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full pt-12 sm:pt-16 mt-12 sm:mt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs text-[#777777] text-center md:text-left">
        <div className="flex items-center gap-3">
          <span className="font-serif text-white text-base">HV.</span>
          <span>© 2026 HIMANSHU VISHWAKARMA. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <span>BUILT WITH NEXT.JS · REACT · THREE.JS · TAILWIND CSS</span>
          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundManager.playHover()}
            className="flex items-center gap-1.5 text-white hover:text-[#AFAFAF] transition-colors"
            data-cursor-label="TOP"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </section>
  );
}
