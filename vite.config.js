import { defineConfig } from 'vite';
import path from 'path';

const rootDir = path.resolve(__dirname);

export default defineConfig({
  root: rootDir,
  base: '/',
  publicDir: path.resolve(__dirname, 'public'),
  server: { port: 5173 },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true
  }
});
