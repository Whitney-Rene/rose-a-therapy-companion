import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    framework: "vitest",
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTest.js"],
  },
});

//is there an issue with line 12?
