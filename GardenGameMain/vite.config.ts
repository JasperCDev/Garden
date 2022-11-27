import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
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
