"use client";

import { useEffect, useRef, useState } from "react";

interface ChatbotLogo3DProps {
  size?: number; // size in px
  interactive?: boolean;
}

export default function ChatbotLogo3D({ size, interactive }: ChatbotLogo3DProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Guarantee mute on DOM element for strict browser autoplay policies (iOS / mobile)
    video.muted = true;
    video.defaultMuted = true;

    // Check if the browser can play webm format
    const canPlayWebm =
      video.canPlayType('video/webm; codecs="vp8, vorbis"') ||
      video.canPlayType("video/webm");
    if (canPlayWebm === "") {
      // Browser (e.g. iOS Safari) does not support WebM natively
      setUseFallback(true);
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback, fall back gracefully to high-res transparent mascot image
        setUseFallback(true);
      });
    }
  }, []);

  return (
    <div
      className="relative flex items-center justify-center filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)] select-none pointer-events-none"
      style={size ? { width: size, height: size } : { width: "100%", height: "100%" }}
    >
      {!useFallback ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/gecko-transparent.png"
          onError={() => setUseFallback(true)}
          aria-hidden="true"
          className="w-full h-full object-contain select-none pointer-events-none"
          src="/gecko-loop.webm"
        />
      ) : (
        <img
          src="/gecko-transparent.png"
          alt="HV Assistant Gecko Mascot"
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      )}
    </div>
  );
}
