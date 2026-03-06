import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legatron - Strateegiline Äriplaan 2024",
  description: "Legatron muudab seadused arusaadavaks ja koheselt kasutatavaks igale inimesele ja ettevõttele.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="et">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
