import { defineConfig } from 'vite';

const prod = process.env.NODE_ENV === "production";

export default defineConfig({
  root: "./src",
  base: './', // Funciona en local y en GitHub Pages sin importar el nombre del repo
  mode: prod ? "production" : "development",
  publicDir: "../public",
  plugins: [],
  server: { port: 1234 },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  }
});