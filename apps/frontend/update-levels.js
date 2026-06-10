const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

const targetDir = 'F:/Projects/ThuongTra-VanHoc/edu-platform/apps/frontend/src/app';

walkDir(targetDir, file => {
    if (!file.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes("parseInt(levelStr.replace('hsk', ''))")) {
        console.log('Processing', file);
        // Replace levelNum declaration
        content = content.replace(
            /const\s+levelNum\s*=\s*parseInt\(levelStr\.replace\('hsk',\s*''\)\)\s*\|\|\s*1;/g,
            "const isEnglish = levelStr.startsWith('en-');\n    const levelNum = isEnglish ? 1 : parseInt(levelStr.replace('hsk', '')) || 1;"
        );
        
        // Replace file names
        content = content.replace(
            /`hsk\$\{levelNum\}-([^`]+)\.json`/g,
            "isEnglish ? `${levelStr}-$1.json` : `hsk${levelNum}-$1.json`"
        );
        
        // Special case for passages.json in listening/page.tsx
        content = content.replace(
            /const\s+passagesFileName\s*=\s*`passages\.json`;/g,
            "const passagesFileName = isEnglish ? `${levelStr}-passages.json` : `passages.json`;"
        );
        
        fs.writeFileSync(file, content);
        console.log('Updated', file);
    }
});
