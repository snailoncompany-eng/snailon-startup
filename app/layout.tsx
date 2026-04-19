import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Fraunces — variable display serif with soft/wonk axes for the editorial voice
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

// IBM Plex Sans — body
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// IBM Plex Mono — labels, eyebrows, meta
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snailon — COD orders, confirmed.",
  description:
    "AI-powered COD order confirmation for Moroccan merchants. Connect your WhatsApp, cut refusals, lock in 1% commission forever as a founding member.",
  metadataBase: new URL("https://snailon.com"),
  openGraph: {
    title: "Snailon — COD orders, confirmed.",
    description:
      "AI-powered COD order confirmation for Moroccan merchants. Connect your WhatsApp, cut refusals, lock in 1% commission forever as a founding member.",
    url: "https://snailon.com",
    siteName: "Snailon",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Cairo (Arabic) — linked lazily since most users won't use it */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
