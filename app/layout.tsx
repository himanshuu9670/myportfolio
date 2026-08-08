import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Himanshu Vishwakarma — Software Engineer',
  description: 'Software Engineer building thoughtful backend systems and applied AI products.',
  metadataBase: new URL('https://himanshuu9670.github.io'),
  openGraph: { title: 'Himanshu Vishwakarma — Software Engineer', description: 'Backend engineering, AI systems, and thoughtful interfaces.', type: 'website' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
