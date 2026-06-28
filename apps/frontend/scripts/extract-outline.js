const fs = require('fs');
const readline = require('readline');
const path = require('path');

const transcriptPath = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\7535133f-d875-4481-8bab-cfb64a2532d9\\.system_generated\\logs\\transcript_full.jsonl';
const outputPath = 'f:\\Projects\\ThuongTra-VanHoc\\edu-platform\\data\\Movers_Khung.md';

async function processLineByLine() {
  const fileStream = fs.createReadStream(transcriptPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('Khung chương trình Tiếng Anh Movers (Cambridge YLE A1)')) {
      const parsed = JSON.parse(line);
      if (parsed.type === 'USER_INPUT' && parsed.content) {
        fs.writeFileSync(outputPath, parsed.content);
        console.log('Saved Movers outline to data/Movers_Khung.md');
        return;
      }
    }
  }
  console.log('Could not find the outline in the transcript.');
}

processLineByLine();
