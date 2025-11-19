import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DesarrollaTuBot | Bots de Trading Reales",
  description:
    "Automatiza tu operativa en oro con bots reales, probados en cuenta. Sin emociones, sin improvisar, con reglas sofisticadas y gestionadas por expertos.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head></head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L4RN7DBR9Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L4RN7DBR9Q');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
