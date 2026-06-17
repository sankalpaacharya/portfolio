import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { BodyWrapper } from "@/components/body-wrapper";
import { ThemeManager } from "@/components/theme-manager";
import { THEMES, DEFAULT_THEME } from "@/lib/themes";

// Applies the persisted color theme before first paint to avoid a flash.
const themeBootstrap = `(function(){try{var t=localStorage.getItem('theme');var m=${JSON.stringify(
  Object.fromEntries(Object.values(THEMES).map((t) => [t.id, t.vars])),
)};var v=m[t]||m['${DEFAULT_THEME}'];var r=document.documentElement;for(var k in v){r.style.setProperty(k,v[k]);}}catch(e){}})();`;

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sankalpa Acharya",
  description:
    "I'm Sankalpa Acharya, 3rd-year Computer Science student driven to build software that lasts. Skilled in React, Golang, and Linux systems. I believe in creating solutions that are fast, reliable, and built to make a difference. Whenever I feel like to share my knowledge I write @blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <BodyWrapper className={`${jetbrains.className} antialiased bg-cover`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeManager />
          {children}
        </ThemeProvider>
      </BodyWrapper>
    </html>
  );
}
