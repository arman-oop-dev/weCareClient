import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";

import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar";
import "./globals.css";
import Providers from "./providers";

const fontOutfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#15151b" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "WeCare",
    template: "%s | WeCare",
  },
  description:
    "Discover programmes, connect with people, and make every moment count.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${fontOutfit.variable} antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                background: "var(--brand-foreground)",
                color: "var(--brand-content-primary)",
                border: "1px solid var(--brand-content-secondary)",
              },
            }}
          />

          <Navbar />

          <main className="flex-1 bg-background transition-colors duration-300">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
