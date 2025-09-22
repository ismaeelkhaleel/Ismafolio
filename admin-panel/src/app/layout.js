// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
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
  title: "Mohd Ismaeel's Portfolio",
  description: "personal portfolio website admin panel.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: ["/favicon.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          <Provider>
            {children}
          </Provider>
        </ClientLayout>
      </body>
    </html>
  );
}