'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Bluetooth, Moon, Sun, Music, Volume2, Monitor } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const ControlCenter = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { theme, setTheme } = useStore();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className="fixed top-10 right-4 w-80 bg-white/70 dark:bg-black/70 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl z-[70] p-4 text-black dark:text-white"
      >
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <Wifi size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Wi-Fi</div>
                <div className="text-xs opacity-60">Home Network</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <Bluetooth size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Bluetooth</div>
                <div className="text-xs opacity-60">On</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-rows-2 gap-3">
            <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`rounded-xl p-3 flex items-center gap-3 transition-colors ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-white/50 dark:bg-gray-800/50'}`}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              <span className="text-sm font-medium">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 flex items-center gap-3">
                <Monitor size={18} />
                <span className="text-sm font-medium">Display</span>
            </div>
          </div>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 mb-4">
            <div className="text-xs font-medium opacity-60 mb-2">Display</div>
            <input type="range" className="w-full accent-white" />
        </div>
        
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
            <div className="text-xs font-medium opacity-60 mb-2">Sound</div>
            <div className="flex items-center gap-3">
                <Volume2 size={16} />
                <input type="range" className="w-full accent-white" />
            </div>
        </div>
      </motion.div>
    </>
  );
};
