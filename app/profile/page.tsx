'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Star, Flame, Target, Award, User, BarChart3, Settings } from 'lucide-react';

export default function Profile() {
  const user = {
    name: 'Student',
    username: '@learner',
    level: 'Intermediate',
    levelNumber: 5,
    totalQuizzes: 42,
    accuracy: 87,
    streak: 15,
    charactersLearned: 48,
  };

  const achievements = [
    { id: 1, icon: Trophy, name: 'First Quiz', description: 'Complete your first quiz', earned: true },
    { id: 2, icon: Flame, name: '7 Day Streak', description: 'Practice for 7 days in a row', earned: true },
    { id: 3, icon: Star, name: 'Perfect Score', description: 'Get 100% on a quiz', earned: true },
    { id: 4, icon: Target, name: '25 Characters', description: 'Learn 25 characters', earned: true },
    { id: 5, icon: Award, name: 'Quiz Master', description: 'Complete 50 quizzes', earned: false },
    { id: 6, icon: Flame, name: '30 Day Streak', description: 'Practice for 30 days in a row', earned: false },
  ];

  const recentStats = [
    { label: 'Hiragana Mastery', value: 75, total: 100 },
    { label: 'Katakana Mastery', value: 45, total: 100 },
    { label: 'Writing Practice', value: 32, total: 50 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Profile</h1>
        <p className="text-muted-foreground">Your learning journey and achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-primary text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.username}</CardDescription>
              <Badge className="mt-2 w-fit mx-auto">Level {user.levelNumber} - {user.level}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Level Progress</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl mb-1">{user.totalQuizzes}</div>
                  <p className="text-xs text-muted-foreground">Quizzes</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">{user.accuracy}%</div>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">{user.streak}</div>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">{user.charactersLearned}</div>
                  <p className="text-xs text-muted-foreground">Characters</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats & Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your mastery across different areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentStats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{stat.label}</span>
                    <span>{stat.value}/{stat.total}</span>
                  </div>
                  <Progress value={(stat.value / stat.total) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Unlock badges by completing challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        achievement.earned
                          ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            achievement.earned ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {achievement.name}
                          </h4>
                          <p className={`text-sm ${
                            achievement.earned ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.earned && (
                          <div className="text-yellow-500">
                            <Trophy className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}