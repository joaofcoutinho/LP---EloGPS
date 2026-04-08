import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GPS People · Elo Education — Save the Date",
  description: "24 de Abril. Um encontro que transforma. GPS People by Elo Education.",
  openGraph: {
    title: "GPS People · Elo Education — Save the Date",
    description: "24 de Abril. Um encontro que transforma.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${lato.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
