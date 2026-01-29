"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Wifi, Battery, Search, Command, Settings } from "lucide-react";

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

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time)
    return (
      <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-xl z-50" />
    );

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 text-white text-sm z-50 select-none shadow-sm">
      <div className="flex items-center gap-4">
        <span
          className="font-bold cursor-pointer hover:opacity-70 transition-opacity text-[15px]"
          onClick={onOpenAbout}
        >
          
        </span>
        <span className="font-bold text-[13px]">Portfolio</span>
        <div className="hidden sm:flex gap-4 opacity-90 text-[13px] font-medium">
          <span className="cursor-default hover:opacity-70">File</span>
          <span className="cursor-default hover:opacity-70">Edit</span>
          <span className="cursor-default hover:opacity-70">View</span>
          <span className="cursor-default hover:opacity-70">Go</span>
          <span className="cursor-default hover:opacity-70">Window</span>
          <span className="cursor-default hover:opacity-70">Help</span>
          {/* Custom App Links integrated as if they are part of the system or app menu */}
          <span className="cursor-pointer hover:opacity-70 transition-opacity ml-2 opacity-50">
            |
          </span>
          <span
            className="cursor-pointer hover:opacity-70 transition-opacity text-blue-300"
            onClick={onOpenAbout}
          >
            About Me
          </span>
          <span
            className="cursor-pointer hover:opacity-70 transition-opacity text-blue-300"
            onClick={onOpenProjects}
          >
            Projects
          </span>
          <span
            className="cursor-pointer hover:opacity-70 transition-opacity text-blue-300"
            onClick={onOpenContact}
          >
            Contact
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer"
          onClick={onOpenWallpaperSelector}
        >
          <Settings size={16} />
        </div>
        <div
          className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer"
          onClick={onToggleControlCenter}
        >
          <Battery size={16} />
        </div>
        <div
          className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer"
          onClick={onToggleControlCenter}
        >
          <Wifi size={16} />
        </div>
        <div className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer">
          <Search size={16} />
        </div>
        <div className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer">
          <Command size={16} />
        </div>
        <span
          className="font-medium cursor-pointer hover:opacity-80"
          onClick={onToggleNotificationCenter}
        >
          {format(time, "EEE MMM d h:mm aa")}
        </span>
      </div>
    </div>
  );
};
