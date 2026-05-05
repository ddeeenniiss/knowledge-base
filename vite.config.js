import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function copyPublicAssetsPlugin() {
  return {
    name: 'copy-public-assets',
    apply: 'build',
    writeBundle() {
      const srcDir = path.resolve(__dirname, 'public');
      const destDir = path.resolve(__dirname, 'dist');
      copyDirRecursive(srcDir, destDir, ['index.html']);
      console.log(`✓ Copied public assets to ${destDir}`);
    }
  };
}

function copyDirRecursive(src, dest, exclude = []) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  for (const file of fs.readdirSync(src)) {
    if (exclude.includes(file)) continue;
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);
    if (stat.isDirectory()) copyDirRecursive(srcFile, destFile, exclude);
    else fs.copyFileSync(srcFile, destFile);
  }
}

export default defineConfig({
  root: 'public',
  base: process.env.NODE_ENV === 'production' ? '/knowledge-base/' : '/',
  plugins: [copyPublicAssetsPlugin()],
  server: { port: 5173 },
  build: {
    outDir: '../dist',   // Ausgabeverzeichnis
    emptyOutDir: true // leert das Ausgabeverzeichnis "dist" vor dem Build
  },
  publicDir: false
});

