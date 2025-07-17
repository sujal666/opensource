
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
import Script from "next/script";


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

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   return (
//     <ClerkProvider>
//       <GitHubDataProvider>
//         <html lang="en" className="" suppressHydrationWarning>
//              <GoogleTagManager gtmId="G-4Y39G3D75H" />
//           <body
//             className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//           >
//               <CursorGlow />
//               {children}
//               <Analytics />
//           </body>
//         </html>
//       </GitHubDataProvider>
//     </ClerkProvider>
//   );
// }


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <GitHubDataProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {/* ✅ Google Analytics */}
            <Script
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=G-6VRCN282F8"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-6VRCN282F8', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />

            <CursorGlow />
            {children}
            <Analytics />
          </body>
        </html>
      </GitHubDataProvider>
    </ClerkProvider>
  );
}

