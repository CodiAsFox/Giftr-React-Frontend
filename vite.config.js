import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === "serve" || command === "dev") {
    return {
      server: {
        watch: {
          usePolling: true,
        },
        port: 8888,
      },
      plugins: [react(), svgr()],
    };
  } else {
    return {
      server: {
        watch: {
          usePolling: true,
        },
      },
      plugins: [react(), svgr()],
    };
  }
});
