"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { soundManager } from "@/utils/audio";
import {
  X,
  Send,
  Sparkles,
  ArrowUpRight,
  RotateCcw,
  Bot,
  User,
  Check,
  Copy,
} from "lucide-react";

const ChatbotLogo3D = dynamic(() => import("@/components/3d/ChatbotLogo3D"), {
  ssr: false,
});

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  links?: { label: string; url: string }[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    sender: "bot",
    text: "Hello! I am Himanshu's portfolio assistant. Feel free to ask about his software projects, backend engineering experience, technical skills, or how to get in touch.",
    timestamp: "Now",
    links: [
      { label: "HB MindCare (Live)", url: "https://mindcare.healthboat.org/" },
      { label: "Task Manager API", url: "https://github.com/himanshuu9670/task-manager-api" },
      { label: "Supermarket Sales", url: "https://github.com/himanshuu9670/supermarket-sales-dashboard" },
    ],
  },
];

const SUGGESTIONS = [
  "What are Himanshu's key projects?",
  "Tell me about his backend experience",
  "What technologies does he work with?",
  "How can I contact Himanshu?",
];

// Knowledge base and response generator
function generatePreciseResponse(query: string): { text: string; links?: { label: string; url: string }[] } {
  const q = query.toLowerCase();

  // 1. Projects Query
  if (
    q.includes("project") ||
    q.includes("work") ||
    q.includes("portfolio") ||
    q.includes("built") ||
    q.includes("codebase")
  ) {
    if (q.includes("task manager") || q.includes("spring") || q.includes("java")) {
      return {
        text: `**Task Manager API** is a REST API for managing tasks with CRUD operations, database integration, and centralized exception handling:\n\n• **Stack:** Java, Spring Boot, Spring Data JPA, MySQL, JUnit 5, Mockito.\n• **Architecture:** Layered design cleanly separating controllers, service interfaces, and data repositories.\n• **Features:** Relational schema constraints, database indexing, and standardized RFC 7807 problem details error responses.\n• **Testing:** Comprehensive unit and integration test coverage.`,
        links: [
          { label: "View Task Manager API on GitHub ↗", url: "https://github.com/himanshuu9670/task-manager-api" },
        ],
      };
    }

    if (q.includes("mindcare") || q.includes("health") || q.includes("mental")) {
      return {
        text: `**HB MindCare** is a mental wellness care coordination platform:\n\n• **Backend:** Asynchronous REST API developed with Python and FastAPI.\n• **Workflows:** Structured pipelines for users, therapists, and reviewers.\n• **Features:** Support ticket lifecycle tracking, appointment scheduling, and assessment logging.\n• **Status:** Live in production.`,
        links: [
          { label: "Visit HB MindCare Live Platform ↗", url: "https://mindcare.healthboat.org/" },
        ],
      };
    }

    if (q.includes("sales") || q.includes("supermarket") || q.includes("forecast") || q.includes("prophet")) {
      return {
        text: `**Supermarket Sales Dashboard & Forecasting Tool**:\n\n• **Data Processing:** Automated ingestion, cleaning, and transformation of transaction data with Pandas and NumPy.\n• **Forecasting:** Time-series demand forecasting using Facebook Prophet to evaluate trends and seasonal variance.\n• **Inventory Insights:** Computes safety stock and reorder point recommendations.\n• **Interface:** Interactive web dashboard developed with Streamlit.`,
        links: [
          { label: "View Supermarket Sales on GitHub ↗", url: "https://github.com/himanshuu9670/supermarket-sales-dashboard" },
        ],
      };
    }

    if (q.includes("healthboat ai") || q.includes("chatbot") || q.includes("rag")) {
      return {
        text: `**Healthboat AI** is a healthcare chatbot system designed to deliver context-aware responses:\n\n• **RAG Pipeline:** Sub-300ms vector retrieval across domain-specific clinical documentation.\n• **Intent Routing:** Deterministic query routing to direct users to appropriate resources safely.\n• **Integration:** Lightweight vanilla JavaScript widget easily embeddable into existing websites.\n• **Backend:** FastAPI async server with SQLite caching.`,
        links: [
          { label: "View on GitHub ↗", url: "https://github.com/himanshuu9670/" },
        ],
      };
    }

    return {
      text: `Himanshu has developed **4 primary software projects**:\n\n1. **HB MindCare:** Mental health support and appointment coordination platform with FastAPI.\n2. **Task Manager API:** REST API built with Java, Spring Boot, Spring Data JPA, and MySQL.\n3. **Supermarket Sales Dashboard:** Sales forecasting and inventory planning tool with Python, Streamlit, and Prophet.\n4. **Healthboat AI:** Healthcare chatbot and knowledge retrieval platform with RAG and deterministic routing.`,
      links: [
        { label: "HB MindCare Live ↗", url: "https://mindcare.healthboat.org/" },
        { label: "Task Manager on GitHub ↗", url: "https://github.com/himanshuu9670/task-manager-api" },
        { label: "Supermarket Sales on GitHub ↗", url: "https://github.com/himanshuu9670/supermarket-sales-dashboard" },
      ],
    };
  }

  // 2. Experience
  if (
    q.includes("experience") ||
    q.includes("trainee") ||
    q.includes("company") ||
    q.includes("job") ||
    q.includes("role")
  ) {
    return {
      text: `Himanshu currently works as a **Software Engineer Trainee** (August 2026 – Present):\n\n• **ERP Application Testing:** Functional testing and debugging across multiple modules of a Laravel ERP system (inventory, finance, and user management).\n• **Database Optimization:** Worked with MySQL and Eloquent ORM to maintain data consistency and optimize queries.\n• **Messaging & Alerts:** Developed an in-app notification subsystem with unread badges, real-time alerts, and conversation history.\n• **Deployment:** Investigated release issues, resolved database migrations, and improved deployment reliability.`,
      links: [
        { label: "View LinkedIn Profile ↗", url: "https://www.linkedin.com/in/himanshu-vishwakarma07/" },
      ],
    };
  }

  // 3. Skills & Technologies
  if (
    q.includes("skill") ||
    q.includes("backend") ||
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("database") ||
    q.includes("architecture")
  ) {
    return {
      text: `Himanshu's technical skills include:\n\n• **Languages:** Java, Python, SQL, C++, JavaScript\n• **Backend Development:** Spring Boot, Spring Data JPA, FastAPI, Flask, REST API Development\n• **Databases:** MySQL, MongoDB, SQLite\n• **AI & Machine Learning:** Pandas, NumPy, Scikit-learn, XGBoost, LangChain, RAG integrations\n• **Developer Tools:** Git, GitHub, Maven, Postman, VS Code, Docker`,
      links: [
        { label: "View GitHub Profile ↗", url: "https://github.com/himanshuu9670/" },
      ],
    };
  }

  // 4. Contact & Hiring
  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("email") ||
    q.includes("linkedin") ||
    q.includes("reach") ||
    q.includes("location") ||
    q.includes("available")
  ) {
    return {
      text: `Himanshu Vishwakarma is open to software engineering opportunities and backend development roles:\n\n• **Email:** himanshuu9670@gmail.com\n• **LinkedIn:** linkedin.com/in/himanshu-vishwakarma07\n• **GitHub:** github.com/himanshuu9670\n• **Location:** Delhi NCR, India (Open to Remote & Hybrid roles)`,
      links: [
        { label: "Send Email ↗", url: "mailto:himanshuu9670@gmail.com" },
        { label: "LinkedIn Profile ↗", url: "https://www.linkedin.com/in/himanshu-vishwakarma07/" },
        { label: "GitHub Profile ↗", url: "https://github.com/himanshuu9670/" },
      ],
    };
  }

  // 5. About Himanshu
  if (
    q.includes("who is") ||
    q.includes("himanshu") ||
    q.includes("about") ||
    q.includes("bio") ||
    q.includes("background")
  ) {
    return {
      text: `**Himanshu Vishwakarma** is a Software Engineer focused on backend development, REST APIs, database systems, and AI-powered applications.\n\nHe has worked on backend services using Java and Spring Boot, asynchronous APIs with Python and FastAPI, database design in MySQL, and enterprise application testing on Laravel ERP systems.\n\nHe is interested in building practical, reliable applications that solve real engineering challenges.`,
      links: [
        { label: "LinkedIn ↗", url: "https://www.linkedin.com/in/himanshu-vishwakarma07/" },
        { label: "GitHub ↗", url: "https://github.com/himanshuu9670/" },
      ],
    };
  }

  // 6. Default fallback
  return {
    text: `I can provide information on:\n\n• **Projects:** Task Manager API, Supermarket Sales Dashboard, HB MindCare, Healthboat AI.\n• **Technologies:** Java, Spring Boot, Python, FastAPI, MySQL, React, RAG.\n• **Experience:** Software Engineer Trainee at an enterprise ERP team.\n• **Contact:** Available for software engineering roles.\n\nWhat would you like to know?`,
    links: [
      { label: "Task Manager API on GitHub ↗", url: "https://github.com/himanshuu9670/task-manager-api" },
      { label: "Contact Himanshu ↗", url: "mailto:himanshuu9670@gmail.com" },
    ],
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isTyping]);

  // Trap and isolate scroll events inside the chat window so page never scrolls
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isAtTop = scrollTop <= 0 && e.deltaY < 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 2 && e.deltaY > 0;

      // Prevent wheel chaining to window when hitting top or bottom
      if (isAtTop || isAtBottom) {
        e.preventDefault();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      e.stopPropagation();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchmove", handleTouch);
    };
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    soundManager.playClick();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Realistic typing delay for precise response
    setTimeout(() => {
      const response = generatePreciseResponse(query);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        links: response.links,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      soundManager.playClick(900, 0.02, 0.015);
    }, 450);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    soundManager.playClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    soundManager.playClick();
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING CORNER TRIGGER WITH CONTINUOUS LOOPING GECKO MASCOT & TOOLTIP
         ========================================================================= */}
      <div className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40 flex items-center">
        {/* Always Visible Compact Speech Bubble: "How can I help you?" */}
        {!isOpen && (
          <button
            onClick={() => {
              soundManager.playClick();
              setIsOpen(true);
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="absolute right-full mr-2 top-1/2 -translate-y-1/2 hidden xs:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/15 hover:border-white/30 text-white/90 font-sans text-[11px] sm:text-xs shadow-[0_8px_20px_rgba(0,0,0,0.8)] whitespace-nowrap cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 max-w-[calc(100vw-6rem)]"
            aria-label="Open AI Assistant"
            data-cursor-label="CHAT"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.9)] shrink-0" />
            <span className="font-normal text-white/90 truncate">How can I help you?</span>
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-[4px] border-transparent border-l-black/85" />
          </button>
        )}

        {/* Trigger Button - Floating 3D animated blue gecko mascot */}
        <button
          onClick={() => {
            soundManager.playClick();
            setIsOpen((prev) => !prev);
          }}
          onMouseEnter={() => soundManager.playHover()}
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          data-cursor-label={isOpen ? "CLOSE" : "CHAT"}
        >
          {/* Continuous Looping 3D Motion Blue Gecko Mascot */}
          <ChatbotLogo3D />
        </button>
      </div>

      {/* =========================================================================
          2. GLOSSY METALLIC CHATBOT MODAL WINDOW (Full Animation & Glass Depth)
         ========================================================================= */}
      {isOpen && (
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed bottom-20 sm:bottom-24 right-3 sm:right-8 left-3 sm:left-auto w-auto sm:w-[440px] max-w-[calc(100vw-1.5rem)] h-[560px] sm:h-[600px] max-h-[82vh] rounded-2xl sm:rounded-3xl bg-[#080808]/95 backdrop-blur-3xl border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(255,255,255,0.08)] flex flex-col overflow-hidden overscroll-contain animate-in fade-in zoom-in-95 duration-300 z-50"
          style={{
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Atmospheric Radial Shading (Monochromatic Metallic Gloss) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-white/[0.08] to-transparent pointer-events-none blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-white/[0.04] to-transparent pointer-events-none blur-2xl" />

          {/* Editorial Coordinate Reticle Marks */}
          <div className="absolute top-3 left-4 font-mono text-[9px] text-[#555555] tracking-widest pointer-events-none select-none">
            SYS // 28.6139° N, 77.2090° E
          </div>

          {/* Glossy Header Bar */}
          <div className="relative z-10 px-5 pt-7 pb-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              {/* Animated 3D Gecko Mascot */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <ChatbotLogo3D size={40} interactive={false} />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base text-white tracking-wide">
                    HV Assistant
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-[#AFAFAF] uppercase tracking-wider">
                    Portfolio AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#AFAFAF] tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE · READY</span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleReset}
                onMouseEnter={() => soundManager.playHover()}
                className="p-2 rounded-full text-[#888888] hover:text-white hover:bg-white/10 transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsOpen(false);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="p-2 rounded-full text-[#888888] hover:text-white hover:bg-white/10 transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Message History Container - Fully scroll-trapped and isolated from page scrolling */}
          <div
            ref={scrollAreaRef}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40"
          >
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? "items-start" : "items-end"} gap-1 group`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed transition-all ${
                      isBot
                        ? "bg-white/[0.05] border border-white/10 text-[#E6E6E6] rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
                        : "bg-white text-black font-sans font-medium rounded-tr-sm shadow-[0_4px_25px_rgba(255,255,255,0.15)]"
                    }`}
                  >
                    {/* Render Formatted Markdown-style text */}
                    <div className="whitespace-pre-line font-sans space-y-1">
                      {msg.text.split("\n\n").map((para, i) => (
                        <p key={i}>
                          {para.split("**").map((chunk, j) =>
                            j % 2 === 1 ? (
                              <strong key={j} className={isBot ? "text-white font-semibold" : "text-black font-bold"}>
                                {chunk}
                              </strong>
                            ) : (
                              chunk
                            )
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Bot Project / Outbound Action Link Chips */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                        {msg.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => soundManager.playHover()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 text-white font-mono text-[10px] tracking-wider uppercase transition-all duration-200 hover:scale-105"
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight className="w-3 h-3 text-[#AFAFAF]" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Metadata and Copy Action */}
                  <div className="flex items-center gap-2 px-1 text-[9px] font-mono text-[#666666]">
                    <span>{msg.timestamp}</span>
                    {isBot && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity flex items-center gap-1"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                            <span className="text-emerald-400">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#AFAFAF] bg-white/[0.03] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.3s]" />
                <span className="ml-1 text-[10px] uppercase tracking-wider text-[#777777]">
                  Analyzing query...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Questions Chips */}
          <div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative z-10 px-4 py-2 border-t border-white/[0.08] bg-black/40 overflow-x-auto overscroll-contain scrollbar-none flex gap-2"
          >
            {SUGGESTIONS.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion)}
                onMouseEnter={() => soundManager.playHover()}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 text-[11px] font-sans text-[#CCCCCC] hover:text-white transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-white/60" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>

          {/* Glossy Input Bar */}
          <div className="relative z-10 p-4 border-t border-white/10 bg-white/[0.02]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative flex items-center"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, or experience..."
                className="w-full pl-4 pr-12 py-3 rounded-2xl bg-white/[0.06] border border-white/15 focus:border-white/50 text-white placeholder:text-[#666666] font-sans text-xs tracking-wide focus:outline-none transition-all"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                onMouseEnter={() => soundManager.playHover()}
                className="absolute right-2 p-2 rounded-xl bg-white text-black hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100 disabled:pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-2 text-center font-mono text-[9px] text-[#555555] tracking-widest uppercase">
              HIMANSHU VISHWAKARMA · SOFTWARE ENGINEER
            </div>
          </div>
        </div>
      )}
    </>
  );
}
