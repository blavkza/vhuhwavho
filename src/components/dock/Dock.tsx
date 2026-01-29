"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useStore, WindowState } from "@/store/useStore";
import Image from "next/image";
import { FinderApp } from "@/apps/FinderApp";
import { GalleryApp } from "@/apps/GalleryApp";
import { ContactApp } from "@/apps/ContactApp";
import { ProjectsApp } from "@/apps/ProjectsApp";
import { TerminalApp } from "@/apps/TerminalApp";
import { X, ChevronUp } from "lucide-react";

export const Dock = () => {
  const mouseX = useMotionValue(Infinity);
  const { openWindow, windows, minimizeWindow, closeWindow } = useStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = (windowData: WindowState) => {
    console.log("Opening window:", windowData.title);
    openWindow(windowData);
  };

  if (!mounted) return null;

  // Get minimized windows
  const minimizedWindows = windows.filter((w) => w.isOpen && w.isMinimized);

  const DOCK_ITEMS = [
    {
      id: "finder",
      label: "Finder",
      iconSrc: "/icons/finder.png",
      action: () =>
        handleOpen({
          id: "finder",
          title: "Finder",
          component: <FinderApp />,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 50,
        }),
    },
    {
      id: "terminal",
      label: "Terminal",
      iconSrc: "/icons/terminal.png",
      action: () =>
        handleOpen({
          id: "terminal",
          title: "Terminal",
          component: <TerminalApp />,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 50,
        }),
    },
    {
      id: "projects",
      label: "Projects",
      iconSrc: "/icons/folder.png",
      action: () =>
        handleOpen({
          id: "projects",
          title: "Projects",
          component: <ProjectsApp />,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 50,
        }),
    },
    {
      id: "contact",
      label: "Contact",
      iconSrc: "/icons/contacts.png",
      action: () =>
        handleOpen({
          id: "contact",
          title: "Contact Me",
          component: <ContactApp />,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 50,
        }),
    },
    {
      id: "gallery",
      label: "Photos",
      iconSrc: "/icons/photos.png",
      action: () =>
        handleOpen({
          id: "gallery",
          title: "Photos",
          component: <GalleryApp />,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 50,
        }),
    },
    {
      id: "safari",
      label: "Safari",
      iconSrc: "/icons/safari.png",
      action: () =>
        handleOpen({
          id: "safari",
          title: "Safari",
          component: (
            <div className="p-6 h-full">
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Safari Browser</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  This would be a browser component in a real implementation.
                </p>
              </div>
            </div>
          ),
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 50,
        }),
    },
  ];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 h-16 px-4 pb-2 flex items-end gap-4 rounded-3xl bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.3)] z-50"
    >
      {/* Main dock items */}
      {DOCK_ITEMS.map((item) => (
        <DockItem key={item.id} mouseX={mouseX} item={item} />
      ))}

      {/* Separator before trash (if we have minimized windows OR main items) */}
      {(minimizedWindows.length > 0 || DOCK_ITEMS.length > 0) && (
        <div className="w-px h-8 bg-white/10 mx-1 mb-2  " />
      )}

      {/* Trash can */}
      <DockItem
        mouseX={mouseX}
        item={{
          id: "trash",
          label: "Trash",
          iconSrc: "/icons/trash.png",
          action: () =>
            handleOpen({
              id: "trash-bin",
              title: "Trash",
              component: <FinderApp initialPath="trash" />,
              isOpen: true,
              isMinimized: false,
              isMaximized: false,
              zIndex: 50,
            }),
        }}
      />
      {/* Minimized windows */}
      {minimizedWindows.map((window) => (
        <MinimizedWindowItem
          key={window.id}
          mouseX={mouseX}
          window={window}
          onRestore={() => {
            console.log("Restoring window:", window.title);
            minimizeWindow(window.id); // This should toggle minimized state
          }}
          onClose={() => {
            console.log("Closing window:", window.title);
            closeWindow(window.id);
          }}
        />
      ))}
    </motion.div>
  );
};

const DockItem = ({ mouseX, item }: { mouseX: MotionValue; item: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-xl flex items-center justify-center relative group cursor-pointer transition-colors hover:bg-white/10 active:scale-95"
      onClick={item.action}
    >
      <div className="text-white relative w-full h-full">
        <Image
          src={item.iconSrc}
          alt={item.label}
          fill
          sizes="(max-width: 768px) 40px, 80px"
          className="object-cover rounded-lg"
          quality={90}
        />
      </div>
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-md border border-white/10">
        {item.label}
      </div>
    </motion.div>
  );
};

const MinimizedWindowItem = ({
  mouseX,
  window,
  onRestore,
  onClose,
}: {
  mouseX: MotionValue;
  window: WindowState;
  onRestore: () => void;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const getWindowIcon = (title: string) => {
    // Map window titles to icon paths
    const iconMap: Record<string, string> = {
      Finder: "/icons/finder.png",
      Terminal: "/icons/terminal.png",
      Projects: "/icons/folder.png",
      Contact: "/icons/contacts.png",
      Photos: "/icons/photos.png",
      Trash: "/icons/trash.png",
      "About Me": "/icons/finder.png",
      "Resume.pdf": "/icons/folder.png",
      "Contact Me": "/icons/contacts.png",
      Safari: "/icons/safari.png",
    };

    return iconMap[title] || "/icons/finder.png";
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-xl flex items-center justify-center relative group cursor-pointer transition-all hover:bg-white/10 active:scale-95"
      onClick={onRestore}
    >
      {/* Dimmed background icon */}
      <div className="absolute inset-0 rounded-xl bg-white/5 backdrop-blur-sm" />

      {/* Window icon */}
      <div className="relative w-3/4 h-3/4">
        <Image
          src={getWindowIcon(window.title)}
          alt={window.title}
          fill
          sizes="(max-width: 768px) 30px, 45px"
          className="object-contain rounded-md opacity-90"
          quality={90}
        />
      </div>

      {/* Restore indicator (small chevron) */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
        <ChevronUp size={10} className="text-white" />
      </div>

      {/* Tooltip with close option */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto whitespace-nowrap backdrop-blur-md border border-white/10 flex items-center gap-3 z-50">
        <span className="font-medium">{window.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log("Closing from tooltip:", window.title);
            onClose();
          }}
          className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors"
          title="Close window"
        >
          <X size={8} className="text-white" />
        </button>
      </div>
    </motion.div>
  );
};
