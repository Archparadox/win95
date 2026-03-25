import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "win-port",
  description: "A Windows 95-inspired frontend engineer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
