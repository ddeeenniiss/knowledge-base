import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// Optional: Nur templates kopieren, HTML bleibt in public
function copyTemplatesPlugin() {
  return {
    name: 'copy-templates',
    apply: 'build',
    writeBundle() {
      const templatesSrc = path.resolve('templates');
      const templatesDist = path.resolve('docs/templates');
      if (fs.existsSync(templatesSrc)) {
        copyDirRecursive(templatesSrc, templatesDist);
        console.log(`✓ Copied templates to ${templatesDist}`);
      }
    }
  };
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);
    if (stat.isDirectory()) copyDirRecursive(srcFile, destFile);
    else fs.copyFileSync(srcFile, destFile);
  }
}


export default defineConfig({
  root: './',
  base: process.env.NODE_ENV === 'production' ? '/knowledge-base/' : '/',
  plugins: [copyTemplatesPlugin()],
  server: { port: 5173 },
  build: {
    outDir: 'docs',   // Ausgabeverzeichnis
    emptyOutDir: true // leert das Ausgabeverzeichnis "docs" vor dem Build
  },
  publicDir: 'public'  // Statischer Inhalt aus "public" wird kopiert
});

