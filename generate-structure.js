const fs = require('fs');
const path = require('path');

const rootDir = './';
const ignore = ['node_modules', '.git', '.github', 'docs', 'dist', 'public'];

function walk(dir) {
  const result = {};
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (ignore.includes(file)) return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const sub = walk(fullPath);
      if (Object.keys(sub).length > 0) {
        result[file] = sub;
      }
    } else if (file.endsWith('.php')) { // oder .md, je nach Bedarf
      result[path.basename(file, path.extname(file))] =
        path.relative(rootDir, fullPath).replace(/\\/g, '/');
    }
  });
  return result;
}

const structure = walk(rootDir);
fs.writeFileSync('structure.json', JSON.stringify(structure, null, 2));
console.log('structure.json wurde erstellt!');
