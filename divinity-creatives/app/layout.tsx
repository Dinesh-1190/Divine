import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/system/SmoothScroll";
import Cursor from "@/components/system/Cursor";
import Grain from "@/components/system/Grain";
import ScrollProgress from "@/components/system/ScrollProgress";
import Preloader from "@/components/system/Preloader";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const SITE = "https://divinitycreatives.com";
const DESCRIPTION =
  "Divinity Creatives is a video editing studio for creators, founders and brands — YouTube longform, short form content, motion design and packaging built for retention.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Divinity Creatives — Video Editing Studio for Creators & Brands",
    template: "%s — Divinity Creatives",
  },
  description: DESCRIPTION,
  keywords: [
    "video editing",
    "YouTube video editing",
    "YouTube editor",
    "video editing agency",
    "short form video editing",
    "motion graphics",
    "video production",
    "thumbnail design",
    "content systems",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Divinity Creatives",
    title: "Divinity Creatives — Video Editing Studio for Creators & Brands",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Divinity Creatives — Video Editing Studio for Creators & Brands",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080A",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Divinity Creatives",
  description: DESCRIPTION,
  url: SITE,
  areaServed: ["US", "GB", "Worldwide"],
  serviceType: [
    "YouTube video editing",
    "Short form video editing",
    "Motion graphics",
    "Thumbnail design",
    "Content systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable}`}>
      <body className="bg-void text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[200] focus:rounded-full focus:bg-fg focus:px-5 focus:py-2.5 focus:text-sm focus:text-void"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll>
          <Cursor />
          <ScrollProgress />
          <Nav />
          <main id="top">{children}</main>
          <Footer />
        </SmoothScroll>
        <Grain />
      </body>
    </html>
  );
}
