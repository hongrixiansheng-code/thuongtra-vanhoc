export const SRS_INTERVALS = [1, 3, 7, 14, 30]; // Số ngày ôn theo hộp 1→5

export interface SRSCard {
    box: number;
    nextReview: string | null;
    totalCorrect: number;
    totalWrong: number;
    lastSeen: string | null;
}

export const SRS = {
    _key: (levelId: string) => `srs_${levelId}`,

    load(levelId: string): Record<string, SRSCard> {
        if (typeof window === 'undefined') return {};
        try {
            return JSON.parse(localStorage.getItem(SRS._key(levelId)) || '{}');
        } catch { return {}; }
    },

    save(levelId: string, data: Record<string, SRSCard>) {
        if (typeof window === 'undefined') return;
        try { localStorage.setItem(SRS._key(levelId), JSON.stringify(data)); } catch {}
    },

    getCard(levelId: string, wordId: string | number): SRSCard {
        const all = SRS.load(levelId);
        return all[wordId.toString()] || {
            box: 1,
            nextReview: null,
            totalCorrect: 0,
            totalWrong: 0,
            lastSeen: null,
        };
    },

    updateCard(levelId: string, wordId: string | number, isCorrect: boolean): SRSCard {
        const all = SRS.load(levelId);
        const card = all[wordId.toString()] || { box: 1, nextReview: null, totalCorrect: 0, totalWrong: 0, lastSeen: null };
        const today = new Date();

        if (isCorrect) {
            card.box = Math.min(card.box + 1, 5);
            card.totalCorrect += 1;
        } else {
            card.box = 1;
            card.totalWrong += 1;
        }

        const daysUntilNext = SRS_INTERVALS[card.box - 1];
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + daysUntilNext);
        card.nextReview = nextDate.toISOString().split('T')[0];
        card.lastSeen = today.toISOString().split('T')[0];

        all[wordId.toString()] = card;
        SRS.save(levelId, all);
        return card;
    },

    getDueWords(levelId: string, vocabData: any[]) {
        const all = SRS.load(levelId);
        const today = new Date().toISOString().split('T')[0];
        return vocabData.filter(word => {
            const card = all[word._uuid || word.id];
            if (!card) return true;
            if (!card.nextReview) return true;
            return card.nextReview <= today;
        });
    },

    getStats(levelId: string, vocabData: any[]) {
        const all = SRS.load(levelId);
        const today = new Date().toISOString().split('T')[0];
        const stats = { new: 0, due: 0, learning: 0, known: 0, total: vocabData.length };
        
        vocabData.forEach(word => {
            const card = all[word._uuid || word.id];
            if (!card || !card.lastSeen) { stats.new++; return; }
            if (card.nextReview && card.nextReview <= today) { stats.due++; return; }
            if (card.box <= 2) { stats.learning++; return; }
            stats.known++;
        });
        return stats;
    },

    reset(levelId: string) {
        if (typeof window === 'undefined') return;
        try { localStorage.removeItem(SRS._key(levelId)); } catch {}
    }
};
