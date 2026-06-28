// diagnose-movers.js
// Đọc tất cả movers-*.json và in ra cấu trúc thực tế — KHÔNG ghi gì vào DB

const fs   = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../../data');

const files = fs.readdirSync(DATA_DIR)
  .filter(f => f.startsWith('movers-') && f.endsWith('.json'))
  .sort();

console.log(`\nTìm thấy ${files.length} file:\n`);

for (const file of files) {
  const raw  = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  const type = Array.isArray(raw) ? 'ARRAY' : 'OBJECT';
  const lessons = raw.lessons || (Array.isArray(raw) ? raw : [raw]);

  console.log(`📄 ${file}`);
  console.log(`   Kiểu gốc   : ${type}`);
  console.log(`   Số lessons : ${lessons.length}`);

  if (lessons.length > 0) {
    const first = lessons[0];
    const keys  = Object.keys(first);
    console.log(`   Keys bài 1 : [${keys.join(', ')}]`);
    console.log(`   orderIndex : ${first.orderIndex}`);
    console.log(`   vocab      : ${(first.vocab      || []).length} phần tử`);
    console.log(`   grammar    : ${(first.grammar    || []).length} phần tử`);
    console.log(`   dialogue   : ${(first.dialogue   || []).length} phần tử`);
  }
  console.log();
}
