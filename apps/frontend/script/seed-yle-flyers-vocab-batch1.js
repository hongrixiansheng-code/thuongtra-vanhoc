/**
 * SEED SCRIPT: YLE Flyers Vocabulary — Batch 1 (Bài 1 - 5)
 * Chạy từ thư mục gốc: node seed-yle-flyers-vocab-batch1.js
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 1: Friends and Family (Gia đình và bạn bè)
  { lesson: 1, word: "husband", type: "noun", phonetic: "/ˈhʌz.bənd/", meaning: "chồng", audioUrl: "", exampleEn: "Her husband is a doctor.", exampleVi: "Chồng của cô ấy là một bác sĩ." },
  { lesson: 1, word: "wife", type: "noun", phonetic: "/waɪf/", meaning: "vợ", audioUrl: "", exampleEn: "His wife is very beautiful.", exampleVi: "Vợ của anh ấy rất xinh đẹp." },
  { lesson: 1, word: "surname", type: "noun", phonetic: "/ˈsɜː.neɪm/", meaning: "họ", audioUrl: "", exampleEn: "My surname is Smith.", exampleVi: "Họ của tôi là Smith." },
  { lesson: 1, word: "relative", type: "noun", phonetic: "/ˈrel.ə.tɪv/", meaning: "họ hàng", audioUrl: "", exampleEn: "Many of my relatives live in London.", exampleVi: "Nhiều người họ hàng của tôi sống ở Luân Đôn." },
  { lesson: 1, word: "twin", type: "noun", phonetic: "/twɪn/", meaning: "trẻ sinh đôi", audioUrl: "", exampleEn: "She has a twin sister.", exampleVi: "Cô ấy có một người chị sinh đôi." },
  { lesson: 1, word: "grown-up", type: "noun", phonetic: "/ˈɡrəʊn.ʌp/", meaning: "người lớn", audioUrl: "", exampleEn: "You should ask a grown-up for help.", exampleVi: "Bạn nên nhờ một người lớn giúp đỡ." },
  { lesson: 1, word: "marry", type: "verb", phonetic: "/ˈmær.i/", meaning: "kết hôn", audioUrl: "", exampleEn: "They will marry next year.", exampleVi: "Họ sẽ kết hôn vào năm sau." },
  { lesson: 1, word: "married", type: "adjective", phonetic: "/ˈmær.id/", meaning: "đã kết hôn", audioUrl: "", exampleEn: "Are you married?", exampleVi: "Bạn đã kết hôn chưa?" },
  { lesson: 1, word: "single", type: "adjective", phonetic: "/ˈsɪŋ.ɡəl/", meaning: "độc thân", audioUrl: "", exampleEn: "He is still single.", exampleVi: "Anh ấy vẫn còn độc thân." },
  { lesson: 1, word: "friendly", type: "adjective", phonetic: "/ˈfrend.li/", meaning: "thân thiện", audioUrl: "", exampleEn: "Everyone here is very friendly.", exampleVi: "Mọi người ở đây rất thân thiện." },
  { lesson: 1, word: "kind", type: "adjective", phonetic: "/kaɪnd/", meaning: "tử tế, tốt bụng", audioUrl: "", exampleEn: "She is a kind teacher.", exampleVi: "Cô ấy là một giáo viên tốt bụng." },
  { lesson: 1, word: "lovely", type: "adjective", phonetic: "/ˈlʌv.li/", meaning: "đáng yêu", audioUrl: "", exampleEn: "What a lovely baby!", exampleVi: "Thật là một em bé đáng yêu!" },
  { lesson: 1, word: "meet", type: "verb", phonetic: "/miːt/", meaning: "gặp gỡ", audioUrl: "", exampleEn: "Nice to meet you.", exampleVi: "Rất vui được gặp bạn." },
  { lesson: 1, word: "together", type: "adverb", phonetic: "/təˈɡeð.ər/", meaning: "cùng nhau", audioUrl: "", exampleEn: "We went to the park together.", exampleVi: "Chúng tôi đã cùng nhau đi công viên." },
  { lesson: 1, word: "friendship", type: "noun", phonetic: "/ˈfrend.ʃɪp/", meaning: "tình bạn", audioUrl: "", exampleEn: "Their friendship is very strong.", exampleVi: "Tình bạn của họ rất bền chặt." },
  { lesson: 1, word: "partner", type: "noun", phonetic: "/ˈpɑːt.nər/", meaning: "cộng sự, đối tác", audioUrl: "", exampleEn: "Work with your partner.", exampleVi: "Hãy làm việc với cộng sự của bạn." },
  { lesson: 1, word: "member", type: "noun", phonetic: "/ˈmem.bər/", meaning: "thành viên", audioUrl: "", exampleEn: "I am a member of this club.", exampleVi: "Tôi là một thành viên của câu lạc bộ này." },
  { lesson: 1, word: "adult", type: "noun", phonetic: "/ˈæd.ʌlt/", meaning: "người trưởng thành", audioUrl: "", exampleEn: "This movie is for adults only.", exampleVi: "Bộ phim này chỉ dành cho người trưởng thành." },
  { lesson: 1, word: "childhood", type: "noun", phonetic: "/ˈtʃaɪld.hʊd/", meaning: "tuổi thơ", audioUrl: "", exampleEn: "I had a happy childhood.", exampleVi: "Tôi đã có một tuổi thơ hạnh phúc." },
  { lesson: 1, word: "guest", type: "noun", phonetic: "/ɡest/", meaning: "khách mời", audioUrl: "", exampleEn: "We have two guests for dinner.", exampleVi: "Chúng tôi có hai người khách tới dùng bữa tối." },

  // BÀI 2: Body and Face (Cơ thể và khuôn mặt)
  { lesson: 2, word: "elbow", type: "noun", phonetic: "/ˈel.bəʊ/", meaning: "khuỷu tay", audioUrl: "", exampleEn: "I hurt my elbow.", exampleVi: "Tôi làm đau khuỷu tay của mình." },
  { lesson: 2, word: "knee", type: "noun", phonetic: "/niː/", meaning: "đầu gối", audioUrl: "", exampleEn: "He fell and cut his knee.", exampleVi: "Cậu ấy bị ngã và làm xước đầu gối." },
  { lesson: 2, word: "toe", type: "noun", phonetic: "/təʊ/", meaning: "ngón chân", audioUrl: "", exampleEn: "Can you touch your toes?", exampleVi: "Bạn có thể chạm vào ngón chân của mình không?" },
  { lesson: 2, word: "finger", type: "noun", phonetic: "/ˈfɪŋ.ɡər/", meaning: "ngón tay", audioUrl: "", exampleEn: "I have five fingers on each hand.", exampleVi: "Tôi có năm ngón tay trên mỗi bàn tay." },
  { lesson: 2, word: "thumb", type: "noun", phonetic: "/θʌm/", meaning: "ngón tay cái", audioUrl: "", exampleEn: "He gave me a thumbs up.", exampleVi: "Anh ấy đã giơ ngón tay cái lên (tán thành)." },
  { lesson: 2, word: "tongue", type: "noun", phonetic: "/tʌŋ/", meaning: "cái lưỡi", audioUrl: "", exampleEn: "The dog is sleeping with its tongue out.", exampleVi: "Con chó đang ngủ thè lưỡi ra ngoài." },
  { lesson: 2, word: "stomach", type: "noun", phonetic: "/ˈstʌm.ək/", meaning: "dạ dày, bụng", audioUrl: "", exampleEn: "My stomach hurts.", exampleVi: "Bụng của tôi bị đau." },
  { lesson: 2, word: "back", type: "noun", phonetic: "/bæk/", meaning: "cái lưng", audioUrl: "", exampleEn: "She has a pain in her back.", exampleVi: "Cô ấy bị đau lưng." },
  { lesson: 2, word: "brain", type: "noun", phonetic: "/breɪn/", meaning: "não", audioUrl: "", exampleEn: "The brain is an important organ.", exampleVi: "Não là một cơ quan quan trọng." },
  { lesson: 2, word: "blood", type: "noun", phonetic: "/blʌd/", meaning: "máu", audioUrl: "", exampleEn: "Blood is red.", exampleVi: "Máu có màu đỏ." },
  { lesson: 2, word: "bone", type: "noun", phonetic: "/bəʊn/", meaning: "xương", audioUrl: "", exampleEn: "The dog is eating a bone.", exampleVi: "Con chó đang gặm một cục xương." },
  { lesson: 2, word: "skin", type: "noun", phonetic: "/skɪn/", meaning: "da", audioUrl: "", exampleEn: "Protect your skin from the sun.", exampleVi: "Hãy bảo vệ làn da của bạn khỏi ánh nắng mặt trời." },
  { lesson: 2, word: "heart", type: "noun", phonetic: "/hɑːt/", meaning: "trái tim", audioUrl: "", exampleEn: "My heart is beating fast.", exampleVi: "Tim của tôi đang đập nhanh." },
  { lesson: 2, word: "muscle", type: "noun", phonetic: "/ˈmʌs.əl/", meaning: "cơ bắp", audioUrl: "", exampleEn: "He has big muscles.", exampleVi: "Anh ấy có cơ bắp to lớn." },
  { lesson: 2, word: "neck", type: "noun", phonetic: "/nek/", meaning: "cái cổ", audioUrl: "", exampleEn: "She wears a scarf around her neck.", exampleVi: "Cô ấy quàng một chiếc khăn quanh cổ." },
  { lesson: 2, word: "shoulder", type: "noun", phonetic: "/ˈʃəʊl.dər/", meaning: "bờ vai", audioUrl: "", exampleEn: "He carries a bag on his shoulder.", exampleVi: "Anh ấy đeo một cái túi trên vai." },
  { lesson: 2, word: "ankle", type: "noun", phonetic: "/ˈæŋ.kəl/", meaning: "mắt cá chân", audioUrl: "", exampleEn: "I twisted my ankle.", exampleVi: "Tôi bị bong gân mắt cá chân." },
  { lesson: 2, word: "wrist", type: "noun", phonetic: "/rɪst/", meaning: "cổ tay", audioUrl: "", exampleEn: "She wears a watch on her wrist.", exampleVi: "Cô ấy đeo một chiếc đồng hồ trên cổ tay." },
  { lesson: 2, word: "lip", type: "noun", phonetic: "/lɪp/", meaning: "môi", audioUrl: "", exampleEn: "She has red lips.", exampleVi: "Cô ấy có đôi môi đỏ." },
  { lesson: 2, word: "tooth", type: "noun", phonetic: "/tuːθ/", meaning: "răng (số ít)", audioUrl: "", exampleEn: "My front tooth is missing.", exampleVi: "Chiếc răng cửa của tôi bị gãy." },

  // BÀI 3: Clothes (Quần áo)
  { lesson: 3, word: "belt", type: "noun", phonetic: "/belt/", meaning: "thắt lưng", audioUrl: "", exampleEn: "I need a brown belt.", exampleVi: "Tôi cần một chiếc thắt lưng màu nâu." },
  { lesson: 3, word: "uniform", type: "noun", phonetic: "/ˈjuː.nɪ.fɔːm/", meaning: "đồng phục", audioUrl: "", exampleEn: "Students wear a school uniform.", exampleVi: "Học sinh mặc đồng phục của trường." },
  { lesson: 3, word: "pocket", type: "noun", phonetic: "/ˈpɒk.ɪt/", meaning: "túi áo/quần", audioUrl: "", exampleEn: "Put your money in your pocket.", exampleVi: "Hãy cất tiền vào túi của bạn." },
  { lesson: 3, word: "stripe", type: "noun", phonetic: "/straɪp/", meaning: "sọc kẻ", audioUrl: "", exampleEn: "Zebra has black and white stripes.", exampleVi: "Ngựa vằn có những sọc trắng đen." },
  { lesson: 3, word: "spotted", type: "adjective", phonetic: "/ˈspɒt.ɪd/", meaning: "chấm bi", audioUrl: "", exampleEn: "She is wearing a spotted dress.", exampleVi: "Cô ấy đang mặc một chiếc váy chấm bi." },
  { lesson: 3, word: "gloves", type: "noun", phonetic: "/ɡlʌvz/", meaning: "găng tay", audioUrl: "", exampleEn: "Wear gloves when it is cold.", exampleVi: "Hãy đeo găng tay khi trời lạnh." },
  { lesson: 3, word: "tights", type: "noun", phonetic: "/taɪts/", meaning: "quần tất", audioUrl: "", exampleEn: "She wears black tights in winter.", exampleVi: "Cô ấy mặc quần tất màu đen vào mùa đông." },
  { lesson: 3, word: "necklace", type: "noun", phonetic: "/ˈnek.ləs/", meaning: "dây chuyền", audioUrl: "", exampleEn: "This gold necklace is beautiful.", exampleVi: "Sợi dây chuyền vàng này thật đẹp." },
  { lesson: 3, word: "ring", type: "noun", phonetic: "/rɪŋ/", meaning: "chiếc nhẫn", audioUrl: "", exampleEn: "She has a diamond ring.", exampleVi: "Cô ấy có một chiếc nhẫn kim cương." },
  { lesson: 3, word: "bracelet", type: "noun", phonetic: "/ˈbreɪ.slət/", meaning: "vòng tay", audioUrl: "", exampleEn: "I bought a silver bracelet.", exampleVi: "Tôi đã mua một chiếc vòng tay bằng bạc." },
  { lesson: 3, word: "umbrella", type: "noun", phonetic: "/ʌmˈbrel.ə/", meaning: "cái ô", audioUrl: "", exampleEn: "Take an umbrella, it is raining.", exampleVi: "Hãy mang theo một chiếc ô, trời đang mưa đấy." },
  { lesson: 3, word: "button", type: "noun", phonetic: "/ˈbʌt.ən/", meaning: "cái cúc áo", audioUrl: "", exampleEn: "My shirt has five buttons.", exampleVi: "Áo sơ mi của tôi có năm cái cúc." },
  { lesson: 3, word: "backpack", type: "noun", phonetic: "/ˈbæk.pæk/", meaning: "ba lô", audioUrl: "", exampleEn: "My school backpack is heavy.", exampleVi: "Ba lô đi học của tôi rất nặng." },
  { lesson: 3, word: "crown", type: "noun", phonetic: "/kraʊn/", meaning: "vương miện", audioUrl: "", exampleEn: "The king wears a golden crown.", exampleVi: "Vị vua đội một chiếc vương miện bằng vàng." },
  { lesson: 3, word: "sunglasses", type: "noun", phonetic: "/ˈsʌnˌɡlɑː.sɪz/", meaning: "kính râm", audioUrl: "", exampleEn: "He is wearing black sunglasses.", exampleVi: "Anh ấy đang đeo cặp kính râm màu đen." },
  { lesson: 3, word: "sweater", type: "noun", phonetic: "/ˈswet.ər/", meaning: "áo len", audioUrl: "", exampleEn: "This sweater is very warm.", exampleVi: "Chiếc áo len này rất ấm áp." },
  { lesson: 3, word: "swimsuit", type: "noun", phonetic: "/ˈswɪm.suːt/", meaning: "đồ bơi", audioUrl: "", exampleEn: "Don't forget your swimsuit.", exampleVi: "Đừng quên mang theo đồ bơi của bạn." },
  { lesson: 3, word: "helmet", type: "noun", phonetic: "/ˈhel.mət/", meaning: "mũ bảo hiểm", audioUrl: "", exampleEn: "Wear a helmet when you ride a bike.", exampleVi: "Hãy đội mũ bảo hiểm khi bạn đạp xe." },
  { lesson: 3, word: "shorts", type: "noun", phonetic: "/ʃɔːts/", meaning: "quần đùi", audioUrl: "", exampleEn: "He is wearing blue shorts.", exampleVi: "Cậu ấy đang mặc một chiếc quần đùi màu xanh dương." },
  { lesson: 3, word: "scarf", type: "noun", phonetic: "/skɑːf/", meaning: "khăn quàng cổ", audioUrl: "", exampleEn: "She bought a red scarf.", exampleVi: "Cô ấy đã mua một chiếc khăn quàng cổ màu đỏ." },

  // BÀI 4: Health (Sức khỏe)
  { lesson: 4, word: "medicine", type: "noun", phonetic: "/ˈmed.ɪ.sən/", meaning: "thuốc", audioUrl: "", exampleEn: "You must take this medicine.", exampleVi: "Bạn phải uống loại thuốc này." },
  { lesson: 4, word: "temperature", type: "noun", phonetic: "/ˈtem.prə.tʃər/", meaning: "nhiệt độ, bị sốt", audioUrl: "", exampleEn: "He has a high temperature.", exampleVi: "Cậu ấy đang bị sốt cao." },
  { lesson: 4, word: "pill", type: "noun", phonetic: "/pɪl/", meaning: "viên thuốc", audioUrl: "", exampleEn: "Take one pill after dinner.", exampleVi: "Uống một viên thuốc sau bữa tối." },
  { lesson: 4, word: "ambulance", type: "noun", phonetic: "/ˈæm.bjə.ləns/", meaning: "xe cứu thương", audioUrl: "", exampleEn: "Call an ambulance quickly!", exampleVi: "Mau gọi xe cứu thương đi!" },
  { lesson: 4, word: "chemist", type: "noun", phonetic: "/ˈkem.ɪst/", meaning: "hiệu thuốc, dược sĩ", audioUrl: "", exampleEn: "I bought medicine at the chemist.", exampleVi: "Tôi đã mua thuốc ở hiệu thuốc." },
  { lesson: 4, word: "bandage", type: "noun", phonetic: "/ˈbæn.dɪdʒ/", meaning: "băng gạc", audioUrl: "", exampleEn: "Put a bandage on the cut.", exampleVi: "Hãy dán một miếng băng gạc lên vết cắt." },
  { lesson: 4, word: "cut", type: "noun", phonetic: "/kʌt/", meaning: "vết cắt", audioUrl: "", exampleEn: "I have a small cut on my finger.", exampleVi: "Tôi có một vết cắt nhỏ trên ngón tay." },
  { lesson: 4, word: "ill", type: "adjective", phonetic: "/ɪl/", meaning: "ốm", audioUrl: "", exampleEn: "He is ill and cannot go to school.", exampleVi: "Cậu ấy bị ốm và không thể đi học." },
  { lesson: 4, word: "sick", type: "adjective", phonetic: "/sɪk/", meaning: "bệnh, buồn nôn", audioUrl: "", exampleEn: "I feel sick.", exampleVi: "Tôi cảm thấy bị ốm/buồn nôn." },
  { lesson: 4, word: "healthy", type: "adjective", phonetic: "/ˈhel.θi/", meaning: "khỏe mạnh", audioUrl: "", exampleEn: "Eat fruit to stay healthy.", exampleVi: "Hãy ăn trái cây để luôn khỏe mạnh." },
  { lesson: 4, word: "hospital", type: "noun", phonetic: "/ˈhɒs.pɪ.təl/", meaning: "bệnh viện", audioUrl: "", exampleEn: "She works in a hospital.", exampleVi: "Cô ấy làm việc trong một bệnh viện." },
  { lesson: 4, word: "doctor", type: "noun", phonetic: "/ˈdɒk.tər/", meaning: "bác sĩ", audioUrl: "", exampleEn: "You should see a doctor.", exampleVi: "Bạn nên đi gặp bác sĩ." },
  { lesson: 4, word: "nurse", type: "noun", phonetic: "/nɜːs/", meaning: "y tá", audioUrl: "", exampleEn: "The nurse is very kind.", exampleVi: "Cô y tá rất tốt bụng." },
  { lesson: 4, word: "dentist", type: "noun", phonetic: "/ˈden.tɪst/", meaning: "nha sĩ", audioUrl: "", exampleEn: "I go to the dentist twice a year.", exampleVi: "Tôi đi khám nha sĩ hai lần một năm." },
  { lesson: 4, word: "hurt", type: "verb", phonetic: "/hɜːt/", meaning: "làm đau, bị đau", audioUrl: "", exampleEn: "My head hurts.", exampleVi: "Đầu tôi bị đau." },
  { lesson: 4, word: "break", type: "verb", phonetic: "/breɪk/", meaning: "làm gãy, làm vỡ", audioUrl: "", exampleEn: "Don't break the glass.", exampleVi: "Đừng làm vỡ chiếc cốc thủy tinh." },
  { lesson: 4, word: "cough", type: "noun", phonetic: "/kɒf/", meaning: "bệnh ho", audioUrl: "", exampleEn: "He has a bad cough.", exampleVi: "Anh ấy bị ho nặng." },
  { lesson: 4, word: "cold", type: "noun", phonetic: "/kəʊld/", meaning: "bệnh cảm lạnh", audioUrl: "", exampleEn: "I caught a cold yesterday.", exampleVi: "Tôi đã bị cảm lạnh hôm qua." },
  { lesson: 4, word: "stomach-ache", type: "noun", phonetic: "/ˈstʌm.əkˌeɪk/", meaning: "đau bụng", audioUrl: "", exampleEn: "Eating too much candy gives you a stomach-ache.", exampleVi: "Ăn quá nhiều kẹo sẽ khiến bạn bị đau bụng." },
  { lesson: 4, word: "toothache", type: "noun", phonetic: "/ˈtuːθ.eɪk/", meaning: "đau răng", audioUrl: "", exampleEn: "She went to the dentist because of a toothache.", exampleVi: "Cô ấy đi nha sĩ vì bị đau răng." },

  // BÀI 5: Animals (Động vật)
  { lesson: 5, word: "butterfly", type: "noun", phonetic: "/ˈbʌt.ə.flaɪ/", meaning: "con bướm", audioUrl: "", exampleEn: "The butterfly is very beautiful.", exampleVi: "Con bướm rất đẹp." },
  { lesson: 5, word: "camel", type: "noun", phonetic: "/ˈkæm.əl/", meaning: "lạc đà", audioUrl: "", exampleEn: "Camels live in the desert.", exampleVi: "Lạc đà sống ở sa mạc." },
  { lesson: 5, word: "dinosaur", type: "noun", phonetic: "/ˈdaɪ.nə.sɔːr/", meaning: "khủng long", audioUrl: "", exampleEn: "Dinosaurs lived a long time ago.", exampleVi: "Khủng long đã sống cách đây rất lâu." },
  { lesson: 5, word: "eagle", type: "noun", phonetic: "/ˈiː.ɡəl/", meaning: "đại bàng", audioUrl: "", exampleEn: "An eagle can fly very high.", exampleVi: "Đại bàng có thể bay rất cao." },
  { lesson: 5, word: "extinct", type: "adjective", phonetic: "/ɪkˈstɪŋkt/", meaning: "tuyệt chủng", audioUrl: "", exampleEn: "Dinosaurs are extinct.", exampleVi: "Khủng long đã tuyệt chủng." },
  { lesson: 5, word: "fur", type: "noun", phonetic: "/fɜːr/", meaning: "bộ lông thú", audioUrl: "", exampleEn: "The cat has soft white fur.", exampleVi: "Con mèo có bộ lông trắng mềm mại." },
  { lesson: 5, word: "insect", type: "noun", phonetic: "/ˈɪn.sekt/", meaning: "côn trùng", audioUrl: "", exampleEn: "An ant is a small insect.", exampleVi: "Kiến là một loài côn trùng nhỏ." },
  { lesson: 5, word: "octopus", type: "noun", phonetic: "/ˈɒk.tə.pəs/", meaning: "bạch tuộc", audioUrl: "", exampleEn: "An octopus has eight arms.", exampleVi: "Bạch tuộc có tám xúc tu." },
  { lesson: 5, word: "ostrich", type: "noun", phonetic: "/ˈɒs.trɪtʃ/", meaning: "đà điểu", audioUrl: "", exampleEn: "The ostrich is the biggest bird.", exampleVi: "Đà điểu là loài chim lớn nhất." },
  { lesson: 5, word: "pet", type: "noun", phonetic: "/pet/", meaning: "thú cưng", audioUrl: "", exampleEn: "I have a dog as a pet.", exampleVi: "Tôi có một con chó làm thú cưng." },
  { lesson: 5, word: "swan", type: "noun", phonetic: "/swɒn/", meaning: "thiên nga", audioUrl: "", exampleEn: "The white swan is swimming.", exampleVi: "Con thiên nga trắng đang bơi." },
  { lesson: 5, word: "tortoise", type: "noun", phonetic: "/ˈtɔː.təs/", meaning: "rùa cạn", audioUrl: "", exampleEn: "A tortoise walks very slowly.", exampleVi: "Rùa cạn đi bộ rất chậm." },
  { lesson: 5, word: "wild", type: "adjective", phonetic: "/waɪld/", meaning: "hoang dã", audioUrl: "", exampleEn: "Lions are wild animals.", exampleVi: "Sư tử là động vật hoang dã." },
  { lesson: 5, word: "wing", type: "noun", phonetic: "/wɪŋ/", meaning: "cánh", audioUrl: "", exampleEn: "Birds use their wings to fly.", exampleVi: "Các loài chim dùng cánh để bay." },
  { lesson: 5, word: "creature", type: "noun", phonetic: "/ˈkriː.tʃər/", meaning: "sinh vật", audioUrl: "", exampleEn: "Aliens are strange creatures.", exampleVi: "Người ngoài hành tinh là những sinh vật kỳ lạ." },
  { lesson: 5, word: "beetle", type: "noun", phonetic: "/ˈbiː.təl/", meaning: "bọ cánh cứng", audioUrl: "", exampleEn: "I saw a black beetle on the leaf.", exampleVi: "Tôi nhìn thấy một con bọ cánh cứng màu đen trên chiếc lá." },
  { lesson: 5, word: "tail", type: "noun", phonetic: "/teɪl/", meaning: "cái đuôi", audioUrl: "", exampleEn: "The dog wagged its tail.", exampleVi: "Con chó vẫy cái đuôi của nó." },
  { lesson: 5, word: "spot", type: "noun", phonetic: "/spɒt/", meaning: "đốm", audioUrl: "", exampleEn: "The dog has black spots.", exampleVi: "Con chó có những đốm đen." },
  { lesson: 5, word: "stripe", type: "noun", phonetic: "/straɪp/", meaning: "sọc", audioUrl: "", exampleEn: "Tigers have beautiful stripes.", exampleVi: "Những con hổ có những vằn sọc tuyệt đẹp." },
  { lesson: 5, word: "nest", type: "noun", phonetic: "/nest/", meaning: "cái tổ", audioUrl: "", exampleEn: "There is a bird's nest in the tree.", exampleVi: "Có một cái tổ chim ở trên cây." }
];

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-flyers' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program Flyers (en-flyers)!');
    return;
  }

  console.log(`✅ Tìm thấy Program: ${program.name}`);
  const vocabLesson = program.lessons.find(l => l.orderIndex === 9999);
  if (!vocabLesson) {
    console.error('❌ Không tìm thấy bài học Kho từ vựng Flyers (orderIndex = 9999)!');
    return;
  }

  let successCount = 0;
  for (const item of VOCAB_DATA) {
    // Tìm lesson con
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!targetLesson) {
      console.error(`❌ Không tìm thấy Lesson ${item.lesson} cho từ "${item.word}"`);
      continue;
    }

    const contentJson = JSON.stringify({
      word: item.word,
      type: item.type,
      pronunciation: item.phonetic,
      meaning: item.meaning,
      audio_url: item.audioUrl,
      example_en: item.exampleEn,
      example_vi: item.exampleVi
    });

    // 1. Thêm/Cập nhật vào kho từ vựng tổng (lesson 9999)
    const existingInTotal = await prisma.lessonContent.findFirst({
      where: {
        lessonId: vocabLesson.id,
        contentType: 'THEORY',
        content: { contains: `"word":"${item.word}"` }
      }
    });

    if (!existingInTotal) {
      await prisma.lessonContent.create({
        data: {
          lessonId: vocabLesson.id,
          contentType: 'THEORY',
          content: contentJson
        }
      });
    } else {
      await prisma.lessonContent.update({
        where: { id: existingInTotal.id },
        data: { content: contentJson }
      });
    }

    // 2. Thêm/Cập nhật vào bài học cụ thể
    const existingInLesson = await prisma.lessonContent.findFirst({
      where: {
        lessonId: targetLesson.id,
        contentType: 'THEORY',
        content: { contains: `"word":"${item.word}"` }
      }
    });

    if (!existingInLesson) {
      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'THEORY',
          content: contentJson
        }
      });
      successCount++;
      console.log(`✅ Đã thêm từ: ${item.word} (Bài ${item.lesson})`);
    } else {
      await prisma.lessonContent.update({
        where: { id: existingInLesson.id },
        data: { content: contentJson }
      });
      successCount++;
      console.log(`🔄 Đã cập nhật từ: ${item.word} (Bài ${item.lesson})`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp/cập nhật ${successCount} từ vựng Batch 1 cho Flyers!`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
