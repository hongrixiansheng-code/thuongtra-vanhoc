const fs = require('fs');
const path = require('path');

const targetPath = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk4-batch1.json');
const data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

const newData = [];
let currentIndex = 0;

for (const lesson of data) {
  const words = lesson.words || [];
  // Nếu đã chia rồi thì thôi
  if (lesson.title.includes('Phần 1') || lesson.title.includes('Phần 2')) {
      newData.push(lesson);
      continue;
  }

  const half = Math.ceil(words.length / 2);
  const partA = words.slice(0, half);
  const partB = words.slice(half);

  const parts = lesson.title.split(": ");
  const baseName = parts[0]; 
  const themeName = parts[1] || "";

  newData.push({
    ...lesson,
    orderIndex: currentIndex++,
    title: baseName + "A: " + themeName + " (Phần 1)",
    words: partA
  });

  newData.push({
    ...lesson,
    orderIndex: currentIndex++,
    title: baseName + "B: " + themeName + " (Phần 2)",
    words: partB
  });
}

fs.writeFileSync(targetPath, JSON.stringify(newData, null, 2), 'utf8');
console.log(`Split completed. Now we have ${newData.length} lessons.`);
