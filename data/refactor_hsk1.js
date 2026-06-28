const fs = require('fs');
const path = require('path');

const dataDir = __dirname;
const batchFiles = ['hsk1-batch1.json', 'hsk1-batch2.json', 'hsk1-batch3.json', 'hsk1-batch4.json', 'hsk1-batch5.json'];

let allLessons = [];
for (const file of batchFiles) {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        allLessons = allLessons.concat(content);
    }
}

console.log(`Total original lessons: ${allLessons.length}`);

function getWordsFromLessons(lessonIndices) {
    let words = [];
    for (const idx of lessonIndices) {
        if (allLessons[idx] && allLessons[idx].vocab) {
            words = words.concat(allLessons[idx].vocab);
        }
    }
    return words;
}

const newStructure = [
    // Batch 1
    { title: "Bài Mở Đầu: Hệ thống ngữ âm Pinyin", theme: "CHUYÊN ĐỀ MỞ ĐẦU: NGỮ ÂM", oldIndices: [0] },
    { title: "Bài 1: Xin chào! Bạn tên là gì?", theme: "CHỦ ĐỀ I: CHÀO HỎI & LÀM QUEN", oldIndices: [1] },
    { title: "Bài 2: Bạn là người nước nào?", theme: "CHỦ ĐỀ I: CHÀO HỎI & LÀM QUEN", oldIndices: [2] },
    // Batch 2
    { title: "Bài 3: Gia đình và Tuổi tác", theme: "CHỦ ĐỀ II: GIA ĐÌNH & BẠN BÈ", oldIndices: [3, 4] },
    { title: "Bài 4: Bạn làm nghề gì?", theme: "CHỦ ĐỀ II: GIA ĐÌNH & BẠN BÈ", oldIndices: [5] },
    { title: "Bài 5: Hôm nay là ngày mấy?", theme: "CHỦ ĐỀ III: THỜI GIAN & THỜI TIẾT", oldIndices: [8] },
    // Batch 3
    { title: "Bài 6: Bây giờ là mấy giờ?", theme: "CHỦ ĐỀ III: THỜI GIAN & THỜI TIẾT", oldIndices: [7] },
    { title: "Bài 7: Đồ vật xung quanh", theme: "CHỦ ĐỀ IV: ĐỊA ĐIỂM & ĐẶC ĐIỂM", oldIndices: [6, 12] },
    { title: "Bài 8: Mua sắm và Tiền bạc", theme: "CHỦ ĐỀ V: MUA SẮM & ĂN UỐNG", oldIndices: [9, 23] },
    // Batch 4
    { title: "Bài 9: Ẩm thực và Đồ uống", theme: "CHỦ ĐỀ V: MUA SẮM & ĂN UỐNG", oldIndices: [13] },
    { title: "Bài 10: Trường lớp và Học tập", theme: "CHỦ ĐỀ VI: TRƯỜNG HỌC & CÔNG VIỆC", oldIndices: [14, 21] },
    { title: "Bài 11: Thời tiết", theme: "CHỦ ĐỀ III: THỜI GIAN & THỜI TIẾT", oldIndices: [] }, 
    // Batch 5
    { title: "Bài 12: Di chuyển và Phương tiện", theme: "CHỦ ĐỀ VII: GIAO THÔNG & ĐI LẠI", oldIndices: [11, 16] },
    { title: "Bài 13: Hoạt động hàng ngày", theme: "CHỦ ĐỀ VIII: SỞ THÍCH & HOẠT ĐỘNG", oldIndices: [22] },
    { title: "Bài 14: Sở thích và Thể thao", theme: "CHỦ ĐỀ VIII: SỞ THÍCH & HOẠT ĐỘNG", oldIndices: [20] }
];

// Special case: Weather words from lesson 9 (Mua sắm và Thời tiết)
let weatherWords = [];
if (allLessons[9] && allLessons[9].vocab) {
    // take the second half of lesson 9 words, or just filter
    weatherWords = allLessons[9].vocab.slice(10); 
}

let totalWordsKept = 0;
let seenWords = new Set();
let newLessons = [];

for (let i = 0; i < newStructure.length; i++) {
    const config = newStructure[i];
    let vocab = getWordsFromLessons(config.oldIndices);
    
    if (i === 11) { // Bài 11: Thời tiết
        vocab = weatherWords;
    }
    
    let uniqueVocab = [];
    for (const v of vocab) {
        if (!seenWords.has(v.hanzi)) {
            seenWords.add(v.hanzi);
            uniqueVocab.push(v);
        }
    }
    
    // Cap at 25 words per lesson
    if (uniqueVocab.length > 25) {
        uniqueVocab = uniqueVocab.slice(0, 25);
    }
    
    totalWordsKept += uniqueVocab.length;
    
    newLessons.push({
        orderIndex: i,
        title: config.title,
        theme: config.theme,
        vocab: uniqueVocab,
        grammar: [], 
        dialogues: []
    });
}

console.log(`Total words extracted: ${totalWordsKept}`);

// Write back to 5 batches
for (let i = 0; i < 5; i++) {
    const batchLessons = newLessons.slice(i * 3, i * 3 + 3);
    const filePath = path.join(dataDir, batchFiles[i]);
    fs.writeFileSync(filePath, JSON.stringify(batchLessons, null, 2), 'utf8');
    console.log(`Wrote ${batchLessons.length} lessons to ${batchFiles[i]}`);
}

console.log('Done!');
