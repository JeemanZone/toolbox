import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? "/toolbox/" : "./",
  plugins: [react()],
  server: {
    port: 80,
  },
});
