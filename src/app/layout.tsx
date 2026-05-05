import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alwell Art — Contemporary Artist",
    template: "%s · Alwell Art",
  },
  description:
    "Original works by Alwell — paintings, digital art, and sculpture exploring identity, culture, and narrative.",
  metadataBase: new URL("https://alwellart.com"),
  openGraph: {
    type: "website",
    siteName: "Alwell Art",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="bg-ink-900 text-cream min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
