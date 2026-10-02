import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  // Defaults to the site root. The GitHub Pages deploy sets BASE_PATH to
  // "/ICG-Webiste/" because the site is served from a project subpath, and
  // without this every asset URL 404s.
  base: process.env.BASE_PATH ?? "/",
});