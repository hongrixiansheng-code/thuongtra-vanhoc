// ========== TEST ENGINE ==========
// Các hàm phục vụ cho việc sinh đề thi và chấm điểm

function fisherYatesShuffle<T>(arr: T[]): T[] {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const TestEngine = {
    generateMockTest: (allVocab: any[]) => {
        const valid = allVocab.filter(w => (w.hanzi || w.word) && w.meaning);
        const shuffled = fisherYatesShuffle(valid);
        
        // 20 câu nghe
        const listening = shuffled.slice(0, 20).map(word => ({
            word,
            type: 'listening',
            options: fisherYatesShuffle([
                word,
                ...fisherYatesShuffle(valid.filter(w => w._uuid !== word._uuid)).slice(0, 3)
            ]),
        }));
        
        // 20 câu đọc
        const reading = shuffled.slice(20, 40).map(word => ({
            word,
            type: 'meaning',
            options: fisherYatesShuffle([
                word,
                ...fisherYatesShuffle(valid.filter(w => w._uuid !== word._uuid)).slice(0, 3)
            ]),
        }));
        
        return [...listening, ...reading];
    },

    calcHSKScore: (correct: number, total: number) => {
        return Math.round((correct / total) * 300);
    }
};
