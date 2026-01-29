"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  active?: boolean;
}

interface FinderLayoutProps {
  sidebarItems: SidebarItem[];
  children: React.ReactNode;
  title: string | React.ReactNode;
}

export const FinderLayout = ({
  sidebarItems,
  children,
  title,
}: FinderLayoutProps) => {
  // Separate items by category
  const favoriteItems = sidebarItems.filter(
    (item) => !["icloud", "trash"].includes(item.id)
  );
  const iCloudItems = sidebarItems.filter((item) => item.id === "icloud");
  const trashItems = sidebarItems.filter((item) => item.id === "trash");

  return (
    <div className="flex h-full w-full bg-white/95 dark:bg-[#1a1a1a]/95 text-black dark:text-white overflow-hidden rounded-lg backdrop-blur-sm border border-black/10 dark:border-white/10">
      {/* Sidebar - Fixed width with proper scroll handling */}
      <div className="w-56   bg-gray-50/80 dark:bg-[#2a2a2a]/80 backdrop-blur-md flex flex-col overflow-hidden border-r border-black/5 dark:border-white/5">
        {/* Favorites Section */}
        <div className="px-4 py-3 border-b border-black/5 dark:border-white/5">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Favorites
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-2">
          <div className="flex flex-col gap-0.5">
            {favoriteItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                  item.active
                    ? "bg-[#007AFF] text-white font-medium shadow-sm"
                    : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-800 dark:text-gray-300"
                }`}
              >
                <item.icon
                  size={16}
                  className={
                    item.active
                      ? "text-white"
                      : item.id === "trash"
                      ? "text-rose-500"
                      : "text-blue-500"
                  }
                />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* iCloud Section */}
          {iCloudItems.length > 0 && (
            <>
              <div className="px-4 pt-6 pb-2 mt-2 border-t border-black/5 dark:border-white/5">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  iCloud
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                {iCloudItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-black/5 dark:hover:bg-white/5 text-gray-800 dark:text-gray-300 transition-all duration-200"
                  >
                    <item.icon size={16} className="text-blue-500" />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Trash Section - Fixed positioning at bottom */}
          {trashItems.length > 0 && (
            <>
              <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                <div className="flex flex-col gap-0.5">
                  {trashItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                        item.active
                          ? "bg-[#007AFF] text-white font-medium shadow-sm"
                          : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-800 dark:text-gray-300"
                      }`}
                    >
                      <item.icon
                        size={16}
                        className={item.active ? "text-white" : "text-rose-500"}
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#2a2a2a]/50 backdrop-blur-sm px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-linear-to-b from-white/30 to-transparent dark:from-black/30 dark:to-transparent">
          {children}
        </div>
      </div>
    </div>
  );
};
