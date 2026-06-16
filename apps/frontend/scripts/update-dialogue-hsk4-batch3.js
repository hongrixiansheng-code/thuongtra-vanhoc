const fs = require('fs');
const path = require('path');

const batch3Dialogues = {
  // Bài 11A (OrderIndex 20) - Ngữ pháp: 比起…, 与…相比…
  20: [
    {
      title: "Hội thoại: Tiết kiệm tiền",
      context: "Hai sinh viên nói chuyện về kế hoạch chi tiêu.",
      lines: [
        {
          speaker: "小李",
          zh: "比起以前，我现在每个月能省下不少钱。",
          py: "Bǐqǐ yǐqián, wǒ xiànzài měi ge yuè néng shěng xià bù shǎo qián.",
          vi: "So với trước đây, bây giờ mỗi tháng tôi có thể tiết kiệm được không ít tiền."
        },
        {
          speaker: "小王",
          zh: "与你相比，我还是经常乱买东西。",
          py: "Yǔ nǐ xiāngbǐ, wǒ háishì jīngcháng luàn mǎi dōngxi.",
          vi: "So với cậu, tôi vẫn thường xuyên mua sắm lung tung."
        },
        {
          speaker: "小李",
          zh: "你可以试着记账，这样就能控制花费了。",
          py: "Nǐ kěyǐ shì zhe jìzhàng, zhèyàng jiù néng kòngzhì huāfèi le.",
          vi: "Cậu có thể thử ghi chép sổ sách, như vậy là có thể kiểm soát chi phí rồi."
        },
        {
          speaker: "小王",
          zh: "好主意，下个月我就开始。",
          py: "Hǎo zhǔyì, xià ge yuè wǒ jiù kāishǐ.",
          vi: "Ý kiến hay, tháng sau tôi sẽ bắt đầu."
        }
      ]
    }
  ],
  // Bài 11B (OrderIndex 21) - Ngữ pháp: 占…, 达到…, 超过…
  21: [
    {
      title: "Hội thoại: Quản lý tài chính công ty",
      context: "Giám đốc và kế toán đang xem xét báo cáo tài chính.",
      lines: [
        {
          speaker: "经理",
          zh: "我们这个季度的花费达到预期了吗？",
          py: "Wǒmen zhège jìdù de huāfèi dádào yùqī le ma?",
          vi: "Chi phí quý này của chúng ta đã đạt dự kiến chưa?"
        },
        {
          speaker: "会计",
          zh: "已经超过预期了。广告费用占了很大一部分。",
          py: "Yǐjīng chāoguò yùqī le. Guǎnggào fèiyòng zhàn le hěn dà yí bùfen.",
          vi: "Đã vượt quá dự kiến rồi. Chi phí quảng cáo chiếm một phần rất lớn."
        },
        {
          speaker: "经理",
          zh: "看来下个月必须减少开支了。",
          py: "Kànlái xià ge yuè bìxū jiǎnshǎo kāizhī le.",
          vi: "Xem ra tháng sau bắt buộc phải giảm chi tiêu rồi."
        },
        {
          speaker: "会计",
          zh: "好的，我会重新做一个财务计划。",
          py: "Hǎo de, wǒ huì chóngxīn zuò yí ge cáiwù jìhuà.",
          vi: "Vâng, tôi sẽ làm lại một kế hoạch tài chính."
        }
      ]
    }
  ],
  // Bài 12A (OrderIndex 22) - Ngữ pháp: 一边…一边…, 一面…一面…
  22: [
    {
      title: "Hội thoại: Trải nghiệm du lịch",
      context: "Hai người bạn đang dạo phố ở một thành phố lạ.",
      lines: [
        {
          speaker: "玛丽",
          zh: "我们一边走一边看风景吧。",
          py: "Wǒmen yìbiān zǒu yìbiān kàn fēngjǐng ba.",
          vi: "Chúng ta vừa đi vừa ngắm phong cảnh đi."
        },
        {
          speaker: "约翰",
          zh: "好啊，我一面拍照一面听导游介绍。",
          py: "Hǎo a, wǒ yímiàn pāizhào yímiàn tīng dǎoyóu jièshào.",
          vi: "Được thôi, tôi vừa chụp ảnh vừa nghe hướng dẫn viên giới thiệu."
        },
        {
          speaker: "玛丽",
          zh: "这里的建筑真的很有特色。",
          py: "Zhèlǐ de jiànzhù zhēn de hěn yǒu tèsè.",
          vi: "Kiến trúc ở đây thực sự rất có nét đặc sắc."
        },
        {
          speaker: "约翰",
          zh: "是啊，这次旅行真是太有趣了。",
          py: "Shì a, zhè cì lǚxíng zhēn shì tài yǒuqù le.",
          vi: "Đúng vậy, chuyến du lịch lần này thật là thú vị quá đi."
        }
      ]
    }
  ],
  // Bài 12B (OrderIndex 23) - Ngữ pháp: Bổ ngữ kết quả 到, 见, 着
  23: [
    {
      title: "Hội thoại: Tìm đường",
      context: "Du khách bị lạc và đang tìm đường về khách sạn.",
      lines: [
        {
          speaker: "游客",
          zh: "请问，您看见过这家酒店吗？",
          py: "Qǐngwèn, nín kànjiàn guò zhè jiā jiǔdiàn ma?",
          vi: "Xin hỏi, bạn đã nhìn thấy khách sạn này bao giờ chưa?"
        },
        {
          speaker: "路人",
          zh: "我没看见过，你可以用地图找找看。",
          py: "Wǒ méi kànjiàn guò, nǐ kěyǐ yòng dìtú zhǎozhao kàn.",
          vi: "Tôi chưa nhìn thấy bao giờ, bạn có thể dùng bản đồ tìm thử xem."
        },
        {
          speaker: "游客",
          zh: "我的手机没电了，所以一直找不到。",
          py: "Wǒ de shǒujī méi diàn le, suǒyǐ yìzhí zhǎo bú dào.",
          vi: "Điện thoại của tôi hết pin rồi, nên mãi tìm không được."
        },
        {
          speaker: "路人",
          zh: "别急，你朝着那条街走，应该能碰着警察。",
          py: "Bié jí, nǐ cháo zhe nà tiáo jiē zǒu, yīnggāi néng pèngzháo jǐngchá.",
          vi: "Đừng vội, bạn cứ đi về hướng con phố kia, chắc là có thể gặp được cảnh sát đấy."
        }
      ]
    }
  ],
  // Bài 13A (OrderIndex 24) - Ngữ pháp: 无论…都/也…, 不管…都/也…
  24: [
    {
      title: "Hội thoại: Khác biệt văn hóa",
      context: "Hai lưu học sinh nói về cuộc sống ở Trung Quốc.",
      lines: [
        {
          speaker: "马克",
          zh: "无论走到哪里，中国人都很热情。",
          py: "Wúlùn zǒu dào nǎlǐ, Zhōngguórén dōu hěn rèqíng.",
          vi: "Bất luận đi đến đâu, người Trung Quốc đều rất nhiệt tình."
        },
        {
          speaker: "安娜",
          zh: "是啊，不管遇到什么困难，他们都愿意帮忙。",
          py: "Shì a, bùguǎn yùdào shénme kùnnán, tāmen dōu yuànyì bāngmáng.",
          vi: "Đúng vậy, cho dù gặp khó khăn gì, họ cũng sẵn lòng giúp đỡ."
        },
        {
          speaker: "马克",
          zh: "可是这里的饮食习惯我还是有点不适应。",
          py: "Kěshì zhèlǐ de yǐnshí xíguàn wǒ háishì yǒudiǎn bù shìyìng.",
          vi: "Nhưng mà thói quen ăn uống ở đây tôi vẫn hơi không quen."
        },
        {
          speaker: "安娜",
          zh: "习惯就好了，无论如何，这也是一种体验。",
          py: "Xíguàn jiù hǎo le, wúlùn rúhé, zhè yě shì yì zhǒng tǐyàn.",
          vi: "Quen rồi sẽ ổn thôi, dù sao đi nữa, đây cũng là một trải nghiệm."
        }
      ]
    }
  ],
  // Bài 13B (OrderIndex 25) - Ngữ pháp: 即便…也…, 至于…, 对于…
  25: [
    {
      title: "Hội thoại: Tôn trọng sự khác biệt",
      context: "Thảo luận về các phong tục tập quán khác nhau.",
      lines: [
        {
          speaker: "林浩",
          zh: "对于这种风俗，我真的不太理解。",
          py: "Duìyú zhè zhǒng fēngsú, wǒ zhēn de bú tài lǐjiě.",
          vi: "Đối với phong tục này, tôi thực sự không hiểu lắm."
        },
        {
          speaker: "张伟",
          zh: "即便你不理解，也应该保持尊重。",
          py: "Jíbiàn nǐ bù lǐjiě, yě yīnggāi bǎochí zūnzhòng.",
          vi: "Cho dù cậu không hiểu, thì cũng nên giữ sự tôn trọng."
        },
        {
          speaker: "林浩",
          zh: "我知道。至于其他的规矩，我还得慢慢学。",
          py: "Wǒ zhīdào. Zhìyú qítā de guīju, wǒ hái děi mànman xué.",
          vi: "Tôi biết. Còn về các quy củ khác, tôi vẫn phải từ từ học."
        },
        {
          speaker: "张伟",
          zh: "没关系，入乡随俗嘛。",
          py: "Méi guānxi, rùxiāngsuísú ma.",
          vi: "Không sao, nhập gia tùy tục mà."
        }
      ]
    }
  ],
  // Bài 14A (OrderIndex 26) - Ngữ pháp: 随着…, 伴随着…, 随着…越来越…
  26: [
    {
      title: "Hội thoại: Thay đổi của môi trường",
      context: "Hai nhà bảo vệ môi trường thảo luận về ô nhiễm.",
      lines: [
        {
          speaker: "专家A",
          zh: "随着经济的发展，环境污染越来越严重了。",
          py: "Suízhe jīngjì de fāzhǎn, huánjìng wūrǎn yuè lái yuè yánzhòng le.",
          vi: "Cùng với sự phát triển của kinh tế, ô nhiễm môi trường ngày càng nghiêm trọng rồi."
        },
        {
          speaker: "专家B",
          zh: "是的，伴随着城市的扩大，绿地面积在减少。",
          py: "Shì de, bànsuízhe chéngshì de kuòdà, lǜdì miànjī zài jiǎnshǎo.",
          vi: "Đúng vậy, đi cùng với sự mở rộng của thành phố, diện tích không gian xanh đang giảm đi."
        },
        {
          speaker: "专家A",
          zh: "我们必须采取行动，保护地球。",
          py: "Wǒmen bìxū cǎiqǔ xíngdòng, bǎohù dìqiú.",
          vi: "Chúng ta bắt buộc phải hành động, bảo vệ trái đất."
        },
        {
          speaker: "专家B",
          zh: "同意，只有这样，未来的生活才会更好。",
          py: "Tóngyì, zhǐyǒu zhèyàng, wèilái de shēnghuó cái huì gèng hǎo.",
          vi: "Đồng ý, chỉ có như vậy, cuộc sống tương lai mới có thể tốt đẹp hơn."
        }
      ]
    }
  ],
  // Bài 14B (OrderIndex 27) - Ngữ pháp: Bổ ngữ xu hướng kép, Bổ ngữ khả năng
  27: [
    {
      title: "Hội thoại: Hành động vì môi trường",
      context: "Nhóm tình nguyện viên đang nhặt rác trên bãi biển.",
      lines: [
        {
          speaker: "队长",
          zh: "大家把这些垃圾捡起来放到袋子里。",
          py: "Dàjiā bǎ zhèxiē lājī jiǎn qǐlái fàng dào dàizi lǐ.",
          vi: "Mọi người hãy nhặt những rác này lên rồi bỏ vào trong túi."
        },
        {
          speaker: "队员",
          zh: "这么多垃圾，我们今天能清理得完吗？",
          py: "Zhème duō lājī, wǒmen jīntiān néng qīnglǐ de wán ma?",
          vi: "Nhiều rác thế này, hôm nay chúng ta có thể dọn sạch nổi không?"
        },
        {
          speaker: "队长",
          zh: "肯定能干得完，大家加把劲儿！",
          py: "Kěndìng néng gàn de wán, dàjiā jiā bǎ jìnr!",
          vi: "Chắc chắn là có thể làm xong được, mọi người cố gắng lên!"
        },
        {
          speaker: "队员",
          zh: "好的，哪怕再累也要把这片沙滩收拾干净。",
          py: "Hǎo de, nǎpà zài lèi yě yào bǎ zhè piàn shātān shōushi gānjìng.",
          vi: "Được, cho dù có mệt nữa cũng phải dọn dẹp sạch sẽ bãi biển này."
        }
      ]
    }
  ],
  // Bài 15A (OrderIndex 28) - Ngữ pháp: 据说…, 据报道…
  28: [
    {
      title: "Hội thoại: Thảo luận tin tức",
      context: "Hai người bạn đang đọc báo buổi sáng.",
      lines: [
        {
          speaker: "阿杰",
          zh: "你看今天的新闻了吗？据报道，房价又涨了。",
          py: "Nǐ kàn jīntiān de xīnwén le ma? Jù bàodào, fángjià yòu zhǎng le.",
          vi: "Cậu xem tin tức hôm nay chưa? Theo bản tin đưa, giá nhà lại tăng rồi."
        },
        {
          speaker: "小文",
          zh: "我听说了。据说很多人都买不起房子了。",
          py: "Wǒ tīngshuō le. Jùshuō hěn duō rén dōu mǎi bù qǐ fángzi le.",
          vi: "Tôi nghe nói rồi. Nghe nói rất nhiều người đều không mua nổi nhà nữa."
        },
        {
          speaker: "阿杰",
          zh: "这样下去可不行，压力太大了。",
          py: "Zhèyàng xiàqù kě bùxíng, yālì tài dà le.",
          vi: "Cứ tiếp tục thế này thì không ổn, áp lực lớn quá."
        },
        {
          speaker: "小文",
          zh: "是啊，希望能有相关的政策出台。",
          py: "Shì a, xīwàng néng yǒu xiāngguān de zhèngcè chūtái.",
          vi: "Đúng vậy, hy vọng có thể có chính sách liên quan được ban hành."
        }
      ]
    }
  ],
  // Bài 15B (OrderIndex 29) - Ngữ pháp: 据…统计…, 所谓…, 可见…
  29: [
    {
      title: "Hội thoại: Phân tích số liệu",
      context: "Trong một buổi báo cáo truyền thông.",
      lines: [
        {
          speaker: "主讲人",
          zh: "据最新统计，使用智能手机的人数还在增加。",
          py: "Jù zuìxīn tǒngjì, shǐyòng zhìnéng shǒujī de rénshù hái zài zēngjiā.",
          vi: "Theo thống kê mới nhất, số người sử dụng điện thoại thông minh vẫn đang tăng lên."
        },
        {
          speaker: "听众",
          zh: "那么，所谓的“低头族”也就越来越多吧？",
          py: "Nàme, suǒwèi de “dītóuzú” yě jiù yuè lái yuè duō ba?",
          vi: "Vậy thì, những người được gọi là 'Cúi đầu tộc' (cắm mặt vào điện thoại) cũng ngày càng nhiều nhỉ?"
        },
        {
          speaker: "主讲人",
          zh: "没错，可见科技改变了我们的生活方式。",
          py: "Méicuò, kějiàn kējì gǎibiàn le wǒmen de shēnghuó fāngshì.",
          vi: "Không sai, có thể thấy công nghệ đã làm thay đổi phương thức sống của chúng ta."
        },
        {
          speaker: "听众",
          zh: "但我们也应该注意合理使用科技产品。",
          py: "Dàn wǒmen yě yīnggāi zhùyì hélǐ shǐyòng kējì chǎnpǐn.",
          vi: "Nhưng chúng ta cũng nên chú ý sử dụng hợp lý các sản phẩm công nghệ."
        }
      ]
    }
  ]
};

const targetPath = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk4-batch3.json');
let data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

for (let i = 0; i < data.length; i++) {
  const lesson = data[i];
  if (batch3Dialogues[lesson.orderIndex]) {
    lesson.dialogues = batch3Dialogues[lesson.orderIndex];
  }
}

fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Cập nhật hội thoại cho HSK 4 Batch 3 thành công!');
