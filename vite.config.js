import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // "./" makes the build work at any address, including GitHub Pages sub-paths.
  base: "./",
  plugins: [react()],
});
