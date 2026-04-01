"use client";

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

  return (
    <body
      className={className}
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {/* <TimeSpent /> */}
      <Toaster position="top-right" />
      <BrightnessScreen brightness={brightness} />
      {children}
    </body>
  );
}
