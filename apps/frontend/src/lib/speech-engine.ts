// ========== SPEECH ENGINE ==========
// Web Speech API wrapper cho luyện phát âm

export const SpeechEngine = {
    // ── Kiểm tra trình duyệt có hỗ trợ không ──
    isSupported: () => {
        if (typeof window === 'undefined') return false;
        return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    },

    // ── Chuẩn hóa text để so sánh ──
    // Bỏ dấu câu, khoảng trắng thừa, chuyển về lowercase
    normalize: (text: string) => {
        if (!text) return '';
        return text.replace(/[，。！？、：；""''「」【】\s]/g, '').trim().toLowerCase();
    },

    // ── So sánh 2 chuỗi — trả về % giống nhau ──
    // Thuật toán: đếm ký tự chung / độ dài chuỗi dài hơn
    calcScore: (heard: string, target: string) => {
        const a = SpeechEngine.normalize(heard);
        const b = SpeechEngine.normalize(target);
        if (!a || !b) return 0;
        if (a === b) return 100;

        // Đếm ký tự khớp theo vị trí
        let matches = 0;
        const minLen = Math.min(a.length, b.length);
        for (let i = 0; i < minLen; i++) {
            if (a[i] === b[i]) matches++;
        }

        // Tính thêm ký tự có trong cả 2 chuỗi (không cần đúng vị trí)
        const aChars = a.split('');
        const bChars = b.split('');
        let commonChars = 0;
        aChars.forEach(ch => {
            const idx = bChars.indexOf(ch);
            if (idx !== -1) { 
                commonChars++; 
                bChars.splice(idx, 1); 
            }
        });

        const maxLen = Math.max(a.length, b.length);
        const score = Math.round((matches * 0.6 + commonChars * 0.4) / maxLen * 100);
        return Math.min(score, 100);
    },

    // ── So sánh từng từ — trả về mảng kết quả ──
    compareWords: (heard: string, target: string) => {
        const heardNorm  = SpeechEngine.normalize(heard);
        const targetNorm = SpeechEngine.normalize(target);
        const targetWords = targetNorm.split('');

        return targetWords.map((char, i) => ({
            char,
            correct: heardNorm[i] === char,
            heard: heardNorm[i] || '',
        }));
    },

    // ── Engine chính: lắng nghe 1 lần và trả về kết quả ──
    listen: ({ 
        lang, 
        onResult, 
        onError, 
        onStart 
    }: { 
        lang: string, 
        onResult?: (res: { transcript: string, confidence: number }) => void, 
        onError?: (msg: string) => void, 
        onStart?: () => void 
    }) => {
        if (!SpeechEngine.isSupported()) {
            onError?.('Trình duyệt không hỗ trợ nhận dạng giọng nói. Hãy dùng Chrome hoặc Edge.');
            return null;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = lang || 'zh-CN';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        if (onStart) recognition.onstart = onStart;

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            const confidence = Math.round(event.results[0][0].confidence * 100);
            onResult?.({ transcript, confidence });
        };

        recognition.onerror = (event: any) => {
            const msgs: Record<string, string> = {
                'no-speech':       'Không nghe thấy giọng nói. Thử lại nhé!',
                'audio-capture':   'Không tìm thấy microphone.',
                'not-allowed':     'Bạn chưa cho phép dùng microphone.',
                'network':         'Lỗi mạng. Kiểm tra kết nối internet.',
            };
            onError?.(msgs[event.error] || `Lỗi: ${event.error}`);
        };

        recognition.start();
        return recognition;
    }
};
