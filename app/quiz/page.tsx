'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, Target, CheckCircle, XCircle } from 'lucide-react';
import { sampleQuizQuestions, QuizQuestion } from '@/data/quizzes';

export default function Quiz() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(sampleQuizQuestions.length).fill(false)
  );
  const [timer, setTimer] = useState(30);
  const [xpEarned, setXpEarned] = useState(0);

  const currentQuestion = sampleQuizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / sampleQuizQuestions.length) * 100;

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !answeredQuestions[currentQuestionIndex]) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, currentQuestionIndex, answeredQuestions]);

  const handleAnswerSelect = (answer: string) => {
    if (answeredQuestions[currentQuestionIndex]) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      // Bonus XP for quick answers
      const timeBonus = timer > 20 ? 10 : timer > 10 ? 5 : 0;
      setXpEarned(xpEarned + 10 + timeBonus);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimer(30);
    } else {
      router.push('/quiz-result');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredQuestions(new Array(sampleQuizQuestions.length).fill(false));
    setTimer(30);
    setXpEarned(0);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Quiz Challenge 🎯</h1>
          <p className="text-muted-foreground">Test your knowledge and earn XP!</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl ${
            timer <= 10 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-blue-100 text-blue-700'
          }`}>
            <Clock className="w-5 h-5" />
            <span className="text-2xl font-bold">{timer}s</span>
          </div>
          {/* XP Counter */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-accent to-yellow-300 px-6 py-3 rounded-2xl">
            <Zap className="w-5 h-5 text-navy" />
            <span className="text-2xl font-bold text-navy">+{xpEarned} XP</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {sampleQuizQuestions.length}
          </span>
          <span className="text-sm font-medium">Score: {score}/{sampleQuizQuestions.length}</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-pink-50">
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-primary text-white">Question {currentQuestionIndex + 1}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="w-4 h-4" />
                Multiple Choice
              </div>
            </div>
            <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            {currentQuestion.character && (
              <div className="text-center">
                <div className="text-6xl mb-2">{currentQuestion.character}</div>
              </div>
            )}
            {currentQuestion.romaji && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{currentQuestion.romaji}</div>
              </div>
            )}

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                const isAnswered = answeredQuestions[currentQuestionIndex];

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isAnswered
                        ? isCorrect
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : isSelected
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-100 border-gray-300'
                        : isSelected
                        ? 'bg-primary/10 border-primary'
                        : 'bg-white border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-green-500 border-green-500'
                            : isSelected
                            ? 'bg-red-500 border-red-500'
                            : 'border-gray-300'
                          : isSelected
                          ? 'bg-primary border-primary'
                          : 'border-gray-300'
                      }`}>
                        {isAnswered && (
                          isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : isSelected ? (
                            <XCircle className="w-4 h-4 text-white" />
                          ) : null
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {answeredQuestions[currentQuestionIndex] && (
              <div className="text-center">
                <Button onClick={handleNext} size="lg" className="px-8">
                  {currentQuestionIndex < sampleQuizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}