export interface Character {
  id: string;
  character: string;
  romaji: string;
  pronunciation: string;
  example: string;
  exampleMeaning: string;
  type: 'hiragana' | 'katakana';
}

export const hiraganaCharacters: Character[] = [
  { id: 'h1', character: 'あ', romaji: 'a', pronunciation: 'ah', example: 'あさ', exampleMeaning: 'morning', type: 'hiragana' },
  { id: 'h2', character: 'い', romaji: 'i', pronunciation: 'ee', example: 'いえ', exampleMeaning: 'house', type: 'hiragana' },
  { id: 'h3', character: 'う', romaji: 'u', pronunciation: 'oo', example: 'うみ', exampleMeaning: 'sea', type: 'hiragana' },
  { id: 'h4', character: 'え', romaji: 'e', pronunciation: 'eh', example: 'えき', exampleMeaning: 'station', type: 'hiragana' },
  { id: 'h5', character: 'お', romaji: 'o', pronunciation: 'oh', example: 'おちゃ', exampleMeaning: 'tea', type: 'hiragana' },
  { id: 'h6', character: 'か', romaji: 'ka', pronunciation: 'kah', example: 'かさ', exampleMeaning: 'umbrella', type: 'hiragana' },
  { id: 'h7', character: 'き', romaji: 'ki', pronunciation: 'kee', example: 'きた', exampleMeaning: 'north', type: 'hiragana' },
  { id: 'h8', character: 'く', romaji: 'ku', pronunciation: 'koo', example: 'くつ', exampleMeaning: 'shoes', type: 'hiragana' },
  { id: 'h9', character: 'け', romaji: 'ke', pronunciation: 'keh', example: 'けん', exampleMeaning: 'prefecture', type: 'hiragana' },
  { id: 'h10', character: 'こ', romaji: 'ko', pronunciation: 'koh', example: 'ここ', exampleMeaning: 'here', type: 'hiragana' },
  { id: 'h11', character: 'さ', romaji: 'sa', pronunciation: 'sah', example: 'さかな', exampleMeaning: 'fish', type: 'hiragana' },
  { id: 'h12', character: 'し', romaji: 'shi', pronunciation: 'shee', example: 'しお', exampleMeaning: 'salt', type: 'hiragana' },
  { id: 'h13', character: 'す', romaji: 'su', pronunciation: 'soo', example: 'すし', exampleMeaning: 'sushi', type: 'hiragana' },
  { id: 'h14', character: 'せ', romaji: 'se', pronunciation: 'seh', example: 'せかい', exampleMeaning: 'world', type: 'hiragana' },
  { id: 'h15', character: 'そ', romaji: 'so', pronunciation: 'soh', example: 'そら', exampleMeaning: 'sky', type: 'hiragana' },
  { id: 'h16', character: 'た', romaji: 'ta', pronunciation: 'tah', example: 'たべる', exampleMeaning: 'to eat', type: 'hiragana' },
  { id: 'h17', character: 'ち', romaji: 'chi', pronunciation: 'chee', example: 'ちず', exampleMeaning: 'map', type: 'hiragana' },
  { id: 'h18', character: 'つ', romaji: 'tsu', pronunciation: 'tsoo', example: 'つき', exampleMeaning: 'moon', type: 'hiragana' },
  { id: 'h19', character: 'て', romaji: 'te', pronunciation: 'teh', example: 'てがみ', exampleMeaning: 'letter', type: 'hiragana' },
  { id: 'h20', character: 'と', romaji: 'to', pronunciation: 'toh', example: 'とり', exampleMeaning: 'bird', type: 'hiragana' },
  { id: 'h21', character: 'な', romaji: 'na', pronunciation: 'nah', example: 'なまえ', exampleMeaning: 'name', type: 'hiragana' },
  { id: 'h22', character: 'に', romaji: 'ni', pronunciation: 'nee', example: 'にほん', exampleMeaning: 'Japan', type: 'hiragana' },
  { id: 'h23', character: 'ぬ', romaji: 'nu', pronunciation: 'noo', example: 'ぬの', exampleMeaning: 'cloth', type: 'hiragana' },
  { id: 'h24', character: 'ね', romaji: 'ne', pronunciation: 'neh', example: 'ねこ', exampleMeaning: 'cat', type: 'hiragana' },
];

