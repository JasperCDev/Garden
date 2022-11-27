import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    solidPlugin({
      solid: {
        moduleName: "solid-js/web",
      },
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/index.js",
        assetFileNames: "assets/index.css",
      },
    },
  },
});
