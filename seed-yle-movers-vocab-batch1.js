/**
 * SEED SCRIPT: YLE Movers Vocabulary — Batch 1 (Bài 1 - 5)
 * Chạy từ thư mục gốc: node seed-yle-movers-vocab-batch1.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 1: My Family and Friends
  {lesson:1,word:"aunt",meaning:"cô, dì, thím, mợ",example_en:"My aunt lives in London.",example_vi:"Dì tôi sống ở Luân Đôn.",type:"noun"},
  {lesson:1,word:"uncle",meaning:"chú, bác, cậu, dượng",example_en:"My uncle is a doctor.",example_vi:"Chú tôi là một bác sĩ.",type:"noun"},
  {lesson:1,word:"daughter",meaning:"con gái",example_en:"She is his daughter.",example_vi:"Cô bé là con gái của ông ấy.",type:"noun"},
  {lesson:1,word:"son",meaning:"con trai",example_en:"He is their son.",example_vi:"Cậu bé là con trai của họ.",type:"noun"},
  {lesson:1,word:"grandparent",meaning:"ông bà",example_en:"My grandparents are old.",example_vi:"Ông bà tôi đã già.",type:"noun"},
  {lesson:1,word:"granddaughter",meaning:"cháu gái (của ông bà)",example_en:"She is a cute granddaughter.",example_vi:"Cô bé là một người cháu gái dễ thương.",type:"noun"},
  {lesson:1,word:"grandson",meaning:"cháu trai (của ông bà)",example_en:"He is my grandson.",example_vi:"Cậu bé là cháu trai tôi.",type:"noun"},
  {lesson:1,word:"parent",meaning:"bố hoặc mẹ",example_en:"My parents love me.",example_vi:"Bố mẹ yêu thương tôi.",type:"noun"},
  {lesson:1,word:"grown-up",meaning:"người lớn",example_en:"He is a grown-up now.",example_vi:"Bây giờ anh ấy đã là người lớn.",type:"noun"},
  {lesson:1,word:"married",meaning:"đã kết hôn",example_en:"They are married.",example_vi:"Họ đã kết hôn.",type:"adjective"},
  {lesson:1,word:"call",meaning:"gọi điện thoại, gọi tên",example_en:"I will call you.",example_vi:"Tôi sẽ gọi cho bạn.",type:"verb"},
  {lesson:1,word:"mean",meaning:"có nghĩa là",example_en:"What does this mean?",example_vi:"Điều này có nghĩa là gì?",type:"verb"},
  {lesson:1,word:"text",meaning:"nhắn tin",example_en:"I text my friend every day.",example_vi:"Tôi nhắn tin cho bạn tôi mỗi ngày.",type:"verb"},
  {lesson:1,word:"website",meaning:"trang web",example_en:"This is a good website.",example_vi:"Đây là một trang web hay.",type:"noun"},
  {lesson:1,word:"email",meaning:"thư điện tử",example_en:"Send me an email.",example_vi:"Hãy gửi cho tôi một email.",type:"noun"},
  {lesson:1,word:"video",meaning:"đoạn phim, video",example_en:"I like watching videos.",example_vi:"Tôi thích xem video.",type:"noun"},
  {lesson:1,word:"photo",meaning:"bức ảnh",example_en:"Look at this photo.",example_vi:"Hãy nhìn bức ảnh này.",type:"noun"},
  {lesson:1,word:"address",meaning:"địa chỉ",example_en:"What is your address?",example_vi:"Địa chỉ của bạn là gì?",type:"noun"},
  {lesson:1,word:"letter",meaning:"bức thư, chữ cái",example_en:"I write a letter to my pen pal.",example_vi:"Tôi viết thư cho bạn qua thư của mình.",type:"noun"},
  {lesson:1,word:"message",meaning:"tin nhắn",example_en:"Read the message.",example_vi:"Hãy đọc tin nhắn.",type:"noun"},

  // BÀI 2: The Body and Face
  {lesson:2,word:"beard",meaning:"râu quai nón",example_en:"He has a long beard.",example_vi:"Ông ấy có bộ râu dài.",type:"noun"},
  {lesson:2,word:"moustache",meaning:"ria mép",example_en:"My dad has a moustache.",example_vi:"Bố tôi có một bộ ria mép.",type:"noun"},
  {lesson:2,word:"neck",meaning:"cái cổ",example_en:"A giraffe has a long neck.",example_vi:"Hươu cao cổ có cái cổ dài.",type:"noun"},
  {lesson:2,word:"shoulder",meaning:"bờ vai",example_en:"My shoulders are tired.",example_vi:"Vai tôi đang bị mỏi.",type:"noun"},
  {lesson:2,word:"stomach",meaning:"dạ dày, bụng",example_en:"My stomach is full.",example_vi:"Bụng tôi đã no.",type:"noun"},
  {lesson:2,word:"back",meaning:"cái lưng",example_en:"My back hurts.",example_vi:"Lưng tôi bị đau.",type:"noun"},
  {lesson:2,word:"tooth",meaning:"một chiếc răng",example_en:"I lost a tooth.",example_vi:"Tôi bị rụng một chiếc răng.",type:"noun"},
  {lesson:2,word:"teeth",meaning:"hàm răng (nhiều chiếc)",example_en:"Brush your teeth.",example_vi:"Hãy đánh răng đi.",type:"noun"},
  {lesson:2,word:"curly hair",meaning:"tóc xoăn",example_en:"She has curly hair.",example_vi:"Cô ấy có mái tóc xoăn.",type:"noun"},
  {lesson:2,word:"straight hair",meaning:"tóc thẳng",example_en:"He has straight hair.",example_vi:"Anh ấy có mái tóc thẳng.",type:"noun"},
  {lesson:2,word:"blonde hair",meaning:"tóc vàng",example_en:"She has blonde hair.",example_vi:"Cô ấy có mái tóc màu vàng.",type:"noun"},
  {lesson:2,word:"fair hair",meaning:"tóc màu sáng",example_en:"The baby has fair hair.",example_vi:"Em bé có mái tóc màu sáng.",type:"noun"},
  {lesson:2,word:"fat",meaning:"béo, mập",example_en:"That cat is fat.",example_vi:"Con mèo đó mập quá.",type:"adjective"},
  {lesson:2,word:"thin",meaning:"gầy, ốm",example_en:"He is very thin.",example_vi:"Anh ấy rất gầy.",type:"adjective"},
  {lesson:2,word:"strong",meaning:"khỏe mạnh",example_en:"My brother is strong.",example_vi:"Anh trai tôi rất khỏe mạnh.",type:"adjective"},
  {lesson:2,word:"weak",meaning:"yếu ớt",example_en:"The bird is weak.",example_vi:"Chú chim đang bị yếu.",type:"adjective"},
  {lesson:2,word:"cry",meaning:"khóc",example_en:"The baby is crying.",example_vi:"Em bé đang khóc.",type:"verb"},
  {lesson:2,word:"smile",meaning:"mỉm cười",example_en:"She has a beautiful smile.",example_vi:"Cô ấy có nụ cười đẹp.",type:"verb"},
  {lesson:2,word:"laugh",meaning:"cười to",example_en:"We laugh at the funny story.",example_vi:"Chúng tôi cười vì câu chuyện hài hước.",type:"verb"},
  {lesson:2,word:"hurt",meaning:"làm đau, bị đau",example_en:"My foot hurts.",example_vi:"Chân tôi bị đau.",type:"verb"},

  // BÀI 3: Health and Illnesses
  {lesson:3,word:"headache",meaning:"chứng đau đầu",example_en:"I have a headache.",example_vi:"Tôi bị đau đầu.",type:"noun"},
  {lesson:3,word:"toothache",meaning:"chứng đau răng",example_en:"He has a toothache.",example_vi:"Cậu ấy bị đau răng.",type:"noun"},
  {lesson:3,word:"earache",meaning:"chứng đau tai",example_en:"She has an earache.",example_vi:"Cô ấy bị đau tai.",type:"noun"},
  {lesson:3,word:"stomach ache",meaning:"đau dạ dày, đau bụng",example_en:"I have a stomach ache.",example_vi:"Tôi bị đau bụng.",type:"noun"},
  {lesson:3,word:"backache",meaning:"chứng đau lưng",example_en:"My grandpa has a backache.",example_vi:"Ông tôi bị đau lưng.",type:"noun"},
  {lesson:3,word:"cold",meaning:"cảm lạnh",example_en:"I caught a cold.",example_vi:"Tôi bị cảm lạnh.",type:"noun"},
  {lesson:3,word:"cough",meaning:"ho",example_en:"He has a bad cough.",example_vi:"Anh ấy bị ho nặng.",type:"noun"},
  {lesson:3,word:"temperature",meaning:"sốt, nhiệt độ",example_en:"She has a temperature.",example_vi:"Cô ấy đang bị sốt.",type:"noun"},
  {lesson:3,word:"ill",meaning:"ốm",example_en:"He is ill today.",example_vi:"Hôm nay anh ấy bị ốm.",type:"adjective"},
  {lesson:3,word:"sick",meaning:"bệnh, buồn nôn",example_en:"I feel sick.",example_vi:"Tôi cảm thấy buồn nôn.",type:"adjective"},
  {lesson:3,word:"better",meaning:"tốt hơn, khỏe hơn",example_en:"I feel better now.",example_vi:"Bây giờ tôi cảm thấy khỏe hơn.",type:"adjective"},
  {lesson:3,word:"well",meaning:"khỏe mạnh",example_en:"I am not very well.",example_vi:"Tôi không được khỏe lắm.",type:"adjective"},
  {lesson:3,word:"hospital",meaning:"bệnh viện",example_en:"Go to the hospital.",example_vi:"Hãy đến bệnh viện.",type:"noun"},
  {lesson:3,word:"nurse",meaning:"y tá",example_en:"The nurse is kind.",example_vi:"Cô y tá rất tử tế.",type:"noun"},
  {lesson:3,word:"doctor",meaning:"bác sĩ",example_en:"I need to see a doctor.",example_vi:"Tôi cần đi khám bác sĩ.",type:"noun"},
  {lesson:3,word:"medicine",meaning:"thuốc",example_en:"Take your medicine.",example_vi:"Hãy uống thuốc của bạn.",type:"noun"},
  {lesson:3,word:"health",meaning:"sức khỏe",example_en:"Eating fruit is good for your health.",example_vi:"Ăn trái cây tốt cho sức khỏe của bạn.",type:"noun"},
  {lesson:3,word:"matter",meaning:"vấn đề",example_en:"What's the matter?",example_vi:"Có chuyện gì vậy?",type:"noun"},
  {lesson:3,word:"terrible",meaning:"tồi tệ, khủng khiếp",example_en:"I feel terrible.",example_vi:"Tôi cảm thấy rất tồi tệ.",type:"adjective"},
  {lesson:3,word:"careful",meaning:"cẩn thận",example_en:"Be careful!",example_vi:"Cẩn thận nhé!",type:"adjective"},

  // BÀI 4: Animals in the Wild
  {lesson:4,word:"bat",meaning:"con dơi",example_en:"A bat can fly at night.",example_vi:"Một con dơi có thể bay vào ban đêm.",type:"noun"},
  {lesson:4,word:"bear",meaning:"con gấu",example_en:"The bear is big and brown.",example_vi:"Con gấu rất to và có màu nâu.",type:"noun"},
  {lesson:4,word:"dolphin",meaning:"cá heo",example_en:"A dolphin is very smart.",example_vi:"Cá heo rất thông minh.",type:"noun"},
  {lesson:4,word:"kangaroo",meaning:"chuột túi",example_en:"A kangaroo can jump high.",example_vi:"Chuột túi có thể nhảy cao.",type:"noun"},
  {lesson:4,word:"lion",meaning:"sư tử",example_en:"The lion is the king of the jungle.",example_vi:"Sư tử là vua của rừng xanh.",type:"noun"},
  {lesson:4,word:"panda",meaning:"gấu trúc",example_en:"A panda eats bamboo.",example_vi:"Gấu trúc ăn tre trúc.",type:"noun"},
  {lesson:4,word:"parrot",meaning:"con vẹt",example_en:"The parrot can talk.",example_vi:"Con vẹt có thể nói.",type:"noun"},
  {lesson:4,word:"penguin",meaning:"chim cánh cụt",example_en:"Penguins live in the cold.",example_vi:"Chim cánh cụt sống ở nơi lạnh giá.",type:"noun"},
  {lesson:4,word:"shark",meaning:"cá mập",example_en:"A shark has big teeth.",example_vi:"Cá mập có những cái răng lớn.",type:"noun"},
  {lesson:4,word:"whale",meaning:"cá voi",example_en:"The whale is a very big animal.",example_vi:"Cá voi là một loài động vật rất lớn.",type:"noun"},
  {lesson:4,word:"camel",meaning:"lạc đà",example_en:"A camel lives in the desert.",example_vi:"Lạc đà sống ở sa mạc.",type:"noun"},
  {lesson:4,word:"dinosaur",meaning:"khủng long",example_en:"I like reading about dinosaurs.",example_vi:"Tôi thích đọc sách về khủng long.",type:"noun"},
  {lesson:4,word:"insect",meaning:"côn trùng",example_en:"An ant is an insect.",example_vi:"Kiến là một loài côn trùng.",type:"noun"},
  {lesson:4,word:"lizard",meaning:"thằn lằn",example_en:"There is a lizard on the wall.",example_vi:"Có một con thằn lằn trên tường.",type:"noun"},
  {lesson:4,word:"snail",meaning:"ốc sên",example_en:"A snail moves very slowly.",example_vi:"Ốc sên di chuyển rất chậm.",type:"noun"},
  {lesson:4,word:"animal",meaning:"động vật",example_en:"I love all animals.",example_vi:"Tôi yêu tất cả các loài động vật.",type:"noun"},
  {lesson:4,word:"fly",meaning:"bay",example_en:"Birds can fly.",example_vi:"Chim có thể bay.",type:"verb"},
  {lesson:4,word:"hide",meaning:"trốn, giấu",example_en:"The cat is hiding under the bed.",example_vi:"Con mèo đang trốn dưới gầm giường.",type:"verb"},
  {lesson:4,word:"jump",meaning:"nhảy",example_en:"Frogs can jump.",example_vi:"Ếch có thể nhảy.",type:"verb"},
  {lesson:4,word:"swim",meaning:"bơi",example_en:"Fish swim in the water.",example_vi:"Cá bơi trong nước.",type:"verb"},

  // BÀI 5: Animals on the Farm and Pets
  {lesson:5,word:"kitten",meaning:"mèo con",example_en:"The kitten is playing with a ball.",example_vi:"Mèo con đang chơi với một quả bóng.",type:"noun"},
  {lesson:5,word:"puppy",meaning:"chó con",example_en:"My puppy is very cute.",example_vi:"Chó con của tôi rất dễ thương.",type:"noun"},
  {lesson:5,word:"rabbit",meaning:"con thỏ",example_en:"The rabbit eats carrots.",example_vi:"Con thỏ ăn cà rốt.",type:"noun"},
  {lesson:5,word:"cage",meaning:"cái lồng, chuồng",example_en:"The bird is in the cage.",example_vi:"Con chim ở trong lồng.",type:"noun"},
  {lesson:5,word:"field",meaning:"cánh đồng",example_en:"Cows are in the field.",example_vi:"Những con bò đang ở cánh đồng.",type:"noun"},
  {lesson:5,word:"grass",meaning:"cỏ",example_en:"The sheep are eating grass.",example_vi:"Những con cừu đang ăn cỏ.",type:"noun"},
  {lesson:5,word:"leaf",meaning:"chiếc lá",example_en:"A green leaf fell from the tree.",example_vi:"Một chiếc lá xanh rơi từ trên cây xuống.",type:"noun"},
  {lesson:5,word:"plant",meaning:"thực vật, cây cối",example_en:"I water the plant.",example_vi:"Tôi tưới nước cho cây.",type:"noun"},
  {lesson:5,word:"feed",meaning:"cho ăn",example_en:"Can you feed the dog?",example_vi:"Bạn có thể cho chó ăn không?",type:"verb"},
  {lesson:5,word:"hold",meaning:"cầm, nắm, ôm",example_en:"Hold my hand.",example_vi:"Hãy nắm lấy tay tôi.",type:"verb"},
  {lesson:5,word:"pet",meaning:"thú cưng",example_en:"Do you have a pet?",example_vi:"Bạn có thú cưng không?",type:"noun"},
  {lesson:5,word:"sheep",meaning:"con cừu",example_en:"There are ten sheep.",example_vi:"Có mười con cừu.",type:"noun"},
  {lesson:5,word:"pig",meaning:"con lợn",example_en:"The pig is pink.",example_vi:"Con lợn có màu hồng.",type:"noun"},
  {lesson:5,word:"cow",meaning:"con bò sữa",example_en:"Cows give us milk.",example_vi:"Bò sữa cho chúng ta sữa.",type:"noun"},
  {lesson:5,word:"horse",meaning:"con ngựa",example_en:"He is riding a horse.",example_vi:"Anh ấy đang cưỡi ngựa.",type:"noun"},
  {lesson:5,word:"duck",meaning:"con vịt",example_en:"The duck is swimming.",example_vi:"Con vịt đang bơi.",type:"noun"},
  {lesson:5,word:"goat",meaning:"con dê",example_en:"The goat is eating leaves.",example_vi:"Con dê đang ăn lá cây.",type:"noun"},
  {lesson:5,word:"chicken",meaning:"con gà",example_en:"We have five chickens.",example_vi:"Chúng tôi có năm con gà.",type:"noun"},
  {lesson:5,word:"bird",meaning:"con chim",example_en:"A bird is singing.",example_vi:"Một chú chim đang hót.",type:"noun"},
  {lesson:5,word:"mouse",meaning:"con chuột",example_en:"The mouse is running fast.",example_vi:"Con chuột đang chạy rất nhanh.",type:"noun"}
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
    // Tìm bài học tương ứng theo orderIndex
    const lesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!lesson) {
      console.error(`❌ Không tìm thấy Lesson ${item.lesson} trong DB.`);
      continue;
    }

    const contentJson = JSON.stringify({
      word: item.word,
      type: item.type,
      meaning: item.meaning,
      pronunciation: `/${item.word}/`, // Phiên âm tạm thời (sau có thể update chi tiết bằng công cụ khác)
      example_en: item.example_en,
      example_vi: item.example_vi,
      audio_url: `/audio/movers/${item.word.replace(/\s+/g, '-')}.mp3`
    });

    // Kiểm tra xem từ này đã có chưa
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

  console.log('\n🎉 Hoàn thành nạp Batch 1 Từ vựng Movers!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
