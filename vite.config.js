import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      // don't fail the build on errors or warnings
      failOnError: false,
      failOnWarning: false,
    }),
  ],
});
