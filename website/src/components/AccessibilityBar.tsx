"use client";

import { useState, useEffect } from "react";

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState(1); // 0=small, 1=normal, 2=large, 3=largest
  const [highContrast, setHighContrast] = useState(false);

  const fontSizeClasses = ["font-size-small", "font-size-normal", "font-size-large", "font-size-largest"];
  const fontSizeLabels = ["Small", "Normal", "Large", "Largest"];

  useEffect(() => {
    // Restore preferences
    const savedFontSize = localStorage.getItem("setara-font-size");
    const savedContrast = localStorage.getItem("setara-high-contrast");
    if (savedFontSize) setFontSize(Number(savedFontSize));
    if (savedContrast === "true") setHighContrast(true);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    // Remove all font size classes
    fontSizeClasses.forEach((cls) => html.classList.remove(cls));
    // Add current
    html.classList.add(fontSizeClasses[fontSize]);
    localStorage.setItem("setara-font-size", String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    const html = document.documentElement;
    if (highContrast) {
      html.classList.add("high-contrast");
    } else {
      html.classList.remove("high-contrast");
    }
    localStorage.setItem("setara-high-contrast", String(highContrast));
  }, [highContrast]);

  function decreaseFont() {
    setFontSize((prev) => Math.max(0, prev - 1));
  }

  function increaseFont() {
    setFontSize((prev) => Math.min(3, prev + 1));
  }

  function resetFont() {
    setFontSize(1);
  }

  return (
    <div className="accessibility-bar bg-[#000000] border-b border-white/10 text-gray-300" role="region" aria-label="Accessibility options">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
        {/* Left: Screen reader & accessibility links */}
        <div className="flex items-center gap-4">
          <a
            href="/screen-reader-access"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Screen Reader Access
          </a>
        </div>

        {/* Right: Font size, contrast, language */}
        <div className="flex items-center gap-3">
          {/* Font size controls */}
          <span className="text-gray-400 hidden sm:inline" id="font-size-label">Text Size:</span>
          <div className="flex items-center gap-1" role="group" aria-labelledby="font-size-label">
            <button
              onClick={decreaseFont}
              disabled={fontSize === 0}
              className="flex h-6 w-6 items-center justify-center rounded text-xs font-bold hover:bg-white/10 disabled:opacity-40 transition-colors"
              aria-label={`Decrease text size. Current: ${fontSizeLabels[fontSize]}`}
              title="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={resetFont}
              className="flex h-6 w-6 items-center justify-center rounded text-sm font-bold hover:bg-white/10 transition-colors"
              aria-label="Reset text size to normal"
              title="Normal text size"
            >
              A
            </button>
            <button
              onClick={increaseFont}
              disabled={fontSize === 3}
              className="flex h-6 w-6 items-center justify-center rounded text-base font-bold hover:bg-white/10 disabled:opacity-40 transition-colors"
              aria-label={`Increase text size. Current: ${fontSizeLabels[fontSize]}`}
              title="Increase text size"
            >
              A+
            </button>
          </div>

          <span className="text-gray-600">|</span>

          {/* Contrast toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-1 rounded px-2 py-0.5 text-xs hover:bg-white/10 transition-colors"
            aria-label={highContrast ? "Switch to normal contrast" : "Switch to high contrast"}
            aria-pressed={highContrast}
            title={highContrast ? "Normal Contrast" : "High Contrast"}
          >
            {highContrast ? (
              <><span className="h-3 w-3 rounded-full border border-white bg-white inline-block" aria-hidden="true" /> Normal</>
            ) : (
              <><span className="h-3 w-3 rounded-full border border-white bg-black inline-block" aria-hidden="true" /> High Contrast</>
            )}
          </button>

          <span className="text-gray-600 hidden sm:inline">|</span>

          {/* Language */}
          <div className="hidden sm:flex items-center gap-2">
            <a href="/" className="text-white font-semibold hover:underline" lang="en" aria-label="English version" aria-current="page">
              English
            </a>
            <span className="text-gray-600">/</span>
            <a href="/" className="text-gray-400 hover:text-white hover:underline" lang="hi" aria-label="Hindi version">
              &#2361;&#2367;&#2306;&#2342;&#2368;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
