import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilityContextType {
  highContrast: boolean;
  largeText: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleLargeText = () => setLargeText(prev => !prev);

  // Apply effects to document
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    if (largeText) {
      root.classList.add("text-large");
    } else {
      root.classList.remove("text-large");
    }
  }, [highContrast, largeText]);

  return (
    <AccessibilityContext.Provider value={{ highContrast, largeText, toggleHighContrast, toggleLargeText }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}

// Helper hook kept for compatibility if needed, but Provider handles side effects now
export function useAccessibilityEffect() {
  return;
}
