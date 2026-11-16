"use client";

interface ChatbotLogo3DProps {
  size?: number; // size in px
  interactive?: boolean;
}

export default function ChatbotLogo3D({ size }: ChatbotLogo3DProps) {
  return (
    <div
      className="relative flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] select-none pointer-events-none"
      style={size ? { width: size, height: size } : { width: "100%", height: "100%" }}
    >
      <img
        src="/gecko-animated.webp"
        alt="HV Assistant Mascot"
        width={size || 92}
        height={size || 92}
        className="w-full h-full object-contain select-none pointer-events-none"
      />
    </div>
  );
}
