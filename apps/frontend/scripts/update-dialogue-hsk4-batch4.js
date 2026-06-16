const fs = require('fs');
const path = require('path');

const batch4Dialogues = {
  // Bài 16A (OrderIndex 30) - Ngữ pháp: 之所以…是因为…, 正是…才…
  30: [
    {
      title: "Hội thoại: Phân tích nguyên nhân",
      context: "Hai người bạn đang bàn luận về thành công của một công ty.",
      lines: [
        {
          speaker: "小李",
          zh: "这家公司之所以成功，是因为他们重视人才。",
          py: "Zhè jiā gōngsī zhī suǒyǐ chénggōng, shì yīnwèi tāmen zhòngshì réncái.",
          vi: "Công ty này sở dĩ thành công, là bởi vì họ coi trọng nhân tài."
        },
        {
          speaker: "大卫",
          zh: "没错，正是因为这样，大家才愿意为公司效力。",
          py: "Méicuò, zhèng shì yīnwèi zhèyàng, dàjiā cái yuànyì wèi gōngsī xiàolì.",
          vi: "Không sai, chính là vì như vậy, mọi người mới sẵn lòng cống hiến cho công ty."
        },
        {
          speaker: "小李",
          zh: "而且他们的产品质量也非常好。",
          py: "Érqiě tāmen de chǎnpǐn zhìliàng yě fēicháng hǎo.",
          vi: "Hơn nữa chất lượng sản phẩm của họ cũng vô cùng tốt."
        },
        {
          speaker: "大卫",
          zh: "这也就是为什么他们能赢得市场。",
          py: "Zhè yě jiù shì wèishénme tāmen néng yíngdé shìchǎng.",
          vi: "Đó cũng chính là lý do tại sao họ có thể giành được thị trường."
        }
      ]
    }
  ],
  // Bài 16B (OrderIndex 31) - Ngữ pháp: 之所以…, 恰恰…, 反而…
  31: [
    {
      title: "Hội thoại: Kết quả bất ngờ",
      context: "Một cuộc trò chuyện về kết quả kỳ thi.",
      lines: [
        {
          speaker: "张老师",
          zh: "这次考试，成绩好的同学反而退步了。",
          py: "Zhè cì kǎoshì, chéngjì hǎo de tóngxué fǎn'ér tuìbù le.",
          vi: "Kỳ thi lần này, học sinh có thành tích tốt trái lại lại lùi bước."
        },
        {
          speaker: "李老师",
          zh: "他们之所以没考好，恰恰是因为太骄傲了。",
          py: "Tāmen zhī suǒyǐ méi kǎo hǎo, qiàqià shì yīnwèi tài jiāo'ào le.",
          vi: "Họ sở dĩ thi không tốt, đúng lúc lại là vì quá kiêu ngạo."
        },
        {
          speaker: "张老师",
          zh: "那几个基础差的同学呢？",
          py: "Nà jǐ ge jīchǔ chà de tóngxué ne?",
          vi: "Thế mấy em học sinh nền tảng kém thì sao?"
        },
        {
          speaker: "李老师",
          zh: "他们很努力，所以成绩反而提高了。",
          py: "Tāmen hěn nǔlì, suǒyǐ chéngjì fǎn'ér tígāo le.",
          vi: "Chúng rất nỗ lực, cho nên thành tích ngược lại lại được nâng cao."
        }
      ]
    }
  ],
  // Bài 17A (OrderIndex 32) - Ngữ pháp: 既然…就/也…, 不如…
  32: [
    {
      title: "Hội thoại: Thay đổi kế hoạch",
      context: "Hai người bạn đang bàn về việc đi chơi cuối tuần bị hoãn do mưa.",
      lines: [
        {
          speaker: "小明",
          zh: "外面下大雨了，我们还去爬山吗？",
          py: "Wàimiàn xià dà yǔ le, wǒmen hái qù páshān ma?",
          vi: "Bên ngoài trời mưa to rồi, chúng ta còn đi leo núi không?"
        },
        {
          speaker: "朋友",
          zh: "既然下雨了，就不去了，太危险了。",
          py: "Jìrán xià yǔ le, jiù bú qù le, tài wēixiǎn le.",
          vi: "Đã mưa rồi, thì không đi nữa, quá nguy hiểm."
        },
        {
          speaker: "小明",
          zh: "那我们下午做点什么呢？",
          py: "Nà wǒmen xiàwǔ zuò diǎn shénme ne?",
          vi: "Vậy buổi chiều chúng ta làm gì nhỉ?"
        },
        {
          speaker: "朋友",
          zh: "与其在家里发呆，不如去看看电影吧。",
          py: "Yǔqí zài jiālǐ fādāi, bùrú qù kànkan diànyǐng ba.",
          vi: "Thà ở nhà ngẩn ngơ, không bằng đi xem phim đi."
        }
      ]
    }
  ],
  // Bài 17B (OrderIndex 33) - Ngữ pháp: 宁愿…也不…, 共同…
  33: [
    {
      title: "Hội thoại: Giải quyết mâu thuẫn nhóm",
      context: "Trong cuộc họp nhóm của dự án đại học.",
      lines: [
        {
          speaker: "组长",
          zh: "我们必须共同努力才能完成这个项目。",
          py: "Wǒmen bìxū gòngtóng nǔlì cái néng wánchéng zhège xiàngmù.",
          vi: "Chúng ta bắt buộc phải cùng nhau nỗ lực mới có thể hoàn thành dự án này."
        },
        {
          speaker: "组员",
          zh: "可是小王总是不配合，我宁愿自己做，也不想和他合作。",
          py: "Kěshì Xiǎo Wáng zǒngshì bù pèihé, wǒ nìngyuàn zìjǐ zuò, yě bù xiǎng hé tā hézuò.",
          vi: "Nhưng Tiểu Vương cứ luôn không phối hợp, tôi thà tự mình làm, cũng không muốn hợp tác với cậu ta."
        },
        {
          speaker: "组长",
          zh: "大家是一个团队，不能轻易放弃队友。",
          py: "Dàjiā shì yí ge tuánduì, bù néng qīngyì fàngqì duìyǒu.",
          vi: "Mọi người là một đội ngũ, không thể dễ dàng từ bỏ đồng đội."
        },
        {
          speaker: "组员",
          zh: "那我们再和他沟通一下吧。",
          py: "Nà wǒmen zài hé tā gōutōng yíxià ba.",
          vi: "Vậy chúng ta giao tiếp lại với cậu ta xem sao."
        }
      ]
    }
  ],
  // Bài 18A (OrderIndex 34) - Ngữ pháp: 无法…, 难以…
  34: [
    {
      title: "Hội thoại: Đối mặt với khó khăn",
      context: "Hai kỹ sư đang tìm cách sửa chữa một thiết bị hỏng nặng.",
      lines: [
        {
          speaker: "工程师A",
          zh: "这台机器损坏得太严重了，简直无法修复。",
          py: "Zhè tái jīqì sǔnhuài de tài yánzhòng le, jiǎnzhí wúfǎ xiūfù.",
          vi: "Cỗ máy này hỏng quá nghiêm trọng rồi, quả thật là không có cách nào sửa chữa."
        },
        {
          speaker: "工程师B",
          zh: "确实，这个问题令人难以解决。",
          py: "Quèshí, zhège wèntí lìng rén nányǐ jiějué.",
          vi: "Thật vậy, vấn đề này khiến người ta khó mà giải quyết nổi."
        },
        {
          speaker: "工程师A",
          zh: "那我们是不是该向公司申请买一台新的？",
          py: "Nà wǒmen shì bu shì gāi xiàng gōngsī shēnqǐng mǎi yì tái xīn de?",
          vi: "Vậy chúng ta có phải nên xin công ty mua một cái mới không?"
        },
        {
          speaker: "工程师B",
          zh: "这是唯一的办法了。",
          py: "Zhè shì wéiyī de bànfǎ le.",
          vi: "Đây là cách duy nhất rồi."
        }
      ]
    }
  ],
  // Bài 18B (OrderIndex 35) - Ngữ pháp: 以便…, 从而…, 进而…
  35: [
    {
      title: "Hội thoại: Cải thiện chất lượng dịch vụ",
      context: "Cuộc họp của phòng chăm sóc khách hàng.",
      lines: [
        {
          speaker: "主管",
          zh: "我们要收集客户的意见，以便提高服务质量。",
          py: "Wǒmen yào shōují kèhù de yìjiàn, yǐbiàn tígāo fúwù zhìliàng.",
          vi: "Chúng ta phải thu thập ý kiến của khách hàng, để tiện cho việc nâng cao chất lượng dịch vụ."
        },
        {
          speaker: "员工",
          zh: "通过这些意见，我们能发现缺点，从而改进工作。",
          py: "Tōngguò zhèxiē yìjiàn, wǒmen néng fāxiàn quēdiǎn, cóng'ér gǎijìn gōngzuò.",
          vi: "Thông qua những ý kiến này, chúng ta có thể phát hiện khuyết điểm, từ đó mà cải tiến công việc."
        },
        {
          speaker: "主管",
          zh: "没错，进而吸引更多的新客户。",
          py: "Méicuò, jìn'ér xīyǐn gèng duō de xīn kèhù.",
          vi: "Không sai, tiến tới thu hút thêm nhiều khách hàng mới."
        },
        {
          speaker: "员工",
          zh: "大家一起努力，一定会越做越好的。",
          py: "Dàjiā yìqǐ nǔlì, yídìng huì yuè zuò yuè hǎo de.",
          vi: "Mọi người cùng nỗ lực, nhất định sẽ càng làm càng tốt."
        }
      ]
    }
  ],
  // Bài 19A (OrderIndex 36) - Ngữ pháp: 在我看来…, 我认为…
  36: [
    {
      title: "Hội thoại: Quan điểm cá nhân",
      context: "Hai người bạn đang thảo luận về việc chọn trường đại học.",
      lines: [
        {
          speaker: "同学A",
          zh: "你觉得应该选名牌大学，还是选自己喜欢的专业？",
          py: "Nǐ juéde yīnggāi xuǎn míngpái dàxué, háishì xuǎn zìjǐ xǐhuan de zhuānyè?",
          vi: "Cậu thấy nên chọn trường đại học danh tiếng, hay là chọn chuyên ngành mình thích?"
        },
        {
          speaker: "同学B",
          zh: "在我看来，兴趣是最好的老师。",
          py: "Zài wǒ kànlái, xìngqù shì zuì hǎo de lǎoshī.",
          vi: "Theo tôi thấy, sự hứng thú là người thầy tốt nhất."
        },
        {
          speaker: "同学A",
          zh: "我也这么觉得，我认为专业比学校更重要。",
          py: "Wǒ yě zhème juéde, wǒ rènwéi zhuānyè bǐ xuéxiào gèng zhòngyào.",
          vi: "Tôi cũng cảm thấy như vậy, tôi cho rằng chuyên ngành quan trọng hơn trường học."
        },
        {
          speaker: "同学B",
          zh: "只要用心学，在哪里都能发光。",
          py: "Zhǐyào yòngxīn xué, zài nǎlǐ dōu néng fāguāng.",
          vi: "Chỉ cần để tâm vào học, ở đâu cũng có thể tỏa sáng."
        }
      ]
    }
  ],
  // Bài 19B (OrderIndex 37) - Ngữ pháp: 总的来说…, 换句话说…, 也就是说…
  37: [
    {
      title: "Hội thoại: Tóm tắt buổi học",
      context: "Giáo viên tóm tắt bài giảng cho học sinh.",
      lines: [
        {
          speaker: "老师",
          zh: "总的来说，学习一门语言需要坚持。",
          py: "Zǒng de lái shuō, xuéxí yì mén yǔyán xūyào jiānchí.",
          vi: "Nói tóm lại, học một ngôn ngữ cần phải kiên trì."
        },
        {
          speaker: "学生",
          zh: "老师，也就是说，不能三天打鱼两天晒网对吗？",
          py: "Lǎoshī, yě jiù shì shuō, bù néng sān tiān dǎ yú liǎng tiān shài wǎng duì ma?",
          vi: "Thưa thầy, cũng có nghĩa là, không thể 3 ngày đánh cá 2 ngày phơi lưới (bữa đực bữa cái) đúng không ạ?"
        },
        {
          speaker: "老师",
          zh: "对。换句话说，只有每天练习，才能真正掌握。",
          py: "Duì. Huàn jù huà shuō, zhǐyǒu měitiān liànxí, cái néng zhēnzhèng zhǎngwò.",
          vi: "Đúng. Nói cách khác, chỉ có mỗi ngày luyện tập, mới có thể thực sự nắm vững."
        },
        {
          speaker: "学生",
          zh: "明白了，我会好好努力的。",
          py: "Míngbai le, wǒ huì hǎohǎo nǔlì de.",
          vi: "Em hiểu rồi, em sẽ nỗ lực thật tốt."
        }
      ]
    }
  ],
  // Bài 20A (OrderIndex 38) - Ngữ pháp: 将…, 打算…, 计划…
  38: [
    {
      title: "Hội thoại: Dự định tương lai",
      context: "Hai người bạn tâm sự về kế hoạch sau khi tốt nghiệp.",
      lines: [
        {
          speaker: "朋友",
          zh: "你毕业后有什么计划吗？",
          py: "Nǐ bìyè hòu yǒu shénme jìhuà ma?",
          vi: "Sau khi tốt nghiệp cậu có kế hoạch gì không?"
        },
        {
          speaker: "小林",
          zh: "我打算先去旅行放松一下。",
          py: "Wǒ dǎsuàn xiān qù lǚxíng fàngsōng yíxià.",
          vi: "Tôi dự định trước tiên đi du lịch thư giãn một chút."
        },
        {
          speaker: "朋友",
          zh: "听起来不错，那你什么时候找工作？",
          py: "Tīng qǐlái búcuò, nà nǐ shénme shíhou zhǎo gōngzuò?",
          vi: "Nghe có vẻ không tồi, vậy khi nào cậu tìm việc?"
        },
        {
          speaker: "小林",
          zh: "旅行回来后，我将正式开始投简历。",
          py: "Lǚxíng huílai hòu, wǒ jiāng zhèngshì kāishǐ tóu jiǎnlì.",
          vi: "Sau khi đi du lịch về, tôi sẽ chính thức bắt đầu nộp hồ sơ."
        }
      ]
    }
  ],
  // Bài 20B (OrderIndex 39) - Ngữ pháp: 希望…, 展望…, 总之…
  39: [
    {
      title: "Hội thoại: Lời chúc tốt đẹp",
      context: "Buổi tiệc chia tay cuối năm của công ty.",
      lines: [
        {
          speaker: "老板",
          zh: "展望未来，我希望公司能取得更大的成绩。",
          py: "Zhǎnwàng wèilái, wǒ xīwàng gōngsī néng qǔdé gèng dà de chéngjì.",
          vi: "Nhìn về tương lai, tôi hy vọng công ty có thể đạt được những thành tích lớn hơn nữa."
        },
        {
          speaker: "经理",
          zh: "大家辛苦了一年，希望能得到更多的回报。",
          py: "Dàjiā xīnkǔ le yì nián, xīwàng néng dédào gèng duō de huíbào.",
          vi: "Mọi người đã vất vả một năm rồi, hy vọng có thể nhận được càng nhiều sự đền đáp."
        },
        {
          speaker: "老板",
          zh: "总之，感谢每一位员工的付出！",
          py: "Zǒngzhī, gǎnxiè měi yí wèi yuángōng de fùchū!",
          vi: "Tóm lại, cảm ơn sự cống hiến của từng vị nhân viên!"
        },
        {
          speaker: "全体",
          zh: "谢谢老板，干杯！",
          py: "Xièxie lǎobǎn, gānbēi!",
          vi: "Cảm ơn sếp, cạn ly!"
        }
      ]
    }
  ]
};

const targetPath = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk4-batch4.json');
let data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

for (let i = 0; i < data.length; i++) {
  const lesson = data[i];
  if (batch4Dialogues[lesson.orderIndex]) {
    lesson.dialogues = batch4Dialogues[lesson.orderIndex];
  }
}

fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Cập nhật hội thoại cho HSK 4 Batch 4 thành công!');
