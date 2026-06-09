'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Star, Trophy, Volume2 } from 'lucide-react';
import { SakuraDecoration } from '@/components/SakuraDecoration';
import { hiraganaCharacters, katakanaCharacters, allCharacters, Character } from '@/data/characters';

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScript, setSelectedScript] = useState<'hiragana' | 'katakana'>('hiragana');

  const characters = selectedScript === 'hiragana' ? hiraganaCharacters : katakanaCharacters;

  const filteredCharacters = characters.filter(char =>
    char.character.includes(searchTerm) ||
    char.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
    char.pronunciation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    char.example.includes(searchTerm) ||
    char.exampleMeaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playPronunciation = (pronunciation: string) => {
    // For now, we'll use speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(pronunciation);
      utterance.lang = 'en-US'; // English pronunciation
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-4 md:p-4 md:p-8 relative min-h-screen">
      <SakuraDecoration />

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl mb-1">Kamus</h1>
            <p className="text-sm md:text-base text-muted-foreground">Kamus karakter Jepang</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari karakter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-secondary focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex', gap: 4,
              background: 'rgba(230, 57, 70,0.1)',
              borderRadius: 14, padding: 4,
            }}
            className='w-fit'
          >
            {(['hiragana', 'katakana'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSelectedScript(s)}
                style={{
                  padding: '5px 14px', borderRadius: 10, fontSize: 13,
                  fontWeight: 600, border: 'none', cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: selectedScript === s ? '#E63946' : 'transparent',
                  color: selectedScript === s ? '#fff' : '#E63946',
                  boxShadow: selectedScript === s ? '0 2px 8px rgba(230, 57, 70,0.3)' : 'none',
                }}
              >
                {s === 'hiragana' ? <span>ひ <span className="hidden md:inline">Hiragana</span></span> : <span>ア <span className="hidden md:inline">Katakana</span></span>}
              </button>
            ))}
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCharacters.map((char) => (
            <Card key={char.id} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <CardContent className="p-4">
                <div className="text-center mb-3">
                  <div className="text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform">
                    {char.character}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-lg font-bold text-primary">{char.romaji}</div>
                    <button
                      onClick={() => playPronunciation(char.pronunciation)}
                      className="p-1 hover:bg-secondary rounded-full transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{char.pronunciation}</div>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {char.type}
                  </Badge>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="text-sm">
                    <div className="font-medium text-foreground mb-1">Example:</div>
                    <div className="text-lg mb-1">{char.example}</div>
                    <div className="text-xs text-muted-foreground">{char.exampleMeaning}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>    
      </div>
    </div>
  );
}