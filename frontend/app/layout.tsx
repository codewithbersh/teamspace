import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// eslint-disable-next-line import/no-unresolved
import { Analytics } from "@vercel/analytics/react";

import Providers from "@/components/providers/providers";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Space",
  description: "Your ultimate project management tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background antialiased")}>
        <div className="min-h-screen">
          <Providers>{children}</Providers>
          <Toaster />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
