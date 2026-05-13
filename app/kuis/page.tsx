'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Zap, Trophy } from 'lucide-react';
import { SakuraDecoration } from '@/components/SakuraDecoration';

export default function QuizSelection() {
  const router = useRouter();
  const [selectedQuizType, setSelectedQuizType] = useState<string | null>(null);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const quizTypes = [
    {
      id: 'character-to-romaji',
      title: 'Karakter → Romaji',
      description: 'Lihat karakter, pilih romaji',
      icon: '🔤',
      example: 'あ → a',
      color: 'from-blue-400 to-cyan-400',
      xp: '+10 XP per jawaban benar',
    },
    {
      id: 'romaji-to-character',
      title: 'Romaji → Karakter',
      description: 'Lihat romaji, pilih karakter',
      icon: '🔠',
      example: 'ka → か',
      color: 'from-purple-400 to-pink-400',
      xp: '+15 XP per jawaban benar',
    },
    {
      id: 'mixed-challenge',
      title: 'Tantangan Campuran',
      description: 'Kombinasi acak dari berbagai jenis soal',
      icon: '🎯',
      example: 'Semua jenis soal',
      color: 'from-orange-400 to-red-400',
      xp: '+20 XP per jawaban benar',
    },
    {
      id: 'speed-challenge',
      title: 'Tantangan Kecepatan',
      description: 'Soal kilat dengan batas waktu',
      icon: '⚡',
      example: '10 detik per soal',
      color: 'from-yellow-400 to-amber-400',
      xp: '+25 XP + bonus waktu',
    },
  ];

  const scriptOptions = [
    {
      id: 'hiragana',
      title: 'Hiragana',
      subtitle: 'ひらがな',
      icon: '🔤',
    },
    {
      id: 'katakana',
      title: 'Katakana',
      subtitle: 'カタカナ',
      icon: '🔠',
    },
    {
      id: 'mixed',
      title: 'Campuran',
      subtitle: 'Keduanya',
      icon: '🎌',
    },
  ];


  const handleStart = () => {
    if (selectedQuizType && selectedScript) {
      router.push(`/quiz?type=${selectedQuizType}&script=${selectedScript}`);
    }
  };

  return (
    <div className="p-4 md:p-8 relative min-h-screen">
      <SakuraDecoration />

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl mb-1">Latihan Menebak Huruf</h1>
            <p className="text-sm md:text-base text-muted-foreground">Pilih jenis latihan yang ingin Anda lakukan</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Step 1: Choose Quiz Type */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-xl md:text-2xl">Pilih Jenis Latihan</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quizTypes.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  selectedQuizType === type.id
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedQuizType(type.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                    {type.icon}
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                  <div className="text-xs text-primary font-medium">{type.example}</div>
                  <Badge variant="secondary">{type.xp}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Step 2: Choose Script */}
        {selectedQuizType && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="text-xl md:text-2xl">Pilih Huruf</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scriptOptions.map((script) => (
                <Card
                  key={script.id}
                  className={`cursor-pointer transition-all hover:shadow-xl ${
                    selectedScript === script.id
                      ? 'ring-2 ring-primary shadow-lg'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedScript(script.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{script.icon}</div>
                    <h3 className="text-lg font-bold mb-1">{script.title}</h3>
                    <p className="text-sm text-primary font-medium">{script.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Start Button */}
        {selectedQuizType && selectedScript && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-gradient-to-r from-primary to-pink-500 border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-2">Siap untuk Latihan!</h3>
                <p className="text-white/90 mb-6">
                  Mulai latihan anda sekarang
                </p>
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-50 px-8 py-3 text-lg font-bold rounded-xl shadow-lg"
                >
                  Mulai Latihan
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}