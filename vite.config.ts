import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// To resolve path, pnpm add @types/node -D
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
