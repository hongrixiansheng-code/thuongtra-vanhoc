// SuperMemo-2 (SM-2) algorithm for Spaced Repetition System (SRS)

export interface SRSItem {
  id: string;
  repetition: number;
  interval: number;
  easeFactor: number;
  nextReviewDate: Date;
}

/**
 * Calculate the next review schedule for an item.
 * @param item The current SRS item state
 * @param quality Quality of the response: 0-5
 * 5: perfect response
 * 4: correct response after a hesitation
 * 3: correct response recalled with serious difficulty
 * 2: incorrect response; where the correct one seemed easy to recall
 * 1: incorrect response; the correct one remembered
 * 0: complete blackout
 * @returns The updated SRS item
 */
export function calculateSM2(item: SRSItem, quality: number): SRSItem {
  let { repetition, interval, easeFactor } = item;

  if (quality >= 3) {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetition++;
  } else {
    repetition = 0;
    interval = 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    ...item,
    repetition,
    interval,
    easeFactor,
    nextReviewDate
  };
}
