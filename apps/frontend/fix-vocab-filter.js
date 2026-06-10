const fs = require('fs');
const glob = require('glob');

const files = glob.sync('F:/Projects/ThuongTra-VanHoc/edu-platform/apps/frontend/src/app/**/*.tsx');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix uniqueVocabMap logic
    if (content.includes('if (w.hanzi && !uniqueVocabMap.has(w.hanzi)) {') && content.includes('uniqueVocabMap.set(w.hanzi, w);')) {
        content = content.replace(
            /if\s*\(w\.hanzi\s*&&\s*!uniqueVocabMap\.has\(w\.hanzi\)\)\s*\{\s*uniqueVocabMap\.set\(w\.hanzi,\s*w\);\s*\}/g,
            'const key = w.hanzi || w.word;\n        if (key && !uniqueVocabMap.has(key)) {\n          uniqueVocabMap.set(key, w);\n        }'
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
