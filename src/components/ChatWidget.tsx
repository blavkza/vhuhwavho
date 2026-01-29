"use client";

import { useEffect } from "react";

export default function ChatWidget() {
  useEffect(() => {
    const iframe = document.createElement("iframe");
    const iframeStyles = (styleString) => {
      const style = document.createElement("style");
      style.textContent = styleString;
      document.head.append(style);
    };

    iframeStyles(`
      .chat-frame {
        position: fixed;
        bottom: 50px;
        right: 50px;
        border: none;
        z-index: 9999;
      }
    `);

    iframe.src = "https://auto-engage.vercel.app/chatbot";
    iframe.classList.add("chat-frame");
    document.body.appendChild(iframe);

    window.addEventListener("message", (e) => {
      if (e.origin !== "https://auto-engage.vercel.app") return;
      try {
        const dimensions = JSON.parse(e.data);
        iframe.width = dimensions.width;
        iframe.height = dimensions.height;
        iframe.style.borderRadius = dimensions["border-radius"] + "px";
        iframe.contentWindow.postMessage(
          "d125ccb7-a4c4-4be3-9288-a2c850e90ecd",
          "https://auto-engage.vercel.app"
        );
      } catch (error) {
        console.error("Chat widget error:", error);
      }
    });
  }, []);

  return null;
}
