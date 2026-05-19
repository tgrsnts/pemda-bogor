'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PenTool, ScanLine, Brain, BookOpen, Trophy, Star } from 'lucide-react';
import { LandingNavbar } from '@/components/LandingNavbar';

const features = [
  {
    icon: PenTool,
    title: 'Latihan Menulis',
    description: 'Kuasai keahlian menulis huruf Jepang',
  },
  // {
  //   icon: ScanLine,
  //   title: 'AI Scanner',
  //   description: 'Scan handwritten characters with advanced CNN recognition',
  // },
  // {
  //   icon: Brain,
  //   title: 'Quiz Challenges',
  //   description: 'Gamified quizzes with timers, leaderboards, and XP rewards',
  // },
  {
    icon: BookOpen,
    title: 'Kamus Kata',
    description: 'Tersedia 92 huruf Jepang',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 relative overflow-hidden">
      <LandingNavbar />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-4xl md:text-6xl opacity-10 animate-float">🌸</div>
      <div className="absolute top-32 right-10 md:right-20 text-3xl md:text-5xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🌸</div>
      <div className="absolute bottom-20 left-1/4 text-4xl md:text-6xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🏯</div>
      <div className="absolute top-1/2 right-10 text-3xl md:text-4xl opacity-10 animate-float" style={{ animationDelay: '3s' }}>⛩️</div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block mb-6 md:mb-8">
            <div className="relative">
              <div className="relative text-2xl md:text-5xl text-primary mb-4 font-bold">YumeKana (夢かな)</div>
            </div>
            <h1 className="text-2xl md:text-4xl mb-4 md:mb-6 bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent px-4">
              Belajar Hiragana & Katakana
            </h1>
            <p className="text-sm md:text-md text-muted-foreground mb-6 md:mb-10 max-w-3xl mx-auto px-4">
              Selamat datang di YumeKana! Latih kemampuan bahasa Jepangmu melalui quiz kana, latihan menulis, scanner huruf Jepang, serta library modern yang dirancang untuk membantu proses belajar menjadi lebih mudah dipahami. Mulailah langkah kecilmu hari ini dan wujudkan mimpi untuk belajar bahasa Jepang bersama YumeKana.
            </p>
            <div className="flex gap-3 md:gap-4 justify-center flex-wrap px-4">
              <Link href="/latihan">
                <Button size="lg" className="px-6 md:px-8 py-3 text-base md:text-lg hover:cursor-pointer">
                  Mulai Belajar
                </Button>
              </Link>
              {/* <Link href="/library">
                <Button variant="outline" size="lg" className="px-6 md:px-8 py-3 text-base md:text-lg">
                  Browse Library
                </Button>
              </Link> */}
            </div>

            {/* Stats badges */}
            <div className="flex gap-3 md:gap-6 justify-center mt-8 md:mt-12 flex-wrap px-4">
              <div id="features" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-20 px-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-secondary/20">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <CardDescription className="text-sm md:text-base">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
