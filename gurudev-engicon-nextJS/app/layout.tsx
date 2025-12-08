import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gurudev Engicon Private Limited | Engineering & Infrastructure Excellence",
  description: "Leading engineering and infrastructure development company specializing in construction management, structural engineering, and infrastructure solutions. Over 15 years of experience delivering landmark projects.",
  keywords: ["engineering", "construction", "infrastructure", "development", "structural engineering", "MEP design", "construction management", "project planning"],
  authors: [{ name: "Gurudev Engicon Private Limited" }],
  openGraph: {
    title: "Gurudev Engicon Private Limited",
    description: "Shaping future through excellence in engineering and infrastructure development",
    type: "website",
    locale: "en_US",
    siteName: "Gurudev Engicon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gurudev Engicon Private Limited",
    description: "Leading engineering and infrastructure development company",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
