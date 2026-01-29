import React, { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { FinderApp } from "@/apps/FinderApp";
import { ProjectsApp } from "@/apps/ProjectsApp";
import { ContactApp } from "@/apps/ContactApp";
import { GalleryApp } from "@/apps/GalleryApp";

interface TerminalLine {
  type: "input" | "output";
  content: string;
  path?: string;
}

export const TerminalApp = () => {
  const { fileSystem, openWindow } = useStore();
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "output",
      content: "Last login: " + new Date().toLocaleString() + " on ttys000",
    },
    { type: "output", content: 'Type "help" for a list of commands.' },
  ]);
  const [currentPath, setCurrentPath] = useState("desktop");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const openApplication = (appName: string) => {
    const appMap: Record<
      string,
      { title: string; component: React.ReactNode; id: string }
    > = {
      finder: { title: "Finder", component: <FinderApp />, id: "finder" },
      projects: {
        title: "Projects",
        component: <ProjectsApp />,
        id: "projects",
      },
      contact: { title: "Contact", component: <ContactApp />, id: "contact" },
      photos: { title: "Photos", component: <GalleryApp />, id: "gallery" },
      gallery: { title: "Photos", component: <GalleryApp />, id: "gallery" },
      about: { title: "About Me", component: <FinderApp />, id: "about-me" },
      terminal: {
        title: "Terminal",
        component: <div className="p-6">New Terminal Window</div>,
        id: "terminal-2",
      },
    };

    const appKey = appName.toLowerCase();
    const app = appMap[appKey];

    if (app) {
      openWindow({
        id: app.id,
        title: app.title,
        component: app.component,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 50,
      });
      return true;
    }
    return false;
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [
      ...history,
      { type: "input" as const, content: cmd, path: currentPath },
    ];

    switch (command) {
      case "help":
        setHistory([
          ...newHistory,
          {
            type: "output",
            content:
              "Available commands:\n  help    - Show this help message\n  ls      - List directory contents\n  cd      - Change directory\n  cat     - Read file content\n  clear   - Clear terminal\n  whoami  - Current user\n  pwd     - Print working directory\n  open    - Open a file or app\n\n  Apps to open:\n  finder, projects, contact, photos, gallery, about, terminal",
          },
        ]);
        break;
      case "clear":
        setHistory([]);
        break;
      case "whoami":
        setHistory([
          ...newHistory,
          { type: "output", content: "guest@macbook-pro" },
        ]);
        break;
      case "pwd":
        setHistory([
          ...newHistory,
          { type: "output", content: `/${currentPath}` },
        ]);
        break;
      case "ls":
        const items = fileSystem.filter(
          (item) => item.parentId === currentPath
        );
        if (items.length === 0) {
          setHistory([...newHistory, { type: "output", content: "" }]);
        } else {
          const output = items
            .map((item) => {
              const isDir = item.type === "folder";
              const icon = isDir ? "📁" : "📄";
              return `${icon} ${item.name}${isDir ? "/" : ""}`;
            })
            .join("\n");
          setHistory([...newHistory, { type: "output", content: output }]);
        }
        break;
      case "cd":
        if (args.length === 0) {
          setCurrentPath("desktop");
          setHistory([...newHistory]);
          return;
        }
        const target = args[0];
        if (target === "..") {
          // Simple parent resolution
          const currentItem = fileSystem.find((i) => i.id === currentPath);
          if (currentItem && currentItem.parentId) {
            setCurrentPath(currentItem.parentId);
          }
          setHistory([...newHistory]);
        } else if (target === "~" || target === "desktop") {
          setCurrentPath("desktop");
          setHistory([...newHistory]);
        } else {
          // Find folder in current path
          const folder = fileSystem.find(
            (i) =>
              i.parentId === currentPath &&
              i.name.toLowerCase() === target.toLowerCase() &&
              i.type === "folder"
          );
          if (folder) {
            setCurrentPath(folder.id);
            setHistory([...newHistory]);
          } else {
            setHistory([
              ...newHistory,
              {
                type: "output",
                content: `cd: no such file or directory: ${target}`,
              },
            ]);
          }
        }
        break;
      case "cat":
        if (args.length === 0) {
          setHistory([
            ...newHistory,
            { type: "output", content: "cat: missing filename" },
          ]);
          return;
        }
        const fileName = args.join(" ");
        const file = fileSystem.find(
          (i) =>
            i.parentId === currentPath &&
            i.name.toLowerCase() === fileName.toLowerCase() &&
            i.type === "file"
        );
        if (file) {
          // In a real app we'd have content in the file item. For now, simulate.
          let content = "";
          if (file.id === "nike-readme") {
            content =
              "# Nike Ecommerce Project\n\nA modern ecommerce app built with Next.js 14, TypeScript, and Tailwind CSS.\n\n## Features:\n- Product catalog with filters\n- Shopping cart functionality\n- User authentication\n- Payment integration\n- Admin dashboard\n\n## Tech Stack:\n- Next.js 14 (App Router)\n- TypeScript\n- Tailwind CSS\n- Stripe for payments\n- MongoDB for database";
          } else if (file.id === "ai-main") {
            content =
              'import torch\nfrom transformers import pipeline\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\n\nclass ResumeAnalyzer:\n    def __init__(self):\n        self.model = pipeline("text-classification", model="bert-base-uncased")\n    \n    def analyze(self, text):\n        return self.model(text)\n\nanalyzer = ResumeAnalyzer()\nprint("AI Resume Analyzer initialized successfully!")';
          } else if (file.id === "nike-app") {
            content =
              '// app/page.tsx\nimport ProductGrid from "@/components/ProductGrid";\nimport CartProvider from "@/providers/CartProvider";\n\nexport default function Home() {\n  return (\n    <CartProvider>\n      <main className="min-h-screen">\n        <ProductGrid />\n      </main>\n    </CartProvider>\n  );\n}';
          } else {
            content = `File: ${file.name}\nType: ${file.type}\nPath: ${currentPath}\n\n[Content would be displayed here]`;
          }

          setHistory([...newHistory, { type: "output", content }]);
        } else {
          setHistory([
            ...newHistory,
            {
              type: "output",
              content: `cat: ${fileName}: No such file or directory`,
            },
          ]);
        }
        break;
      case "open":
        // Open command for applications
        if (args.length === 0) {
          setHistory([
            ...newHistory,
            {
              type: "output",
              content:
                "Usage: open <application>\n\nApplications available:\n- finder\n- projects\n- contact\n- photos/gallery\n- about\n- terminal",
            },
          ]);
          return;
        }

        const appName = args[0];
        const opened = openApplication(appName);

        if (opened) {
          setHistory([
            ...newHistory,
            {
              type: "output",
              content: `✅ Opening ${appName}...`,
            },
          ]);
        } else {
          setHistory([
            ...newHistory,
            {
              type: "output",
              content: `open: "${appName}" not found. Type "help" for available apps.`,
            },
          ]);
        }
        break;
      case "echo":
        if (args.length > 0) {
          setHistory([
            ...newHistory,
            { type: "output", content: args.join(" ") },
          ]);
        } else {
          setHistory([...newHistory]);
        }
        break;
      case "date":
        setHistory([
          ...newHistory,
          { type: "output", content: new Date().toString() },
        ]);
        break;
      case "neofetch":
        setHistory([
          ...newHistory,
          {
            type: "output",
            content: `       -/oyyhdmNMMMMMMMMMMNmdyyso/-\n    -sdMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMds-\n  .yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMy.\n +NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMN+\nmMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMm\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nyMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMy\n dMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMd\n  sMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMs\n   .hMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh.\n     /NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMN/\n       +mMMMMMMMMMMMMMMMMMMMMMMMMMMMMm+\n         -yMMMMMMMMMMMMMMMMMMMMMMMMy-\n           .oNMMMMMMMMMMMMMMMMMMNo.\n              :sNMMMMMMMMMMMMNs:\n                 /ymNMMMMNmy/\n                     -//-\n\nUser: nekhofhe@portfolio\nOS: macOS Portfolio v1.0\nHost: Nekhofhe\'s Portfolio\nKernel: React 18.2.0\nShell: Terminal v1.0`,
          },
        ]);
        break;
      case "":
        setHistory([...newHistory]);
        break;
      default:
        // Try to open as an application if not a built-in command
        const openedAsApp = openApplication(command);
        if (openedAsApp) {
          setHistory([
            ...newHistory,
            {
              type: "output",
              content: `✅ Opening ${command}...`,
            },
          ]);
        } else {
          setHistory([
            ...newHistory,
            {
              type: "output",
              content: `command not found: ${command}`,
            },
          ]);
        }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  // Helper to get display path
  const getDisplayPath = (pathId: string) => {
    if (pathId === "desktop") return "~";
    const item = fileSystem.find((i) => i.id === pathId);
    return item ? item.name : pathId;
  };

  return (
    <div
      className="p-4 bg-black/95 text-white font-mono h-full flex flex-col text-[13px] leading-5 font-medium"
      onClick={focusInput}
      style={{ fontFamily: "Menlo, Monaco, 'Courier New', monospace" }}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-4">
        {history.map((line, index) => (
          <div key={index} className="break-words whitespace-pre-wrap mb-1">
            {line.type === "input" ? (
              <div className="flex flex-wrap">
                <span className="text-green-400 mr-2">
                  guest@portfolio:{getDisplayPath(line.path || currentPath)} $
                </span>
                <span className="text-white">{line.content}</span>
              </div>
            ) : (
              <div className="text-gray-300">{line.content}</div>
            )}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex flex-wrap items-center" ref={bottomRef}>
          <span className="text-green-400 mr-2">
            guest@portfolio:{getDisplayPath(currentPath)} $
          </span>
          <div className="relative flex-1 min-w-[10px] inline-flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="absolute inset-0 w-full h-full bg-transparent border-none outline-none text-white caret-transparent p-0 m-0 font-inherit opacity-0"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
            <span className="whitespace-pre-wrap text-white">{input}</span>
            <span className="inline-block w-2.5 h-5 bg-green-500 animate-pulse ml-1" />
          </div>
        </div>
      </div>

      {/* Terminal Tips */}
      <div className="mt-2 pt-2 border-t border-gray-700 text-gray-400 text-xs">
        Tip: Type "help" for commands, or try "neofetch" for system info.
      </div>
    </div>
  );
};
