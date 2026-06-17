"use client";
import { useState, useEffect, useRef } from "react";
import StatusBar from "@/components/status-bar";
import { TerminalUI } from "@/components/terminal";
import FileManager from "@/components/file-manager";
import { WebPet } from "@/components/web-pet";
import { LoginManager } from "@/components/chatcn/system/login-manager";
import { ApplicationManager } from "@/components/chatcn/system/app-manager";
import Browser from "@/components/chatcn/system/browser";
import { useStore } from "@/store/useStore";
import {
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  IDockviewPanel,
  DockviewTheme,
} from "dockview";
import "dockview/dist/styles/dockview.css";

const customTheme: DockviewTheme = {
  name: "custom-theme",
  className: "dockview-theme-minimal",
  gap: 4,
};

const components = {
  terminal: () => {
    return (
      <div className="h-full w-full">
        <TerminalUI />
      </div>
    );
  },
  browser: (props: IDockviewPanelProps<{ url?: string }>) => {
    return (
      <div className="h-full w-full">
        <Browser defaultUrl={props.params?.url} />
      </div>
    );
  },
  "file-manager": () => {
    return (
      <div className="h-full w-full">
        <FileManager />
      </div>
    );
  },
};

export default function Page() {
  const [isLogin, setIsLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { apps, closeApp, wallpaper } = useStore();
  const apiRef = useRef<DockviewReadyEvent | null>(null);
  const panelRefs = useRef<Map<string, boolean>>(new Map());

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addPanelWithPosition = (
    api: DockviewReadyEvent["api"],
    id: string,
    component: string,
    title: string,
    params: Record<string, unknown>,
    referencePanel?: IDockviewPanel,
    defaultDirection?: "below" | "right",
  ) => {
    const position = referencePanel
      ? {
          referencePanel,
          direction: isMobile ? ("within" as const) : defaultDirection,
        }
      : undefined;

    api.addPanel({
      id,
      component,
      title,
      params,
      position,
    });
  };

  const onReady = (event: DockviewReadyEvent) => {
    apiRef.current = event;

    event.api.onDidRemovePanel((panel) => {
      const panelId = panel.id;
      const appType = panelId.replace("panel_", "") as
        | "terminal"
        | "browser"
        | "file-manager";

      if (
        appType === "terminal" ||
        appType === "browser" ||
        appType === "file-manager"
      ) {
        panelRefs.current.delete(appType);
        closeApp(appType);
      }
    });

    if (apps.terminal) {
      event.api.addPanel({
        id: "panel_terminal",
        component: "terminal",
        title: "Terminal",
        params: {},
      });
      panelRefs.current.set("terminal", true);
    }

    if (apps.browser) {
      const terminalPanel = event.api.getPanel("panel_terminal");
      addPanelWithPosition(
        event.api,
        "panel_browser",
        "browser",
        "Browser",
        { url: "https://www.google.com/webhp?igu=1" },
        terminalPanel,
        "below",
      );
      panelRefs.current.set("browser", true);
    }

    if (apps["file-manager"]) {
      const browserPanel = event.api.getPanel("panel_browser");
      const terminalPanel = event.api.getPanel("panel_terminal");
      const referencePanel = browserPanel || terminalPanel;

      addPanelWithPosition(
        event.api,
        "panel_file-manager",
        "file-manager",
        "File Manager",
        {},
        referencePanel,
        "right",
      );
      panelRefs.current.set("file-manager", true);
    }
  };

  useEffect(() => {
    if (!isLogin || !apiRef.current) return;

    const appTypes: Array<"terminal" | "browser" | "file-manager"> = [
      "terminal",
      "browser",
      "file-manager",
    ];

    appTypes.forEach((appType) => {
      const isOpen = apps[appType];
      const panelExists = panelRefs.current.get(appType);

      if (isOpen && !panelExists) {
        const panels = apiRef.current!.api.panels;
        const referencePanel = panels.length > 0 ? panels[0] : undefined;

        apiRef.current!.api.addPanel({
          id: `panel_${appType}`,
          component: appType,
          title:
            appType === "file-manager"
              ? "File Manager"
              : appType.charAt(0).toUpperCase() + appType.slice(1),
          params:
            appType === "browser"
              ? { url: "https://www.google.com/webhp?igu=1" }
              : {},
          position: referencePanel
            ? { referencePanel, direction: isMobile ? "center" : "right" }
            : undefined,
        });
        panelRefs.current.set(appType, true);
      } else if (!isOpen && panelExists) {
        // Remove panel
        const panel = apiRef.current!.api.getPanel(`panel_${appType}`);
        if (panel) {
          apiRef.current!.api.removePanel(panel);
          panelRefs.current.delete(appType);
        }
      }
    });
  }, [isLogin, apps, isMobile]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ApplicationManager />
      {!isLogin ? (
        <LoginManager
          portal={true}
          wallpaper={wallpaper}
          onLogin={() => setIsLogin(true)}
        />
      ) : (
        <>
          <div className="flex-none">
            <StatusBar />
          </div>

          <div className="flex-1 overflow-hidden p-2">
            <WebPet animal="cockatiel" color="brown" speed={4} scale={0.55} />
            <DockviewReact
              onReady={onReady}
              components={components}
              theme={customTheme}
              className="h-full w-full"
            />
          </div>
        </>
      )}
    </div>
  );
}
