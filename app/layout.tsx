import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll"; // استيراد المكون

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed (Abu Aws) | Portfolio",
  description: "Full Stack Developer & UI/UX Expert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${epilogue.variable} antialiased bg-stone-100 text-stone-900`}
      >
        {/* تغليف محتوى الموقع بالكامل */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
