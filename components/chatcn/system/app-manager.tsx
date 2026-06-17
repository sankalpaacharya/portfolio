import { useEffect, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandDialog,
} from "@/components/ui/command";
import { useStore } from "@/store/useStore";
import { THEME_LIST } from "@/lib/themes";
import { Check, Palette, ChevronLeft } from "lucide-react";

interface Application {
  name: string;
  icon: string;
  url?: string;
  description?: string;
}

const applications: Record<string, Application[]> = {
  System: [
    {
      name: "Terminal",
      icon: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png",
    },
    {
      name: "File Manager",
      icon: "https://upload.wikimedia.org/wikipedia/commons/7/74/Folder-front-gradient.png",
    },
  ],
  Browsers: [
    {
      name: "Firefox",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg",
    },
    {
      name: "Chrome",
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg",
    },
  ],
  "Social Media": [
    {
      name: "X (Twitter)",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png",
      url: "https://x.com/sankalpa_02",
    },
    {
      name: "Instagram",
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
      url: "https://instagram.com/sankalpa02",
    },

    {
      name: "LinkedIn",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      url: "https://linkedin.com/in/sankalpa02",
    },
  ],

  Development: [
    {
      name: "GitHub",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg",
      url: "https://github.com/sankalpaacharya",
    },
    {
      name: "Neovim",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Biglinux-Icons_%E2%80%93_neovim.svg/1024px-Biglinux-Icons_%E2%80%93_neovim.svg.png",
      url: "https://github.com/sankalpaacharya",
    },
  ],
  Entertainment: [
    {
      name: "YouTube",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
      url: "https://youtube.com/@sankalpa02",
    },
    {
      name: "Spotify",
      icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
      url: "https://spotify.com",
    },
  ],
};

type Page = "root" | "themes";

export function ApplicationManager() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<Page>("root");
  const { openApp, theme, setTheme } = useStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Always start from the root page when the palette is reopened.
  useEffect(() => {
    if (!open) setPage("root");
  }, [open]);

  const handleAppClick = (app: Application) => {
    if (app.url) {
      window.open(app.url, "_blank");
      setOpen(false);
    } else {
      // Map app names to AppType
      const appTypeMap: Record<
        string,
        "terminal" | "browser" | "file-manager"
      > = {
        Terminal: "terminal",
        "File Manager": "file-manager",
        Firefox: "browser",
        Chrome: "browser",
      };

      const appType = appTypeMap[app.name] || "browser";
      openApp(appType);
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Backspace on an empty input steps back from the themes page.
    if (
      e.key === "Backspace" &&
      page !== "root" &&
      (e.target as HTMLInputElement).value === ""
    ) {
      e.preventDefault();
      setPage("root");
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command className="rounded-lg border shadow-md md:min-w-[550px]">
        <CommandInput
          placeholder={
            page === "themes" ? "Search themes..." : "Search applications..."
          }
          onKeyDown={handleKeyDown}
        />
        <CommandList>
          <CommandEmpty>
            {page === "themes" ? "No themes found." : "No applications found."}
          </CommandEmpty>

          {page === "root" && (
            <>
              {Object.entries(applications).map(([category, apps], index) => (
                <div key={category}>
                  {index > 0 && <CommandSeparator />}
                  <CommandGroup heading={category}>
                    {apps.map((app) => (
                      <CommandItem
                        key={app.name}
                        onSelect={() => handleAppClick(app)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="relative w-6 h-6 shrink-0">
                            <img
                              src={app.icon}
                              alt={app.name}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>
                          <span className="flex-1">{app.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              ))}

              <CommandSeparator />
              <CommandGroup heading="Personalization">
                <CommandItem
                  onSelect={() => setPage("themes")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Palette className="w-5 h-5 shrink-0" />
                    <span className="flex-1">Themes</span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {theme.replace("-", " ")}
                    </span>
                  </div>
                </CommandItem>
              </CommandGroup>
            </>
          )}

          {page === "themes" && (
            <CommandGroup heading="Themes">
              <CommandItem
                onSelect={() => setPage("root")}
                className="cursor-pointer text-muted-foreground"
              >
                <div className="flex items-center gap-3 w-full">
                  <ChevronLeft className="w-5 h-5 shrink-0" />
                  <span className="flex-1">Back</span>
                </div>
              </CommandItem>
              {THEME_LIST.map((t) => (
                <CommandItem
                  key={t.id}
                  value={`theme ${t.label}`}
                  onSelect={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex shrink-0 overflow-hidden rounded-md border">
                      {t.swatch.map((color, i) => (
                        <span
                          key={i}
                          className="w-3 h-6"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="flex-1">{t.label}</span>
                    {theme === t.id && (
                      <Check className="w-4 h-4 shrink-0 text-primary" />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
