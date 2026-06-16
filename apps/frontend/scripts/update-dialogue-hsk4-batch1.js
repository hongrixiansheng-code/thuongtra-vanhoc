const fs = require('fs');
const path = require('path');

const batch1Dialogues = {
  // Bài 1A (OrderIndex 0) - Ngữ pháp: 越来越…, 对…来说, 关于…
  0: [
    {
      title: "Hội thoại: Áp lực công việc",
      context: "Tiểu Vương và Giám đốc Lý nói chuyện về kinh nghiệm làm việc.",
      lines: [
        {
          speaker: "小王",
          zh: "李经理，关于新项目，我觉得压力越来越大了。",
          py: "Lǐ jīnglǐ, guānyú xīn xiàngmù, wǒ juéde yālì yuè lái yuè dà le.",
          vi: "Giám đốc Lý, về dự án mới, tôi cảm thấy áp lực ngày càng lớn."
        },
        {
          speaker: "李经理",
          zh: "别担心。对我来说，这是积累经验的好机会。",
          py: "Bié dānxīn. Duì wǒ lái shuō, zhè shì jīlěi jīngyàn de hǎo jīhuì.",
          vi: "Đừng lo lắng. Đối với tôi mà nói, đây là cơ hội tốt để tích lũy kinh nghiệm."
        },
        {
          speaker: "小王",
          zh: "好的，我会努力发展的。",
          py: "Hǎo de, wǒ huì nǔlì fāzhǎn de.",
          vi: "Vâng, tôi sẽ nỗ lực phát triển."
        },
        {
          speaker: "李经理",
          zh: "只要尽了责任，奖金不会少的。",
          py: "Zhǐyào jìn le zérèn, jiǎngjīn bú huì shǎo de.",
          vi: "Chỉ cần làm tròn trách nhiệm, tiền thưởng sẽ không ít đâu."
        }
      ]
    }
  ],
  // Bài 1B (OrderIndex 1) - Ngữ pháp: 除了…之外…, Subject + 对 + Object + Verb
  1: [
    {
      title: "Hội thoại: Kế hoạch tương lai",
      context: "Hai đồng nghiệp nói chuyện trong giờ nghỉ trưa.",
      lines: [
        {
          speaker: "小张",
          zh: "除了工资之外，你对公司还有什么要求吗？",
          py: "Chúle gōngzī zhīwài, nǐ duì gōngsī hái yǒu shénme yāoqiú ma?",
          vi: "Ngoài tiền lương ra, cậu đối với công ty còn có yêu cầu gì không?"
        },
        {
          speaker: "小李",
          zh: "我对现在的工作环境很满意。",
          py: "Wǒ duì xiànzài de gōngzuò huánjìng hěn mǎnyì.",
          vi: "Tôi rất hài lòng với môi trường làm việc hiện tại."
        },
        {
          speaker: "小张",
          zh: "那你会考虑换工作吗？",
          py: "Nà nǐ huì kǎolǜ huàn gōngzuò ma?",
          vi: "Vậy cậu có cân nhắc đổi công việc không?"
        },
        {
          speaker: "小李",
          zh: "暂时不会，我想在这里提升自己的能力。",
          py: "Zànshí bú huì, wǒ xiǎng zài zhèlǐ tíshēng zìjǐ de nénglì.",
          vi: "Tạm thời không, tôi muốn nâng cao năng lực của bản thân ở đây."
        }
      ]
    }
  ],
  // Bài 2A (OrderIndex 2) - Ngữ pháp: 不但…而且…, 既…又…, 一方面…另一方面…
  2: [
    {
      title: "Hội thoại: Chuẩn bị phỏng vấn",
      context: "Tiểu Minh và bạn thân đang thảo luận về buổi phỏng vấn sắp tới.",
      lines: [
        {
          speaker: "朋友",
          zh: "你准备好明天的面试了吗？",
          py: "Nǐ zhǔnbèi hǎo míngtiān de miànshì le ma?",
          vi: "Cậu chuẩn bị xong cho buổi phỏng vấn ngày mai chưa?"
        },
        {
          speaker: "小明",
          zh: "准备好了。这家公司不但名气大，而且待遇很好。",
          py: "Zhǔnbèi hǎo le. Zhè jiā gōngsī búdàn míngqì dà, érqiě dàiyù hěn hǎo.",
          vi: "Chuẩn bị xong rồi. Công ty này không những danh tiếng lớn, mà đãi ngộ còn rất tốt."
        },
        {
          speaker: "朋友",
          zh: "那你紧张吗？",
          py: "Nà nǐ jǐnzhāng ma?",
          vi: "Vậy cậu có hồi hộp không?"
        },
        {
          speaker: "小明",
          zh: "一方面有点紧张，另一方面既兴奋又期待。",
          py: "Yì fāngmiàn yǒudiǎn jǐnzhāng, lìng yì fāngmiàn jì xīngfèn yòu qīdài.",
          vi: "Một mặt hơi hồi hộp, mặt khác lại vừa phấn khích vừa mong đợi."
        }
      ]
    }
  ],
  // Bài 2B (OrderIndex 3) - Ngữ pháp: 越…越…, 甚至
  3: [
    {
      title: "Hội thoại: Kết quả xin việc",
      context: "Tiểu Minh nhận được tin báo trúng tuyển.",
      lines: [
        {
          speaker: "小明",
          zh: "我被录取了！而且工资越努力越高！",
          py: "Wǒ bèi lùqǔ le! Érqiě gōngzī yuè nǔlì yuè gāo!",
          vi: "Tôi được nhận rồi! Hơn nữa tiền lương càng nỗ lực càng cao!"
        },
        {
          speaker: "朋友",
          zh: "太棒了！他们问了你很难的问题吗？",
          py: "Tài bàng le! Tāmen wèn le nǐ hěn nán de wèntí ma?",
          vi: "Tuyệt quá! Họ có hỏi cậu câu hỏi rất khó không?"
        },
        {
          speaker: "小明",
          zh: "是的，面试官甚至让我现场解决一个复杂的问题。",
          py: "Shì de, miànshìguān shènzhì ràng wǒ xiànchǎng jiějué yí ge fùzá de wèntí.",
          vi: "Đúng vậy, người phỏng vấn thậm chí còn bắt tôi giải quyết một vấn đề phức tạp ngay tại chỗ."
        },
        {
          speaker: "朋友",
          zh: "看来你的诚实和专业打动了他们。",
          py: "Kànlái nǐ de chéngshí hé zhuānyè dǎdòng le tāmen.",
          vi: "Xem ra sự thành thật và chuyên nghiệp của cậu đã làm họ cảm động."
        }
      ]
    }
  ],
  // Bài 3A (OrderIndex 4) - Ngữ pháp: 一…就…, 刚…就…, 才 vs 就
  4: [
    {
      title: "Hội thoại: Sắp xếp thời gian",
      context: "Hai sinh viên nói chuyện về việc làm bài tập.",
      lines: [
        {
          speaker: "小林",
          zh: "我刚下课就来图书馆了，你呢？",
          py: "Wǒ gāng xiàkè jiù lái túshūguǎn le, nǐ ne?",
          vi: "Tôi vừa tan học là đến thư viện ngay, còn cậu?"
        },
        {
          speaker: "小华",
          zh: "我早上八点就来了，你现在才来啊。",
          py: "Wǒ zǎoshang bā diǎn jiù lái le, nǐ xiànzài cái lái a.",
          vi: "Tôi 8 giờ sáng đã đến rồi, bây giờ cậu mới đến á."
        },
        {
          speaker: "小林",
          zh: "我一吃完午饭就困，所以睡了一会儿。",
          py: "Wǒ yì chī wán wǔfàn jiù kùn, suǒyǐ shuì le yí huìr.",
          vi: "Tôi vừa ăn trưa xong là buồn ngủ, nên đã ngủ một lát."
        },
        {
          speaker: "小华",
          zh: "我们要合理安排时间，快点开始吧。",
          py: "Wǒmen yào hélǐ ānpái shíjiān, kuài diǎn kāishǐ ba.",
          vi: "Chúng ta phải sắp xếp thời gian hợp lý, mau bắt đầu thôi."
        }
      ]
    }
  ],
  // Bài 3B (OrderIndex 5) - Ngữ pháp: 已经…了, 从来不…
  5: [
    {
      title: "Hội thoại: Thói quen sinh hoạt",
      context: "Hai người bạn trò chuyện về việc quản lý thời gian nghỉ ngơi.",
      lines: [
        {
          speaker: "朋友",
          zh: "都已经晚上十一点了，你还不睡？",
          py: "Dōu yǐjīng wǎnshang shíyī diǎn le, nǐ hái bù shuì?",
          vi: "Đã 11 giờ đêm rồi, cậu còn chưa ngủ à?"
        },
        {
          speaker: "小李",
          zh: "我从来不熬夜，但今天工作没做完。",
          py: "Wǒ cónglái bù áoyè, dàn jīntiān gōngzuò méi zuò wán.",
          vi: "Tôi từ trước đến nay không thức khuya, nhưng hôm nay công việc chưa làm xong."
        },
        {
          speaker: "朋友",
          zh: "健康最重要，明天再做吧。",
          py: "Jiànkāng zuì zhòngyào, míngtiān zài zuò ba.",
          vi: "Sức khỏe quan trọng nhất, ngày mai làm tiếp đi."
        },
        {
          speaker: "小李",
          zh: "你说得对，我已经很累了。",
          py: "Nǐ shuō de duì, wǒ yǐjīng hěn lèi le.",
          vi: "Cậu nói đúng, tôi đã rất mệt rồi."
        }
      ]
    }
  ],
  // Bài 4A (OrderIndex 6) - Ngữ pháp: 由于…, 因此…, 因…而…
  6: [
    {
      title: "Hội thoại: Đối mặt với áp lực",
      context: "Hai đồng nghiệp thảo luận về tình hình dự án.",
      lines: [
        {
          speaker: "同事",
          zh: "由于时间太紧，大家最近都很焦虑。",
          py: "Yóuyú shíjiān tài jǐn, dàjiā zuìjìn dōu hěn jiāolǜ.",
          vi: "Do thời gian quá gấp, mọi người gần đây đều rất lo âu."
        },
        {
          speaker: "经理",
          zh: "我明白。因此，我决定给大家增加人手。",
          py: "Wǒ míngbai. Yīncǐ, wǒ juédìng gěi dàjiā zēngjiā rénshǒu.",
          vi: "Tôi hiểu. Bởi vậy, tôi quyết định tăng thêm nhân sự cho mọi người."
        },
        {
          speaker: "同事",
          zh: "太感谢了。很多人因压力太大而失眠。",
          py: "Tài gǎnxiè le. Hěn duō rén yīn yālì tài dà ér shīmián.",
          vi: "Rất cảm ơn. Rất nhiều người vì áp lực quá lớn mà mất ngủ."
        },
        {
          speaker: "经理",
          zh: "我们要学会减轻负担，保持乐观。",
          py: "Wǒmen yào xuéhuì jiǎnqīng fùdān, bǎochí lèguān.",
          vi: "Chúng ta phải học cách giảm bớt gánh nặng, giữ sự lạc quan."
        }
      ]
    }
  ],
  // Bài 4B (OrderIndex 7) - Ngữ pháp: 结果…, 造成…
  7: [
    {
      title: "Hội thoại: Hậu quả của sự bất cẩn",
      context: "Cuộc họp rút kinh nghiệm trong công ty.",
      lines: [
        {
          speaker: "老板",
          zh: "你的粗心造成了公司很大的损失。",
          py: "Nǐ de cūxīn zàochéng le gōngsī hěn dà de sǔnshī.",
          vi: "Sự cẩu thả của cậu đã gây ra tổn thất rất lớn cho công ty."
        },
        {
          speaker: "员工",
          zh: "对不起，我以为没问题，结果全错了。",
          py: "Duìbuqǐ, wǒ yǐwéi méi wèntí, jiéguǒ quán cuò le.",
          vi: "Xin lỗi, tôi tưởng là không có vấn đề, kết quả là sai toàn bộ."
        },
        {
          speaker: "老板",
          zh: "任何一个小错误，都可能引起大麻烦。",
          py: "Rènhé yí ge xiǎo cuòwù, dōu kěnéng yǐnqǐ dà máfan.",
          vi: "Bất kỳ một sai sót nhỏ nào, cũng có thể dẫn đến phiền phức lớn."
        },
        {
          speaker: "员工",
          zh: "我保证以后会更加仔细。",
          py: "Wǒ bǎozhèng yǐhòu huì gèngjiā zǐxì.",
          vi: "Tôi đảm bảo sau này sẽ càng cẩn thận hơn."
        }
      ]
    }
  ],
  // Bài 5A (OrderIndex 8) - Ngữ pháp: 只要…就…, 只有…才…, 与其…不如…
  8: [
    {
      title: "Hội thoại: Phương pháp học hiệu quả",
      context: "Hai du học sinh chia sẻ cách học tiếng Trung.",
      lines: [
        {
          speaker: "安娜",
          zh: "只有多和中国人聊天，口语才能提高。",
          py: "Zhǐyǒu duō hé Zhōngguórén liáotiān, kǒuyǔ cái néng tígāo.",
          vi: "Chỉ có nói chuyện nhiều với người Trung Quốc, khẩu ngữ mới có thể nâng cao."
        },
        {
          speaker: "马丁",
          zh: "你说得对，只要敢开口，就会有进步。",
          py: "Nǐ shuō de duì, zhǐyào gǎn kāikǒu, jiù huì yǒu jìnbù.",
          vi: "Cậu nói đúng, chỉ cần dám mở miệng, thì sẽ có tiến bộ."
        },
        {
          speaker: "安娜",
          zh: "与其每天死记硬背，不如多看中文电影。",
          py: "Yǔqí měitiān sǐjì yìngbèi, bùrú duō kàn Zhōngwén diànyǐng.",
          vi: "Thà mỗi ngày học vẹt, còn hơn là xem nhiều phim tiếng Trung."
        },
        {
          speaker: "马丁",
          zh: "好主意，我们晚上一起看电影吧！",
          py: "Hǎo zhǔyì, wǒmen wǎnshang yìqǐ kàn diànyǐng ba!",
          vi: "Ý kiến hay, tối nay chúng ta cùng xem phim đi!"
        }
      ]
    }
  ],
  // Bài 5B (OrderIndex 9) - Ngữ pháp: 靠…, 通过…
  9: [
    {
      title: "Hội thoại: Đạt được mục tiêu",
      context: "Cuộc thảo luận về việc tự học và đạt điểm cao.",
      lines: [
        {
          speaker: "同学",
          zh: "你这次考试成绩真优秀，有什么秘诀吗？",
          py: "Nǐ zhè cì kǎoshì chéngjì zhēn yōuxiù, yǒu shénme mìjué ma?",
          vi: "Thành tích thi lần này của cậu thật xuất sắc, có bí quyết gì không?"
        },
        {
          speaker: "学霸",
          zh: "我主要靠平时阅读和做笔记。",
          py: "Wǒ zhǔyào kào píngshí yuèdú hé zuò bǐjì.",
          vi: "Tôi chủ yếu dựa vào việc đọc và ghi chép lúc bình thường."
        },
        {
          speaker: "同学",
          zh: "看来，通过努力确实能改变结果。",
          py: "Kànlái, tōngguò nǔlì quèshí néng gǎibiàn jiéguǒ.",
          vi: "Xem ra, thông qua nỗ lực thực sự có thể thay đổi kết quả."
        },
        {
          speaker: "学霸",
          zh: "是的，学习不能只靠聪明，还要坚持。",
          py: "Shì de, xuéxí bù néng zhǐ kào cōngming, hái yào jiānchí.",
          vi: "Đúng vậy, học tập không thể chỉ dựa vào sự thông minh, còn phải kiên trì."
        }
      ]
    }
  ]
};

const targetPath = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk4-batch1.json');
let data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

for (let i = 0; i < data.length; i++) {
  const lesson = data[i];
  if (batch1Dialogues[lesson.orderIndex]) {
    lesson.dialogues = batch1Dialogues[lesson.orderIndex];
  }
}

fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Cập nhật hội thoại cho HSK 4 Batch 1 thành công!');
