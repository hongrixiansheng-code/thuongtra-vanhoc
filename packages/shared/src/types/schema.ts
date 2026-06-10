export type ContentType = 'Theory' | 'Formula' | 'Exercise' | 'Review';

export interface Content {
  id: string;
  type: ContentType;
  title: string;
  body: string;
  // For language/review content
  word?: string;
  pinyin?: string;
  translation?: string;
  exampleSentence?: string;
  audioUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  contents: Content[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  programs: Program[];
}
