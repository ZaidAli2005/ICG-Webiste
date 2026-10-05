import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*
      `reducedMotion: "user"` makes every framer-motion animation honour
      prefers-reduced-motion. The CSS block in index.css covers transitions
      and keyframes, but it cannot reach animations driven from JS — the hero
      entrance and the carousel would otherwise keep moving for a visitor who
      has asked the OS to stop things moving. Transform and layout animations
      are dropped; opacity is kept, since a fade carries no motion.
    */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
