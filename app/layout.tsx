import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { BodyWrapper } from "@/components/body-wrapper";
import { ThemeManager } from "@/components/theme-manager";
import { THEMES, DEFAULT_THEME } from "@/lib/themes";

// Applies the persisted color theme and wallpaper before first paint, both to
// avoid a flash and to keep SSR/client markup identical (no localStorage on the
// server would otherwise cause a hydration mismatch).
const themeVars = JSON.stringify(
  Object.fromEntries(Object.values(THEMES).map((t) => [t.id, t.vars])),
);
const themeWallpapers = JSON.stringify(
  Object.fromEntries(Object.values(THEMES).map((t) => [t.id, t.wallpaper ?? ""])),
);
const themeBootstrap = `(function(){try{var t=localStorage.getItem('theme');var r=document.documentElement;var m=${themeVars};var v=m[t]||m['${DEFAULT_THEME}'];for(var k in v){r.style.setProperty(k,v[k]);}var w=${themeWallpapers};var img=localStorage.getItem('wallpaper')||w[t]||w['${DEFAULT_THEME}'];if(img){r.style.setProperty('--wallpaper','url('+img+')');}}catch(e){}})();`;

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const description =
  "I'm Sankalpa Acharya, 3rd-year Computer Science student driven to build software that lasts. Skilled in React, Golang, and Linux systems. I believe in creating solutions that are fast, reliable, and built to make a difference. Whenever I feel like to share my knowledge I write @blogs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sankalpa.info.np"),
  title: "Sankalpa Acharya",
  description,
  openGraph: {
    title: "Sankalpa Acharya",
    description,
    url: "https://sankalpa.info.np",
    siteName: "Sankalpa Acharya",
    type: "website",
    images: [
      {
        url: "/wallpapers/gamer.png",
        width: 1200,
        height: 675,
        alt: "Sankalpa Acharya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sankalpa Acharya",
    description,
    creator: "@sankalpa_02",
    images: ["/wallpapers/gamer.png"],
  },
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
