'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PenTool, Star, Sparkles, Flame } from 'lucide-react';
import { SakuraDecoration } from '@/components/SakuraDecoration';

export default function PracticeSelection() {
  const router = useRouter();
  const [selectedScript, setSelectedScript] = useState<'hiragana' | 'katakana' | 'mixed' | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const scriptOptions = [
    {
      id: 'hiragana',
      title: 'Hiragana',
      subtitle: 'ひらがな',
      description: 'Latih suku kata dasar bahasa Jepang',
      characters: '48 karakter',
      icon: '🔤',
      color: 'from-pink-400 to-rose-400',
    },
    {
      id: 'katakana',
      title: 'Katakana',
      subtitle: 'カタカナ',
      description: 'Latih suku kata bahasa Jepang untuk kata asing',
      characters: '48 karakter',
      icon: '🔠',
      color: 'from-purple-400 to-indigo-400',
    },
    {
      id: 'mixed',
      title: 'Campuran',
      subtitle: 'ひらがな・カタカナ',
      description: 'Latih Hiragana dan Katakana secara bersamaan',
      characters: '96 karakter',
      icon: '🎌',
      color: 'from-orange-400 to-amber-400',
    },
  ];

  const handleStart = () => {
    if (selectedScript) {
      // Pass state to the practice page
      router.push(`/practice?script=${selectedScript}`);
    }
  };

  return (
    <div className="p-4 md:p-4 md:p-8 relative min-h-screen">
      <SakuraDecoration />

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
            <PenTool className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl mb-1">Latihan Menulis</h1>
            <p className="text-sm md:text-base text-muted-foreground">Pilih latihan yang kamu ingin lakukan</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          {/* <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-xl md:text-2xl">Choose Script Type</h2>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {scriptOptions.map((script) => (
              <Card
                key={script.id}
                className={`cursor-pointer transition-all hover:shadow-xl ${selectedScript === script.id
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:shadow-lg'
                  }`}
                onClick={() => setSelectedScript(script.id as any)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${script.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                    {script.icon}
                  </div>
                  <CardTitle className="text-lg">{script.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    {script.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">{script.description}</p>
                  <Badge variant="secondary">{script.characters}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Start Button */}
        {selectedScript && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-gradient-to-r from-primary to-pink-500 border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-2">Siap untuk berlatih!</h3>
                <p className="text-white/90 mb-6">
                  Mulai latihan {selectedScript} anda sekarang dan tingkatkan kemampuan menulis bahasa Jepang Anda!
                </p>
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-50 px-8 py-3 text-lg font-bold rounded-xl shadow-lg hover:cursor-pointer"
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