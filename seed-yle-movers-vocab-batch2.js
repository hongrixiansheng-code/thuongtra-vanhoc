/**
 * SEED SCRIPT: YLE Movers Vocabulary — Batch 2 (Bài 6 - 10)
 * Chạy từ thư mục gốc: node seed-yle-movers-vocab-batch2.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 6: Food and Drink 1
  {lesson:6,word:"cheese",meaning:"pho mát",example_en:"I like cheese on my pizza.",example_vi:"Tôi thích pho mát trên bánh pizza của mình.",type:"noun"},
  {lesson:6,word:"pasta",meaning:"mì ống",example_en:"We are having pasta for dinner.",example_vi:"Chúng tôi sẽ ăn mì ống cho bữa tối.",type:"noun"},
  {lesson:6,word:"salad",meaning:"món rau trộn",example_en:"This salad is very healthy.",example_vi:"Món rau trộn này rất tốt cho sức khỏe.",type:"noun"},
  {lesson:6,word:"sandwich",meaning:"bánh mì kẹp",example_en:"I eat a sandwich for lunch.",example_vi:"Tôi ăn bánh mì kẹp vào bữa trưa.",type:"noun"},
  {lesson:6,word:"soup",meaning:"súp, canh",example_en:"The soup is very hot.",example_vi:"Món súp rất nóng.",type:"noun"},
  {lesson:6,word:"tea",meaning:"trà",example_en:"My grandpa drinks tea every morning.",example_vi:"Ông tôi uống trà mỗi sáng.",type:"noun"},
  {lesson:6,word:"coffee",meaning:"cà phê",example_en:"She likes coffee with milk.",example_vi:"Cô ấy thích cà phê với sữa.",type:"noun"},
  {lesson:6,word:"milk",meaning:"sữa",example_en:"Drink some milk before bed.",example_vi:"Hãy uống một chút sữa trước khi đi ngủ.",type:"noun"},
  {lesson:6,word:"water",meaning:"nước",example_en:"I drink a lot of water.",example_vi:"Tôi uống rất nhiều nước.",type:"noun"},
  {lesson:6,word:"juice",meaning:"nước ép trái cây",example_en:"Do you want some apple juice?",example_vi:"Bạn có muốn một ít nước ép táo không?",type:"noun"},
  {lesson:6,word:"bread",meaning:"bánh mì",example_en:"I eat bread for breakfast.",example_vi:"Tôi ăn bánh mì vào bữa sáng.",type:"noun"},
  {lesson:6,word:"butter",meaning:"bơ",example_en:"Put some butter on the bread.",example_vi:"Hãy phết một ít bơ lên bánh mì.",type:"noun"},
  {lesson:6,word:"egg",meaning:"quả trứng",example_en:"I have an egg every day.",example_vi:"Tôi ăn một quả trứng mỗi ngày.",type:"noun"},
  {lesson:6,word:"meat",meaning:"thịt",example_en:"Tigers eat meat.",example_vi:"Hổ ăn thịt.",type:"noun"},
  {lesson:6,word:"chicken",meaning:"thịt gà",example_en:"We have chicken and rice today.",example_vi:"Hôm nay chúng ta ăn thịt gà và cơm.",type:"noun"},
  {lesson:6,word:"fish",meaning:"cá",example_en:"Cats like eating fish.",example_vi:"Mèo thích ăn cá.",type:"noun"},
  {lesson:6,word:"rice",meaning:"cơm, gạo",example_en:"I eat rice with fish.",example_vi:"Tôi ăn cơm với cá.",type:"noun"},
  {lesson:6,word:"noodle",meaning:"mì",example_en:"I love eating noodles.",example_vi:"Tôi thích ăn mì.",type:"noun"},
  {lesson:6,word:"vegetable",meaning:"rau củ",example_en:"You should eat more vegetables.",example_vi:"Bạn nên ăn nhiều rau củ hơn.",type:"noun"},
  {lesson:6,word:"fruit",meaning:"trái cây",example_en:"Apples and bananas are fruits.",example_vi:"Táo và chuối là trái cây.",type:"noun"},

  // BÀI 7: Food and Drink 2
  {lesson:7,word:"bowl",meaning:"cái bát, cái tô",example_en:"I have a bowl of soup.",example_vi:"Tôi có một bát súp.",type:"noun"},
  {lesson:7,word:"cup",meaning:"cái tách, chén",example_en:"A cup of tea, please.",example_vi:"Cho tôi một tách trà nhé.",type:"noun"},
  {lesson:7,word:"glass",meaning:"cái ly",example_en:"Can I have a glass of water?",example_vi:"Cho tôi xin một ly nước được không?",type:"noun"},
  {lesson:7,word:"plate",meaning:"cái đĩa",example_en:"Put the cake on the plate.",example_vi:"Hãy đặt cái bánh lên đĩa.",type:"noun"},
  {lesson:7,word:"bottle",meaning:"cái chai",example_en:"I have a bottle of water.",example_vi:"Tôi có một chai nước.",type:"noun"},
  {lesson:7,word:"hungry",meaning:"đói",example_en:"I am very hungry.",example_vi:"Tôi rất đói.",type:"adjective"},
  {lesson:7,word:"thirsty",meaning:"khát nước",example_en:"Are you thirsty?",example_vi:"Bạn có khát nước không?",type:"adjective"},
  {lesson:7,word:"breakfast",meaning:"bữa sáng",example_en:"What do you have for breakfast?",example_vi:"Bạn ăn gì cho bữa sáng?",type:"noun"},
  {lesson:7,word:"lunch",meaning:"bữa trưa",example_en:"We eat lunch at school.",example_vi:"Chúng tôi ăn bữa trưa ở trường.",type:"noun"},
  {lesson:7,word:"dinner",meaning:"bữa tối",example_en:"Dinner is ready!",example_vi:"Bữa tối đã sẵn sàng!",type:"noun"},
  {lesson:7,word:"snack",meaning:"bữa ăn nhẹ",example_en:"I want a snack.",example_vi:"Tôi muốn một bữa ăn nhẹ.",type:"noun"},
  {lesson:7,word:"sweet",meaning:"ngọt, kẹo ngọt",example_en:"This cake is very sweet.",example_vi:"Chiếc bánh này rất ngọt.",type:"adjective"},
  {lesson:7,word:"chocolate",meaning:"sô-cô-la",example_en:"I love chocolate ice cream.",example_vi:"Tôi yêu kem sô-cô-la.",type:"noun"},
  {lesson:7,word:"ice cream",meaning:"kem",example_en:"Let's eat some ice cream.",example_vi:"Cùng ăn chút kem nào.",type:"noun"},
  {lesson:7,word:"cake",meaning:"bánh ngọt",example_en:"This is a birthday cake.",example_vi:"Đây là một chiếc bánh sinh nhật.",type:"noun"},
  {lesson:7,word:"biscuit",meaning:"bánh quy",example_en:"I like biscuits with milk.",example_vi:"Tôi thích bánh quy với sữa.",type:"noun"},
  {lesson:7,word:"sugar",meaning:"đường",example_en:"Don't put too much sugar in your tea.",example_vi:"Đừng cho quá nhiều đường vào trà của bạn.",type:"noun"},
  {lesson:7,word:"salt",meaning:"muối",example_en:"Pass me the salt, please.",example_vi:"Làm ơn đưa cho tôi lọ muối.",type:"noun"},
  {lesson:7,word:"pepper",meaning:"hạt tiêu",example_en:"I like salt and pepper on my egg.",example_vi:"Tôi thích muối và tiêu trên quả trứng của mình.",type:"noun"},
  {lesson:7,word:"sauce",meaning:"nước xốt",example_en:"I like tomato sauce.",example_vi:"Tôi thích tương cà.",type:"noun"},

  // BÀI 8: Clothes and Accessories
  {lesson:8,word:"coat",meaning:"áo khoác dài",example_en:"Put on your coat. It's cold.",example_vi:"Hãy mặc áo khoác dài vào. Trời đang lạnh đấy.",type:"noun"},
  {lesson:8,word:"scarf",meaning:"khăn quàng cổ",example_en:"I wear a scarf in winter.",example_vi:"Tôi quàng khăn vào mùa đông.",type:"noun"},
  {lesson:8,word:"sweater",meaning:"áo len",example_en:"My sweater is warm.",example_vi:"Áo len của tôi rất ấm.",type:"noun"},
  {lesson:8,word:"swimsuit",meaning:"đồ bơi",example_en:"She is wearing a blue swimsuit.",example_vi:"Cô ấy đang mặc một bộ đồ bơi màu xanh.",type:"noun"},
  {lesson:8,word:"helmet",meaning:"mũ bảo hiểm",example_en:"You must wear a helmet on a bike.",example_vi:"Bạn phải đội mũ bảo hiểm khi đi xe đạp.",type:"noun"},
  {lesson:8,word:"boot",meaning:"ủng, giày cao cổ",example_en:"I have new boots.",example_vi:"Tôi có một đôi ủng mới.",type:"noun"},
  {lesson:8,word:"shoe",meaning:"chiếc giày",example_en:"Where is my left shoe?",example_vi:"Chiếc giày trái của tôi đâu rồi?",type:"noun"},
  {lesson:8,word:"sock",meaning:"chiếc tất (vớ)",example_en:"My socks are white.",example_vi:"Đôi tất của tôi màu trắng.",type:"noun"},
  {lesson:8,word:"trousers",meaning:"quần dài",example_en:"He is wearing black trousers.",example_vi:"Anh ấy đang mặc chiếc quần dài màu đen.",type:"noun"},
  {lesson:8,word:"shorts",meaning:"quần đùi, quần soóc",example_en:"I wear shorts in summer.",example_vi:"Tôi mặc quần đùi vào mùa hè.",type:"noun"},
  {lesson:8,word:"skirt",meaning:"chân váy",example_en:"She likes her pink skirt.",example_vi:"Cô ấy thích chiếc chân váy màu hồng của mình.",type:"noun"},
  {lesson:8,word:"dress",meaning:"cái váy liền",example_en:"That is a beautiful dress.",example_vi:"Đó là một chiếc váy liền thật đẹp.",type:"noun"},
  {lesson:8,word:"shirt",meaning:"áo sơ mi",example_en:"He is wearing a white shirt.",example_vi:"Anh ấy đang mặc một chiếc áo sơ mi màu trắng.",type:"noun"},
  {lesson:8,word:"T-shirt",meaning:"áo thun, áo phông",example_en:"I have a new T-shirt.",example_vi:"Tôi có một chiếc áo thun mới.",type:"noun"},
  {lesson:8,word:"hat",meaning:"cái mũ (có vành)",example_en:"Take off your hat in the house.",example_vi:"Hãy bỏ mũ ra khi vào nhà.",type:"noun"},
  {lesson:8,word:"cap",meaning:"mũ lưỡi trai",example_en:"He wears a blue cap.",example_vi:"Anh ấy đội một chiếc mũ lưỡi trai màu xanh.",type:"noun"},
  {lesson:8,word:"glasses",meaning:"mắt kính",example_en:"My grandpa wears glasses.",example_vi:"Ông tôi đeo mắt kính.",type:"noun"},
  {lesson:8,word:"bag",meaning:"cái túi",example_en:"Put your books in your bag.",example_vi:"Hãy cất sách vào trong túi của bạn.",type:"noun"},
  {lesson:8,word:"pocket",meaning:"túi quần, túi áo",example_en:"I have a pen in my pocket.",example_vi:"Tôi có một cây bút trong túi áo.",type:"noun"},
  {lesson:8,word:"belt",meaning:"thắt lưng",example_en:"He wears a brown belt.",example_vi:"Anh ấy đeo một chiếc thắt lưng màu nâu.",type:"noun"},

  // BÀI 9: At Home 1
  {lesson:9,word:"balcony",meaning:"ban công",example_en:"We are standing on the balcony.",example_vi:"Chúng tôi đang đứng trên ban công.",type:"noun"},
  {lesson:9,word:"basement",meaning:"tầng hầm",example_en:"My bike is in the basement.",example_vi:"Xe đạp của tôi ở dưới tầng hầm.",type:"noun"},
  {lesson:9,word:"lift",meaning:"thang máy",example_en:"Take the lift to the 5th floor.",example_vi:"Hãy đi thang máy lên tầng 5.",type:"noun"},
  {lesson:9,word:"stairs",meaning:"cầu thang bộ",example_en:"Walk up the stairs.",example_vi:"Hãy đi bộ lên cầu thang.",type:"noun"},
  {lesson:9,word:"roof",meaning:"mái nhà",example_en:"There is a bird on the roof.",example_vi:"Có một con chim trên mái nhà.",type:"noun"},
  {lesson:9,word:"floor",meaning:"sàn nhà, tầng",example_en:"Sweep the floor, please.",example_vi:"Vui lòng quét nhà.",type:"noun"},
  {lesson:9,word:"wall",meaning:"bức tường",example_en:"The wall is white.",example_vi:"Bức tường có màu trắng.",type:"noun"},
  {lesson:9,word:"ceiling",meaning:"trần nhà",example_en:"There is a fan on the ceiling.",example_vi:"Có một chiếc quạt trên trần nhà.",type:"noun"},
  {lesson:9,word:"window",meaning:"cửa sổ",example_en:"Open the window, please.",example_vi:"Làm ơn mở cửa sổ ra.",type:"noun"},
  {lesson:9,word:"door",meaning:"cửa ra vào",example_en:"Close the door.",example_vi:"Hãy đóng cửa lại.",type:"noun"},
  {lesson:9,word:"living room",meaning:"phòng khách",example_en:"We watch TV in the living room.",example_vi:"Chúng tôi xem TV trong phòng khách.",type:"noun"},
  {lesson:9,word:"bedroom",meaning:"phòng ngủ",example_en:"My bed is in the bedroom.",example_vi:"Giường của tôi nằm trong phòng ngủ.",type:"noun"},
  {lesson:9,word:"bathroom",meaning:"phòng tắm",example_en:"Wash your hands in the bathroom.",example_vi:"Hãy rửa tay trong phòng tắm.",type:"noun"},
  {lesson:9,word:"kitchen",meaning:"nhà bếp",example_en:"Mom is cooking in the kitchen.",example_vi:"Mẹ đang nấu ăn trong nhà bếp.",type:"noun"},
  {lesson:9,word:"dining room",meaning:"phòng ăn",example_en:"We eat dinner in the dining room.",example_vi:"Chúng tôi ăn tối trong phòng ăn.",type:"noun"},
  {lesson:9,word:"hall",meaning:"sảnh, hành lang",example_en:"Wait for me in the hall.",example_vi:"Hãy đợi tôi ở ngoài sảnh.",type:"noun"},
  {lesson:9,word:"garden",meaning:"khu vườn",example_en:"There are flowers in the garden.",example_vi:"Có những bông hoa trong khu vườn.",type:"noun"},
  {lesson:9,word:"flat",meaning:"căn hộ (Anh)",example_en:"I live in a flat.",example_vi:"Tôi sống trong một căn hộ.",type:"noun"},
  {lesson:9,word:"house",meaning:"ngôi nhà",example_en:"This is my house.",example_vi:"Đây là ngôi nhà của tôi.",type:"noun"},
  {lesson:9,word:"apartment",meaning:"căn hộ (Mỹ)",example_en:"They live in an apartment.",example_vi:"Họ sống trong một căn hộ.",type:"noun"},

  // BÀI 10: At Home 2 (Materials & Things)
  {lesson:10,word:"glass",meaning:"thủy tinh, cái ly",example_en:"The window is made of glass.",example_vi:"Cửa sổ được làm bằng thủy tinh.",type:"noun"},
  {lesson:10,word:"paper",meaning:"giấy",example_en:"Write your name on the paper.",example_vi:"Hãy viết tên bạn lên giấy.",type:"noun"},
  {lesson:10,word:"plastic",meaning:"nhựa",example_en:"This toy is made of plastic.",example_vi:"Món đồ chơi này được làm bằng nhựa.",type:"noun"},
  {lesson:10,word:"wood",meaning:"gỗ",example_en:"The table is made of wood.",example_vi:"Cái bàn được làm bằng gỗ.",type:"noun"},
  {lesson:10,word:"metal",meaning:"kim loại",example_en:"A key is made of metal.",example_vi:"Một chiếc chìa khóa được làm bằng kim loại.",type:"noun"},
  {lesson:10,word:"wool",meaning:"len",example_en:"My sweater is made of wool.",example_vi:"Áo len của tôi được làm từ len.",type:"noun"},
  {lesson:10,word:"blanket",meaning:"cái chăn, mền",example_en:"I need a blanket. It's cold.",example_vi:"Tôi cần một cái chăn. Trời lạnh quá.",type:"noun"},
  {lesson:10,word:"towel",meaning:"khăn tắm",example_en:"Dry your hair with a towel.",example_vi:"Hãy lau khô tóc của bạn bằng một chiếc khăn tắm.",type:"noun"},
  {lesson:10,word:"mirror",meaning:"cái gương",example_en:"Look in the mirror.",example_vi:"Hãy nhìn vào gương.",type:"noun"},
  {lesson:10,word:"toothbrush",meaning:"bàn chải đánh răng",example_en:"Where is my toothbrush?",example_vi:"Bàn chải đánh răng của tôi ở đâu?",type:"noun"},
  {lesson:10,word:"toothpaste",meaning:"kem đánh răng",example_en:"Put toothpaste on your toothbrush.",example_vi:"Hãy bóp kem đánh răng lên bàn chải của bạn.",type:"noun"},
  {lesson:10,word:"soap",meaning:"xà phòng",example_en:"Wash your hands with soap.",example_vi:"Hãy rửa tay với xà phòng.",type:"noun"},
  {lesson:10,word:"shampoo",meaning:"dầu gội đầu",example_en:"Wash your hair with shampoo.",example_vi:"Hãy gội đầu với dầu gội.",type:"noun"},
  {lesson:10,word:"comb",meaning:"cái lược (chải tóc thẳng)",example_en:"Comb your hair.",example_vi:"Hãy chải tóc của bạn đi.",type:"noun"},
  {lesson:10,word:"brush",meaning:"cái bàn chải (tóc, răng)",example_en:"I brush my hair every morning.",example_vi:"Tôi chải tóc mỗi sáng.",type:"noun"},
  {lesson:10,word:"mat",meaning:"cái chiếu, tấm thảm nhỏ",example_en:"Wipe your shoes on the mat.",example_vi:"Hãy lau giày của bạn trên tấm thảm.",type:"noun"},
  {lesson:10,word:"rug",meaning:"tấm thảm trải sàn",example_en:"The cat is sleeping on the rug.",example_vi:"Con mèo đang ngủ trên tấm thảm.",type:"noun"},
  {lesson:10,word:"curtain",meaning:"rèm cửa",example_en:"Close the curtains, please.",example_vi:"Làm ơn kéo rèm cửa lại.",type:"noun"},
  {lesson:10,word:"lamp",meaning:"cái đèn bàn",example_en:"Turn on the lamp.",example_vi:"Hãy bật chiếc đèn bàn lên.",type:"noun"},
  {lesson:10,word:"picture",meaning:"bức tranh",example_en:"There is a picture on the wall.",example_vi:"Có một bức tranh trên bức tường.",type:"noun"}
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

  console.log('\n🎉 Hoàn thành nạp Batch 2 Từ vựng Movers!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
