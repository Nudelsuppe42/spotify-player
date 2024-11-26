import "./globals.css";

import { Inter, Passion_One } from "next/font/google";

import { cn } from "@/util/cn";
import type { Metadata } from "next";

const passion = Passion_One({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-passion",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Spotify Player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={passion.variable + " " + inter.variable}>
        {children}
      </body>
    </html>
  );
}
