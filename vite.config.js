import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === "serve" || command === "dev") {
    return {
      server: {
        port: 8888,
      },
      plugins: [react()],
    };
  } else {
    return {
      plugins: [react()],
    };
  }
});
