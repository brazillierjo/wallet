"use client";

import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";

interface KeyboardShortcutProps {
  keys: string[];
  className?: string;
  showOnMobile?: boolean;
}

/**
 * Affiche un raccourci clavier avec le style Apple
 * @param keys - Les touches du raccourci (ex: ["⌘", "A"] ou ["Ctrl", "A"])
 * @param className - Classes CSS supplémentaires
 * @param showOnMobile - Si true, affiche le raccourci sur mobile (par défaut: false)
 */
export const KeyboardShortcut = ({ keys, className, showOnMobile = false }: KeyboardShortcutProps) => {
  const [isMac, setIsMac] = useState(false);

  // Détecter si l'utilisateur est sur Mac
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  // Remplacer "Command" par "⌘" sur Mac
  const displayKeys = isMac
    ? keys.map((key) => (key === "Command" ? "⌘" : key))
    : keys.map((key) => (key === "Command" ? "Ctrl" : key));

  return (
    <span
      className={cn(
        "text-muted-foreground ml-2 inline-flex items-center gap-1 text-[11px]",
        !showOnMobile && "hidden md:inline-flex",
        className
      )}
    >
      {displayKeys.map((key, index) => (
        <span key={index} className="bg-muted text-muted-foreground rounded px-[4px] py-[1.5px] font-semibold">
          {key}
        </span>
      ))}
    </span>
  );
};

/**
 * Hook pour gérer les raccourcis clavier
 * @param keys - Les touches du raccourci (ex: ["Command", "A"] ou ["Ctrl", "A"])
 * @param callback - Fonction à appeler lorsque le raccourci est activé
 * @param preventDefault - Si true, empêche le comportement par défaut (par défaut: true)
 */
export const useKeyboardShortcut = (keys: string[], callback: () => void, preventDefault = true) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const allKeysPressed = keys.every((key) => {
        if (key === "Command") return e.metaKey;
        if (key === "Ctrl") return e.ctrlKey;
        if (key === "Shift") return e.shiftKey;
        if (key === "Alt") return e.altKey;
        return e.key.toLowerCase() === key.toLowerCase();
      });

      if (allKeysPressed) {
        preventDefault && e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys, callback, preventDefault]);
};
