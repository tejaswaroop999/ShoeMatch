import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnalyticsBootstrap } from "@/components/AnalyticsBootstrap";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
    title: "ShoeMatch — Find the right shoes for your outfit",
    description: "Choose the best pair from the shoes you already own.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${sans.variable} ${display.variable}`}><AnalyticsBootstrap />{children}</body>
        </html>
    );
}
