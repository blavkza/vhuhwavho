"use client";

import React, { useState, useRef, useEffect } from "react";
import { FileSystemItem, useStore } from "@/store/useStore";
import { Dock } from "@/components/dock/Dock";
import { TopBar } from "@/components/system/TopBar";
import { Window } from "@/components/window/Window";
import { AnimatePresence } from "framer-motion";
import { Spotlight } from "@/components/system/Spotlight";
import { ControlCenter } from "@/components/system/ControlCenter";
import { WallpaperSelector } from "@/components/system/WallpaperSelector";
import { Widget } from "@/components/widgets/Widget";
import { DesktopIcon } from "@/components/desktop/DesktopIcon";
import { FinderApp } from "@/apps/FinderApp";
import { ProjectsApp, projects } from "@/apps/ProjectsApp";
import { ContactApp } from "@/apps/ContactApp";
import { AboutApp } from "@/apps/AboutApp";
import { NotificationCenter } from "@/components/system/NotificationCenter";
import { SingleProjectApp } from "@/apps/SingleProjectApp"; // Import SingleProjectApp

export const Desktop = () => {
  const {
    wallpaper,
    windows,
    fileSystem,
    widgets,
    openWindow,
    addNotification,
    updateItemPosition,
  } = useStore();
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] =
    useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isDockVisible, setIsDockVisible] = useState(false);
  const dockHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Handle window resize
  React.useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Welcome Notification
  React.useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        title: "Welcome to my Portfolio!",
        message:
          "Feel free to explore the apps, check out my projects, and customize the wallpaper.",
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle mouse movement for dock visibility
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseY = e.clientY;
      const windowHeight = window.innerHeight;
      const distanceFromBottom = windowHeight - mouseY;

      const isNearBottom = distanceFromBottom <= 50;
      const anyWindowOpen = windows.some((w) => w.isOpen && !w.isMinimized);

      if (isNearBottom && anyWindowOpen) {
        if (dockHoverTimeoutRef.current) {
          clearTimeout(dockHoverTimeoutRef.current);
        }

        setIsDockVisible(true);

        dockHoverTimeoutRef.current = setTimeout(() => {
          setIsDockVisible(false);
        }, 3000);
      } else {
        if (dockHoverTimeoutRef.current) {
          clearTimeout(dockHoverTimeoutRef.current);
        }
        dockHoverTimeoutRef.current = setTimeout(() => {
          setIsDockVisible(false);
        }, 500);
      }
    };

    const handleMouseLeave = () => {
      if (dockHoverTimeoutRef.current) {
        clearTimeout(dockHoverTimeoutRef.current);
      }
      setIsDockVisible(false);
    };

    const desktopElement = desktopRef.current;
    if (desktopElement) {
      desktopElement.addEventListener("mousemove", handleMouseMove);
      desktopElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (desktopElement) {
        desktopElement.removeEventListener("mousemove", handleMouseMove);
        desktopElement.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (dockHoverTimeoutRef.current) {
        clearTimeout(dockHoverTimeoutRef.current);
      }
    };
  }, [windows]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (dockHoverTimeoutRef.current) {
        clearTimeout(dockHoverTimeoutRef.current);
      }
    };
  }, []);

  const desktopItems = fileSystem.filter((item) => item.parentId === "desktop");

  const handleOpenItem = (item: FileSystemItem) => {
    if (item.type === "folder") {
      // Map folder IDs to project titles
      const folderToProjectMap: Record<string, string> = {
        "biz-flow": "Biz Flow",
        "auto-engage": "Auto Engage",
        "rethynk-ai": "Rethynk AI",
        "portfolio-os": "Portfolio OS (This Site)",
        "first-school": "First School",
        tsholofelo: "Tsholofelo Funeral Website",
      };

      const projectTitle = folderToProjectMap[item.id];

      if (projectTitle) {
        // Find the project data
        const project = projects.find((p) => p.title === projectTitle);

        if (project) {
          // Open single project app
          openWindow({
            id: `project-${item.id}`,
            title: project.title,
            component: <SingleProjectApp project={project} />,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: 50,
          });
        } else {
          // Fallback to Finder
          openWindow({
            id: `finder-${item.id}`,
            title: item.name,
            component: <FinderApp initialPath={item.id} />,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: 50,
          });
        }
      } else {
        // Regular folder - open Finder
        openWindow({
          id: `finder-${item.id}`,
          title: item.name,
          component: <FinderApp initialPath={item.id} />,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 50,
        });
      }
    } else if (item.type === "file") {
      // Handle file clicks (like Resume.pdf)
      if (item.name === "Resume.pdf") {
        openWindow({
          id: "resume",
          title: "Resume.pdf",
          component: (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-800">
              <div className="w-[595px] h-[842px] bg-white shadow-xl p-10 flex flex-col gap-4">
                <h1 className="text-4xl font-bold">
                  Nekhofhe Vhuhwavho's Resume
                </h1>
                <hr />
                <p>Senior Full Stack Developer</p>
                <p>Experience with React, Next.js, Node.js...</p>
                <div className="mt-auto text-center text-sm text-gray-400">
                  Page 1 of 1
                </div>
              </div>
            </div>
          ),
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 50,
        });
      }
    }
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    updateItemPosition(id, { x, y });
  };

  // Check if any windows are open
  const anyWindowOpen = windows.some((w) => w.isOpen && !w.isMinimized);

  return (
    <div
      ref={desktopRef}
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center transition-all duration-500 font-sans"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {/* Overlay for better contrast if needed */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Top Bar */}
      <TopBar
        onToggleControlCenter={() =>
          setIsControlCenterOpen(!isControlCenterOpen)
        }
        onOpenWallpaperSelector={() => setIsWallpaperSelectorOpen(true)}
        onOpenProjects={() =>
          openWindow({
            id: "projects",
            title: "Projects",
            component: <ProjectsApp />,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: 50,
          })
        }
        onOpenContact={() =>
          openWindow({
            id: "contact",
            title: "Contact",
            component: <ContactApp />,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: 50,
          })
        }
        onOpenResume={() =>
          openWindow({
            id: "resume",
            title: "Resume.pdf",
            component: (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-800">
                <div className="w-[595px] h-[842px] bg-white shadow-xl p-10 flex flex-col gap-4">
                  <h1 className="text-4xl font-bold">
                    Nekhofhe Vhuhwavho's Resume
                  </h1>
                  <hr />
                  <p>Senior Full Stack Developer</p>
                  <p>Experience with React, Next.js, Node.js...</p>
                  <div className="mt-auto text-center text-sm text-gray-400">
                    Page 1 of 1
                  </div>
                </div>
              </div>
            ),
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: 50,
          })
        }
        onToggleNotificationCenter={() =>
          setIsNotificationCenterOpen(!isNotificationCenterOpen)
        }
        onOpenAbout={() =>
          openWindow({
            id: "about-me",
            title: "About Me",
            component: <AboutApp />,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: 50,
          })
        }
      />

      {/* System Overlays */}
      <Spotlight />
      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
      />
      <WallpaperSelector
        isOpen={isWallpaperSelectorOpen}
        onClose={() => setIsWallpaperSelectorOpen(false)}
      />
      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
      />

      {/* Desktop Content */}
      <div className="absolute inset-0 pt-10 pb-24 px-4 flex">
        {/* Centered Welcome Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 text-white drop-shadow-lg">
          <h2 className="text-2xl font-light opacity-90 mb-2">
            Hey, I'm Nekhofhe Vhuhwavho welcome to my
          </h2>
          <h1 className="text-8xl font-bold tracking-tight">portfolio.</h1>
        </div>

        {/* Widgets Layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {widgets.map((widget) => (
            <Widget
              key={`${widget.id}-${widget.position.x}-${widget.position.y}`}
              widget={widget}
            />
          ))}
        </div>

        {/* Desktop Icons Grid */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {desktopItems.map((item, index) => {
            let x = item.position?.x;
            let y = item.position?.y;

            if (x === undefined || y === undefined) {
              if (windowSize.width === 0) return null;
              x = windowSize.width - 120;
              y = 60 + index * 110;
            }

            return (
              <div
                key={`${item.id}-${x}-${y}`}
                className="absolute pointer-events-auto"
                style={{
                  left: x,
                  top: y,
                }}
              >
                <DesktopIcon
                  item={{ ...item, position: { x, y } }}
                  onOpen={handleOpenItem}
                  onDragEnd={handleDragEnd}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Window Area */}
      <div className="relative w-full h-full pt-8 pb-24 px-4 pointer-events-none z-10">
        <AnimatePresence>
          {windows.map(
            (window) =>
              window.isOpen &&
              !window.isMinimized && (
                <div key={window.id} className="pointer-events-auto">
                  <Window window={window} />
                </div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Dock - Only show when no windows are open OR when user hovers at bottom */}
      {(anyWindowOpen ? isDockVisible : true) && <Dock />}
    </div>
  );
};
