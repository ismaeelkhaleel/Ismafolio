// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// 👇 yeh import zaruri hai
import { Provider } from "@/context/Context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Portfolio",
  description: "Portfolio with admin panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 👇 Wrap karna zaruri hai */}
        <Provider>
          <Navbar />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}