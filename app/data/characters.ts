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
  // Deret Vokal (A, I, U, E, O)
  { id: 'h1', character: 'あ', romaji: 'a', pronunciation: 'ah', example: 'あさ', exampleMeaning: 'pagi', type: 'hiragana' },
  { id: 'h2', character: 'い', romaji: 'i', pronunciation: 'ee', example: 'いえ', exampleMeaning: 'rumah', type: 'hiragana' },
  { id: 'h3', character: 'う', romaji: 'u', pronunciation: 'oo', example: 'うみ', exampleMeaning: 'laut', type: 'hiragana' },
  { id: 'h4', character: 'え', romaji: 'e', pronunciation: 'eh', example: 'えき', exampleMeaning: 'stasiun', type: 'hiragana' },
  { id: 'h5', character: 'お', romaji: 'o', pronunciation: 'oh', example: 'おちゃ', exampleMeaning: 'teh', type: 'hiragana' },
  
  // Deret K (KA, KI, KU, KE, KO)
  { id: 'h6', character: 'か', romaji: 'ka', pronunciation: 'kah', example: 'かさ', exampleMeaning: 'payung', type: 'hiragana' },
  { id: 'h7', character: 'き', romaji: 'ki', pronunciation: 'kee', example: 'きた', exampleMeaning: 'utara', type: 'hiragana' },
  { id: 'h8', character: 'く', romaji: 'ku', pronunciation: 'koo', example: 'くつ', exampleMeaning: 'sepatu', type: 'hiragana' },
  { id: 'h9', character: 'け', romaji: 'ke', pronunciation: 'keh', example: 'けん', exampleMeaning: 'prefektur', type: 'hiragana' },
  { id: 'h10', character: 'こ', romaji: 'ko', pronunciation: 'koh', example: 'ここ', exampleMeaning: 'sini', type: 'hiragana' },
  
  // Deret S (SA, SHI, SU, SE, SO)
  { id: 'h11', character: 'さ', romaji: 'sa', pronunciation: 'sah', example: 'さかな', exampleMeaning: 'ikan', type: 'hiragana' },
  { id: 'h12', character: 'し', romaji: 'shi', pronunciation: 'shee', example: 'しお', exampleMeaning: 'garam', type: 'hiragana' },
  { id: 'h13', character: 'す', romaji: 'su', pronunciation: 'soo', example: 'すし', exampleMeaning: 'sushi', type: 'hiragana' },
  { id: 'h14', character: 'せ', romaji: 'se', pronunciation: 'seh', example: 'せkai', exampleMeaning: 'dunia', type: 'hiragana' },
  { id: 'h15', character: 'そ', romaji: 'so', pronunciation: 'soh', example: 'そら', exampleMeaning: 'langit', type: 'hiragana' },
  
  // Deret T (TA, CHI, TSU, TE, TO)
  { id: 'h16', character: 'た', romaji: 'ta', pronunciation: 'tah', example: 'たべる', exampleMeaning: 'makan', type: 'hiragana' },
  { id: 'h17', character: 'ち', romaji: 'chi', pronunciation: 'chee', example: 'ちず', exampleMeaning: 'peta', type: 'hiragana' },
  { id: 'h18', character: 'つ', romaji: 'tsu', pronunciation: 'tsoo', example: 'つき', exampleMeaning: 'bulan', type: 'hiragana' },
  { id: 'h19', character: 'て', romaji: 'te', pronunciation: 'teh', example: 'てがみ', exampleMeaning: 'surat', type: 'hiragana' },
  { id: 'h20', character: 'と', romaji: 'to', pronunciation: 'toh', example: 'とり', exampleMeaning: 'burung', type: 'hiragana' },
  
  // Deret N (NA, NI, NU, NE, NO)
  { id: 'h21', character: 'な', romaji: 'na', pronunciation: 'nah', example: 'なまえ', exampleMeaning: 'nama', type: 'hiragana' },
  { id: 'h22', character: 'に', romaji: 'ni', pronunciation: 'nee', example: 'にほん', exampleMeaning: 'Jepang', type: 'hiragana' },
  { id: 'h23', character: 'ぬ', romaji: 'nu', pronunciation: 'noo', example: 'ぬの', exampleMeaning: 'kain', type: 'hiragana' },
  { id: 'h24', character: 'ね', romaji: 'ne', pronunciation: 'neh', example: 'ねこ', exampleMeaning: 'kucing', type: 'hiragana' },
  { id: 'h25', character: 'の', romaji: 'no', pronunciation: 'noh', example: 'のり', exampleMeaning: 'rumput laut', type: 'hiragana' },
  
  // Deret H (HA, HI, FU, HE, HO)
  { id: 'h26', character: 'は', romaji: 'ha', pronunciation: 'hah', example: 'はな', exampleMeaning: 'bunga', type: 'hiragana' },
  { id: 'h27', character: 'ひ', romaji: 'hi', pronunciation: 'hee', example: 'ひかり', exampleMeaning: 'cahaya', type: 'hiragana' },
  { id: 'h28', character: 'ふ', romaji: 'fu', pronunciation: 'foo', example: 'ふね', exampleMeaning: 'kapal', type: 'hiragana' },
  { id: 'h29', character: 'へ', romaji: 'he', pronunciation: 'heh', example: 'へや', exampleMeaning: 'kamar', type: 'hiragana' },
  { id: 'h30', character: 'ほ', romaji: 'ho', pronunciation: 'hoh', example: 'ほん', exampleMeaning: 'buku', type: 'hiragana' },
  
  // Deret M (MA, MI, MU, ME, MO)
  { id: 'h31', character: 'ま', romaji: 'ma', pronunciation: 'mah', example: 'まち', exampleMeaning: 'kota', type: 'hiragana' },
  { id: 'h32', character: 'み', romaji: 'mi', pronunciation: 'mee', example: 'みず', exampleMeaning: 'air', type: 'hiragana' },
  { id: 'h33', character: 'む', romaji: 'mu', pronunciation: 'moo', example: 'むし', exampleMeaning: 'serangga', type: 'hiragana' },
  { id: 'h34', character: 'め', romaji: 'me', pronunciation: 'meh', example: 'めがね', exampleMeaning: 'kacamata', type: 'hiragana' },
  { id: 'h35', character: 'も', romaji: 'mo', pronunciation: 'moh', example: 'もり', exampleMeaning: 'hutan', type: 'hiragana' },
  
  // Deret Y (YA, YU, YO)
  { id: 'h36', character: 'や', romaji: 'ya', pronunciation: 'yah', example: 'やま', exampleMeaning: 'gunung', type: 'hiragana' },
  { id: 'h37', character: 'ゆ', romaji: 'yu', pronunciation: 'yoo', example: 'ゆき', exampleMeaning: 'salju', type: 'hiragana' },
  { id: 'h38', character: 'よ', romaji: 'yo', pronunciation: 'yoh', example: 'よる', exampleMeaning: 'malam', type: 'hiragana' },
  
  // Deret R (RA, RI, RU, RE, RO)
  { id: 'h39', character: 'ら', romaji: 'ra', pronunciation: 'rah', example: 'らいねん', exampleMeaning: 'tahun depan', type: 'hiragana' },
  { id: 'h40', character: 'り', romaji: 'ri', pronunciation: 'ree', example: 'りんご', exampleMeaning: 'apel', type: 'hiragana' },
  { id: 'h41', character: 'る', romaji: 'ru', pronunciation: 'roo', example: 'るす', exampleMeaning: 'tidak di rumah', type: 'hiragana' },
  { id: 'h42', character: 'れ', romaji: 're', pronunciation: 'reh', example: 'れいぞうこ', exampleMeaning: 'kulkas', type: 'hiragana' },
  { id: 'h43', character: 'ろ', romaji: 'ro', pronunciation: 'roh', example: 'ろく', exampleMeaning: 'enam', type: 'hiragana' },
  
  // Deret W & N (WA, WO, N)
  { id: 'h44', character: 'わ', romaji: 'wa', pronunciation: 'wah', example: 'わたし', exampleMeaning: 'saya', type: 'hiragana' },
  { id: 'h45', character: 'を', romaji: 'wo', pronunciation: 'woh', example: 'ほんをよむ', exampleMeaning: 'membaca buku', type: 'hiragana' },
  { id: 'h46', character: 'ん', romaji: 'n', pronunciation: 'nn', example: 'かんじ', exampleMeaning: 'kanji', type: 'hiragana' }
];

