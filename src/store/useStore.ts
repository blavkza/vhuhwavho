import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import React from "react";

export interface WindowState {
  id: string;
  title: string;
  component: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface FileSystemItem {
  id: string;
  parentId: string | null;
  name: string;
  type: "folder" | "file";
  position?: { x: number; y: number };
  content?: string;
}

export interface Widget {
  id: string;
  type: "clock" | "weather" | "calendar";
  position: { x: number; y: number };
}

export interface Notification {
  id?: string;
  title: string;
  message: string;
  timestamp?: Date;
}

interface StoreState {
  wallpaper: string;
  theme: "light" | "dark";
  windows: WindowState[];
  activeWindowId: string | null;
  notifications: Notification[];
  fileSystem: FileSystemItem[];
  widgets: Widget[];

  setWallpaper: (url: string) => void;
  setTheme: (theme: "light" | "dark") => void;
  openWindow: (window: WindowState) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  updateItemPosition: (id: string, pos: { x: number; y: number }) => void;
  updateWidgetPosition: (id: string, pos: { x: number; y: number }) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      wallpaper:
        "https://images.unsplash.com/photo-1696429175928-793a1cdef1d3?q=80&w=3840&auto=format&fit=crop",
      theme: "dark",
      windows: [],
      activeWindowId: null,
      notifications: [],
      fileSystem: [
        { id: "desktop", parentId: null, name: "Desktop", type: "folder" },
        { id: "documents", parentId: null, name: "Documents", type: "folder" },
        { id: "downloads", parentId: null, name: "Downloads", type: "folder" },

        // Desktop Items - Your Actual Projects
        {
          id: "biz-flow",
          parentId: "desktop",
          name: "Biz Flow",
          type: "folder",
          position: { x: 1300, y: 50 },
        },
        {
          id: "auto-engage",
          parentId: "desktop",
          name: "Auto Engage",
          type: "folder",
          position: { x: 1300, y: 150 },
        },

        {
          id: "first-school",
          parentId: "desktop",
          name: "First School",
          type: "folder",
          position: { x: 1300, y: 250 },
        },

        // Files inside Biz Flow Project
        {
          id: "biz-flow-readme",
          parentId: "biz-flow",
          name: "README.md",
          type: "file",
        },
        {
          id: "biz-flow-app",
          parentId: "biz-flow",
          name: "app.tsx",
          type: "file",
        },
        {
          id: "biz-flow-styles",
          parentId: "biz-flow",
          name: "styles.css",
          type: "file",
        },

        // Files inside Auto Engage Project
        {
          id: "auto-engage-main",
          parentId: "auto-engage",
          name: "main.py",
          type: "file",
        },
        {
          id: "auto-engage-model",
          parentId: "auto-engage",
          name: "model.pkl",
          type: "file",
        },

        // Files inside Rethynk AI
        {
          id: "rethynk-index",
          parentId: "rethynk-ai",
          name: "index.html",
          type: "file",
        },

        // Documents folder items
        {
          id: "resume",
          parentId: "documents",
          name: "Resume.pdf",
          type: "file",
        },
        {
          id: "cover-letter",
          parentId: "documents",
          name: "Cover Letter.pdf",
          type: "file",
        },
        {
          id: "certificates",
          parentId: "documents",
          name: "Certificates",
          type: "folder",
        },

        // Downloads folder items
        {
          id: "project-assets",
          parentId: "downloads",
          name: "Project Assets",
          type: "folder",
        },
        {
          id: "design-mockups",
          parentId: "downloads",
          name: "Design Mockups",
          type: "folder",
        },

        // Trash
        { id: "trash", parentId: null, name: "Trash", type: "folder" },
      ],
      widgets: [
        { id: "clock-1", type: "clock", position: { x: 50, y: 50 } },
        { id: "weather-1", type: "weather", position: { x: 50, y: 250 } },
        { id: "calendar-1", type: "calendar", position: { x: 50, y: 450 } },
      ],

      setWallpaper: (wallpaper) => set({ wallpaper }),
      setTheme: (theme) => set({ theme }),

      openWindow: (window) =>
        set((state) => {
          const existing = state.windows.find((w) => w.id === window.id);
          if (existing) {
            return {
              windows: state.windows.map((w) =>
                w.id === window.id
                  ? { ...w, isMinimized: false, zIndex: 50 }
                  : { ...w, zIndex: 1 }
              ),
              activeWindowId: window.id,
            };
          }
          return {
            windows: [...state.windows, { ...window, zIndex: 50 }],
            activeWindowId: window.id,
          };
        }),

      closeWindow: (id) =>
        set((state) => ({
          windows: state.windows.filter((w) => w.id !== id),
          activeWindowId: null,
        })),

      minimizeWindow: (id) =>
        set((state) => {
          const window = state.windows.find((w) => w.id === id);
          if (!window) return state;

          const isCurrentlyMinimized = window.isMinimized;

          return {
            windows: state.windows.map((w) =>
              w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
            ),
            activeWindowId: isCurrentlyMinimized ? id : null,
          };
        }),

      maximizeWindow: (id) =>
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
          ),
        })),

      focusWindow: (id) =>
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, zIndex: 50 }
              : { ...w, zIndex: w.zIndex > 1 ? w.zIndex - 1 : 1 }
          ),
          activeWindowId: id,
        })),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: Math.random().toString(36).substring(7),
              timestamp: new Date(),
            },
            ...state.notifications,
          ],
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),

      updateItemPosition: (id, position) =>
        set((state) => ({
          fileSystem: state.fileSystem.map((item) =>
            item.id === id ? { ...item, position } : item
          ),
        })),

      updateWidgetPosition: (id, position) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, position } : widget
          ),
        })),
    }),
    {
      name: "macos-portfolio-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        wallpaper: state.wallpaper,
        theme: state.theme,
        fileSystem: state.fileSystem,
        widgets: state.widgets,
      }),
    }
  )
);
