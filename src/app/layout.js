'use client'

import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import ThemeComponent from "@/components/ThemeComponent";
import { SessionProvider } from "@/context/SessionProvider";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from '@/lib/redux/store'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeComponent>
          <SessionProvider>
            <Header />
            <Provider store={store}>{children}</Provider>
          </SessionProvider>
        </ThemeComponent>
      </body>
    </html>
  );
}
