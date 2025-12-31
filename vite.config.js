import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/knowledge-base/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true
  },
  server: {
    middlewareMode: false
  }
});