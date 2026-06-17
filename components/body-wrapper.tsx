"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Toaster } from "./ui/sonner";
import BrightnessScreen from "./settings/brightness-screen";
// import TimeSpent from "./time-spent";

export function BodyWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const brightness = useStore((state) => state.brightness);
  const wallpaper = useStore((state) => state.wallpaper);

  // The wallpaper is driven through the --wallpaper CSS variable (also set by
  // the pre-paint bootstrap script) rather than an inline style, so the server
  // and client render identical <body> markup and there's no hydration error.
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--wallpaper",
      `url(${wallpaper})`,
    );
  }, [wallpaper]);

  return (
    <body className={className}>
      {/* <TimeSpent /> */}
      <Toaster position="top-right" />
      <BrightnessScreen brightness={brightness} />
      {children}
    </body>
  );
}
