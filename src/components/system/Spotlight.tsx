'use client';

import React, { useState, useEffect } from 'react';
import { Search, Command, AppWindow, Code, Mail, User } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { AnimatePresence, motion } from 'framer-motion';
import { AboutApp } from '@/apps/AboutApp';
import { ProjectsApp } from '@/apps/ProjectsApp';
import { ContactApp } from '@/apps/ContactApp';

export const Spotlight = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { openWindow } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpen = (id: string, title: string, component: React.ReactNode) => {
    openWindow({
      id,
      title,
      component,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 50,
    });
    setIsOpen(false);
    setQuery('');
  };

  const apps = [
    { id: 'about', title: 'About Me', icon: <User />, component: <AboutApp /> },
    { id: 'projects', title: 'Projects', icon: <Code />, component: <ProjectsApp /> },
    { id: 'contact', title: 'Contact', icon: <Mail />, component: <ContactApp /> },
  ];

  const filteredApps = apps.filter((app) => 
    app.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl z-[101] overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-white/10 gap-3">
              <Search className="w-5 h-5 opacity-50" />
              <input
                autoFocus
                type="text"
                placeholder="Spotlight Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-lg placeholder:text-gray-500"
              />
              <div className="flex items-center gap-1 opacity-50 text-xs bg-white/10 px-2 py-1 rounded">
                <Command size={10} />
                <span>K</span>
              </div>
            </div>
            
            <div className="p-2">
              {filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleOpen(app.id, app.title, app.component)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition-colors group text-left"
                  >
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20">
                        {app.icon}
                    </div>
                    <span className="font-medium">{app.title}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center opacity-50">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
