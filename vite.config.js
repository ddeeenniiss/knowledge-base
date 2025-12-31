import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// Plugin to copy src content to dist during build
function copyContentPlugin() {
  return {
    name: 'copy-content',
    apply: 'build',
    async generateBundle() {
      const srcDirs = ['backend', 'frontend', 'basics'];
      const srcRoot = 'src';
      const distRoot = 'dist';

      srcDirs.forEach(dir => {
        const srcPath = path.join(srcRoot, dir);
        const distPath = path.join(distRoot, dir);

        if (fs.existsSync(srcPath)) {
          copyDirRecursive(srcPath, distPath);
        }
      });

      // Copy templates folder
      if (fs.existsSync('templates')) {
        copyDirRecursive('templates', path.join(distRoot, 'templates'));
      }
    }
  };
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);

    if (stat.isDirectory()) {
      copyDirRecursive(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/knowledge-base/' : '/',
  plugins: [copyContentPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true
  },
  server: {
    middlewareMode: false
  }
});