export const katakanaCharacters: Character[] = [
  // Deret Vokal (A, I, U, E, O)
  { id: 'k1', character: 'ア', romaji: 'a', pronunciation: 'ah', example: 'アメリカ', exampleMeaning: 'Amerika', type: 'katakana' },
  { id: 'k2', character: 'イ', romaji: 'i', pronunciation: 'ee', example: 'イギリス', exampleMeaning: 'Inggris', type: 'katakana' },
  { id: 'k3', character: 'ウ', romaji: 'u', pronunciation: 'oo', example: 'ウィーン', exampleMeaning: 'Wina', type: 'katakana' },
  { id: 'k4', character: 'エ', romaji: 'e', pronunciation: 'eh', example: 'エネルギー', exampleMeaning: 'energi', type: 'katakana' },
  { id: 'k5', character: 'オ', romaji: 'o', pronunciation: 'oh', example: 'オレンジ', exampleMeaning: 'jeruk', type: 'katakana' },
  
  // Deret K (KA, KI, KU, KE, KO)
  { id: 'k6', character: 'カ', romaji: 'ka', pronunciation: 'kah', example: 'カメラ', exampleMeaning: 'kamera', type: 'katakana' },
  { id: 'k7', character: 'キ', romaji: 'ki', pronunciation: 'kee', example: 'キス', exampleMeaning: 'ciuman', type: 'katakana' },
  { id: 'k8', character: 'ク', romaji: 'ku', pronunciation: 'koo', example: 'クラス', exampleMeaning: 'kelas', type: 'katakana' },
  { id: 'k9', character: 'ケ', romaji: 'ke', pronunciation: 'keh', example: 'ケーキ', exampleMeaning: 'kue', type: 'katakana' },
  { id: 'k10', character: 'コ', romaji: 'ko', pronunciation: 'koh', example: 'コーヒー', exampleMeaning: 'kopi', type: 'katakana' },
  
  // Deret S (SA, SHI, SU, SE, SO)
  { id: 'k11', character: 'サ', romaji: 'sa', pronunciation: 'sah', example: 'サッカー', exampleMeaning: 'sepak bola', type: 'katakana' },
  { id: 'k12', character: 'シ', romaji: 'shi', pronunciation: 'shee', example: 'シャツ', exampleMeaning: 'kemeja', type: 'katakana' },
  { id: 'k13', character: 'ス', romaji: 'su', pronunciation: 'soo', example: 'スプーン', exampleMeaning: 'sendok', type: 'katakana' },
  { id: 'k14', character: 'セ', romaji: 'se', pronunciation: 'seh', example: 'セーター', exampleMeaning: 'sweater', type: 'katakana' },
  { id: 'k15', character: 'ソ', romaji: 'so', pronunciation: 'soh', example: 'ソース', exampleMeaning: 'saus', type: 'katakana' },
  
  // Deret T (TA, CHI, TSU, TE, TO)
  { id: 'k16', character: 'タ', romaji: 'ta', pronunciation: 'tah', example: 'タクシー', exampleMeaning: 'taksi', type: 'katakana' },
  { id: 'k17', character: 'チ', romaji: 'chi', pronunciation: 'chee', example: 'チーズ', exampleMeaning: 'keju', type: 'katakana' },
  { id: 'k18', character: 'ツ', romaji: 'tsu', pronunciation: 'tsoo', example: 'ツアー', exampleMeaning: 'tur', type: 'katakana' },
  { id: 'k19', character: 'テ', romaji: 'te', pronunciation: 'teh', example: 'テスト', exampleMeaning: 'ujian', type: 'katakana' },
  { id: 'k20', character: 'ト', romaji: 'to', pronunciation: 'toh', example: 'トマト', exampleMeaning: 'tomat', type: 'katakana' },
  
  // Deret N (NA, NI, NU, NE, NO)
  { id: 'k21', character: 'ナ', romaji: 'na', pronunciation: 'nah', example: 'ナイフ', exampleMeaning: 'pisau', type: 'katakana' },
  { id: 'k22', character: 'ニ', romaji: 'ni', pronunciation: 'nee', example: 'ニュース', exampleMeaning: 'berita', type: 'katakana' },
  { id: 'k23', character: 'ヌ', romaji: 'nu', pronunciation: 'noo', example: 'ヌードル', exampleMeaning: 'mie', type: 'katakana' },
  { id: 'k24', character: 'ネ', romaji: 'ne', pronunciation: 'neh', example: 'ネクタイ', exampleMeaning: 'dasi', type: 'katakana' },
  { id: 'k25', character: 'ノ', romaji: 'no', pronunciation: 'noh', example: 'ノート', exampleMeaning: 'catatan', type: 'katakana' },
  
  // Deret H (HA, HI, FU, HE, HO)
  { id: 'k26', character: 'ハ', romaji: 'ha', pronunciation: 'hah', example: 'ハム', exampleMeaning: 'ham', type: 'katakana' },
  { id: 'k27', character: 'ヒ', romaji: 'hi', pronunciation: 'hee', example: 'ヒーター', exampleMeaning: 'pemanas', type: 'katakana' },
  { id: 'k28', character: 'フ', romaji: 'fu', pronunciation: 'foo', example: 'フォーク', exampleMeaning: 'garpu', type: 'katakana' },
  { id: 'k29', character: 'ヘ', romaji: 'he', pronunciation: 'heh', example: 'ヘリコプター', exampleMeaning: 'helikopter', type: 'katakana' },
  { id: 'k30', character: 'ホ', romaji: 'ho', pronunciation: 'hoh', example: 'ホテル', exampleMeaning: 'hotel', type: 'katakana' },
  
  // Deret M (MA, MI, MU, ME, MO)
  { id: 'k31', character: 'マ', romaji: 'ma', pronunciation: 'mah', example: 'マスク', exampleMeaning: 'masker', type: 'katakana' },
  { id: 'k32', character: 'ミ', romaji: 'mi', pronunciation: 'mee', example: 'ミルク', exampleMeaning: 'susu', type: 'katakana' },
  { id: 'k33', character: 'ム', romaji: 'mu', pronunciation: 'moo', example: 'ムービー', exampleMeaning: 'film', type: 'katakana' },
  { id: 'k34', character: 'メ', romaji: 'me', pronunciation: 'meh', example: 'メール', exampleMeaning: 'surel', type: 'katakana' },
  { id: 'k35', character: 'モ', romaji: 'mo', pronunciation: 'moh', example: 'モニター', exampleMeaning: 'monitor', type: 'katakana' },
  
  // Deret Y (YA, YU, YO)
  { id: 'k36', character: 'ヤ', romaji: 'ya', pronunciation: 'yah', example: 'ヤード', exampleMeaning: 'halaman', type: 'katakana' },
  { id: 'k37', character: 'ユ', romaji: 'yu', pronunciation: 'yoo', example: 'ユニフォーム', exampleMeaning: 'seragam', type: 'katakana' },
  { id: 'k38', character: 'ヨ', romaji: 'yo', pronunciation: 'yoh', example: 'ヨット', exampleMeaning: 'kapal pesiar', type: 'katakana' },
  
  // Deret R (RA, RI, RU, RE, RO)
  { id: 'k39', character: 'ラ', romaji: 'ra', pronunciation: 'rah', example: 'ラジオ', exampleMeaning: 'radio', type: 'katakana' },
  { id: 'k40', character: 'リ', romaji: 'ri', pronunciation: 'ree', example: 'リボン', exampleMeaning: 'pita', type: 'katakana' },
  { id: 'k41', character: 'ル', romaji: 'ru', pronunciation: 'roo', example: 'ルール', exampleMeaning: 'peraturan', type: 'katakana' },
  { id: 'k42', character: 'レ', romaji: 're', pronunciation: 'reh', example: 'レポート', exampleMeaning: 'laporan', type: 'katakana' },
  { id: 'k43', character: 'ロ', romaji: 'ro', pronunciation: 'roh', example: 'ロボット', exampleMeaning: 'robot', type: 'katakana' },
  
  // Deret W & N (WA, WO, N)
  { id: 'k44', character: 'ワ', romaji: 'wa', pronunciation: 'wah', example: 'ワイシャツ', exampleMeaning: 'kemeja berkerah', type: 'katakana' },
  { id: 'k45', character: 'ヲ', romaji: 'wo', pronunciation: 'woh', example: 'ヲタ芸', exampleMeaning: 'wotagei', type: 'katakana' },
  { id: 'k46', character: 'ン', romaji: 'n', pronunciation: 'nn', example: 'マンション', exampleMeaning: 'apartemen', type: 'katakana' }
];

export const allCharacters = [...hiraganaCharacters, ...katakanaCharacters];