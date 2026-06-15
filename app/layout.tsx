import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OpsHub — Operations Analytics for SaaS Teams",
  description:
    "Unified analytics for operations teams. Revenue, users, churn, and plan mix in one dashboard — with an AI copilot for ad-hoc questions.",
  openGraph: {
    title: "OpsHub — Operations Analytics for SaaS Teams",
    description:
      "Stop reconciling ops data in spreadsheets. Live metrics and AI-powered insights in one platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
