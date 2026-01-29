"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { useStore, WindowState } from "@/store/useStore";
import { X, Minus, Maximize2, ChevronUp } from "lucide-react";

interface WindowProps {
  window: WindowState;
}

export const Window = ({ window: windowState }: WindowProps) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } =
    useStore();
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  // Get screen size on mount and resize
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Handle click outside to close the window
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(e.target as Node) &&
        windowState.isOpen &&
        !windowState.isMinimized &&
        windowState.zIndex === 50 // Only close the topmost window
      ) {
        closeWindow(windowState.id);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [
    windowState.id,
    windowState.isOpen,
    windowState.isMinimized,
    windowState.zIndex,
    closeWindow,
  ]);

  // Handle title bar drag with constraints
  const handleTitleBarPointerDown = (e: React.PointerEvent) => {
    if (!windowState.isMaximized) {
      dragControls.start(e);
      focusWindow(windowState.id);
    }
  };

  // Window dimensions
  const NORMAL_WIDTH = Math.min(1200, screenSize.width - 80);
  const NORMAL_HEIGHT = Math.min(800, screenSize.height - 120);

  // When maximized: full screen
  const MAXIMIZED_WIDTH = screenSize.width;
  const MAXIMIZED_HEIGHT = screenSize.height;

  // Calculate window position when not maximized
  const getWindowPosition = () => {
    if (windowState.isMaximized) {
      // Start at top-left corner with NO left space
      return { x: 0, y: 0 };
    }

    // Center the window
    return {
      x: (screenSize.width - NORMAL_WIDTH) / 2,
      y: Math.max(40, (screenSize.height - NORMAL_HEIGHT) / 2 - 50),
    };
  };

  const position = getWindowPosition();

  // If window is minimized, render the minimized bar
  if (windowState.isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
        onClick={(e) => {
          e.stopPropagation();
          minimizeWindow(windowState.id);
        }}
      >
        <div className="bg-gray-800/90 backdrop-blur-md rounded-lg px-6 py-3 flex items-center gap-4 shadow-lg border border-white/10 cursor-pointer hover:bg-gray-700/90 transition-colors group min-w-[200px]">
          <span className="text-sm font-medium text-white/90">
            {windowState.title}
          </span>
          <ChevronUp
            size={18}
            className="text-white/60 group-hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(windowState.id);
            }}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={windowRef}
      drag={!windowState.isMaximized}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        top: 0,
        left: 0,
        right: Math.max(0, screenSize.width - NORMAL_WIDTH - 20),
        bottom: Math.max(0, screenSize.height - NORMAL_HEIGHT - 20),
      }}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: windowState.isMaximized ? position.x : position.x,
        y: windowState.isMaximized ? position.y : position.y,
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`fixed overflow-hidden shadow-2xl border border-white/20 bg-white/80 dark:bg-black/80 backdrop-blur-xl ${
        windowState.isMaximized ? "rounded-none border-0" : "rounded-xl"
      }`}
      style={{
        zIndex: windowState.zIndex,
        width: windowState.isMaximized ? MAXIMIZED_WIDTH : NORMAL_WIDTH,
        height: windowState.isMaximized ? MAXIMIZED_HEIGHT : NORMAL_HEIGHT,
        minWidth: windowState.isMaximized ? MAXIMIZED_WIDTH : 400,
        minHeight: windowState.isMaximized ? MAXIMIZED_HEIGHT : 400,
        left: windowState.isMaximized ? "0" : "auto",
      }}
      onClick={() => focusWindow(windowState.id)}
    >
      {/* Title Bar */}
      <div
        className={`h-10 flex items-center px-5 justify-between cursor-move select-none ${
          windowState.isMaximized
            ? "bg-gradient-to-b from-white/40 to-white/20 dark:from-black/40 dark:to-black/20 border-b border-white/30"
            : "bg-gradient-to-b from-white/25 to-white/10 dark:from-black/25 dark:to-black/10 border-b border-white/20"
        }`}
        onPointerDown={handleTitleBarPointerDown}
      >
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(windowState.id);
            }}
            className="relative w-4 h-4 rounded-full bg-[#FF5F57] hover:bg-[#FF3B30] transition-colors flex items-center justify-center group"
            aria-label="Close window"
            title="Close"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FF5F57] to-[#E0443E]" />
            <X
              size={10}
              className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity text-white"
              strokeWidth={3}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(windowState.id);
            }}
            className="relative w-4 h-4 rounded-full bg-[#FEBC2E] hover:bg-[#FD9A00] transition-colors flex items-center justify-center group"
            aria-label="Minimize window"
            title="Minimize"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FEBC2E] to-[#D39E1F]" />
            <Minus
              size={10}
              className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity text-white"
              strokeWidth={3}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(windowState.id);
            }}
            className="relative w-4 h-4 rounded-full bg-[#28C840] hover:bg-[#1DA732] transition-colors flex items-center justify-center group"
            aria-label={
              windowState.isMaximized ? "Restore window" : "Maximize window"
            }
            title={windowState.isMaximized ? "Restore" : "Maximize"}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#28C840] to-[#1AAB29]" />
            <Maximize2
              size={8}
              className={`relative z-10 opacity-0 group-hover:opacity-100 transition-opacity text-white ${
                windowState.isMaximized ? "rotate-45" : ""
              }`}
              strokeWidth={3}
            />
          </button>
        </div>
        <span className="text-base font-medium text-gray-900 dark:text-gray-100 truncate px-6">
          {windowState.title}
        </span>
        <div className="w-16" /> {/* Spacer for symmetry */}
      </div>

      {/* Content - fills remaining space */}
      <div
        className="h-[calc(100%-55px)] overflow-auto"
        style={{
          padding: windowState.isMaximized ? "2rem" : "2rem",
          background: windowState.isMaximized
            ? "linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.2))"
            : "linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.2))",
        }}
        onClick={(e) => {
          e.stopPropagation();
          focusWindow(windowState.id);
        }}
      >
        <div className="h-full">{windowState.component}</div>
      </div>
    </motion.div>
  );
};
