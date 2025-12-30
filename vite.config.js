import { defineConfig } from 'vite';

export default defineConfig({
  base: '/knowledge-base/',
  root: 'src',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
