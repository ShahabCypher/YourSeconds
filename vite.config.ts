import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: "/YourSeconds/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
