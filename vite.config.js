import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'path';

const rootDir = resolve(__dirname);
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  root: rootDir,
  base: '/',
  publicDir: path.resolve(__dirname, 'public'),
  server: { port: 5173,
    open: true,
  },
  build: {
    outDir: outDir,
    emptyOutDir: true
  }
});
