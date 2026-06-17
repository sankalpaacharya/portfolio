import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { useState, useEffect } from "react";

export function SettingsContent() {
  const { wallpaper, setWallpaper } = useStore();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const wallpapers: Record<string, string> = {
    voyager: "/wallpapers/voyager.jpg",
    gamer: "/wallpapers/gamer.png",
    battle: "/wallpapers/battle.png",
    dark: "/wallpapers/dark.png",
    arcade: "/wallpapers/arcade.png",
    "tokyo night": "/wallpapers/tokyo-night.png",
    gruvbox: "/wallpapers/gruvbox.png",
  };

  const totalImages = Object.keys(wallpapers).length;

  useEffect(() => {
    setLoadedImages(new Set());
    setIsLoading(true);
  }, []);

  const handleImageLoad = (imageName: string) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(imageName);

      if (newSet.size === totalImages) {
        setIsLoading(false);
      }

      return newSet;
    });
  };

  return (
    <div className="p-3 sm:p-4">
      {isLoading && (
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Loading wallpapers... ({loadedImages.size}/{totalImages})
            </p>
          </div>
        </div>
      )}
      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4",
          isLoading && "hidden",
        )}
      >
        {Object.keys(wallpapers).map((item) => (
          <div
            key={item}
            className={`cursor-pointer transition-all`}
            onClick={() => setWallpaper(wallpapers[item])}
          >
            <img
              src={wallpapers[item]}
              alt={`${item} wallpaper`}
              decoding="async"
              onLoad={() => handleImageLoad(item)}
              onError={() => handleImageLoad(item)}
              className={cn(
                "w-full aspect-video object-cover border rounded-lg",

                wallpaper === wallpapers[item]
                  ? "ring-2 sm:ring-4 ring-blue-500 ring-offset-1 sm:ring-offset-2 ring-offset-background"
                  : "hover:ring-2 hover:ring-gray-400",
              )}
            />
            <p className="text-center mt-1 sm:mt-2 text-xs sm:text-sm capitalize">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
