import { defineConfig } from 'vite';

export default defineConfig({
  base: '/knowledge-base/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
