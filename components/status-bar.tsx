"use client";
import {
  Bluetooth,
  Wifi,
  BatteryFull,
  SunMedium,
  Clock,
  Calendar,
  Settings as SettingsIcon,
  Gamepad2,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import { SettingsContent } from "./chatcn/system/settings";
import { BrightnessSetting } from "./settings/brightness";
import { DiamondGame } from "./games/diamond";
import { useStore } from "@/store/useStore";
import CalendarCard from "./settings/calendar";
import ContactForm from "./form";
import { WebPet } from "./web-pet";

type ActionItem = {
  value: string;
  icon: LucideIcon;
  interactive?: boolean;
  wrapper?: (children: React.ReactNode) => React.ReactNode;
};

export default function StatusBar() {
  const [active, setActive] = useState(1);
  const brightness = useStore((state) => state.brightness);
  const setBrightness = useStore((state) => state.setBrightness);

  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });

  const actions: ActionItem[] = [
    {
      value: `${brightness}%`,
      icon: SunMedium,
      wrapper: (children) => (
        <BrightnessSetting value={brightness} onValueChange={setBrightness}>
          {children}
        </BrightnessSetting>
      ),
    },
    { value: "100%", icon: BatteryFull },
    { value: "Wi-Fi", icon: Wifi },
    { value: "BT", icon: Bluetooth },
    { value: time, icon: Clock },
    {
      value: date,
      icon: Calendar,
      wrapper: (children) => <CalendarCard>{children} </CalendarCard>,
    },
  ];

  return (
    <div className="bg-card/95 backdrop-blur-xs flex justify-between items-center p-2 border rounded shadow-xl text-xs gap-1 sm:gap-2 overflow-x-auto">
      <WebPet animal="dog" color="akita" speed={5.5} scale={0.55} />
      {/* Workspace Numbers - Show only 1 on mobile, all on desktop */}
      <div
        className="flex items-center gap-1 sm:gap-2 relative"
        style={
          {
            "--workspace-index": active - 1,
          } as React.CSSProperties
        }
      >
        <div
          className="absolute inset-y-0 w-7 sm:w-9 bg-primary/20 rounded-md transition-transform duration-300 ease-out hidden sm:block"
          style={{
            transform: `translateX(calc(var(--workspace-index) * (2.25rem + 0.5rem)))`,
          }}
        />

        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setActive(num)}
            className={`relative z-10 w-7 sm:w-9 py-1 cursor-pointer rounded-md transition-colors duration-200 text-[10px] sm:text-xs ${
              num === active
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            } ${num === 1 ? "" : "hidden sm:block"}`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Settings, Message, and Game Icons */}
      <div className="flex items-center space-x-0.5 sm:space-x-1">
        <div className="p-0.5 sm:p-1 hover:bg-muted rounded flex items-center">
          <Dialog>
            <DialogTrigger>
              <div className="p-0.5 sm:p-1 hover:bg-muted rounded">
                <SettingsIcon className="size-3.5 sm:size-4" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Settings</DialogTitle>
              <SettingsContent />
            </DialogContent>
          </Dialog>
        </div>
        <div className="p-0.5 sm:p-1 hover:bg-muted rounded flex items-center">
          <Dialog>
            <DialogTrigger>
              <div className="p-0.5 sm:p-1 hover:bg-muted rounded">
                <MessageSquare className="size-3.5 sm:size-4" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Send Anonymous Message to Sanku</DialogTitle>
              <ContactForm />
            </DialogContent>
          </Dialog>
        </div>
        <div className="p-0.5 sm:p-1 hover:bg-muted rounded flex items-center">
          <Dialog>
            <DialogTrigger>
              <div className="p-0.5 sm:p-1 hover:bg-muted rounded">
                <Gamepad2 className="size-3.5 sm:size-4" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Game</DialogTitle>
              <DiamondGame />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1 text-muted-foreground">
        {actions.map(({ value, icon: Icon, wrapper }, idx) => {
          const isHiddenOnMobile = idx === 2 || idx === 3 || idx === 4;
          const isHiddenOnSmall = idx === 1;

          const hideValueOnMobile = idx === 0 || idx === 5;

          const content = (
            <div
              className={`flex items-center gap-0.5 sm:gap-1 hover:text-foreground transition-colors duration-200 cursor-pointer`}
            >
              <Icon className="size-3.5 sm:size-4" />
              <span
                className={`text-[10px] sm:text-xs ${
                  hideValueOnMobile ? "hidden sm:inline" : ""
                }`}
              >
                {value}
              </span>
            </div>
          );

          return (
            <div
              key={idx}
              className={`flex items-center hover:bg-muted px-1 sm:px-2 py-0.5 sm:py-1 rounded ${
                isHiddenOnMobile ? "hidden sm:flex" : ""
              } ${isHiddenOnSmall ? "hidden md:flex" : ""}`}
            >
              {wrapper ? wrapper(content) : content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
