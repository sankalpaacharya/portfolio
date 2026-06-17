"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { applyTheme } from "@/lib/themes";

// Keeps the live CSS variables in sync with the selected color theme.
export function ThemeManager() {
  const theme = useStore((s) => s.theme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return null;
}
