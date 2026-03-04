export interface QuizQuestion {
  id: string;
  type: 'character-recognition' | 'romaji-to-character' | 'character-to-romaji';
  question: string;
  character?: string;
  romaji?: string;
  options: string[];
  correctAnswer: string;
  scriptType: 'hiragana' | 'katakana';
}

export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'character-to-romaji',
    question: 'What is the romaji for this character?',
    character: 'あ',
    options: ['a', 'i', 'u', 'e'],
    correctAnswer: 'a',
    scriptType: 'hiragana',
  },
  {
    id: 'q2',
    type: 'romaji-to-character',
    question: 'Which character represents "ka"?',
    romaji: 'ka',
    options: ['か', 'き', 'く', 'け'],
    correctAnswer: 'か',
    scriptType: 'hiragana',
  },
  {
    id: 'q3',
    type: 'character-recognition',
    question: 'Identify this character:',
    character: 'さ',
    options: ['sa', 'shi', 'su', 'se'],
    correctAnswer: 'sa',
    scriptType: 'hiragana',
  },
  {
    id: 'q4',
    type: 'character-to-romaji',
    question: 'What is the romaji for this character?',
    character: 'ア',
    options: ['a', 'i', 'u', 'e'],
    correctAnswer: 'a',
    scriptType: 'katakana',
  },
  {
    id: 'q5',
    type: 'romaji-to-character',
    question: 'Which character represents "ki"?',
    romaji: 'ki',
    options: ['カ', 'キ', 'ク', 'ケ'],
    correctAnswer: 'キ',
    scriptType: 'katakana',
  },
];