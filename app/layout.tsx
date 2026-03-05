import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legatron - Strateegiline Ariplaan 2024",
  description: "Legatron muudab seadused arusaadavaks ja koheselt kasutatavaks igale inimesele ja ettevotele.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="et">
      <body>{children}</body>
    </html>
  );
}
