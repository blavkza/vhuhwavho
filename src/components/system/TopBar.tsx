"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Wifi,
  Battery,
  Search,
  Command,
  Settings,
  Bell,
  Sun,
  Moon,
} from "lucide-react";
import { useStore } from "@/store/useStore";

export const TopBar = ({
  onToggleControlCenter,
  onOpenWallpaperSelector,
  onOpenProjects,
  onOpenContact,
  onOpenResume,
  onToggleNotificationCenter,
  onOpenAbout,
}: {
  onToggleControlCenter: () => void;
  onOpenWallpaperSelector: () => void;
  onOpenProjects: () => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
  onToggleNotificationCenter: () => void;
  onOpenAbout: () => void;
}) => {
  const [time, setTime] = useState<Date | null>(null);
  const [batteryLevel, setBatteryLevel] = useState(87);
  const [wifiStrength, setWifiStrength] = useState(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme, notifications } = useStore();

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Mock battery simulation
  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(10, (prev - 0.1) % 100));
    }, 60000); // Decrease 0.1% per minute
    return () => clearInterval(batteryInterval);
  }, []);

  // Mock wifi strength changes
  useEffect(() => {
    const wifiInterval = setInterval(() => {
      setWifiStrength((prev) => {
        const random = Math.random();
        if (random < 0.1) return Math.max(1, prev - 1);
        if (random > 0.9) return Math.min(4, prev + 1);
        return prev;
      });
    }, 10000);
    return () => clearInterval(wifiInterval);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Open relevant windows based on search
      const normalizedQuery = query.toLowerCase().trim();

      if (
        normalizedQuery.includes("project") ||
        normalizedQuery.includes("work")
      ) {
        onOpenProjects();
      } else if (
        normalizedQuery.includes("contact") ||
        normalizedQuery.includes("email")
      ) {
        onOpenContact();
      } else if (
        normalizedQuery.includes("resume") ||
        normalizedQuery.includes("cv")
      ) {
        onOpenResume();
      } else if (
        normalizedQuery.includes("about") ||
        normalizedQuery.includes("me")
      ) {
        onOpenAbout();
      } else if (
        normalizedQuery.includes("finder") ||
        normalizedQuery.includes("files")
      ) {
        // You could open finder here
      } else if (normalizedQuery.includes("terminal")) {
        // You could open terminal here
      }
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleCommandPalette = () => {
    setIsCommandOpen(!isCommandOpen);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSearch(searchQuery);
    } else if (e.key === "Escape") {
      setIsSearchOpen(false);
      setIsCommandOpen(false);
      setSearchQuery("");
    }
  };

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getBatteryIcon = () => {
    if (batteryLevel >= 80) return "🟢";
    if (batteryLevel >= 50) return "🟡";
    if (batteryLevel >= 20) return "🟠";
    return "🔴";
  };

  const getWifiIcon = () => {
    switch (wifiStrength) {
      case 1:
        return "📶";
      case 2:
        return "📶📶";
      case 3:
        return "📶📶📶";
      case 4:
        return "📶📶📶📶";
      default:
        return "📶";
    }
  };

  if (!time)
    return (
      <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-xl z-50" />
    );

  const menuItems = [
    {
      label: "File",
      submenu: [
        { label: "New Window", shortcut: "⌘N", action: () => {} },
        { label: "New Tab", shortcut: "⌘T", action: () => {} },
        { type: "separator" },
        { label: "Close Window", shortcut: "⌘W", action: () => {} },
        { label: "Close Tab", shortcut: "⌘W", action: () => {} },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", shortcut: "⌘Z", action: () => {} },
        { label: "Redo", shortcut: "⇧⌘Z", action: () => {} },
        { type: "separator" },
        { label: "Cut", shortcut: "⌘X", action: () => {} },
        { label: "Copy", shortcut: "⌘C", action: () => {} },
        { label: "Paste", shortcut: "⌘V", action: () => {} },
      ],
    },
    {
      label: "View",
      submenu: [
        { label: "Zoom In", shortcut: "⌘+", action: () => {} },
        { label: "Zoom Out", shortcut: "⌘-", action: () => {} },
        { label: "Actual Size", shortcut: "⌘0", action: () => {} },
        { type: "separator" },
        { label: "Toggle Full Screen", shortcut: "⌃⌘F", action: () => {} },
      ],
    },
    {
      label: "Go",
      submenu: [
        { label: "Back", shortcut: "⌘[", action: () => {} },
        { label: "Forward", shortcut: "⌘]", action: () => {} },
        { type: "separator" },
        { label: "Home", action: () => {} },
        { label: "Desktop", action: () => {} },
        { label: "Documents", action: () => {} },
        { label: "Downloads", action: () => {} },
      ],
    },
    {
      label: "Window",
      submenu: [
        { label: "Minimize", shortcut: "⌘M", action: () => {} },
        { label: "Zoom", action: () => {} },
        { type: "separator" },
        { label: "Bring All to Front", action: () => {} },
        { label: "Cycle Through Windows", shortcut: "⌘`", action: () => {} },
      ],
    },
    {
      label: "Help",
      submenu: [
        { label: "About This Portfolio", action: onOpenAbout },
        { label: "Keyboard Shortcuts", action: () => {} },
        { type: "separator" },
        {
          label: "Report an Issue",
          action: () => window.open("mailto:you@example.com", "_blank"),
        },
      ],
    },
  ];

  return (
    <>
      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-xl p-6 w-96 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search portfolio... (projects, contact, resume, about)"
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
              />
            </div>
            <div className="text-sm text-gray-400">
              <div className="mb-2">Suggestions:</div>
              <div className="space-y-1">
                <div
                  className="p-2 hover:bg-white/5 rounded cursor-pointer"
                  onClick={() => handleSearch("projects")}
                >
                  <span className="text-white">📁 Projects</span>
                  <span className="text-gray-500 text-xs ml-2">
                    View all projects
                  </span>
                </div>
                <div
                  className="p-2 hover:bg-white/5 rounded cursor-pointer"
                  onClick={() => handleSearch("contact")}
                >
                  <span className="text-white">📧 Contact</span>
                  <span className="text-gray-500 text-xs ml-2">
                    Get in touch
                  </span>
                </div>
                <div
                  className="p-2 hover:bg-white/5 rounded cursor-pointer"
                  onClick={() => handleSearch("resume")}
                >
                  <span className="text-white">📄 Resume</span>
                  <span className="text-gray-500 text-xs ml-2">
                    View my resume
                  </span>
                </div>
                <div
                  className="p-2 hover:bg-white/5 rounded cursor-pointer"
                  onClick={() => handleSearch("about me")}
                >
                  <span className="text-white">👤 About Me</span>
                  <span className="text-gray-500 text-xs ml-2">
                    Learn about me
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 flex justify-between">
              <span>Press Enter to search, Esc to cancel</span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Command Palette */}
      {isCommandOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-xl p-4 w-80 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Command size={20} className="text-gray-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              {[
                { icon: "📁", label: "Open Projects", action: onOpenProjects },
                { icon: "📧", label: "Open Contact", action: onOpenContact },
                { icon: "📄", label: "Open Resume", action: onOpenResume },
                { icon: "👤", label: "Open About Me", action: onOpenAbout },
                {
                  icon: "🎨",
                  label: "Change Wallpaper",
                  action: onOpenWallpaperSelector,
                },
                {
                  icon: theme === "dark" ? "☀️" : "🌙",
                  label: `Switch to ${
                    theme === "dark" ? "Light" : "Dark"
                  } Mode`,
                  action: handleThemeToggle,
                },
                {
                  icon: "⚙️",
                  label: "Open Control Center",
                  action: onToggleControlCenter,
                },
                {
                  icon: "🔔",
                  label: `Open Notifications (${notifications.length})`,
                  action: onToggleNotificationCenter,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-white/5 rounded cursor-pointer flex items-center gap-3"
                  onClick={() => {
                    item.action();
                    setIsCommandOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 text-white text-sm z-40 select-none shadow-sm">
        {/* Left Side - Apple Menu */}
        <div className="flex items-center gap-4">
          <span
            className="font-bold cursor-pointer hover:opacity-70 transition-opacity text-[15px]"
            onClick={onOpenAbout}
          >
            
          </span>
          <span className="font-bold text-[13px]">Portfolio</span>

          {/* Menu Items with Dropdowns */}
          <div className="hidden sm:flex gap-4 opacity-90 text-[13px] font-medium">
            {menuItems.map((menuItem, index) => (
              <div key={index} className="relative group">
                <span className="cursor-default hover:opacity-70 px-2 py-1">
                  {menuItem.label}
                </span>
                <div className="absolute top-full left-0 hidden group-hover:block bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl min-w-[200px] z-50">
                  {menuItem.submenu.map((item, subIndex) =>
                    item.type === "separator" ? (
                      <div
                        key={subIndex}
                        className="border-t border-white/10 my-1"
                      />
                    ) : (
                      <div
                        key={subIndex}
                        className="px-4 py-2 hover:bg-white/10 cursor-pointer flex justify-between items-center"
                        onClick={item.action}
                      >
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span className="text-gray-400 text-xs">
                            {item.shortcut}
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Icons */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <div
            className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer"
            onClick={handleThemeToggle}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </div>

          {/* Wallpaper Settings */}
          <div
            className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer"
            onClick={onOpenWallpaperSelector}
            title="Change Wallpaper"
          >
            <Settings size={16} />
          </div>

          {/* Battery */}
          <div
            className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer"
            onClick={onToggleControlCenter}
            title={`Battery: ${batteryLevel.toFixed(0)}% ${getBatteryIcon()}`}
          >
            <Battery size={16} />
            <span className="text-xs">{batteryLevel.toFixed(0)}%</span>
          </div>

          {/* WiFi */}
          <div
            className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer"
            onClick={onToggleControlCenter}
            title={`WiFi: ${wifiStrength}/4 ${getWifiIcon()}`}
          >
            <Wifi size={16} />
          </div>

          {/* Notifications */}
          <div
            className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer relative"
            onClick={onToggleNotificationCenter}
            title={`Notifications (${notifications.length})`}
          >
            <Bell size={16} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            )}
          </div>

          {/* Search */}
          <div
            className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
            title="Search (⌘K)"
          >
            <Search size={16} />
          </div>

          {/* Command Palette */}
          <div
            className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer"
            onClick={handleCommandPalette}
            title="Command Palette (⌘⇧P)"
          >
            <Command size={16} />
          </div>

          {/* Time/Date */}
          <span
            className="font-medium cursor-pointer hover:opacity-80"
            onClick={onToggleNotificationCenter}
            title="Click for notifications"
          >
            {format(time, "EEE MMM d h:mm aa")}
          </span>
        </div>
      </div>
    </>
  );
};
