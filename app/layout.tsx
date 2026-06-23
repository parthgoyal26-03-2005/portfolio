import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora, Geist } from "next/font/google";
import "./globals.css";
import { SITE } from "@/app/lib/data";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parthspace.in"),
  title: `${SITE.name} | ${SITE.tagline}`,
  description:
    "Cinematic MERN stack developer portfolio — high-performance web experiences, glassmorphism, and immersive digital architecture.",
  icons: {
    icon: "/parthlogo.png",
    apple: "/parthlogo.png",
  },
  openGraph: {
    title: "Parth Goyal | Full-Stack Developer",
    description:
      "Crafting immersive frontends & scalable backend systems — from cinematic UIs to production-grade APIs.",
    url: "https://parthspace.in",
    siteName: "parthspace.in",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",

    title: "Parth Goyal - Portfolio",

    description:
      "Full-Stack Developer building scalable web applications, API-driven systems & modern digital experiences.",

    images: ["https://www.parthspace.in/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark scroll-smooth", "font-sans", geist.variable)}>
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrains.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
