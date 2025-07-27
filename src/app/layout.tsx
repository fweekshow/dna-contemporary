import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "DNA Contemporary - Art Marketplace",
  description: "Discover and sell unique art with Base Pay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Farcaster Auth Server for better performance */}
        <link rel="preconnect" href="https://auth.farcaster.xyz" />
      </head>
      <body
        className="antialiased"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
