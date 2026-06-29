export interface Question {
  type: 'multiple_choice' | 'fill_blank' | 'drag_drop';
  question: string;
  options?: string[];
  correct?: string;
  explanation?: string;
  pairs?: { en: string; vi: string }[];
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// 3 câu MC từ các từ vừa học (gọi sau mỗi 2 batch vocab)
export function generateMiniTestQuestions(recentVocab: any[], vocabItems: any[]): Question[] {
  return shuffleArray(recentVocab).slice(0, 3).map((item: any) => {
    // Lấy nghĩa chính (trước dấu phẩy đầu tiên) để tránh trùng lặp
    const mainMeaning = item.meaning?.split(',')[0].trim() || item.meaning;

    // Lọc từ sai: loại bỏ từ có nghĩa chính giống hoặc gần giống
    const wrongPool = vocabItems.filter((v: any) => {
      const vKey = v.hanzi || v.word;
      const itemKey = item.hanzi || item.word;
      if (vKey === itemKey) return false;
      const vMainMeaning = v.meaning?.split(',')[0].trim() || '';
      // Loại bỏ nếu nghĩa chính giống nhau
      if (vMainMeaning === mainMeaning) return false;
      // Loại bỏ nếu nghĩa chứa nhau (ví dụ: "bố" và "bố, ba, cha")
      if (mainMeaning.includes(vMainMeaning) || vMainMeaning.includes(mainMeaning)) return false;
      return true;
    });

    const wrongs = shuffleArray(wrongPool).slice(0, 3).map((v: any) =>
      v.meaning?.split(',')[0].trim() || v.meaning
    );

    // Nếu không đủ 3 đáp án sai → dùng nghĩa đầy đủ
    if (wrongs.length < 3) {
      const fallbackWrongs = shuffleArray(wrongPool).slice(0, 3).map((v: any) => v.meaning);
      return {
        type: 'multiple_choice' as const,
        question: `"${item.hanzi || item.word}" có nghĩa là gì?`,
        options: shuffleArray([item.meaning, ...fallbackWrongs]),
        correct: item.meaning,
        explanation: `"${item.hanzi || item.word}" = ${item.meaning}`
      };
    }

    const options = shuffleArray([mainMeaning, ...wrongs]);
    return {
      type: 'multiple_choice' as const,
      question: `"${item.hanzi || item.word}" có nghĩa là gì?`,
      options,
      correct: mainMeaning,
      explanation: `"${item.hanzi || item.word}" = ${item.meaning}`
    };
  });
}

// 2 MC + 2 fill_blank + 2 drag_drop xen kẽ, dùng cho final-test cuối bài
export function generateFinalTestQuestions(vocabItems: any[], grammarItems: any[], isZH: boolean): Question[] {
  const allVocab = shuffleArray([...vocabItems]);

  // 2 câu MC: hỏi nghĩa từ vựng random
  const mcQuestions = allVocab.slice(0, 2).map((item: any) => {
    const wrongPool = vocabItems.filter((v: any) => (v.hanzi || v.word) !== (item.hanzi || item.word));
    const wrongs = shuffleArray(wrongPool).slice(0, 3).map((v: any) => v.meaning);
    return {
      type: 'multiple_choice' as const,
      question: `"${item.hanzi || item.word}" có nghĩa là gì?`,
      options: shuffleArray([item.meaning, ...wrongs]),
      correct: item.meaning,
      explanation: `"${item.hanzi || item.word}" = ${item.meaning}`
    };
  });

  // 2 câu fill_blank: tạo từ practiceList của grammar random
  const grammarPool = shuffleArray([...grammarItems]);
  const fbQuestions = grammarPool.slice(0, 2).map((g: any) => {
    // Lấy 1 câu ví dụ từ practiceList, đục lỗ 1 từ quan trọng
    const example = g.practiceList?.[Math.floor(Math.random() * (g.practiceList?.length || 1))];

    // IELTS Schema: đã có sẵn câu hỏi đục lỗ trong practiceList
    if (example?.question && example?.question.includes('___')) {
      let wrongOptions = shuffleArray(
        grammarItems
          .filter((og: any) => og !== g)
          .flatMap((og: any) =>
            (og.formula || []).flatMap((f: any) =>
              f.text.split(/[\s\/+→]/).filter((w: string) => w.length > 1 && /^[a-zA-Z]+$/.test(w))
            )
          )
      );
      if (wrongOptions.length < 3) {
        wrongOptions = [...wrongOptions, ...shuffleArray(vocabItems.map((v: any) => v.hanzi || v.word))];
      }
      wrongOptions = Array.from(new Set(wrongOptions.filter((w: string) => w && w !== example.correct))).slice(0, 3);

      return {
        type: 'fill_blank' as const,
        question: example.question,
        options: shuffleArray([example.correct, ...wrongOptions].filter(Boolean).slice(0, 4)),
        correct: example.correct,
        explanation: example.explanation || g.desc || ''
      };
    }

    // Legacy HSK Schema: đục lỗ từ câu correct
    const sentence = example?.correct || '';

    let targetWord = '';
    let blanked = sentence;
    let wrongOptions: string[] = [];

    if (isZH) {
      const vocabWords = vocabItems.map((v: any) => v.hanzi).filter(Boolean);
      const formulaWords = (g.formula || []).flatMap((f: any) =>
        f.text.split(/[\s\/+→]/).filter((w: string) => /[一-龥]/.test(w))
      );

      targetWord = formulaWords.find((w: string) => sentence.includes(w)) ||
                   vocabWords.find((w: string) => sentence.includes(w)) ||
                   sentence.charAt(1) || sentence.charAt(0);

      if (targetWord) {
        blanked = sentence.replace(targetWord, '___');
      }
      wrongOptions = shuffleArray(vocabItems.map((v: any) => v.hanzi).filter(Boolean));
    } else {
      const formulaWords = (g.formula || []).flatMap((f: any) =>
        f.text.split(/[\s\/+→]/).filter((w: string) => w.length > 1 && /^[a-zA-Z]+$/.test(w))
      );
      const wordsInSentence = sentence.split(' ').map((w: string) => w.replace(/[.,!?]/g, ''));
      targetWord = formulaWords.find((w: string) =>
        wordsInSentence.some((sw: string) => sw.toLowerCase() === w.toLowerCase())
      ) || wordsInSentence.find((w: string) => w.length > 2) || wordsInSentence[1] || wordsInSentence[0] || '';

      if (targetWord) {
        blanked = sentence.replace(new RegExp(`\\b${targetWord}\\b`, 'i'), '___');
      }

      wrongOptions = shuffleArray(
        grammarItems
          .filter((og: any) => og !== g)
          .flatMap((og: any) =>
            (og.formula || []).flatMap((f: any) =>
              f.text.split(/[\s\/+→]/).filter((w: string) => w.length > 1 && /^[a-zA-Z]+$/.test(w))
            )
          )
      );
    }
    if (wrongOptions.length < 3) {
      wrongOptions = [...wrongOptions, ...shuffleArray(vocabItems.map((v: any) => v.hanzi || v.word))];
    }
    wrongOptions = Array.from(new Set(wrongOptions.filter((w: string) => w && w !== targetWord))).slice(0, 3);

    return {
      type: 'fill_blank' as const,
      question: blanked || `___ (${g.title})`,
      options: shuffleArray([targetWord, ...wrongOptions].filter(Boolean).slice(0, 4)),
      correct: targetWord,
      explanation: g.desc || ''
    };
  });

  // 2 câu drag_drop: ghép từ - nghĩa từ vocab random
  const ddQuestions = [0, 1].map((i) => {
    const startIdx = i * 4;
    const batch = shuffleArray([...vocabItems]).slice(startIdx, startIdx + 4);
    return {
      type: 'drag_drop' as const,
      question: isZH ? 'Ghép từ tiếng Trung với nghĩa tiếng Việt' : 'Ghép từ tiếng Anh với nghĩa tiếng Việt',
      pairs: batch.map((v: any) => ({ en: v.hanzi || v.word, vi: v.meaning }))
    };
  });

  // Xen kẽ MC → FB → DD → MC → FB → DD
  return [
    mcQuestions[0], fbQuestions[0], ddQuestions[0],
    mcQuestions[1], fbQuestions[1], ddQuestions[1],
  ].filter(Boolean);
}
