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
      title: 'Character → Romaji',
      description: 'See character, choose romaji',
      icon: '🔤',
      example: 'あ → a',
      color: 'from-blue-400 to-cyan-400',
      xp: '+10 XP per correct',
    },
    {
      id: 'romaji-to-character',
      title: 'Romaji → Character',
      description: 'See romaji, choose character',
      icon: '🔠',
      example: 'ka → か',
      color: 'from-purple-400 to-pink-400',
      xp: '+15 XP per correct',
    },
    {
      id: 'mixed-challenge',
      title: 'Mixed Challenge',
      description: 'Random combination of questions',
      icon: '🎯',
      example: 'All question types',
      color: 'from-orange-400 to-red-400',
      xp: '+20 XP per correct',
    },
    {
      id: 'speed-challenge',
      title: 'Speed Challenge',
      description: 'Quick-fire questions with timer',
      icon: '⚡',
      example: '10 seconds per question',
      color: 'from-yellow-400 to-amber-400',
      xp: '+25 XP + time bonus',
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
      title: 'Mixed',
      subtitle: 'Both',
      icon: '🎌',
    },
  ];

  const difficultyOptions = [
    {
      id: 'easy',
      title: 'Easy',
      questions: '10 questions',
      time: '30s per question',
      icon: Target,
      color: 'bg-green-100 border-green-500',
      xp: '10 XP per question',
    },
    {
      id: 'medium',
      title: 'Medium',
      questions: '15 questions',
      time: '20s per question',
      icon: Zap,
      color: 'bg-blue-100 border-blue-500',
      xp: '15 XP per question',
    },
    {
      id: 'hard',
      title: 'Hard',
      questions: '20 questions',
      time: '15s per question',
      icon: Trophy,
      color: 'bg-orange-100 border-orange-500',
      xp: '20 XP per question',
    },
  ];

  const handleStart = () => {
    if (selectedQuizType && selectedScript && selectedDifficulty) {
      router.push(`/quiz?type=${selectedQuizType}&script=${selectedScript}&difficulty=${selectedDifficulty}`);
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
            <h1 className="text-2xl md:text-4xl mb-1">Quiz Setup</h1>
            <p className="text-sm md:text-base text-muted-foreground">Configure your quiz challenge</p>
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
            <h2 className="text-xl md:text-2xl">Choose Quiz Type</h2>
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
              <h2 className="text-xl md:text-2xl">Choose Script</h2>
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

        {/* Step 3: Choose Difficulty */}
        {selectedQuizType && selectedScript && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h2 className="text-xl md:text-2xl">Choose Difficulty</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficultyOptions.map((difficulty) => {
                const Icon = difficulty.icon;
                return (
                  <Card
                    key={difficulty.id}
                    className={`cursor-pointer transition-all hover:shadow-xl border-2 ${
                      selectedDifficulty === difficulty.id
                        ? `${difficulty.color} shadow-lg`
                        : 'border-transparent hover:border-secondary/50'
                    }`}
                    onClick={() => setSelectedDifficulty(difficulty.id)}
                  >
                    <CardHeader className={`bg-gradient-to-br ${difficulty.color} rounded-t-xl`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{difficulty.title}</CardTitle>
                          <CardDescription className="text-white/80 text-sm">
                            {difficulty.xp}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Questions:</span>
                          <span className="font-medium">{difficulty.questions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time limit:</span>
                          <span className="font-medium">{difficulty.time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Start Button */}
        {selectedQuizType && selectedScript && selectedDifficulty && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-gradient-to-r from-primary to-pink-500 border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready for Quiz!</h3>
                <p className="text-white/90 mb-6">
                  Start your {selectedScript} {selectedQuizType} quiz at {selectedDifficulty} difficulty
                </p>
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-50 px-8 py-3 text-lg font-bold rounded-xl shadow-lg"
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}