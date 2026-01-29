'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore, FileSystemItem } from '@/store/useStore';
import { Folder, FileText } from 'lucide-react';

interface DesktopIconProps {
  item: FileSystemItem;
  onOpen: (item: FileSystemItem) => void;
  onDragEnd?: (id: string, x: number, y: number) => void;
}

export const DesktopIcon = ({ item, onOpen, onDragEnd }: DesktopIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div 
      ref={ref}
      drag
      dragMomentum={false}
      onDragEnd={(event, info) => {
        if (onDragEnd && item.position) {
            // Calculate new position based on drag delta
            // Note: framer-motion drag is relative to start, but we want absolute coordinates.
            // A simpler way with absolute positioning is to update the store with the *final* visual position.
            // However, since we are rendering with 'top/left' or 'transform', we need to be careful.
            // If we use 'drag' without constraints, framer modifies the transform.
            // To persist, we should probably use the info.point which is absolute page coordinates, 
            // but we need relative to container.
            
            // Let's rely on the parent passing the initial position, and us updating it.
            // Actually, for a robust "desktop" feel, we might want to just update the store with the delta applied to the old pos.
             onDragEnd(item.id, (item.position?.x || 0) + info.offset.x, (item.position?.y || 0) + info.offset.y);
        }
      }}
      whileDrag={{ scale: 1.1, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 cursor-pointer group w-24"
      onDoubleClick={() => onOpen(item)}
    >
      <div className="w-16 h-16 flex items-center justify-center drop-shadow-lg">
        {item.type === 'folder' ? (
            <img 
              src="/icons/folder.png" 
              alt="Folder" 
              className="w-full h-full object-contain pointer-events-none" 
              draggable={false}
            />
        ) : (
            <FileText size={56} className="text-gray-200" />
        )}
      </div>
      <span className="text-white text-xs font-medium text-center drop-shadow-md px-1 rounded group-hover:bg-blue-600/80 line-clamp-2">
        {item.name}
      </span>
    </motion.div>
  );
};
