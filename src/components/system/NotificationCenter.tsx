'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { X, Bell } from 'lucide-react';
import { format } from 'date-fns';

export const NotificationCenter = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { notifications, removeNotification, clearNotifications } = useStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-transparent"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-80 sm:w-96 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-2xl border-l border-white/20 shadow-2xl z-50 pt-12 px-4 pb-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black dark:text-white">Notifications</h2>
              {notifications.length > 0 && (
                <button 
                  onClick={clearNotifications}
                  className="text-xs text-blue-500 hover:text-blue-400 font-medium bg-blue-500/10 px-2 py-1 rounded-full"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-black/40 dark:text-white/40">
                  <Bell size={48} className="mb-4 opacity-50" />
                  <p>No new notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/50 dark:bg-white/10 rounded-xl p-3 border border-white/10 shadow-sm relative group"
                  >
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all"
                    >
                      <X size={12} />
                    </button>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shrink-0">
                        <Bell size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-black dark:text-white">{notification.title}</h3>
                        <p className="text-xs text-black/60 dark:text-white/60 mt-0.5 leading-relaxed">
                          {notification.message}
                        </p>
                        <span className="text-[10px] text-black/40 dark:text-white/40 mt-2 block">
                          {format(new Date(notification.timestamp), 'h:mm a')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
