const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

const NEW_LESSONS = [
  {
    title: 'Lesson 11: Getting Around',
    theme: 'TOPIC 3: THE WORLD AROUND ME',
    orderIndex: 11,
    vocab_words: ['bike', 'boat', 'bus', 'car', 'helicopter', 'motorbike', 'plane', 'train', 'beach', 'cinema', 'hospital', 'library', 'park', 'restaurant', 'shop', 'supermarket', 'school', 'home'],
    grammar_ids: [5, 6],
    dialogues: [
      {
        title: 'Dialogue 1: How do you get to school?',
        lines: [
          { speaker: 'A', en: 'How do you get to school?', vi: 'Bạn đi học bằng gì?' },
          { speaker: 'B', en: 'I go by bus. How about you?', vi: 'Mình đi bằng xe buýt. Còn bạn?' },
          { speaker: 'A', en: 'I ride my bike to school.', vi: 'Mình đạp xe đến trường.' },
          { speaker: 'B', en: 'That\'s great! It\'s good for you.', vi: 'Tuyệt! Đạp xe rất tốt cho sức khỏe.' }
        ]
      },
      {
        title: 'Dialogue 2: Where are you going?',
        lines: [
          { speaker: 'A', en: 'Where are you going?', vi: 'Bạn đang đi đâu vậy?' },
          { speaker: 'B', en: 'I\'m going to the park.', vi: 'Mình đang đi đến công viên.' },
          { speaker: 'A', en: 'Can I come with you?', vi: 'Mình có thể đi cùng bạn không?' },
          { speaker: 'B', en: 'Of course! Let\'s go together.', vi: 'Tất nhiên! Chúng ta cùng đi nhé.' }
        ]
      }
    ]
  },
  {
    title: 'Lesson 12: What I Wear',
    theme: 'TOPIC 3: THE WORLD AROUND ME',
    orderIndex: 12,
    vocab_words: ['T-shirt', 'dress', 'hat', 'jacket', 'jeans', 'shoes', 'skirt', 'socks', 'sweater', 'big', 'small', 'tall', 'short', 'old', 'young', 'fast', 'slow', 'long', 'new', 'beautiful'],
    grammar_ids: [7, 8],
    dialogues: [
      {
        title: 'Dialogue 1: Getting dressed',
        lines: [
          { speaker: 'A', en: 'What are you wearing today?', vi: 'Hôm nay bạn mặc gì?' },
          { speaker: 'B', en: 'I\'m wearing a blue T-shirt and jeans.', vi: 'Mình mặc áo phông xanh và quần jeans.' },
          { speaker: 'A', en: 'That looks nice! Is it new?', vi: 'Trông đẹp quá! Nó mới không?' },
          { speaker: 'B', en: 'Yes, my mum bought it for me.', vi: 'Vâng, mẹ mình mua cho mình đó.' }
        ]
      },
      {
        title: 'Dialogue 2: Shopping for clothes',
        lines: [
          { speaker: 'A', en: 'Excuse me, do you have this dress in small?', vi: 'Xin lỗi, bạn có chiếc váy này size nhỏ không?' },
          { speaker: 'B', en: 'Yes, we do. Here you are.', vi: 'Có ạ. Đây bạn nhé.' },
          { speaker: 'A', en: 'Thank you! It\'s very beautiful.', vi: 'Cảm ơn! Nó rất đẹp.' },
          { speaker: 'B', en: 'You\'re welcome!', vi: 'Không có gì ạ!' }
        ]
      }
    ]
  },
  {
    title: 'Lesson 13: Days and Time',
    theme: 'TOPIC 4: MY DAY',
    orderIndex: 13,
    vocab_words: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'here', 'there', 'very', 'where', 'what', 'who', 'how', 'when', 'today', 'tomorrow', 'morning', 'afternoon', 'evening'],
    grammar_ids: [9, 10],
    dialogues: [
      {
        title: 'Dialogue 1: Days of the week',
        lines: [
          { speaker: 'A', en: 'What day is it today?', vi: 'Hôm nay là thứ mấy?' },
          { speaker: 'B', en: 'It\'s Monday. Why?', vi: 'Thứ Hai. Sao vậy?' },
          { speaker: 'A', en: 'I have football on Wednesday.', vi: 'Mình có buổi bóng đá vào thứ Tư.' },
          { speaker: 'B', en: 'Cool! I play tennis on Friday.', vi: 'Hay đấy! Mình chơi tennis vào thứ Sáu.' }
        ]
      },
      {
        title: 'Dialogue 2: Plans for the weekend',
        lines: [
          { speaker: 'A', en: 'What do you do on Saturday?', vi: 'Thứ Bảy bạn làm gì?' },
          { speaker: 'B', en: 'I go to the park with my family.', vi: 'Mình đi công viên với gia đình.' },
          { speaker: 'A', en: 'And on Sunday?', vi: 'Còn Chủ Nhật thì sao?' },
          { speaker: 'B', en: 'I stay at home and read books.', vi: 'Mình ở nhà và đọc sách.' }
        ]
      }
    ]
  },
  {
    title: 'Lesson 14: Nature and Animals',
    theme: 'TOPIC 4: MY DAY',
    orderIndex: 14,
    vocab_words: ['flower', 'grass', 'lake', 'leaf', 'moon', 'mountain', 'river', 'sea', 'star', 'sun', 'tree', 'butterfly', 'goat', 'mouse', 'sheep', 'baseball', 'board game', 'child', 'friend', 'person'],
    grammar_ids: [3, 4],
    dialogues: [
      {
        title: 'Dialogue 1: In the park',
        lines: [
          { speaker: 'A', en: 'Look at the flowers! They\'re so beautiful.', vi: 'Nhìn những bông hoa kìa! Chúng đẹp quá.' },
          { speaker: 'B', en: 'Yes! And I can see a butterfly!', vi: 'Đúng! Và mình còn thấy một con bướm nữa!' },
          { speaker: 'A', en: 'The lake is very big.', vi: 'Cái hồ rất rộng.' },
          { speaker: 'B', en: 'There are trees and mountains too!', vi: 'Còn có cả cây và núi nữa kìa!' }
        ]
      },
      {
        title: 'Dialogue 2: At the farm',
        lines: [
          { speaker: 'A', en: 'What animals do you have on the farm?', vi: 'Trang trại bạn có những con vật gì?' },
          { speaker: 'B', en: 'We have sheep, goats and a mouse!', vi: 'Chúng mình có cừu, dê và cả một con chuột!' },
          { speaker: 'A', en: 'A mouse? That\'s funny!', vi: 'Một con chuột? Buồn cười quá!' },
          { speaker: 'B', en: 'The children love the animals.', vi: 'Bọn trẻ rất thích các con vật.' }
        ]
      }
    ]
  },
  {
    title: 'Lesson 15: Action Words',
    theme: 'TOPIC 4: MY DAY',
    orderIndex: 15,
    vocab_words: ['climb', 'cook', 'drink', 'drive', 'eat', 'fly', 'laugh', 'listen', 'open', 'paint', 'run', 'sing', 'sit', 'sleep', 'stand', 'swim', 'walk', 'can', 'come', 'go'],
    grammar_ids: [11, 12],
    dialogues: [
      {
        title: 'Dialogue 1: What can you do?',
        lines: [
          { speaker: 'A', en: 'Can you swim?', vi: 'Bạn có biết bơi không?' },
          { speaker: 'B', en: 'Yes, I can swim very well! Can you?', vi: 'Có, mình bơi rất giỏi! Còn bạn?' },
          { speaker: 'A', en: 'I can\'t swim, but I can run fast.', vi: 'Mình không biết bơi, nhưng mình chạy rất nhanh.' },
          { speaker: 'B', en: 'I can sing and cook too!', vi: 'Mình cũng biết hát và nấu ăn nữa!' }
        ]
      },
      {
        title: 'Dialogue 2: Daily activities',
        lines: [
          { speaker: 'A', en: 'What do you do every morning?', vi: 'Buổi sáng bạn làm gì?' },
          { speaker: 'B', en: 'I wake up, eat breakfast, then walk to school.', vi: 'Mình thức dậy, ăn sáng, rồi đi bộ đến trường.' },
          { speaker: 'A', en: 'I ride my bike! It\'s faster.', vi: 'Mình đạp xe! Nhanh hơn đó.' },
          { speaker: 'B', en: 'I like walking. I can listen to music!', vi: 'Mình thích đi bộ. Mình có thể nghe nhạc!' }
        ]
      }
    ]
  },
  {
    title: 'Lesson 16: Everyday Life',
    theme: 'TOPIC 4: MY DAY',
    orderIndex: 16,
    vocab_words: ['candy', 'carrot', 'meat', 'onion', 'pea', 'potato', 'tomato', 'computer', 'camera', 'phone', 'umbrella', 'hundred', 'find', 'give', 'have', 'help', 'know', 'like', 'make', 'see'],
    grammar_ids: [1, 2],
    dialogues: [
      {
        title: 'Dialogue 1: At the supermarket',
        lines: [
          { speaker: 'A', en: 'Can you help me find the carrots?', vi: 'Bạn có thể giúp mình tìm cà rốt không?' },
          { speaker: 'B', en: 'Of course! They\'re over there.', vi: 'Tất nhiên! Chúng ở đằng kia kìa.' },
          { speaker: 'A', en: 'Thank you! I also need potatoes and tomatoes.', vi: 'Cảm ơn! Mình cũng cần khoai tây và cà chua.' },
          { speaker: 'B', en: 'I know where they are. Come with me!', vi: 'Mình biết chúng ở đâu. Đi với mình nhé!' }
        ]
      },
      {
        title: 'Dialogue 2: Modern life',
        lines: [
          { speaker: 'A', en: 'Do you have a computer at home?', vi: 'Bạn có máy tính ở nhà không?' },
          { speaker: 'B', en: 'Yes, I use it to do homework.', vi: 'Có, mình dùng nó để làm bài tập.' },
          { speaker: 'A', en: 'I have a camera. I like taking photos.', vi: 'Mình có máy ảnh. Mình thích chụp ảnh.' },
          { speaker: 'B', en: 'That\'s great! Can you take a photo of me?', vi: 'Hay quá! Bạn có thể chụp ảnh mình không?' }
        ]
      }
    ]
  }
];

