import type { Metadata } from "next";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Fraunces: variable opsz/SOFT/WONK for expressive serif */}
        {/* IBM Plex Sans: body, distinctive sans  */}
        {/* IBM Plex Mono: labels, eyebrows        */}
        {/* Cairo: Arabic fallback                 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..700,0..100,0..1;1,9..144,400..700,0..100,0..1&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
