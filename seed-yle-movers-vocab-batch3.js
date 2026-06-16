/**
 * SEED SCRIPT: YLE Movers Vocabulary — Batch 3 (Bài 11 - 15)
 * Chạy từ thư mục gốc: node seed-yle-movers-vocab-batch3.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 11: Places in the Town
  {lesson:11,word:"bank",meaning:"ngân hàng",example_en:"I go to the bank to get money.",example_vi:"Tôi đến ngân hàng để lấy tiền.",type:"noun"},
  {lesson:11,word:"cinema",meaning:"rạp chiếu phim",example_en:"We watch a film at the cinema.",example_vi:"Chúng tôi xem phim ở rạp chiếu phim.",type:"noun"},
  {lesson:11,word:"hospital",meaning:"bệnh viện",example_en:"The doctor works in a hospital.",example_vi:"Bác sĩ làm việc trong bệnh viện.",type:"noun"},
  {lesson:11,word:"library",meaning:"thư viện",example_en:"You can read books in the library.",example_vi:"Bạn có thể đọc sách trong thư viện.",type:"noun"},
  {lesson:11,word:"market",meaning:"chợ",example_en:"My mom buys fruit at the market.",example_vi:"Mẹ tôi mua trái cây ở chợ.",type:"noun"},
  {lesson:11,word:"supermarket",meaning:"siêu thị",example_en:"Let's go to the supermarket.",example_vi:"Chúng ta hãy đi siêu thị nào.",type:"noun"},
  {lesson:11,word:"sports centre",meaning:"trung tâm thể thao",example_en:"I play tennis at the sports centre.",example_vi:"Tôi chơi quần vợt ở trung tâm thể thao.",type:"noun"},
  {lesson:11,word:"swimming pool",meaning:"hồ bơi",example_en:"I swim in the swimming pool.",example_vi:"Tôi bơi trong hồ bơi.",type:"noun"},
  {lesson:11,word:"shop",meaning:"cửa hàng",example_en:"There is a toy shop here.",example_vi:"Có một cửa hàng đồ chơi ở đây.",type:"noun"},
  {lesson:11,word:"park",meaning:"công viên",example_en:"Children are playing in the park.",example_vi:"Trẻ em đang chơi trong công viên.",type:"noun"},
  {lesson:11,word:"zoo",meaning:"sở thú",example_en:"I saw a lion at the zoo.",example_vi:"Tôi đã thấy một con sư tử ở sở thú.",type:"noun"},
  {lesson:11,word:"cafe",meaning:"quán cà phê",example_en:"They drink tea at the cafe.",example_vi:"Họ uống trà ở quán cà phê.",type:"noun"},
  {lesson:11,word:"station",meaning:"nhà ga",example_en:"The train is at the station.",example_vi:"Tàu hỏa đang ở nhà ga.",type:"noun"},
  {lesson:11,word:"bus stop",meaning:"trạm xe buýt",example_en:"Wait for the bus at the bus stop.",example_vi:"Hãy đợi xe buýt ở trạm xe buýt.",type:"noun"},
  {lesson:11,word:"playground",meaning:"sân chơi",example_en:"Let's go to the playground.",example_vi:"Chúng ta cùng ra sân chơi nào.",type:"noun"},
  {lesson:11,word:"town",meaning:"thị trấn",example_en:"My town is small and quiet.",example_vi:"Thị trấn của tôi nhỏ và yên tĩnh.",type:"noun"},
  {lesson:11,word:"city",meaning:"thành phố",example_en:"New York is a big city.",example_vi:"New York là một thành phố lớn.",type:"noun"},
  {lesson:11,word:"village",meaning:"ngôi làng",example_en:"My grandpa lives in a village.",example_vi:"Ông tôi sống trong một ngôi làng.",type:"noun"},
  {lesson:11,word:"street",meaning:"đường phố",example_en:"I live on this street.",example_vi:"Tôi sống trên con phố này.",type:"noun"},
  {lesson:11,word:"road",meaning:"con đường",example_en:"Be careful when crossing the road.",example_vi:"Hãy cẩn thận khi sang đường.",type:"noun"},

  // BÀI 12: Directions and Locations
  {lesson:12,word:"opposite",meaning:"đối diện",example_en:"The bank is opposite the hospital.",example_vi:"Ngân hàng nằm đối diện bệnh viện.",type:"preposition"},
  {lesson:12,word:"near",meaning:"gần",example_en:"My house is near the park.",example_vi:"Nhà tôi ở gần công viên.",type:"preposition"},
  {lesson:12,word:"next to",meaning:"bên cạnh",example_en:"Sit next to me.",example_vi:"Hãy ngồi bên cạnh tôi.",type:"preposition"},
  {lesson:12,word:"above",meaning:"ở trên",example_en:"The picture is above the bed.",example_vi:"Bức tranh nằm ở trên giường.",type:"preposition"},
  {lesson:12,word:"below",meaning:"ở dưới",example_en:"The cat is below the table.",example_vi:"Con mèo ở dưới gầm bàn.",type:"preposition"},
  {lesson:12,word:"behind",meaning:"đằng sau",example_en:"He is hiding behind the door.",example_vi:"Cậu ấy đang trốn sau cánh cửa.",type:"preposition"},
  {lesson:12,word:"in front of",meaning:"đằng trước",example_en:"There is a tree in front of my house.",example_vi:"Có một cái cây ở trước nhà tôi.",type:"preposition"},
  {lesson:12,word:"straight on",meaning:"đi thẳng",example_en:"Go straight on.",example_vi:"Hãy đi thẳng.",type:"adverb"},
  {lesson:12,word:"left",meaning:"bên trái",example_en:"Turn left at the corner.",example_vi:"Rẽ trái ở góc đường.",type:"adverb"},
  {lesson:12,word:"right",meaning:"bên phải",example_en:"Turn right here.",example_vi:"Rẽ phải ở đây.",type:"adverb"},
  {lesson:12,word:"up",meaning:"lên trên",example_en:"Look up at the sky.",example_vi:"Hãy nhìn lên bầu trời.",type:"adverb"},
  {lesson:12,word:"down",meaning:"xuống dưới",example_en:"Sit down, please.",example_vi:"Làm ơn ngồi xuống.",type:"adverb"},
  {lesson:12,word:"inside",meaning:"bên trong",example_en:"Let's go inside.",example_vi:"Chúng ta hãy vào bên trong.",type:"adverb"},
  {lesson:12,word:"outside",meaning:"bên ngoài",example_en:"It is raining outside.",example_vi:"Bên ngoài trời đang mưa.",type:"adverb"},
  {lesson:12,word:"between",meaning:"ở giữa",example_en:"I sit between Tom and Anna.",example_vi:"Tôi ngồi giữa Tom và Anna.",type:"preposition"},
  {lesson:12,word:"corner",meaning:"góc đường, góc",example_en:"The shop is at the corner.",example_vi:"Cửa hàng nằm ở góc đường.",type:"noun"},
  {lesson:12,word:"place",meaning:"nơi chốn, địa điểm",example_en:"This is a beautiful place.",example_vi:"Đây là một nơi tuyệt đẹp.",type:"noun"},
  {lesson:12,word:"here",meaning:"ở đây",example_en:"Come here.",example_vi:"Lại đây.",type:"adverb"},
  {lesson:12,word:"there",meaning:"ở đó",example_en:"The book is over there.",example_vi:"Cuốn sách ở đằng kia.",type:"adverb"},
  {lesson:12,word:"everywhere",meaning:"khắp mọi nơi",example_en:"There are toys everywhere.",example_vi:"Có đồ chơi ở khắp mọi nơi.",type:"adverb"},

  // BÀI 13: Transport and Travel
  {lesson:13,word:"bus station",meaning:"bến xe buýt",example_en:"We wait at the bus station.",example_vi:"Chúng tôi đợi ở bến xe buýt.",type:"noun"},
  {lesson:13,word:"helicopter",meaning:"trực thăng",example_en:"The helicopter is flying.",example_vi:"Trực thăng đang bay.",type:"noun"},
  {lesson:13,word:"tractor",meaning:"máy kéo",example_en:"The farmer drives a tractor.",example_vi:"Bác nông dân lái một chiếc máy kéo.",type:"noun"},
  {lesson:13,word:"ticket",meaning:"vé",example_en:"Buy a train ticket.",example_vi:"Hãy mua một vé tàu.",type:"noun"},
  {lesson:13,word:"travel",meaning:"du lịch, đi lại",example_en:"I love to travel.",example_vi:"Tôi thích đi du lịch.",type:"verb"},
  {lesson:13,word:"drive",meaning:"lái xe ô tô",example_en:"My dad drives a car.",example_vi:"Bố tôi lái xe ô tô.",type:"verb"},
  {lesson:13,word:"fly",meaning:"bay",example_en:"The plane will fly to London.",example_vi:"Máy bay sẽ bay đến Luân Đôn.",type:"verb"},
  {lesson:13,word:"ride",meaning:"cưỡi, đạp xe",example_en:"I can ride a bike.",example_vi:"Tôi có thể đạp xe đạp.",type:"verb"},
  {lesson:13,word:"walk",meaning:"đi bộ",example_en:"I walk to school.",example_vi:"Tôi đi bộ đến trường.",type:"verb"},
  {lesson:13,word:"catch",meaning:"bắt (xe, bóng)",example_en:"I catch the bus at 7 am.",example_vi:"Tôi bắt xe buýt lúc 7 giờ sáng.",type:"verb"},
  {lesson:13,word:"bus",meaning:"xe buýt",example_en:"The bus is yellow.",example_vi:"Xe buýt có màu vàng.",type:"noun"},
  {lesson:13,word:"train",meaning:"tàu hỏa",example_en:"The train is very fast.",example_vi:"Tàu hỏa chạy rất nhanh.",type:"noun"},
  {lesson:13,word:"plane",meaning:"máy bay",example_en:"The plane is in the sky.",example_vi:"Máy bay đang ở trên bầu trời.",type:"noun"},
  {lesson:13,word:"boat",meaning:"chiếc thuyền",example_en:"We go by boat.",example_vi:"Chúng tôi đi bằng thuyền.",type:"noun"},
  {lesson:13,word:"ship",meaning:"con tàu (lớn)",example_en:"The ship is on the sea.",example_vi:"Con tàu đang trên biển.",type:"noun"},
  {lesson:13,word:"car",meaning:"xe hơi, ô tô",example_en:"He has a red car.",example_vi:"Anh ấy có một chiếc ô tô màu đỏ.",type:"noun"},
  {lesson:13,word:"bike",meaning:"xe đạp",example_en:"I ride my bike in the park.",example_vi:"Tôi đạp xe trong công viên.",type:"noun"},
  {lesson:13,word:"motorbike",meaning:"xe máy",example_en:"My uncle has a motorbike.",example_vi:"Chú tôi có một chiếc xe máy.",type:"noun"},
  {lesson:13,word:"journey",meaning:"chuyến đi, hành trình",example_en:"Have a safe journey!",example_vi:"Chúc bạn có một chuyến đi an toàn!",type:"noun"},
  {lesson:13,word:"trip",meaning:"chuyến đi ngắn",example_en:"We are on a school trip.",example_vi:"Chúng tôi đang trong chuyến đi của trường.",type:"noun"},

  // BÀI 14: Time and Days
  {lesson:14,word:"yesterday",meaning:"ngày hôm qua",example_en:"I played football yesterday.",example_vi:"Hôm qua tôi đã chơi bóng đá.",type:"adverb"},
  {lesson:14,word:"tomorrow",meaning:"ngày mai",example_en:"I will see you tomorrow.",example_vi:"Tôi sẽ gặp bạn vào ngày mai.",type:"adverb"},
  {lesson:14,word:"minute",meaning:"phút",example_en:"Wait a minute, please.",example_vi:"Làm ơn đợi một phút.",type:"noun"},
  {lesson:14,word:"hour",meaning:"giờ, tiếng đồng hồ",example_en:"The film is two hours long.",example_vi:"Bộ phim dài hai giờ đồng hồ.",type:"noun"},
  {lesson:14,word:"weekend",meaning:"cuối tuần",example_en:"I play games at the weekend.",example_vi:"Tôi chơi game vào cuối tuần.",type:"noun"},
  {lesson:14,word:"week",meaning:"tuần",example_en:"There are seven days in a week.",example_vi:"Có bảy ngày trong một tuần.",type:"noun"},
  {lesson:14,word:"month",meaning:"tháng",example_en:"August is a hot month.",example_vi:"Tháng 8 là một tháng nóng nực.",type:"noun"},
  {lesson:14,word:"year",meaning:"năm",example_en:"Happy new year!",example_vi:"Chúc mừng năm mới!",type:"noun"},
  {lesson:14,word:"early",meaning:"sớm",example_en:"I wake up early.",example_vi:"Tôi thức dậy sớm.",type:"adverb"},
  {lesson:14,word:"late",meaning:"muộn, trễ",example_en:"Don't be late for school.",example_vi:"Đừng đi học muộn nhé.",type:"adverb"},
  {lesson:14,word:"Monday",meaning:"thứ Hai",example_en:"I go to school on Monday.",example_vi:"Tôi đi học vào thứ Hai.",type:"noun"},
  {lesson:14,word:"Tuesday",meaning:"thứ Ba",example_en:"We have English on Tuesday.",example_vi:"Chúng tôi có môn Tiếng Anh vào thứ Ba.",type:"noun"},
  {lesson:14,word:"Wednesday",meaning:"thứ Tư",example_en:"I play tennis on Wednesday.",example_vi:"Tôi chơi quần vợt vào thứ Tư.",type:"noun"},
  {lesson:14,word:"Thursday",meaning:"thứ Năm",example_en:"She reads books on Thursday.",example_vi:"Cô ấy đọc sách vào thứ Năm.",type:"noun"},
  {lesson:14,word:"Friday",meaning:"thứ Sáu",example_en:"Friday is my favourite day.",example_vi:"Thứ Sáu là ngày yêu thích của tôi.",type:"noun"},
  {lesson:14,word:"Saturday",meaning:"thứ Bảy",example_en:"I go to the park on Saturday.",example_vi:"Tôi đi công viên vào thứ Bảy.",type:"noun"},
  {lesson:14,word:"Sunday",meaning:"Chủ nhật",example_en:"We relax on Sunday.",example_vi:"Chúng tôi thư giãn vào Chủ nhật.",type:"noun"},
  {lesson:14,word:"morning",meaning:"buổi sáng",example_en:"Good morning!",example_vi:"Chào buổi sáng!",type:"noun"},
  {lesson:14,word:"afternoon",meaning:"buổi chiều",example_en:"I do homework in the afternoon.",example_vi:"Tôi làm bài tập vào buổi chiều.",type:"noun"},
  {lesson:14,word:"evening",meaning:"buổi tối",example_en:"We watch TV in the evening.",example_vi:"Chúng tôi xem TV vào buổi tối.",type:"noun"},

  // BÀI 15: The Weather
  {lesson:15,word:"cloud",meaning:"đám mây",example_en:"Look at the white cloud.",example_vi:"Hãy nhìn đám mây trắng kia.",type:"noun"},
  {lesson:15,word:"rain",meaning:"cơn mưa, mưa",example_en:"I like the rain.",example_vi:"Tôi thích mưa.",type:"noun"},
  {lesson:15,word:"snow",meaning:"tuyết",example_en:"The snow is white and cold.",example_vi:"Tuyết có màu trắng và lạnh.",type:"noun"},
  {lesson:15,word:"wind",meaning:"gió",example_en:"The wind is strong today.",example_vi:"Hôm nay gió thổi mạnh.",type:"noun"},
  {lesson:15,word:"sun",meaning:"mặt trời",example_en:"The sun is shining.",example_vi:"Mặt trời đang chiếu sáng.",type:"noun"},
  {lesson:15,word:"sunny",meaning:"có nắng",example_en:"It is a sunny day.",example_vi:"Đó là một ngày có nắng.",type:"adjective"},
  {lesson:15,word:"cloudy",meaning:"nhiều mây",example_en:"It is cloudy today.",example_vi:"Hôm nay trời nhiều mây.",type:"adjective"},
  {lesson:15,word:"rainy",meaning:"có mưa",example_en:"I stay at home on rainy days.",example_vi:"Tôi ở nhà vào những ngày có mưa.",type:"adjective"},
  {lesson:15,word:"windy",meaning:"có gió",example_en:"It is windy outside.",example_vi:"Bên ngoài trời đang có gió.",type:"adjective"},
  {lesson:15,word:"snowy",meaning:"có tuyết",example_en:"We play in the snowy weather.",example_vi:"Chúng tôi chơi đùa trong thời tiết có tuyết.",type:"adjective"},
  {lesson:15,word:"hot",meaning:"nóng nực",example_en:"Summer is very hot.",example_vi:"Mùa hè rất nóng.",type:"adjective"},
  {lesson:15,word:"cold",meaning:"lạnh giá",example_en:"It is very cold in winter.",example_vi:"Vào mùa đông trời rất lạnh.",type:"adjective"},
  {lesson:15,word:"warm",meaning:"ấm áp",example_en:"Spring is warm and nice.",example_vi:"Mùa xuân thì ấm áp và dễ chịu.",type:"adjective"},
  {lesson:15,word:"wet",meaning:"ẩm ướt",example_en:"My shoes are wet.",example_vi:"Đôi giày của tôi bị ướt.",type:"adjective"},
  {lesson:15,word:"dry",meaning:"khô ráo",example_en:"Keep your clothes dry.",example_vi:"Hãy giữ cho quần áo của bạn khô ráo.",type:"adjective"},
  {lesson:15,word:"weather",meaning:"thời tiết",example_en:"What is the weather like?",example_vi:"Thời tiết thế nào?",type:"noun"},
  {lesson:15,word:"storm",meaning:"cơn bão",example_en:"There is a storm coming.",example_vi:"Đang có một cơn bão sắp tới.",type:"noun"},
  {lesson:15,word:"rainbow",meaning:"cầu vồng",example_en:"Look at the beautiful rainbow.",example_vi:"Hãy nhìn cầu vồng tuyệt đẹp kìa.",type:"noun"},
  {lesson:15,word:"fog",meaning:"sương mù",example_en:"I cannot see clearly in the fog.",example_vi:"Tôi không thể nhìn rõ trong sương mù.",type:"noun"},
  {lesson:15,word:"ice",meaning:"băng đá",example_en:"The lake is covered with ice.",example_vi:"Mặt hồ bị bao phủ bởi băng đá.",type:"noun"}
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

  console.log('\n🎉 Hoàn thành nạp Batch 3 Từ vựng Movers!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