async function seedNewLessons() {
  // Lấy program Starters
  const program = await prisma.program.findUnique({ where: { code: 'en-starters' } });
  if (!program) { console.error('Không tìm thấy program en-starters'); return; }

  // Lấy toàn bộ vocab
  const allVocabContents = await prisma.lessonContent.findMany({
    where: { contentType: 'THEORY', lesson: { programId: program.id } }
  });
  const vocabMap = new Map();
  allVocabContents.forEach(c => {
    try { const w = JSON.parse(c.content); if (w.word) vocabMap.set(w.word.toLowerCase(), w); } catch {}
  });

  // Lấy toàn bộ grammar
  const allGrammarContents = await prisma.lessonContent.findMany({
    where: { contentType: 'GRAMMAR', lesson: { programId: program.id } }
  });
  const grammarMap = new Map();
  allGrammarContents.forEach(c => {
    try { const g = JSON.parse(c.content); if (g.id) grammarMap.set(g.id, g); } catch {}
  });

  console.log(`Vocab trong DB: ${vocabMap.size} | Grammar trong DB: ${grammarMap.size}`);

  let totalLessons = 0;
  let totalVocab = 0;
  let totalGrammar = 0;
  let totalDialogue = 0;

  for (const lessonData of NEW_LESSONS) {
    // Kiểm tra bài học đã tồn tại chưa
    const existing = await prisma.lesson.findFirst({
      where: { programId: program.id, title: lessonData.title }
    });
    if (existing) {
      console.log(`Bài "${lessonData.title}" đã tồn tại, bỏ qua.`);
      continue;
    }

    // Tạo bài học mới
    const lesson = await prisma.lesson.create({
      data: {
        programId: program.id,
        title: lessonData.title,
        theme: lessonData.theme,
        orderIndex: lessonData.orderIndex
      }
    });
    totalLessons++;

    // Thêm từ vựng
    for (const word of lessonData.vocab_words) {
      const vocabDef = vocabMap.get(word.toLowerCase());
      if (vocabDef) {
        await prisma.lessonContent.create({
          data: { lessonId: lesson.id, contentType: 'THEORY', content: JSON.stringify(vocabDef) }
        });
        totalVocab++;
      } else {
        console.log(`  ⚠️ Không tìm thấy từ: "${word}"`);
      }
    }

    // Thêm ngữ pháp
    for (const grammarId of lessonData.grammar_ids) {
      const grammarDef = grammarMap.get(grammarId);
      if (grammarDef) {
        await prisma.lessonContent.create({
          data: { lessonId: lesson.id, contentType: 'GRAMMAR', content: JSON.stringify(grammarDef) }
        });
        totalGrammar++;
      }
    }

    // Thêm hội thoại
    for (const dialogue of lessonData.dialogues) {
      await prisma.lessonContent.create({
        data: { lessonId: lesson.id, contentType: 'DIALOGUE', content: JSON.stringify(dialogue) }
      });
      totalDialogue++;
    }

    console.log(`✓ "${lessonData.title}" — ${lessonData.vocab_words.length} từ, ${lessonData.grammar_ids.length} ngữ pháp, ${lessonData.dialogues.length} hội thoại`);
  }

  console.log(`\n✅ Hoàn thành!`);
  console.log(`   +${totalLessons} bài học | +${totalVocab} từ vựng | +${totalGrammar} ngữ pháp | +${totalDialogue} hội thoại`);
}

seedNewLessons()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
