const fs = require('fs');
const path = require('path');

const batch2Dialogues = {
  // Bài 6A (OrderIndex 10) - Ngữ pháp: 把, 被, 起来
  10: [
    {
      title: "Hội thoại: Sử dụng công nghệ mới",
      context: "Hai đồng nghiệp thảo luận về phần mềm làm việc mới.",
      lines: [
        {
          speaker: "小李",
          zh: "你把新软件安装好了吗？",
          py: "Nǐ bǎ xīn ruǎnjiàn ānzhuāng hǎo le ma?",
          vi: "Bạn đã cài đặt xong phần mềm mới chưa?"
        },
        {
          speaker: "小王",
          zh: "安装好了。这个软件用起来很方便。",
          py: "Ānzhuāng hǎo le. Zhège ruǎnjiàn yòng qǐlái hěn fāngbiàn.",
          vi: "Cài xong rồi. Phần mềm này dùng vào rất tiện lợi."
        },
        {
          speaker: "小李",
          zh: "是啊，以前旧的系统经常被病毒攻击。",
          py: "Shì a, yǐqián jiù de xìtǒng jīngcháng bèi bìngdú gōngjī.",
          vi: "Đúng vậy, hệ thống cũ trước đây thường xuyên bị virus tấn công."
        },
        {
          speaker: "小王",
          zh: "现在看起来安全多了，工作效率也提高了。",
          py: "Xiànzài kàn qǐlái ānquán duō le, gōngzuò xiàolǜ yě tígāo le.",
          vi: "Bây giờ thoạt nhìn an toàn hơn nhiều rồi, hiệu suất công việc cũng được nâng cao."
        }
      ]
    }
  ],
  // Bài 6B (OrderIndex 11) - Ngữ pháp: 下去, 看来
  11: [
    {
      title: "Hội thoại: Giải quyết sự cố mạng",
      context: "Kỹ thuật viên nói chuyện với nhân viên văn phòng.",
      lines: [
        {
          speaker: "职员",
          zh: "电脑一直连不上网，这要怎么做下去啊？",
          py: "Diànnǎo yìzhí lián bú shàng wǎng, zhè yào zěnme zuò xiàqù a?",
          vi: "Máy tính mãi không kết nối mạng được, thế này thì làm tiếp thế nào?"
        },
        {
          speaker: "技术员",
          zh: "看来是网络路由器坏了，我马上换一个新的。",
          py: "Kànlái shì wǎngluò lùyóuqì huài le, wǒ mǎshàng huàn yí ge xīn de.",
          vi: "Xem ra là cục phát mạng hỏng rồi, tôi đổi ngay cái mới."
        },
        {
          speaker: "职员",
          zh: "麻烦你了，不然今天的工作无法坚持下去了。",
          py: "Máfan nǐ le, bùrán jīntiān de gōngzuò wúfǎ jiānchí xiàqù le.",
          vi: "Phiền anh rồi, nếu không thì công việc hôm nay không cách nào kiên trì làm tiếp được."
        },
        {
          speaker: "技术员",
          zh: "修好了！你可以继续用下去了。",
          py: "Xiū hǎo le! Nǐ kěyǐ jìxù yòng xiàqù le.",
          vi: "Sửa xong rồi! Bạn có thể tiếp tục dùng được rồi."
        }
      ]
    }
  ],
  // Bài 7A (OrderIndex 12) - Ngữ pháp: 为了, 有助于
  12: [
    {
      title: "Hội thoại: Lối sống lành mạnh",
      context: "Tiểu Minh và Tiểu Hồng trao đổi về thói quen tập thể dục.",
      lines: [
        {
          speaker: "小红",
          zh: "为了减肥，我每天早上都去跑步。",
          py: "Wèile jiǎnféi, wǒ měitiān zǎoshang dōu qù pǎobù.",
          vi: "Để giảm cân, mỗi sáng tôi đều đi chạy bộ."
        },
        {
          speaker: "小明",
          zh: "这很好。运动不仅能减肥，还有助于改善睡眠。",
          py: "Zhè hěn hǎo. Yùndòng bùjǐn néng jiǎnféi, hái yǒuzhùyú gǎishàn shuìmián.",
          vi: "Điều này rất tốt. Thể thao không chỉ giúp giảm cân, còn có ích cho việc cải thiện giấc ngủ."
        },
        {
          speaker: "小红",
          zh: "难怪最近我感觉精神多了。",
          py: "Nánguài zuìjìn wǒ gǎnjué jīngshén duō le.",
          vi: "Thảo nào dạo này tôi cảm thấy tinh thần hơn nhiều."
        },
        {
          speaker: "小明",
          zh: "为了保持健康，你要坚持下去哦。",
          py: "Wèile bǎochí jiànkāng, nǐ yào jiānchí xiàqù o.",
          vi: "Để giữ gìn sức khỏe, cậu phải kiên trì tiếp nhé."
        }
      ]
    }
  ],
  // Bài 7B (OrderIndex 13) - Ngữ pháp: 对…有好处, 适合, 与…有关
  13: [
    {
      title: "Hội thoại: Chọn môn thể thao",
      context: "Một cặp đôi bàn về việc tham gia lớp thể dục.",
      lines: [
        {
          speaker: "妻子",
          zh: "听说瑜伽对身体很有好处，我想去学。",
          py: "Tīngshuō yújiā duì shēntǐ hěn yǒu hǎochu, wǒ xiǎng qù xué.",
          vi: "Nghe nói Yoga rất có lợi cho cơ thể, em muốn đi học."
        },
        {
          speaker: "丈夫",
          zh: "瑜伽很适合你。不过这可能与你的耐心有关，你能坚持吗？",
          py: "Yújiā hěn shìhé nǐ. Búguò zhè kěnéng yǔ nǐ de nàixīn yǒuguān, nǐ néng jiānchí ma?",
          vi: "Yoga rất phù hợp với em. Nhưng điều này có thể liên quan đến tính kiên nhẫn của em, em kiên trì được không?"
        },
        {
          speaker: "妻子",
          zh: "别小看我，这对减轻压力也有好处呢。",
          py: "Bié xiǎokàn wǒ, zhè duì jiǎnqīng yālì yě yǒu hǎochu ne.",
          vi: "Đừng coi thường em, việc này cũng có lợi cho việc giảm áp lực đấy."
        },
        {
          speaker: "丈夫",
          zh: "好，只要适合你，我都支持。",
          py: "Hǎo, zhǐyào shìhé nǐ, wǒ dōu zhīchí.",
          vi: "Được, chỉ cần phù hợp với em, anh đều ủng hộ."
        }
      ]
    }
  ],
  // Bài 8A (OrderIndex 14) - Ngữ pháp: 宁可…也不…, 即使…也…
  14: [
    {
      title: "Hội thoại: Thói quen ăn uống",
      context: "Bố mẹ khuyên con trai không nên ăn thức ăn nhanh.",
      lines: [
        {
          speaker: "妈妈",
          zh: "我宁可自己辛苦做饭，也不让你天天吃快餐。",
          py: "Wǒ nìngkě zìjǐ xīnkǔ zuòfàn, yě bù ràng nǐ tiāntiān chī kuàicān.",
          vi: "Mẹ thà tự mình vất vả nấu cơm, chứ không để con ngày nào cũng ăn đồ ăn nhanh."
        },
        {
          speaker: "儿子",
          zh: "可是快餐方便啊，即使不健康也省时间。",
          py: "Kěshì kuàicān fāngbiàn a, jíshǐ bú jiànkāng yě shěng shíjiān.",
          vi: "Nhưng đồ ăn nhanh tiện mà, cho dù không lành mạnh thì cũng tiết kiệm thời gian."
        },
        {
          speaker: "妈妈",
          zh: "即使你再忙，也必须按时吃营养的饭菜。",
          py: "Jíshǐ nǐ zài máng, yě bìxū ànshí chī yíngyǎng de fàncài.",
          vi: "Cho dù con có bận nữa, cũng bắt buộc phải ăn cơm canh đủ dinh dưỡng đúng giờ."
        },
        {
          speaker: "儿子",
          zh: "好吧，那我以后多吃您做的菜。",
          py: "Hǎo ba, nà wǒ yǐhòu duō chī nín zuò de cài.",
          vi: "Được rồi, vậy sau này con sẽ ăn nhiều món mẹ nấu hơn."
        }
      ]
    }
  ],
  // Bài 8B (OrderIndex 15) - Ngữ pháp: 尽管…还是…, 不然…, 否则…
  15: [
    {
      title: "Hội thoại: Tầm quan trọng của dinh dưỡng",
      context: "Bác sĩ khuyên bệnh nhân về chế độ ăn kiêng.",
      lines: [
        {
          speaker: "医生",
          zh: "尽管你现在感觉不错，还是要注意饮食平衡。",
          py: "Jǐnguǎn nǐ xiànzài gǎnjué búcuò, háishì yào zhùyì yǐnshí pínghéng.",
          vi: "Mặc dù anh bây giờ cảm thấy không tồi, nhưng vẫn phải chú ý cân bằng ăn uống."
        },
        {
          speaker: "病人",
          zh: "好的。我必须少吃甜食，不然会发胖的。",
          py: "Hǎo de. Wǒ bìxū shǎo chī tiánshí, bùrán huì fāpàng de.",
          vi: "Vâng. Tôi bắt buộc phải ăn ít đồ ngọt, nếu không thì sẽ bị béo lên."
        },
        {
          speaker: "医生",
          zh: "对，一定要多吃蔬菜水果，否则营养跟不上。",
          py: "Duì, yídìng yào duō chī shūcài shuǐguǒ, fǒuzé yíngyǎng gēn bú shàng.",
          vi: "Đúng, nhất định phải ăn nhiều rau xanh hoa quả, nếu không thì dinh dưỡng không theo kịp."
        },
        {
          speaker: "病人",
          zh: "谢谢医生，我会严格按要求做的。",
          py: "Xièxie yīshēng, wǒ huì yángé àn yāoqiú zuò de.",
          vi: "Cảm ơn bác sĩ, tôi sẽ nghiêm túc làm theo yêu cầu."
        }
      ]
    }
  ],
  // Bài 9A (OrderIndex 16) - Ngữ pháp: 被动句 nâng cao, 让 / 叫 / 请
  16: [
    {
      title: "Hội thoại: Quan hệ đồng nghiệp",
      context: "Tại văn phòng, một người phàn nàn vì bị đồng nghiệp mắng.",
      lines: [
        {
          speaker: "小刘",
          zh: "今天早上我无缘无故挨了老板一顿骂。",
          py: "Jīntiān zǎoshang wǒ wúyuán wúgù ái le lǎobǎn yí dùn mà.",
          vi: "Sáng hôm nay tôi vô duyên vô cớ bị ông chủ mắng một trận."
        },
        {
          speaker: "小张",
          zh: "为什么？是谁让他这么生气的？",
          py: "Wèishénme? Shì shuí ràng tā zhème shēngqì de?",
          vi: "Tại sao? Là ai khiến ông ấy tức giận như vậy?"
        },
        {
          speaker: "小刘",
          zh: "听说是一份重要文件遭到了破坏，叫我背了黑锅。",
          py: "Tīngshuō shì yí fèn zhòngyào wénjiàn zāo dào le pòhuài, jiào wǒ bēi le hēiguō.",
          vi: "Nghe nói là một tài liệu quan trọng bị phá hoại, bắt tôi phải gánh tội thay."
        },
        {
          speaker: "小张",
          zh: "别急，请老板查清楚再做决定吧。",
          py: "Bié jí, qǐng lǎobǎn chá qīngchu zài zuò juédìng ba.",
          vi: "Đừng vội, mời ông chủ điều tra rõ ràng rồi hẵng đưa ra quyết định."
        }
      ]
    }
  ],
  // Bài 9B (OrderIndex 17) - Ngữ pháp: 受到…, 引起…, 影响…
  17: [
    {
      title: "Hội thoại: Giải quyết xung đột",
      context: "Hai người thảo luận về một vụ hiểu lầm.",
      lines: [
        {
          speaker: "王芳",
          zh: "这件事引起了很大的误会，影响了我们的关系。",
          py: "Zhè jiàn shì yǐnqǐ le hěn dà de wùhuì, yǐngxiǎng le wǒmen de guānxi.",
          vi: "Sự việc này đã gây ra sự hiểu lầm rất lớn, ảnh hưởng đến quan hệ của chúng ta."
        },
        {
          speaker: "李强",
          zh: "我知道，我也受到了很多批评。",
          py: "Wǒ zhīdào, wǒ yě shòudào le hěn duō pīpíng.",
          vi: "Tôi biết, tôi cũng đã nhận phải rất nhiều sự phê bình."
        },
        {
          speaker: "王芳",
          zh: "我们必须当面谈谈，以免影响更多人。",
          py: "Wǒmen bìxū dāngmiàn tántan, yǐmiǎn yǐngxiǎng gèng duō rén.",
          vi: "Chúng ta bắt buộc phải nói chuyện trực tiếp, để tránh ảnh hưởng đến nhiều người hơn."
        },
        {
          speaker: "李强",
          zh: "好的，希望不要再引起其他麻烦了。",
          py: "Hǎo de, xīwàng bú yào zài yǐnqǐ qítā máfan le.",
          vi: "Được, hy vọng đừng gây ra rắc rối nào khác nữa."
        }
      ]
    }
  ],
  // Bài 10A (OrderIndex 18) - Ngữ pháp: 不是…而是…, 并不是…
  18: [
    {
      title: "Hội thoại: Làm rõ sự việc",
      context: "Hai người bạn thanh minh về sự việc hôm qua.",
      lines: [
        {
          speaker: "小美",
          zh: "你昨天为什么没来？并不是你忘了，对吧？",
          py: "Nǐ zuótiān wèishénme méi lái? Bìng bú shì nǐ wàng le, duì ba?",
          vi: "Hôm qua sao cậu không đến? Hoàn toàn không phải cậu quên rồi chứ?"
        },
        {
          speaker: "大卫",
          zh: "真的不是我不想来，而是路上发生车祸了。",
          py: "Zhēn de bú shì wǒ bù xiǎng lái, ér shì lùshang fāshēng chēhuò le.",
          vi: "Thực sự không phải tôi không muốn đến, mà là trên đường xảy ra tai nạn xe rồi."
        },
        {
          speaker: "小美",
          zh: "原来如此，那事情并不是我想的那样。",
          py: "Yuánlái rúcǐ, nà shìqing bìng bú shì wǒ xiǎng de nàyàng.",
          vi: "Thì ra là vậy, thế thì sự việc hoàn toàn không phải như tôi nghĩ."
        },
        {
          speaker: "大卫",
          zh: "是的，希望你不要误会我了。",
          py: "Shì de, xīwàng nǐ bú yào wùhuì wǒ le.",
          vi: "Đúng vậy, hy vọng cậu đừng hiểu lầm tôi nữa."
        }
      ]
    }
  ],
  // Bài 10B (OrderIndex 19) - Ngữ pháp: 原来…, 怪不得…, 难怪…
  19: [
    {
      title: "Hội thoại: Nhận ra sự thật",
      context: "Hai đồng nghiệp nói chuyện về một người khác.",
      lines: [
        {
          speaker: "小王",
          zh: "原来他是老板的儿子！",
          py: "Yuánlái tā shì lǎobǎn de érzi!",
          vi: "Hóa ra cậu ta là con trai của ông chủ!"
        },
        {
          speaker: "小李",
          zh: "怪不得他刚来就当上了经理。",
          py: "Guàibude tā gāng lái jiù dāng shàng le jīnglǐ.",
          vi: "Thảo nào cậu ta vừa đến đã làm được giám đốc."
        },
        {
          speaker: "小王",
          zh: "是啊，难怪大家都对他客客气气的。",
          py: "Shì a, nánguài dàjiā dōu duì tā kèkeqìqì de.",
          vi: "Đúng vậy, thảo nào mọi người đều khách sáo với cậu ta."
        },
        {
          speaker: "小李",
          zh: "不过原来他也很努力，并不是只靠关系。",
          py: "Búguò yuánlái tā yě hěn nǔlì, bìng bú shì zhǐ kào guānxi.",
          vi: "Nhưng hóa ra cậu ta cũng rất nỗ lực, hoàn toàn không phải chỉ dựa vào quan hệ."
        }
      ]
    }
  ]
};

const targetPath = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk4-batch2.json');
let data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

for (let i = 0; i < data.length; i++) {
  const lesson = data[i];
  if (batch2Dialogues[lesson.orderIndex]) {
    lesson.dialogues = batch2Dialogues[lesson.orderIndex];
  }
}

fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Cập nhật hội thoại cho HSK 4 Batch 2 thành công!');
