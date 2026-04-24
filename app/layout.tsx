import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snailon — AI Order Confirmation for Morocco",
  description:
    "AI-powered cash-on-delivery order confirmation for Moroccan merchants. Connect your WhatsApp, cut refusals, and lock in founding-member pricing.",
  metadataBase: new URL("https://snailon.com"),
  openGraph: {
    title: "Snailon — AI Order Confirmation for Morocco",
    description:
      "AI-powered cash-on-delivery order confirmation for Moroccan merchants. Connect your WhatsApp, cut refusals, and lock in founding-member pricing.",
    url: "https://snailon.com",
    siteName: "Snailon",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F0EAE0",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
