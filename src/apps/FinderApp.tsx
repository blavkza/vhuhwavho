'use client';

import React from 'react';
import { useStore, FileSystemItem } from '@/store/useStore';
import { FinderLayout } from '@/components/layout/FinderLayout';
import { Folder, FileText, HardDrive, Clock, Cloud, Download, ArrowLeft } from 'lucide-react';

export const FinderApp = ({ initialPath = 'desktop' }: { initialPath?: string }) => {
  const { fileSystem } = useStore();
  const [currentPath, setCurrentPath] = React.useState(initialPath);

  const currentItems = fileSystem.filter(item => item.parentId === currentPath);
  
  const sidebarItems = [
    { id: 'recent', label: 'Recents', icon: Clock, active: false, onClick: () => {} },
    { id: 'desktop', label: 'Desktop', icon: HardDrive, active: currentPath === 'desktop', onClick: () => setCurrentPath('desktop') },
    { id: 'documents', label: 'Documents', icon: FileText, active: currentPath === 'documents', onClick: () => setCurrentPath('documents') },
    { id: 'downloads', label: 'Downloads', icon: Download, active: currentPath === 'downloads', onClick: () => setCurrentPath('downloads') },
    { id: 'icloud', label: 'iCloud Drive', icon: Cloud, active: false, onClick: () => {} },
  ];

  const { openWindow } = useStore();

  const handleItemClick = (item: FileSystemItem) => {
    if (item.type === 'folder') {
        setCurrentPath(item.id);
    } else {
        openWindow({
            id: `file-${item.id}`,
            title: item.name,
            component: (
                <div className="p-4 text-black dark:text-white font-mono text-sm">
                    <h1 className="text-xl font-bold mb-4">{item.name}</h1>
                    <p>This is a preview of the file content.</p>
                    <p className="opacity-50 mt-2">File ID: {item.id}</p>
                </div>
            ),
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: 50,
        });
    }
  };

  const handleBack = () => {
    // Simple back navigation (parent of current path)
    const currentFolder = fileSystem.find(i => i.id === currentPath);
    if (currentFolder && currentFolder.parentId) {
        setCurrentPath(currentFolder.parentId);
    } else if (currentPath !== 'desktop') {
        setCurrentPath('desktop');
    }
  };

  return (
    <FinderLayout 
        title={
            <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handleBack} 
                            disabled={currentPath === 'desktop'}
                            className={`p-1 rounded-md transition-colors ${currentPath === 'desktop' ? 'opacity-30 cursor-default' : 'hover:bg-black/10 dark:hover:bg-white/10'}`}
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <span className="font-semibold text-sm">{currentPath === 'desktop' ? 'Desktop' : fileSystem.find(i => i.id === currentPath)?.name || 'Folder'}</span>
                    </div>
                </div>
                
                {/* Visual Toolbar Icons (Non-functional) */}
                <div className="flex items-center gap-4 opacity-50">
                    <div className="flex bg-gray-200 dark:bg-gray-700 rounded-md p-0.5">
                        <div className="p-1 bg-white dark:bg-gray-600 rounded shadow-sm"><div className="grid grid-cols-2 gap-0.5"><div className="w-1.5 h-1.5 bg-current rounded-[1px]"/><div className="w-1.5 h-1.5 bg-current rounded-[1px]"/><div className="w-1.5 h-1.5 bg-current rounded-[1px]"/><div className="w-1.5 h-1.5 bg-current rounded-[1px]"/></div></div>
                        <div className="p-1"><div className="flex flex-col gap-0.5"><div className="w-3.5 h-0.5 bg-current rounded-full"/><div className="w-3.5 h-0.5 bg-current rounded-full"/><div className="w-3.5 h-0.5 bg-current rounded-full"/></div></div>
                    </div>
                </div>
            </div>
        } 
        sidebarItems={sidebarItems}
    >
      <div className="grid grid-cols-4 gap-4">
        {currentItems.length > 0 ? (
            currentItems.map((item) => (
            <div 
                key={item.id}
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-blue-500/10 cursor-pointer group"
                onDoubleClick={() => handleItemClick(item)}
            >
                <div className="text-blue-500">
                    {item.type === 'folder' ? <Folder size={48} fill="currentColor" /> : <FileText size={48} />}
                </div>
                <span className="text-sm text-center group-hover:text-blue-500">{item.name}</span>
            </div>
            ))
        ) : (
            <div className="col-span-4 text-center opacity-50 py-10">
                Folder is empty
            </div>
        )}
      </div>
    </FinderLayout>
  );
};
