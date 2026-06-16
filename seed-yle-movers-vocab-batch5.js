/**
 * SEED SCRIPT: YLE Movers Vocabulary — Batch 5 (Bài 21 - 25)
 * Chạy từ thư mục gốc: node seed-yle-movers-vocab-batch5.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 21: The World Around Us 1
  {lesson:21,word:"country",meaning:"quốc gia, vùng quê",example_en:"Vietnam is a beautiful country.",example_vi:"Việt Nam là một quốc gia tươi đẹp.",type:"noun"},
  {lesson:21,word:"forest",meaning:"rừng",example_en:"Many animals live in the forest.",example_vi:"Nhiều loài động vật sống trong rừng.",type:"noun"},
  {lesson:21,word:"island",meaning:"hòn đảo",example_en:"We went to an island for our holiday.",example_vi:"Chúng tôi đã đến một hòn đảo vào kỳ nghỉ.",type:"noun"},
  {lesson:21,word:"jungle",meaning:"rừng nhiệt đới",example_en:"Tigers live in the jungle.",example_vi:"Những con hổ sống trong rừng nhiệt đới.",type:"noun"},
  {lesson:21,word:"mountain",meaning:"ngọn núi",example_en:"They climbed the high mountain.",example_vi:"Họ đã leo lên ngọn núi cao.",type:"noun"},
  {lesson:21,word:"river",meaning:"dòng sông",example_en:"We swam in the river.",example_vi:"Chúng tôi đã bơi trên dòng sông.",type:"noun"},
  {lesson:21,word:"sea",meaning:"biển",example_en:"The sea is very blue.",example_vi:"Nước biển rất xanh.",type:"noun"},
  {lesson:21,word:"waterfall",meaning:"thác nước",example_en:"The waterfall is so beautiful.",example_vi:"Thác nước đó thật đẹp.",type:"noun"},
  {lesson:21,word:"star",meaning:"ngôi sao",example_en:"There are many stars in the sky.",example_vi:"Có rất nhiều ngôi sao trên bầu trời.",type:"noun"},
  {lesson:21,word:"moon",meaning:"mặt trăng",example_en:"The moon is bright tonight.",example_vi:"Mặt trăng đêm nay rất sáng.",type:"noun"},
  {lesson:21,word:"earth",meaning:"trái đất",example_en:"We live on the earth.",example_vi:"Chúng ta sống trên trái đất.",type:"noun"},
  {lesson:21,word:"world",meaning:"thế giới",example_en:"There are many countries in the world.",example_vi:"Có rất nhiều quốc gia trên thế giới.",type:"noun"},
  {lesson:21,word:"space",meaning:"không gian, vũ trụ",example_en:"Astronauts travel to space.",example_vi:"Các phi hành gia du hành vào không gian.",type:"noun"},
  {lesson:21,word:"alien",meaning:"người ngoài hành tinh",example_en:"I saw an alien in a film.",example_vi:"Tôi đã thấy người ngoài hành tinh trong phim.",type:"noun"},
  {lesson:21,word:"ground",meaning:"mặt đất",example_en:"An apple fell on the ground.",example_vi:"Một quả táo rơi xuống mặt đất.",type:"noun"},
  {lesson:21,word:"plant",meaning:"cây cối",example_en:"Water the plant every day.",example_vi:"Hãy tưới cây mỗi ngày.",type:"noun"},
  {lesson:21,word:"leaf",meaning:"chiếc lá",example_en:"A green leaf fell down.",example_vi:"Một chiếc lá xanh rơi xuống.",type:"noun"},
  {lesson:21,word:"grass",meaning:"cỏ",example_en:"Sit on the green grass.",example_vi:"Hãy ngồi trên bãi cỏ xanh.",type:"noun"},
  {lesson:21,word:"tree",meaning:"cây",example_en:"The tree is very tall.",example_vi:"Cái cây rất cao.",type:"noun"},
  {lesson:21,word:"wood",meaning:"khu rừng nhỏ, gỗ",example_en:"We walked in the wood.",example_vi:"Chúng tôi đã đi dạo trong một khu rừng nhỏ.",type:"noun"},

  // BÀI 22: The World Around Us 2
  {lesson:22,word:"beach",meaning:"bãi biển",example_en:"We played on the beach.",example_vi:"Chúng tôi đã chơi đùa trên bãi biển.",type:"noun"},
  {lesson:22,word:"sand",meaning:"cát",example_en:"The sand is yellow.",example_vi:"Cát có màu vàng.",type:"noun"},
  {lesson:22,word:"shell",meaning:"vỏ sò",example_en:"I found a beautiful shell.",example_vi:"Tôi đã tìm thấy một vỏ sò tuyệt đẹp.",type:"noun"},
  {lesson:22,word:"rock",meaning:"hòn đá, tảng đá",example_en:"Don't sit on the rock.",example_vi:"Đừng ngồi lên tảng đá đó.",type:"noun"},
  {lesson:22,word:"wave",meaning:"con sóng",example_en:"The wave is big.",example_vi:"Con sóng rất lớn.",type:"noun"},
  {lesson:22,word:"ocean",meaning:"đại dương",example_en:"Whales live in the ocean.",example_vi:"Cá voi sống dưới đại dương.",type:"noun"},
  {lesson:22,word:"boat",meaning:"thuyền nhỏ",example_en:"We go fishing on a boat.",example_vi:"Chúng tôi đi câu cá trên một chiếc thuyền.",type:"noun"},
  {lesson:22,word:"ship",meaning:"tàu thủy",example_en:"The ship is crossing the sea.",example_vi:"Con tàu đang băng qua biển.",type:"noun"},
  {lesson:22,word:"sail",meaning:"cánh buồm, giăng buồm",example_en:"The boat has a white sail.",example_vi:"Con thuyền có một cánh buồm trắng.",type:"noun"},
  {lesson:22,word:"swim",meaning:"bơi",example_en:"Can you swim?",example_vi:"Bạn có biết bơi không?",type:"verb"},
  {lesson:22,word:"towel",meaning:"khăn tắm",example_en:"Bring a towel to the beach.",example_vi:"Hãy mang theo khăn tắm ra bãi biển.",type:"noun"},
  {lesson:22,word:"swimsuit",meaning:"đồ bơi",example_en:"She puts on her swimsuit.",example_vi:"Cô ấy mặc đồ bơi vào.",type:"noun"},
  {lesson:22,word:"sunglasses",meaning:"kính râm",example_en:"I wear sunglasses in the sun.",example_vi:"Tôi đeo kính râm dưới trời nắng.",type:"noun"},
  {lesson:22,word:"sun",meaning:"mặt trời",example_en:"The sun is very hot.",example_vi:"Mặt trời rất nóng.",type:"noun"},
  {lesson:22,word:"sunny",meaning:"có nắng",example_en:"It is a sunny day.",example_vi:"Đó là một ngày có nắng.",type:"adjective"},
  {lesson:22,word:"hot",meaning:"nóng nực",example_en:"The sand is very hot.",example_vi:"Cát rất nóng.",type:"adjective"},
  {lesson:22,word:"holiday",meaning:"kỳ nghỉ",example_en:"We go to the beach for our holiday.",example_vi:"Chúng tôi đi biển vào kỳ nghỉ.",type:"noun"},
  {lesson:22,word:"trip",meaning:"chuyến đi",example_en:"How was your trip?",example_vi:"Chuyến đi của bạn thế nào?",type:"noun"},
  {lesson:22,word:"travel",meaning:"du lịch, đi lại",example_en:"I want to travel around the world.",example_vi:"Tôi muốn đi du lịch vòng quanh thế giới.",type:"verb"},
  {lesson:22,word:"map",meaning:"bản đồ",example_en:"We need a map to find the island.",example_vi:"Chúng ta cần một bản đồ để tìm hòn đảo đó.",type:"noun"},

  // BÀI 23: Describing Things
  {lesson:23,word:"big",meaning:"to, lớn",example_en:"The elephant is big.",example_vi:"Con voi rất lớn.",type:"adjective"},
  {lesson:23,word:"small",meaning:"nhỏ, bé",example_en:"The mouse is small.",example_vi:"Con chuột thì nhỏ bé.",type:"adjective"},
  {lesson:23,word:"long",meaning:"dài",example_en:"She has long hair.",example_vi:"Cô ấy có mái tóc dài.",type:"adjective"},
  {lesson:23,word:"short",meaning:"ngắn, thấp",example_en:"He is a short boy.",example_vi:"Cậu ấy là một cậu bé thấp.",type:"adjective"},
  {lesson:23,word:"tall",meaning:"cao",example_en:"The tree is very tall.",example_vi:"Cái cây rất cao.",type:"adjective"},
  {lesson:23,word:"dirty",meaning:"dơ, bẩn",example_en:"Wash your dirty hands.",example_vi:"Hãy rửa đôi tay bẩn của bạn đi.",type:"adjective"},
  {lesson:23,word:"clean",meaning:"sạch sẽ",example_en:"My room is clean.",example_vi:"Phòng của tôi rất sạch sẽ.",type:"adjective"},
  {lesson:23,word:"old",meaning:"cũ, già",example_en:"This book is very old.",example_vi:"Quyển sách này rất cũ.",type:"adjective"},
  {lesson:23,word:"new",meaning:"mới",example_en:"I have a new bike.",example_vi:"Tôi có một chiếc xe đạp mới.",type:"adjective"},
  {lesson:23,word:"beautiful",meaning:"đẹp",example_en:"The flower is beautiful.",example_vi:"Bông hoa thật đẹp.",type:"adjective"},
  {lesson:23,word:"ugly",meaning:"xấu xí",example_en:"That is an ugly monster.",example_vi:"Đó là một con quái vật xấu xí.",type:"adjective"},
  {lesson:23,word:"funny",meaning:"buồn cười, hài hước",example_en:"He is a funny clown.",example_vi:"Chú ấy là một chú hề hài hước.",type:"adjective"},
  {lesson:23,word:"boring",meaning:"nhàm chán",example_en:"This film is boring.",example_vi:"Bộ phim này thật nhàm chán.",type:"adjective"},
  {lesson:23,word:"easy",meaning:"dễ dàng",example_en:"The test was easy.",example_vi:"Bài kiểm tra rất dễ.",type:"adjective"},
  {lesson:23,word:"difficult",meaning:"khó khăn",example_en:"Maths can be difficult.",example_vi:"Môn toán có thể rất khó.",type:"adjective"},
  {lesson:23,word:"quick",meaning:"nhanh nhẹn",example_en:"He is a quick runner.",example_vi:"Anh ấy là một người chạy nhanh.",type:"adjective"},
  {lesson:23,word:"slow",meaning:"chậm chạp",example_en:"A snail is slow.",example_vi:"Một con ốc sên thì di chuyển chậm chạp.",type:"adjective"},
  {lesson:23,word:"loud",meaning:"to, ồn ào",example_en:"The music is too loud.",example_vi:"Tiếng nhạc quá ồn ào.",type:"adjective"},
  {lesson:23,word:"quiet",meaning:"yên tĩnh",example_en:"Please be quiet in the library.",example_vi:"Làm ơn giữ yên lặng trong thư viện.",type:"adjective"},
  {lesson:23,word:"different",meaning:"khác biệt",example_en:"They have different colors.",example_vi:"Chúng có những màu sắc khác nhau.",type:"adjective"},

  // BÀI 24: Describing Feelings
  {lesson:24,word:"happy",meaning:"vui vẻ, hạnh phúc",example_en:"I am very happy today.",example_vi:"Hôm nay tôi rất vui.",type:"adjective"},
  {lesson:24,word:"sad",meaning:"buồn bã",example_en:"She is sad because she lost her toy.",example_vi:"Cô bé buồn vì làm mất đồ chơi.",type:"adjective"},
  {lesson:24,word:"angry",meaning:"tức giận",example_en:"The dog is angry.",example_vi:"Con chó đang tức giận.",type:"adjective"},
  {lesson:24,word:"scared",meaning:"sợ hãi",example_en:"Are you scared of spiders?",example_vi:"Bạn có sợ nhện không?",type:"adjective"},
  {lesson:24,word:"tired",meaning:"mệt mỏi",example_en:"I feel tired after the run.",example_vi:"Tôi cảm thấy mệt mỏi sau khi chạy.",type:"adjective"},
  {lesson:24,word:"surprised",meaning:"ngạc nhiên",example_en:"He was surprised by the gift.",example_vi:"Anh ấy rất ngạc nhiên vì món quà.",type:"adjective"},
  {lesson:24,word:"excited",meaning:"hào hứng",example_en:"I am excited about the trip.",example_vi:"Tôi rất hào hứng với chuyến đi.",type:"adjective"},
  {lesson:24,word:"bored",meaning:"chán nản",example_en:"He feels bored at home.",example_vi:"Cậu ấy cảm thấy chán nản khi ở nhà.",type:"adjective"},
  {lesson:24,word:"awake",meaning:"thức giấc",example_en:"The baby is awake.",example_vi:"Em bé đang thức.",type:"adjective"},
  {lesson:24,word:"asleep",meaning:"đang ngủ",example_en:"The cat is asleep on the sofa.",example_vi:"Con mèo đang ngủ trên ghế sofa.",type:"adjective"},
  {lesson:24,word:"brave",meaning:"dũng cảm",example_en:"The brave knight fought the dragon.",example_vi:"Chàng hiệp sĩ dũng cảm đã chiến đấu với rồng.",type:"adjective"},
  {lesson:24,word:"clever",meaning:"thông minh, khéo léo",example_en:"She is a clever girl.",example_vi:"Cô bé là một cô bé thông minh.",type:"adjective"},
  {lesson:24,word:"naughty",meaning:"nghịch ngợm, hư",example_en:"The naughty boy broke the window.",example_vi:"Cậu bé nghịch ngợm đã làm vỡ cửa sổ.",type:"adjective"},
  {lesson:24,word:"good",meaning:"tốt, giỏi",example_en:"You did a good job.",example_vi:"Bạn đã làm rất tốt.",type:"adjective"},
  {lesson:24,word:"bad",meaning:"tồi, xấu",example_en:"Smoking is a bad habit.",example_vi:"Hút thuốc là một thói quen xấu.",type:"adjective"},
  {lesson:24,word:"great",meaning:"tuyệt vời",example_en:"That is a great idea!",example_vi:"Đó là một ý tưởng tuyệt vời!",type:"adjective"},
  {lesson:24,word:"nice",meaning:"tốt, dễ thương",example_en:"Have a nice day!",example_vi:"Chúc một ngày tốt lành!",type:"adjective"},
  {lesson:24,word:"kind",meaning:"tử tế",example_en:"She is very kind to animals.",example_vi:"Cô ấy rất tử tế với động vật.",type:"adjective"},
  {lesson:24,word:"right",meaning:"đúng, phải",example_en:"Your answer is right.",example_vi:"Câu trả lời của bạn đúng rồi.",type:"adjective"},
  {lesson:24,word:"wrong",meaning:"sai",example_en:"This is the wrong key.",example_vi:"Đây là chìa khóa sai.",type:"adjective"},

  // BÀI 25: Final Review - Movers (20 Common Verbs)
  {lesson:25,word:"ask",meaning:"hỏi",example_en:"Ask the teacher for help.",example_vi:"Hãy hỏi giáo viên để được giúp đỡ.",type:"verb"},
  {lesson:25,word:"answer",meaning:"trả lời",example_en:"Can you answer this question?",example_vi:"Bạn có thể trả lời câu hỏi này không?",type:"verb"},
  {lesson:25,word:"bring",meaning:"mang đến",example_en:"Please bring your book tomorrow.",example_vi:"Vui lòng mang theo sách vào ngày mai.",type:"verb"},
  {lesson:25,word:"buy",meaning:"mua",example_en:"I want to buy a new bag.",example_vi:"Tôi muốn mua một chiếc túi mới.",type:"verb"},
  {lesson:25,word:"carry",meaning:"mang, vác, xách",example_en:"He carries a heavy box.",example_vi:"Anh ấy xách một cái hộp nặng.",type:"verb"},
  {lesson:25,word:"choose",meaning:"lựa chọn",example_en:"Choose your favourite colour.",example_vi:"Hãy chọn màu sắc yêu thích của bạn.",type:"verb"},
  {lesson:25,word:"clean",meaning:"làm sạch, lau dọn",example_en:"Clean your room, please.",example_vi:"Làm ơn hãy dọn dẹp phòng của bạn.",type:"verb"},
  {lesson:25,word:"cook",meaning:"nấu ăn",example_en:"My dad can cook well.",example_vi:"Bố tôi nấu ăn rất giỏi.",type:"verb"},
  {lesson:25,word:"drop",meaning:"đánh rơi",example_en:"Don't drop the glass.",example_vi:"Đừng đánh rơi chiếc ly.",type:"verb"},
  {lesson:25,word:"email",meaning:"gửi thư điện tử",example_en:"I will email you the picture.",example_vi:"Tôi sẽ gửi email bức ảnh cho bạn.",type:"verb"},
  {lesson:25,word:"excuse",meaning:"xin lỗi (khi làm phiền)",example_en:"Excuse me, where is the station?",example_vi:"Xin lỗi, nhà ga ở đâu vậy?",type:"verb"},
  {lesson:25,word:"find",meaning:"tìm thấy",example_en:"I can't find my keys.",example_vi:"Tôi không thể tìm thấy chìa khóa của mình.",type:"verb"},
  {lesson:25,word:"give",meaning:"đưa cho, tặng",example_en:"Give me the pen, please.",example_vi:"Làm ơn đưa cho tôi cây bút.",type:"verb"},
  {lesson:25,word:"help",meaning:"giúp đỡ",example_en:"Can you help me?",example_vi:"Bạn có thể giúp tôi không?",type:"verb"},
  {lesson:25,word:"invite",meaning:"mời",example_en:"I want to invite you to my party.",example_vi:"Tôi muốn mời bạn đến bữa tiệc của tôi.",type:"verb"},
  {lesson:25,word:"know",meaning:"biết",example_en:"I know the answer.",example_vi:"Tôi biết câu trả lời.",type:"verb"},
  {lesson:25,word:"lose",meaning:"làm mất, thua",example_en:"Don't lose your money.",example_vi:"Đừng làm mất tiền nhé.",type:"verb"},
  {lesson:25,word:"make",meaning:"làm, tạo ra",example_en:"Let's make a cake.",example_vi:"Chúng ta hãy làm một chiếc bánh.",type:"verb"},
  {lesson:25,word:"need",meaning:"cần",example_en:"I need a drink of water.",example_vi:"Tôi cần uống một ngụm nước.",type:"verb"},
  {lesson:25,word:"open",meaning:"mở ra",example_en:"Open the door.",example_vi:"Hãy mở cửa ra.",type:"verb"}
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

  console.log('\n🎉 Hoàn thành nạp Batch 5 Từ vựng Movers!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
