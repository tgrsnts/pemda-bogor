import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Flame, Target, TrendingUp, Award, PenTool, ScanLine, Brain, BookOpen, Zap, Crown } from 'lucide-react';
import { SakuraDecoration } from '@/components/SakuraDecoration';

export default function Dashboard() {
  const stats = {
    dailyStreak: 7,
    charactersLearned: 32,
    quizAccuracy: 85,
    quizzesCompleted: 15,
    xp: 1250,
    level: 5,
  };

  const recentActivity = [
    { id: 1, activity: 'Completed Hiragana Quiz', time: '2 hours ago', score: 90, xp: 50 },
    { id: 2, activity: 'Practiced writing あ', time: '5 hours ago', score: 100, xp: 25 },
    { id: 3, activity: 'Learned 5 new Katakana', time: '1 day ago', score: 85, xp: 30 },
  ];

  return (
    <div className="p-8 relative">
      <SakuraDecoration />
      
      {/* Welcome Header */}
      <div className="mb-8 relative">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 flex items-center gap-3">
              <span>Welcome back, Student! </span>
              <span className="text-4xl">👋</span>
            </h1>
            <p className="text-muted-foreground">Continue your Japanese learning journey</p>
          </div>
          <div className="bg-gradient-to-r from-accent to-yellow-300 rounded-2xl px-6 py-4 text-center shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-navy" />
              <span className="font-medium text-navy">Total XP</span>
            </div>
            <div className="text-3xl text-navy">{stats.xp}</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Daily Streak</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl mb-1">{stats.dailyStreak} 🔥</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary/30 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Characters Learned</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl mb-1">{stats.charactersLearned}/96</div>
            <Progress value={(stats.charactersLearned / 96) * 100} className="h-2" />
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/30 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Quiz Accuracy</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl mb-1">{stats.quizAccuracy}%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-navy/20 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Current Level</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl mb-1">Level {stats.level}</div>
            <p className="text-xs text-muted-foreground">Intermediate</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Link href="/practice-select">
          <Card className="cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1 h-full bg-gradient-to-br from-white to-pink-50 border-2 border-transparent hover:border-primary/30">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-400 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Practice Writing</CardTitle>
              <CardDescription>Master strokes & forms</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/scanner">
          <Card className="cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1 h-full bg-gradient-to-br from-white to-blue-50 border-2 border-transparent hover:border-blue-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                <ScanLine className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Scan Character</CardTitle>
              <CardDescription>AI recognition tool</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/quiz-select">
          <Card className="cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1 h-full bg-gradient-to-br from-white to-purple-50 border-2 border-transparent hover:border-purple-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-400 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Start Quiz</CardTitle>
              <CardDescription>Test & earn XP</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/library">
          <Card className="cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1 h-full bg-gradient-to-br from-white to-yellow-50 border-2 border-transparent hover:border-yellow-300">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Character Library</CardTitle>
              <CardDescription>Browse all 96 chars</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your learning progress this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-pink-50 hover:shadow-md transition-shadow">
                <div>
                  <p className="font-medium">{item.activity}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="text-sm font-medium text-primary">{item.score}%</p>
                  </div>
                  <div className="bg-accent/30 px-3 py-1 rounded-full">
                    <p className="text-sm font-medium">+{item.xp} XP</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}