export const katakanaCharacters: Character[] = [
  { id: 'k1', character: 'ア', romaji: 'a', pronunciation: 'ah', example: 'アメリカ', exampleMeaning: 'America', type: 'katakana' },
  { id: 'k2', character: 'イ', romaji: 'i', pronunciation: 'ee', example: 'イギリス', exampleMeaning: 'England', type: 'katakana' },
  { id: 'k3', character: 'ウ', romaji: 'u', pronunciation: 'oo', example: 'ウィーン', exampleMeaning: 'Vienna', type: 'katakana' },
  { id: 'k4', character: 'エ', romaji: 'e', pronunciation: 'eh', example: 'エネルギー', exampleMeaning: 'energy', type: 'katakana' },
  { id: 'k5', character: 'オ', romaji: 'o', pronunciation: 'oh', example: 'オレンジ', exampleMeaning: 'orange', type: 'katakana' },
  { id: 'k6', character: 'カ', romaji: 'ka', pronunciation: 'kah', example: 'カメラ', exampleMeaning: 'camera', type: 'katakana' },
  { id: 'k7', character: 'キ', romaji: 'ki', pronunciation: 'kee', example: 'キス', exampleMeaning: 'kiss', type: 'katakana' },
  { id: 'k8', character: 'ク', romaji: 'ku', pronunciation: 'koo', example: 'クラス', exampleMeaning: 'class', type: 'katakana' },
  { id: 'k9', character: 'ケ', romaji: 'ke', pronunciation: 'keh', example: 'ケーキ', exampleMeaning: 'cake', type: 'katakana' },
  { id: 'k10', character: 'コ', romaji: 'ko', pronunciation: 'koh', example: 'コーヒー', exampleMeaning: 'coffee', type: 'katakana' },
  { id: 'k11', character: 'サ', romaji: 'sa', pronunciation: 'sah', example: 'サッカー', exampleMeaning: 'soccer', type: 'katakana' },
  { id: 'k12', character: 'シ', romaji: 'shi', pronunciation: 'shee', example: 'シャツ', exampleMeaning: 'shirt', type: 'katakana' },
  { id: 'k13', character: 'ス', romaji: 'su', pronunciation: 'soo', example: 'スプーン', exampleMeaning: 'spoon', type: 'katakana' },
  { id: 'k14', character: 'セ', romaji: 'se', pronunciation: 'seh', example: 'セーター', exampleMeaning: 'sweater', type: 'katakana' },
  { id: 'k15', character: 'ソ', romaji: 'so', pronunciation: 'soh', example: 'ソース', exampleMeaning: 'sauce', type: 'katakana' },
  { id: 'k16', character: 'タ', romaji: 'ta', pronunciation: 'tah', example: 'タクシー', exampleMeaning: 'taxi', type: 'katakana' },
  { id: 'k17', character: 'チ', romaji: 'chi', pronunciation: 'chee', example: 'チーズ', exampleMeaning: 'cheese', type: 'katakana' },
  { id: 'k18', character: 'ツ', romaji: 'tsu', pronunciation: 'tsoo', example: 'ツアー', exampleMeaning: 'tour', type: 'katakana' },
  { id: 'k19', character: 'テ', romaji: 'te', pronunciation: 'teh', example: 'テスト', exampleMeaning: 'test', type: 'katakana' },
  { id: 'k20', character: 'ト', romaji: 'to', pronunciation: 'toh', example: 'トマト', exampleMeaning: 'tomato', type: 'katakana' },
  { id: 'k21', character: 'ナ', romaji: 'na', pronunciation: 'nah', example: 'ナイフ', exampleMeaning: 'knife', type: 'katakana' },
  { id: 'k22', character: 'ニ', romaji: 'ni', pronunciation: 'nee', example: 'ニュース', exampleMeaning: 'news', type: 'katakana' },
  { id: 'k23', character: 'ヌ', romaji: 'nu', pronunciation: 'noo', example: 'ヌードル', exampleMeaning: 'noodle', type: 'katakana' },
  { id: 'k24', character: 'ネ', romaji: 'ne', pronunciation: 'neh', example: 'ネクタイ', exampleMeaning: 'necktie', type: 'katakana' },
];

export const allCharacters = [...hiraganaCharacters, ...katakanaCharacters];