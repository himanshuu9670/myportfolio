import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Himanshu Vishwakarma — Software Engineer",
  description:
    "Personal portfolio of Himanshu Vishwakarma. Software Engineer focused on backend development, REST APIs, database systems, and AI-powered applications.",
  keywords: [
    "Himanshu Vishwakarma",
    "Software Engineer",
    "Backend Developer",
    "Java",
    "Spring Boot",
    "Python",
    "FastAPI",
    "REST APIs",
    "MySQL",
    "Docker",
    "Spring Data JPA",
  ],
  authors: [{ name: "Himanshu Vishwakarma" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Himanshu Vishwakarma — Software Engineer",
    description: "Software Engineer focused on backend development, REST APIs, database systems, and AI-powered applications.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#050505] text-[#FFFFFF] font-sans selection:bg-white selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
