/**
 * SEED SCRIPT: YLE Movers Vocabulary — Batch 4 (Bài 16 - 20)
 * Chạy từ thư mục gốc: node seed-yle-movers-vocab-batch4.js
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 16: At School
  {lesson:16,word:"homework",meaning:"bài tập về nhà",example_en:"I do my homework every evening.",example_vi:"Tôi làm bài tập về nhà mỗi tối.",type:"noun"},
  {lesson:16,word:"map",meaning:"bản đồ",example_en:"Look at the map of the world.",example_vi:"Hãy nhìn vào bản đồ thế giới.",type:"noun"},
  {lesson:16,word:"mistake",meaning:"lỗi sai",example_en:"Don't worry if you make a mistake.",example_vi:"Đừng lo lắng nếu bạn mắc lỗi.",type:"noun"},
  {lesson:16,word:"project",meaning:"dự án",example_en:"We are doing a science project.",example_vi:"Chúng tôi đang làm một dự án khoa học.",type:"noun"},
  {lesson:16,word:"dictionary",meaning:"từ điển",example_en:"Look up the word in a dictionary.",example_vi:"Hãy tra từ đó trong từ điển.",type:"noun"},
  {lesson:16,word:"ruler",meaning:"cây thước",example_en:"I need a ruler to draw a line.",example_vi:"Tôi cần một cây thước để kẻ một đường.",type:"noun"},
  {lesson:16,word:"rubber",meaning:"cục tẩy",example_en:"Can I borrow your rubber?",example_vi:"Tôi có thể mượn cục tẩy của bạn không?",type:"noun"},
  {lesson:16,word:"pencil",meaning:"bút chì",example_en:"Write your name with a pencil.",example_vi:"Hãy viết tên của bạn bằng bút chì.",type:"noun"},
  {lesson:16,word:"pen",meaning:"bút mực",example_en:"He writes with a blue pen.",example_vi:"Anh ấy viết bằng một cây bút mực xanh.",type:"noun"},
  {lesson:16,word:"desk",meaning:"bàn học",example_en:"Put your books on the desk.",example_vi:"Hãy đặt sách lên bàn học.",type:"noun"},
  {lesson:16,word:"chair",meaning:"cái ghế",example_en:"Sit on your chair.",example_vi:"Hãy ngồi vào ghế của bạn.",type:"noun"},
  {lesson:16,word:"board",meaning:"cái bảng",example_en:"The teacher writes on the board.",example_vi:"Giáo viên viết lên bảng.",type:"noun"},
  {lesson:16,word:"classroom",meaning:"phòng học",example_en:"Our classroom is very big.",example_vi:"Phòng học của chúng tôi rất lớn.",type:"noun"},
  {lesson:16,word:"computer",meaning:"máy vi tính",example_en:"We use a computer in IT class.",example_vi:"Chúng tôi dùng máy tính trong giờ Tin học.",type:"noun"},
  {lesson:16,word:"test",meaning:"bài kiểm tra",example_en:"We have a math test today.",example_vi:"Hôm nay chúng tôi có một bài kiểm tra toán.",type:"noun"},
  {lesson:16,word:"exam",meaning:"kỳ thi",example_en:"Study hard for your exam.",example_vi:"Hãy học chăm chỉ cho kỳ thi.",type:"noun"},
  {lesson:16,word:"lesson",meaning:"bài học, tiết học",example_en:"The English lesson is fun.",example_vi:"Tiết học tiếng Anh rất vui.",type:"noun"},
  {lesson:16,word:"page",meaning:"trang sách",example_en:"Open your book to page 10.",example_vi:"Hãy mở sách ra trang 10.",type:"noun"},
  {lesson:16,word:"word",meaning:"từ vựng",example_en:"How do you spell this word?",example_vi:"Bạn đánh vần từ này như thế nào?",type:"noun"},
  {lesson:16,word:"backpack",meaning:"ba lô",example_en:"My backpack is heavy.",example_vi:"Ba lô của tôi rất nặng.",type:"noun"},

  // BÀI 17: Sports and Leisure 1
  {lesson:17,word:"hop",meaning:"nhảy lò cò",example_en:"Can you hop on one leg?",example_vi:"Bạn có thể nhảy lò cò trên một chân không?",type:"verb"},
  {lesson:17,word:"skip",meaning:"nhảy dây",example_en:"The girls are skipping in the yard.",example_vi:"Các cô bé đang nhảy dây ngoài sân.",type:"verb"},
  {lesson:17,word:"skate",meaning:"trượt băng, trượt patin",example_en:"I like to skate in the park.",example_vi:"Tôi thích trượt patin trong công viên.",type:"verb"},
  {lesson:17,word:"dance",meaning:"nhảy múa",example_en:"She can dance very well.",example_vi:"Cô ấy có thể nhảy múa rất giỏi.",type:"verb"},
  {lesson:17,word:"climb",meaning:"leo trèo",example_en:"Monkeys can climb trees.",example_vi:"Khỉ có thể leo cây.",type:"verb"},
  {lesson:17,word:"run",meaning:"chạy",example_en:"He runs very fast.",example_vi:"Anh ấy chạy rất nhanh.",type:"verb"},
  {lesson:17,word:"kick",meaning:"đá",example_en:"Kick the ball to me.",example_vi:"Hãy đá quả bóng về phía tôi.",type:"verb"},
  {lesson:17,word:"throw",meaning:"ném",example_en:"Throw the ball into the net.",example_vi:"Hãy ném quả bóng vào lưới.",type:"verb"},
  {lesson:17,word:"hit",meaning:"đánh",example_en:"Hit the ball with your racket.",example_vi:"Hãy đánh quả bóng bằng cây vợt của bạn.",type:"verb"},
  {lesson:17,word:"bat",meaning:"gậy đánh bóng",example_en:"He has a baseball bat.",example_vi:"Cậu ấy có một cây gậy bóng chày.",type:"noun"},
  {lesson:17,word:"ball",meaning:"quả bóng",example_en:"Catch the ball!",example_vi:"Hãy bắt lấy quả bóng!",type:"noun"},
  {lesson:17,word:"racket",meaning:"cây vợt",example_en:"I need a new tennis racket.",example_vi:"Tôi cần một cây vợt tennis mới.",type:"noun"},
  {lesson:17,word:"net",meaning:"cái lưới",example_en:"The ball goes over the net.",example_vi:"Quả bóng bay qua lưới.",type:"noun"},
  {lesson:17,word:"pool",meaning:"hồ bơi",example_en:"Let's jump into the pool.",example_vi:"Cùng nhảy xuống hồ bơi nào.",type:"noun"},
  {lesson:17,word:"team",meaning:"đội tuyển",example_en:"Our team won the game.",example_vi:"Đội của chúng tôi đã chiến thắng trận đấu.",type:"noun"},
  {lesson:17,word:"match",meaning:"trận đấu",example_en:"I watched a football match yesterday.",example_vi:"Tôi đã xem một trận bóng đá hôm qua.",type:"noun"},
  {lesson:17,word:"score",meaning:"tỉ số, ghi bàn",example_en:"What is the score?",example_vi:"Tỉ số là bao nhiêu?",type:"noun"},
  {lesson:17,word:"point",meaning:"điểm số",example_en:"We need one more point to win.",example_vi:"Chúng ta cần một điểm nữa để chiến thắng.",type:"noun"},
  {lesson:17,word:"game",meaning:"trò chơi",example_en:"Let's play a game.",example_vi:"Hãy chơi một trò chơi nào.",type:"noun"},
  {lesson:17,word:"sport",meaning:"thể thao",example_en:"Football is my favourite sport.",example_vi:"Bóng đá là môn thể thao yêu thích của tôi.",type:"noun"},

  // BÀI 18: Sports and Leisure 2
  {lesson:18,word:"CD",meaning:"đĩa CD",example_en:"I listen to music on a CD.",example_vi:"Tôi nghe nhạc trên một chiếc đĩa CD.",type:"noun"},
  {lesson:18,word:"DVD",meaning:"đĩa DVD",example_en:"We watch a film on DVD.",example_vi:"Chúng tôi xem một bộ phim trên đĩa DVD.",type:"noun"},
  {lesson:18,word:"video game",meaning:"trò chơi điện tử",example_en:"He plays video games every day.",example_vi:"Cậu ấy chơi trò chơi điện tử mỗi ngày.",type:"noun"},
  {lesson:18,word:"comic",meaning:"truyện tranh",example_en:"I like reading comics.",example_vi:"Tôi thích đọc truyện tranh.",type:"noun"},
  {lesson:18,word:"internet",meaning:"mạng internet",example_en:"You can find it on the internet.",example_vi:"Bạn có thể tìm thấy nó trên mạng internet.",type:"noun"},
  {lesson:18,word:"radio",meaning:"đài phát thanh",example_en:"My grandpa listens to the radio.",example_vi:"Ông tôi thường nghe đài.",type:"noun"},
  {lesson:18,word:"television",meaning:"ti-vi",example_en:"Turn on the television.",example_vi:"Hãy bật ti-vi lên.",type:"noun"},
  {lesson:18,word:"program",meaning:"chương trình",example_en:"This is a good TV program.",example_vi:"Đây là một chương trình TV hay.",type:"noun"},
  {lesson:18,word:"camera",meaning:"máy ảnh",example_en:"I take photos with my camera.",example_vi:"Tôi chụp ảnh bằng máy ảnh của mình.",type:"noun"},
  {lesson:18,word:"picture",meaning:"bức tranh",example_en:"She paints a beautiful picture.",example_vi:"Cô ấy vẽ một bức tranh tuyệt đẹp.",type:"noun"},
  {lesson:18,word:"paint",meaning:"tô màu, vẽ",example_en:"I like to paint.",example_vi:"Tôi thích vẽ và tô màu.",type:"verb"},
  {lesson:18,word:"draw",meaning:"vẽ",example_en:"Can you draw a cat?",example_vi:"Bạn có thể vẽ một con mèo không?",type:"verb"},
  {lesson:18,word:"read",meaning:"đọc",example_en:"I read a book before bed.",example_vi:"Tôi đọc một quyển sách trước khi đi ngủ.",type:"verb"},
  {lesson:18,word:"write",meaning:"viết",example_en:"Write your name here.",example_vi:"Hãy viết tên bạn vào đây.",type:"verb"},
  {lesson:18,word:"sing",meaning:"hát",example_en:"The birds sing in the morning.",example_vi:"Những chú chim hót vào buổi sáng.",type:"verb"},
  {lesson:18,word:"listen",meaning:"nghe",example_en:"Listen to the teacher.",example_vi:"Hãy lắng nghe giáo viên.",type:"verb"},
  {lesson:18,word:"watch",meaning:"xem",example_en:"I watch TV at night.",example_vi:"Tôi xem TV vào buổi tối.",type:"verb"},
  {lesson:18,word:"play",meaning:"chơi",example_en:"Let's play outside.",example_vi:"Chúng ta hãy ra ngoài chơi.",type:"verb"},
  {lesson:18,word:"music",meaning:"âm nhạc",example_en:"I love pop music.",example_vi:"Tôi yêu thích nhạc pop.",type:"noun"},
  {lesson:18,word:"hobby",meaning:"sở thích",example_en:"Reading is my hobby.",example_vi:"Đọc sách là sở thích của tôi.",type:"noun"},

  // BÀI 19: Work and Jobs
  {lesson:19,word:"clown",meaning:"chú hề",example_en:"The clown is very funny.",example_vi:"Chú hề trông rất buồn cười.",type:"noun"},
  {lesson:19,word:"farmer",meaning:"nông dân",example_en:"The farmer works on the farm.",example_vi:"Bác nông dân làm việc ở nông trại.",type:"noun"},
  {lesson:19,word:"cook",meaning:"đầu bếp",example_en:"My dad is a good cook.",example_vi:"Bố tôi là một đầu bếp giỏi.",type:"noun"},
  {lesson:19,word:"dentist",meaning:"nha sĩ",example_en:"I go to the dentist to check my teeth.",example_vi:"Tôi đi đến nha sĩ để kiểm tra răng.",type:"noun"},
  {lesson:19,word:"driver",meaning:"tài xế",example_en:"The bus driver is friendly.",example_vi:"Bác tài xế xe buýt rất thân thiện.",type:"noun"},
  {lesson:19,word:"pilot",meaning:"phi công",example_en:"A pilot flies a plane.",example_vi:"Một phi công thì lái máy bay.",type:"noun"},
  {lesson:19,word:"teacher",meaning:"giáo viên",example_en:"She is an English teacher.",example_vi:"Cô ấy là một giáo viên tiếng Anh.",type:"noun"},
  {lesson:19,word:"singer",meaning:"ca sĩ",example_en:"That singer has a beautiful voice.",example_vi:"Cô ca sĩ đó có giọng hát tuyệt vời.",type:"noun"},
  {lesson:19,word:"vet",meaning:"bác sĩ thú y",example_en:"The vet helps sick animals.",example_vi:"Bác sĩ thú y chữa bệnh cho các loài động vật bị ốm.",type:"noun"},
  {lesson:19,word:"actor",meaning:"diễn viên",example_en:"He is a famous actor.",example_vi:"Anh ấy là một diễn viên nổi tiếng.",type:"noun"},
  {lesson:19,word:"builder",meaning:"thợ xây",example_en:"The builder is building a house.",example_vi:"Bác thợ xây đang xây một ngôi nhà.",type:"noun"},
  {lesson:19,word:"mechanic",meaning:"thợ máy",example_en:"The mechanic fixes cars.",example_vi:"Bác thợ máy sửa chữa xe hơi.",type:"noun"},
  {lesson:19,word:"shop assistant",meaning:"nhân viên bán hàng",example_en:"The shop assistant helps me buy a shirt.",example_vi:"Nhân viên bán hàng giúp tôi mua một chiếc áo.",type:"noun"},
  {lesson:19,word:"waiter",meaning:"bồi bàn",example_en:"The waiter brings our food.",example_vi:"Người bồi bàn mang thức ăn ra cho chúng tôi.",type:"noun"},
  {lesson:19,word:"police officer",meaning:"cảnh sát",example_en:"The police officer catches thieves.",example_vi:"Chú cảnh sát bắt trộm.",type:"noun"},
  {lesson:19,word:"firefighter",meaning:"lính cứu hỏa",example_en:"A firefighter puts out fires.",example_vi:"Lính cứu hỏa dập tắt các đám cháy.",type:"noun"},
  {lesson:19,word:"hospital",meaning:"bệnh viện",example_en:"Doctors work in a hospital.",example_vi:"Bác sĩ làm việc trong bệnh viện.",type:"noun"},
  {lesson:19,word:"farm",meaning:"nông trại",example_en:"There are cows on the farm.",example_vi:"Có những con bò ở nông trại.",type:"noun"},
  {lesson:19,word:"work",meaning:"làm việc",example_en:"My mom works in an office.",example_vi:"Mẹ tôi làm việc trong một văn phòng.",type:"verb"},
  {lesson:19,word:"job",meaning:"công việc",example_en:"What is your job?",example_vi:"Công việc của bạn là gì?",type:"noun"},

  // BÀI 20: Numbers (21 to 100)
  {lesson:20,word:"twenty",meaning:"số hai mươi",example_en:"I have twenty books.",example_vi:"Tôi có hai mươi quyển sách.",type:"noun"},
  {lesson:20,word:"thirty",meaning:"số ba mươi",example_en:"My mom is thirty years old.",example_vi:"Mẹ tôi ba mươi tuổi.",type:"noun"},
  {lesson:20,word:"forty",meaning:"số bốn mươi",example_en:"There are forty students in my class.",example_vi:"Có bốn mươi học sinh trong lớp tôi.",type:"noun"},
  {lesson:20,word:"fifty",meaning:"số năm mươi",example_en:"I have fifty dollars.",example_vi:"Tôi có năm mươi đô la.",type:"noun"},
  {lesson:20,word:"sixty",meaning:"số sáu mươi",example_en:"There are sixty minutes in an hour.",example_vi:"Có sáu mươi phút trong một giờ.",type:"noun"},
  {lesson:20,word:"seventy",meaning:"số bảy mươi",example_en:"She collected seventy stickers.",example_vi:"Cô ấy đã sưu tầm được bảy mươi hình dán.",type:"noun"},
  {lesson:20,word:"eighty",meaning:"số tám mươi",example_en:"My grandpa is eighty years old.",example_vi:"Ông tôi tám mươi tuổi.",type:"noun"},
  {lesson:20,word:"ninety",meaning:"số chín mươi",example_en:"He got ninety points on the test.",example_vi:"Cậu ấy được chín mươi điểm trong bài kiểm tra.",type:"noun"},
  {lesson:20,word:"hundred",meaning:"hàng trăm",example_en:"I can count to one hundred.",example_vi:"Tôi có thể đếm đến một trăm.",type:"noun"},
  {lesson:20,word:"first",meaning:"thứ nhất, đầu tiên",example_en:"I am the first person here.",example_vi:"Tôi là người đầu tiên ở đây.",type:"noun"},
  {lesson:20,word:"second",meaning:"thứ hai",example_en:"This is my second time.",example_vi:"Đây là lần thứ hai của tôi.",type:"noun"},
  {lesson:20,word:"third",meaning:"thứ ba",example_en:"He won third place.",example_vi:"Cậu ấy đạt hạng ba.",type:"noun"},
  {lesson:20,word:"fourth",meaning:"thứ tư",example_en:"I live on the fourth floor.",example_vi:"Tôi sống ở tầng bốn.",type:"noun"},
  {lesson:20,word:"fifth",meaning:"thứ năm",example_en:"Today is my fifth birthday.",example_vi:"Hôm nay là sinh nhật lần thứ năm của tôi.",type:"noun"},
  {lesson:20,word:"sixth",meaning:"thứ sáu",example_en:"She is the sixth person.",example_vi:"Cô ấy là người thứ sáu.",type:"noun"},
  {lesson:20,word:"seventh",meaning:"thứ bảy",example_en:"This is the seventh day of the week.",example_vi:"Đây là ngày thứ bảy trong tuần.",type:"noun"},
  {lesson:20,word:"eighth",meaning:"thứ tám",example_en:"He lives on the eighth floor.",example_vi:"Cậu ấy sống ở tầng tám.",type:"noun"},
  {lesson:20,word:"ninth",meaning:"thứ chín",example_en:"I am in ninth grade.",example_vi:"Tôi học lớp chín.",type:"noun"},
  {lesson:20,word:"tenth",meaning:"thứ mười",example_en:"This is the tenth book I read.",example_vi:"Đây là cuốn sách thứ mười mà tôi đọc.",type:"noun"},
  {lesson:20,word:"number",meaning:"con số",example_en:"What is your phone number?",example_vi:"Số điện thoại của bạn là gì?",type:"noun"}
];

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-movers' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program Movers (en-movers)!');
    return;
  }

  console.log(`✅ Tìm thấy Program: ${program.name}`);

  for (const item of VOCAB_DATA) {
    const lesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!lesson) {
      console.error(`❌ Không tìm thấy Lesson ${item.lesson} trong DB.`);
      continue;
    }

    const contentJson = JSON.stringify({
      word: item.word,
      type: item.type,
      meaning: item.meaning,
      pronunciation: `/${item.word}/`,
      example_en: item.example_en,
      example_vi: item.example_vi,
      audio_url: `/audio/movers/${item.word.replace(/\s+/g, '-')}.mp3`
    });

    const existing = await prisma.lessonContent.findFirst({
      where: {
        lessonId: lesson.id,
        contentType: 'THEORY',
        content: { contains: `"word":"${item.word}"` }
      }
    });

    if (existing) {
      console.log(`⏭️  Từ "${item.word}" (Bài ${item.lesson}) đã tồn tại.`);
      continue;
    }

    await prisma.lessonContent.create({
      data: {
        lessonId: lesson.id,
        contentType: 'THEORY',
        content: contentJson
      }
    });

    console.log(`✅ Đã thêm: ${item.word} (Bài ${item.lesson})`);
  }

  console.log('\n🎉 Hoàn thành nạp Batch 4 Từ vựng Movers!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
