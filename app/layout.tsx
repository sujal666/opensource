
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "./_components/CursorGlow";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next';
import { GitHubDataProvider } from "@/context/GitHubDataContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Issue Hunter",
  description: "A collection of open source projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <GitHubDataProvider>
        <html lang="en" className="" suppressHydrationWarning>
             <GoogleTagManager gtmId="G-4Y39G3D75H" />
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
              <CursorGlow />
              {children}
              <Analytics />
          </body>
        </html>
      </GitHubDataProvider>
    </ClerkProvider>
  );
}


