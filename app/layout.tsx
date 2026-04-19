import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snailon — Founding Member",
  description:
    "AI-powered COD confirmation for Moroccan sellers. Join as a Founding Member and lock in 1% commission forever.",
  metadataBase: new URL("https://snailon.com"),
  openGraph: {
    title: "Snailon — Founding Member",
    description:
      "AI-powered COD confirmation for Moroccan sellers. Join as a Founding Member and lock in 1% commission forever.",
    url: "https://snailon.com",
    siteName: "Snailon",
    type: "website",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
