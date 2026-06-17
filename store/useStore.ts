import { create } from 'zustand';
import { DEFAULT_THEME, THEMES, isThemeId, type ThemeId } from '@/lib/themes';

export type AppType = 'terminal' | 'browser' | 'file-manager' | 'login-manager' | 'settings';

const DEFAULT_WALLPAPER = '/wallpapers/gamer.png';

function getInitialTheme(): ThemeId {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (isThemeId(stored)) return stored;
  }
  return DEFAULT_THEME;
}

// The wallpaper follows the theme unless the user explicitly picked one.
function getInitialWallpaper(theme: ThemeId): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('wallpaper');
    if (saved) return saved;
  }
  return THEMES[theme].wallpaper ?? DEFAULT_WALLPAPER;
}

interface AppState {
  [key: string]: boolean;
}

interface StoreState {
  apps: AppState;
  wallpaper: string;
  brightness: number;
  theme: ThemeId;
  openApp: (app: AppType) => void;
  closeApp: (app: AppType) => void;
  toggleApp: (app: AppType) => void;
  isAppOpen: (app: AppType) => boolean;
  setWallpaper: (wallpaper: string) => void;
  setBrightness: (brightness: number) => void;
  setTheme: (theme: ThemeId) => void;
}

export const useStore = create<StoreState>()((set, get) => ({
  apps: {
    terminal: true,
    browser: false,
    'file-manager': true,
    'login-manager': true,
  },
  brightness: typeof window !== 'undefined'
    ? parseInt(localStorage.getItem('brightness') || '100', 10)
    : 100,
  theme: getInitialTheme(),
  wallpaper: getInitialWallpaper(getInitialTheme()),

  openApp: (app) =>
    set((state) => ({
      apps: { ...state.apps, [app]: true },
    })),
  
  closeApp: (app) =>
    set((state) => ({
      apps: { ...state.apps, [app]: false },
    })),
  
  toggleApp: (app) =>
    set((state) => ({
      apps: { ...state.apps, [app]: !state.apps[app] },
    })),
  
  isAppOpen: (app) => get().apps[app] || false,
  
  setWallpaper: (wallpaper) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wallpaper', wallpaper);
    }
    set({ wallpaper });
  },
  
  setBrightness: (brightness) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('brightness', brightness.toString());
    }
    set({ brightness });
  },

  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    set({ theme });
    // Switching theme also switches to its matching wallpaper.
    const wallpaper = THEMES[theme].wallpaper;
    if (wallpaper) {
      get().setWallpaper(wallpaper);
    }
  },
}));
