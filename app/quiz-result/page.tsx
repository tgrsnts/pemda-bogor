'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Zap, Clock, Award, Star } from 'lucide-react';

export default function QuizResult() {
  const results = {
    score: 85,
    correctAnswers: 17,
    totalQuestions: 20,
    xpEarned: 150,
    rank: 'A',
    accuracy: 85,
    timeSpent: '5:32',
    streak: 3,
  };

  const leaderboard = [
    { rank: 1, name: 'Sakura Student', score: 95, avatar: '👧' },
    { rank: 2, name: 'You', score: 85, avatar: '🎓', isCurrentUser: true },
    { rank: 3, name: 'Yuki Learner', score: 82, avatar: '👨' },
    { rank: 4, name: 'Hana Chan', score: 78, avatar: '👩' },
    { rank: 5, name: 'Kenji San', score: 75, avatar: '🧑' },
  ];

  const getStars = () => {
    if (results.score >= 90) return 3;
    if (results.score >= 70) return 2;
    if (results.score >= 50) return 1;
    return 0;
  };

  const stars = getStars();

  return (
    <div className="p-8 bg-gradient-to-br from-pink-50 via-white to-yellow-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Result Card */}
        <Card className="border-2 border-primary/20 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-pink-400 p-8 text-white text-center">
            <Trophy className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-4xl mb-2">Quiz Complete!</h1>
            <p className="text-lg opacity-90">Congratulations on completing the quiz</p>
          </div>
          <CardContent className="p-8">
            {/* Score Display */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-accent to-yellow-300 rounded-3xl px-12 py-8 shadow-lg mb-6">
                <div className="text-7xl mb-2 font-bold text-navy">{results.score}%</div>
                <Badge className="text-lg px-6 py-2 bg-navy text-white">
                  Rank {results.rank}
                </Badge>
              </div>
              <div className="flex justify-center gap-2 mb-4">
                {Array.from({ length: 3 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center border-2 border-green-200">
                <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{results.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl text-center border-2 border-purple-200">
                <Zap className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">+{results.xpEarned}</div>
                <div className="text-sm text-muted-foreground">XP Earned</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl text-center border-2 border-blue-200">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">{results.timeSpent}</div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl text-center border-2 border-orange-200">
                <Award className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">{results.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>

            {/* Achievement Badge */}
            {results.score >= 80 && (
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400 rounded-2xl p-6 text-center mb-8">
                <Award className="w-12 h-12 mx-auto mb-3 text-yellow-600" />
                <h3 className="text-lg font-bold text-yellow-800 mb-1">Achievement Unlocked!</h3>
                <p className="text-yellow-700">Quiz Master - Score 80% or higher</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link href="/quiz" className="flex-1">
                <Button className="w-full" size="lg">
                  Take Another Quiz
                </Button>
              </Link>
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full" size="lg">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Leaderboard
            </CardTitle>
            <CardDescription>See how you rank against other learners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    entry.isCurrentUser
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1
                      ? 'bg-yellow-400 text-yellow-900'
                      : entry.rank === 2
                      ? 'bg-gray-400 text-gray-900'
                      : entry.rank === 3
                      ? 'bg-orange-400 text-orange-900'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {entry.rank}
                  </div>
                  <div className="text-2xl">{entry.avatar}</div>
                  <div className="flex-1">
                    <div className={`font-medium ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                      {entry.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{entry.score}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}