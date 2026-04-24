import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snailon — AI Order Confirmation for Morocco",
  description:
    "AI-powered COD order confirmation for Moroccan merchants. Reduce refusals, confirm more orders, and grow your business with automated WhatsApp follow-ups.",
  metadataBase: new URL("https://snailon.com"),
  openGraph: {
    title: "Snailon — AI Order Confirmation for Morocco",
    description:
      "AI-powered COD order confirmation for Moroccan merchants. Reduce refusals, confirm more orders, and grow your business with automated WhatsApp follow-ups.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400;1,9..40,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
