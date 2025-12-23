import { defineConfig } from 'vite';

export default defineConfig({
  // Serve from project root so markdown files (backend/, templates/, etc.) are reachable
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
