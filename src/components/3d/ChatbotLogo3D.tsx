"use client";

interface ChatbotLogo3DProps {
  size?: number; // size in px
  interactive?: boolean;
}

export default function ChatbotLogo3D({ size = 92 }: ChatbotLogo3DProps) {
  return (
    <div
      className="relative flex items-center justify-center filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)]"
      style={{
        width: size,
        height: size,
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="w-full h-full object-contain select-none pointer-events-none"
        src="/gecko-loop.webm"
      />
    </div>
  );
}
