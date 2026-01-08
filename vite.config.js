import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function copyContentPlugin() {
  return {
    name: 'copy-content',
    apply: 'build',
    writeBundle() {
      const srcDirs = ['backend', 'frontend', 'basics'];
      const distRoot = 'docs';

      srcDirs.forEach(dir => {
        const srcPath = path.resolve('src', dir);
        const destPath = path.resolve(distRoot, dir);

        if (fs.existsSync(srcPath)) {
          copyDirRecursive(srcPath, destPath);
          console.log(`✓ Copied ${srcPath} to ${destPath}`);
        }
      });

      // Copy templates
      const templatesSrc = path.resolve('templates');
      const templatesDist = path.resolve(distRoot, 'templates');
      if (fs.existsSync(templatesSrc)) {
        copyDirRecursive(templatesSrc, templatesDist);
        console.log(`✓ Copied templates to ${templatesDist}`);
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
  root: './',
  base: process.env.NODE_ENV === 'production' ? '/knowledge-base/' : '/',
  plugins: [copyContentPlugin()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
});
