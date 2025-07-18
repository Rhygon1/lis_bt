import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {Analytics} from "@vercel/analytics/next";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/sidebar";

import "./globals.css";
import CurrencyLayout from "./currencyContext";
import { CartProvider } from "./components/cartContext";
import { AuthProvider } from "./components/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LIS Boutique",
  description: "An online store for LIS Boutique!",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <CurrencyLayout>
              <Analytics />
              {children}
              </CurrencyLayout>
          </CartProvider>
        </AuthProvider>
        <div className="fixed bottom-4 right-4 z-50">
          <a
            href="https://wa.me/16892678636"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-full shadow-lg bg-white text-black p-2 pr-4"
          >
            <div className="bg-green-500 rounded-full p-2 flex items-center justify-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/021/495/946/non_2x/whatsapp-logo-icon-free-png.png"
                alt="WhatsApp"
                className="h-5 w-5"
              />
            </div>
            <span className="ml-2 text-sm font-medium">Chat with us</span>
          </a>
        </div>
      </body>
    </html>
  );
}
