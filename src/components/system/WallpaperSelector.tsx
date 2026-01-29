'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

const WALLPAPERS = [
  { id: 'sonoma', url: 'https://images.unsplash.com/photo-1696429175928-793a1cdef1d3?q=80&w=3840&auto=format&fit=crop', label: 'Sonoma' },
  { id: 'ventura', url: 'https://images.unsplash.com/photo-1666620766256-4c8d5c414436?q=80&w=3840&auto=format&fit=crop', label: 'Ventura' },
  { id: 'monterey', url: 'https://images.unsplash.com/photo-1635352723068-ffb3b96c3f60?q=80&w=3840&auto=format&fit=crop', label: 'Monterey' },
  { id: 'bigsur', url: 'https://images.unsplash.com/photo-1605142859619-db48162776b8?q=80&w=3840&auto=format&fit=crop', label: 'Big Sur' },
  { id: 'yosemite', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=3840&auto=format&fit=crop', label: 'Yosemite' },
  { id: 'midnight', url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=3840&auto=format&fit=crop', label: 'Midnight' },
  { id: 'aurora', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=3840&auto=format&fit=crop', label: 'Aurora' },
  { id: 'dune', url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=3840&auto=format&fit=crop', label: 'Dune' },
];

export const WallpaperSelector = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { setWallpaper, wallpaper } = useStore();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[60] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-2xl w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Wallpapers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp.url)}
              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                wallpaper === wp.url ? 'border-blue-500 scale-105' : 'border-transparent hover:scale-105'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${wp.url})` }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs font-medium">
                {wp.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
