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
      description: 'Practice basic Japanese syllabary',
      characters: '48 characters',
      icon: '🔤',
      color: 'from-pink-400 to-rose-400',
    },
    {
      id: 'katakana',
      title: 'Katakana',
      subtitle: 'カタカナ',
      description: 'Practice Japanese syllabary for foreign words',
      characters: '48 characters',
      icon: '🔠',
      color: 'from-purple-400 to-indigo-400',
    },
    {
      id: 'mixed',
      title: 'Mixed',
      subtitle: 'ひらがな・カタカナ',
      description: 'Practice both Hiragana and Katakana together',
      characters: '96 characters',
      icon: '🎌',
      color: 'from-orange-400 to-amber-400',
    },
  ];

  const levelOptions = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'Basic vowels and consonants',
      icon: Star,
      characters: 'あ い う え お (a, i, u, e, o)',
      xp: '+10 XP per character',
      color: 'from-green-100 to-emerald-100',
      borderColor: 'border-green-500',
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'Extended character set',
      icon: Sparkles,
      characters: 'か き く け こ + more',
      xp: '+15 XP per character',
      color: 'from-blue-100 to-cyan-100',
      borderColor: 'border-blue-500',
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'All characters with combinations',
      icon: Flame,
      characters: 'All 48 + dakuten',
      xp: '+25 XP per character',
      color: 'from-orange-100 to-red-100',
      borderColor: 'border-orange-500',
    },
  ];

  const handleStart = () => {
    if (selectedScript && selectedLevel) {
      // Pass state to the practice page
      router.push(`/practice?script=${selectedScript}&level=${selectedLevel}`);
    }
  };

  return (
    <div className="p-4 md:p-8 relative min-h-screen">
      <SakuraDecoration />

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
            <PenTool className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl mb-1">Writing Practice Setup</h1>
            <p className="text-sm md:text-base text-muted-foreground">Choose your practice preferences</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Step 1: Choose Script */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-xl md:text-2xl">Choose Script Type</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {scriptOptions.map((script) => (
              <Card
                key={script.id}
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  selectedScript === script.id
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

        {/* Step 2: Choose Level */}
        {selectedScript && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="text-xl md:text-2xl">Choose Difficulty Level</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {levelOptions.map((level) => {
                const Icon = level.icon;
                return (
                  <Card
                    key={level.id}
                    className={`cursor-pointer transition-all hover:shadow-xl border-2 ${
                      selectedLevel === level.id
                        ? `${level.borderColor} shadow-lg`
                        : 'border-transparent hover:border-secondary/50'
                    }`}
                    onClick={() => setSelectedLevel(level.id)}
                  >
                    <CardHeader className={`bg-gradient-to-br ${level.color} rounded-t-xl`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{level.title}</CardTitle>
                          <CardDescription className="text-white/80 text-sm">
                            {level.xp}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                      <div className="text-xs font-medium text-primary mb-2">Examples:</div>
                      <div className="text-sm font-mono bg-gray-50 p-2 rounded-lg">
                        {level.characters}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Start Button */}
        {selectedScript && selectedLevel && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-gradient-to-r from-primary to-pink-500 border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to Practice!</h3>
                <p className="text-white/90 mb-6">
                  Start your {selectedScript} writing practice at {selectedLevel} level
                </p>
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-50 px-8 py-3 text-lg font-bold rounded-xl shadow-lg"
                >
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}