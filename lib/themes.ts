// Dark-only color themes for the desktop. Each theme overrides the CSS
// variables defined in app/globals.css (.dark) by setting them inline on
// <html>, which wins over the stylesheet's class-based rules.

export type ThemeId = "mocha" | "gruvbox" | "tokyo-night";

type Palette = Record<string, string>;

export interface Theme {
  id: ThemeId;
  label: string;
  // Small swatch used as a preview in the picker.
  swatch: string[];
  // Optional wallpaper applied alongside the theme.
  wallpaper?: string;
  vars: Palette;
}

// Catppuccin Mocha — kept identical to the project's original .dark palette
// so the default appearance is unchanged.
const mocha: Palette = {
  "--background": "oklch(0.1828 0.0204 284.2039)",
  "--foreground": "oklch(0.8787 0.0426 272.2767)",
  "--card": "oklch(0.2429 0.0304 283.9110)",
  "--card-foreground": "oklch(0.8787 0.0426 272.2767)",
  "--popover": "oklch(0.2429 0.0304 283.9110)",
  "--popover-foreground": "oklch(0.8787 0.0426 272.2767)",
  "--primary": "oklch(0.7871 0.1187 304.7693)",
  "--primary-foreground": "oklch(0.2429 0.0304 283.9110)",
  "--secondary": "oklch(0.8124 0.1071 133.3919)",
  "--secondary-foreground": "oklch(0.8787 0.0426 272.2767)",
  "--muted": "oklch(0.4037 0.0320 280.1520)",
  "--muted-foreground": "oklch(0.8168 0.0403 272.8622)",
  "--accent": "oklch(0.3240 0.0319 281.9784)",
  "--accent-foreground": "oklch(0.7871 0.1187 304.7693)",
  "--destructive": "oklch(0.7556 0.1297 2.7642)",
  "--destructive-foreground": "oklch(0.2429 0.0304 283.9110)",
  "--border": "oklch(0.5497 0.0345 277.0951)",
  "--input": "oklch(0.4037 0.0320 280.1520)",
  "--ring": "oklch(0.7871 0.1187 304.7693)",
  "--chart-1": "oklch(0.7871 0.1187 304.7693)",
  "--chart-2": "oklch(0.7556 0.1297 2.7642)",
  "--chart-3": "oklch(0.8237 0.1015 52.6294)",
  "--chart-4": "oklch(0.9193 0.0704 86.5281)",
  "--chart-5": "oklch(0.8741 0.0618 193.5324)",
  "--sidebar": "oklch(0.2429 0.0304 283.9110)",
  "--sidebar-foreground": "oklch(0.8787 0.0426 272.2767)",
  "--sidebar-primary": "oklch(0.7871 0.1187 304.7693)",
  "--sidebar-primary-foreground": "oklch(0.2429 0.0304 283.9110)",
  "--sidebar-accent": "oklch(0.3240 0.0319 281.9784)",
  "--sidebar-accent-foreground": "oklch(0.7871 0.1187 304.7693)",
  "--sidebar-border": "oklch(0.5497 0.0345 277.0951)",
  "--sidebar-ring": "oklch(0.7871 0.1187 304.7693)",
};

// Gruvbox Dark.
const gruvbox: Palette = {
  "--background": "#282828",
  "--foreground": "#ebdbb2",
  "--card": "#32302f",
  "--card-foreground": "#ebdbb2",
  "--popover": "#32302f",
  "--popover-foreground": "#ebdbb2",
  "--primary": "#fe8019",
  "--primary-foreground": "#282828",
  "--secondary": "#b8bb26",
  "--secondary-foreground": "#282828",
  "--muted": "#504945",
  "--muted-foreground": "#a89984",
  "--accent": "#3c3836",
  "--accent-foreground": "#fe8019",
  "--destructive": "#fb4934",
  "--destructive-foreground": "#282828",
  "--border": "#504945",
  "--input": "#3c3836",
  "--ring": "#fe8019",
  "--chart-1": "#fe8019",
  "--chart-2": "#fb4934",
  "--chart-3": "#fabd2f",
  "--chart-4": "#b8bb26",
  "--chart-5": "#83a598",
  "--sidebar": "#32302f",
  "--sidebar-foreground": "#ebdbb2",
  "--sidebar-primary": "#fe8019",
  "--sidebar-primary-foreground": "#282828",
  "--sidebar-accent": "#3c3836",
  "--sidebar-accent-foreground": "#fe8019",
  "--sidebar-border": "#504945",
  "--sidebar-ring": "#fe8019",
};

// Tokyo Night.
const tokyoNight: Palette = {
  "--background": "#1a1b26",
  "--foreground": "#c0caf5",
  "--card": "#1f2335",
  "--card-foreground": "#c0caf5",
  "--popover": "#1f2335",
  "--popover-foreground": "#c0caf5",
  "--primary": "#7aa2f7",
  "--primary-foreground": "#1a1b26",
  "--secondary": "#bb9af7",
  "--secondary-foreground": "#1a1b26",
  "--muted": "#292e42",
  "--muted-foreground": "#51597d",
  "--accent": "#292e42",
  "--accent-foreground": "#7aa2f7",
  "--destructive": "#db4b4b",
  "--destructive-foreground": "#1a1b26",
  "--border": "#414868",
  "--input": "#292e42",
  "--ring": "#7aa2f7",
  "--chart-1": "#7aa2f7",
  "--chart-2": "#bb9af7",
  "--chart-3": "#7dcfff",
  "--chart-4": "#9ece6a",
  "--chart-5": "#ff9e64",
  "--sidebar": "#16161e",
  "--sidebar-foreground": "#c0caf5",
  "--sidebar-primary": "#7aa2f7",
  "--sidebar-primary-foreground": "#1a1b26",
  "--sidebar-accent": "#292e42",
  "--sidebar-accent-foreground": "#7aa2f7",
  "--sidebar-border": "#414868",
  "--sidebar-ring": "#7aa2f7",
};

export const THEMES: Record<ThemeId, Theme> = {
  mocha: {
    id: "mocha",
    label: "Catppuccin Mocha",
    swatch: ["#1e1e2e", "#cba6f7", "#a6e3a1", "#f38ba8"],
    wallpaper: "/wallpapers/gamer.png",
    vars: mocha,
  },
  gruvbox: {
    id: "gruvbox",
    label: "Gruvbox",
    swatch: ["#282828", "#fe8019", "#b8bb26", "#fb4934"],
    wallpaper: "/wallpapers/gruvbox.png",
    vars: gruvbox,
  },
  "tokyo-night": {
    id: "tokyo-night",
    label: "Tokyo Night",
    swatch: ["#1a1b26", "#7aa2f7", "#bb9af7", "#9ece6a"],
    wallpaper: "/wallpapers/tokyo-night.png",
    vars: tokyoNight,
  },
};

export const THEME_LIST: Theme[] = Object.values(THEMES);

export const DEFAULT_THEME: ThemeId = "mocha";

export function isThemeId(value: string | null): value is ThemeId {
  return value === "mocha" || value === "gruvbox" || value === "tokyo-night";
}

// Applies a theme by setting its CSS variables inline on <html>. Inline styles
// take precedence over the .dark class rules in globals.css.
export function applyTheme(id: ThemeId) {
  if (typeof document === "undefined") return;
  const theme = THEMES[id] ?? THEMES[DEFAULT_THEME];
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
}
