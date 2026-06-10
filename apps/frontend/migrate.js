const fs = require('fs');
const path = require('path');

const srcDirs = [
  'F:/Projects/ThuongTra-VanHoc/Du_An_HSK1/js/ui',
  'F:/Projects/ThuongTra-VanHoc/Du_An_HSK1/js/shared',
  'F:/Projects/ThuongTra-VanHoc/Du_An_HSK1/js/games'
];
const destDir = 'F:/Projects/ThuongTra-VanHoc/edu-platform/apps/frontend/src/components/legacy';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

srcDirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    
    // add 'use client'
    let finalContent = '"use client";\nimport React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";\n';
    
    // remove const { ... } = React
    content = content.replace(/const\s+\{[^}]+\}\s*=\s*React;/g, '');
    
    // Change const Component = memo(...) to export const Component = memo(...)
    content = content.replace(/^const\s+([A-Z]\w+)\s*=\s*memo/gm, 'export const $1 = memo');
    content = content.replace(/^const\s+([A-Z]\w+)\s*=\s*\(/gm, 'export const $1 = (');

    // Remove ReactDOM.createPortal if we want or import it
    finalContent += "import ReactDOM from 'react-dom';\n";
    finalContent += content;
    
    fs.writeFileSync(path.join(destDir, file), finalContent);
  });
});
console.log('Migration complete.');
