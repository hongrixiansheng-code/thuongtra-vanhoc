const fs = require('fs');
const files = [
  'ket-dialogue-cum1.json',
  'ket-grammar-cum1.json',
  'ket-grammar-cum2.json',
  'ket-grammar-cum3.json',
  'ket-grammar-cum4.json',
  'ket-grammar-cum5.json'
];

files.forEach(file => {
  const p = `f:/Projects/ThuongTra-VanHoc/edu-platform/data/${file}`;
  if (!fs.existsSync(p)) return;
  
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  
  data.lessons.forEach(lesson => {
    if (lesson.dialogue) {
      lesson.dialogue.forEach(d => {
        if (d.lines) {
          d.lines.forEach(line => {
            if (line.text) {
              line.en = line.text;
              delete line.text;
            }
          });
        }
      });
    }
    if (lesson.grammar) {
      lesson.grammar.forEach(g => {
        if (g.practiceList) {
          g.practiceList.forEach(p => {
            if (p.vi) {
              p.meaning = p.vi;
              delete p.vi;
            }
          });
        }
      });
    }
  });

  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Fixed schema for ${file}`);
});
