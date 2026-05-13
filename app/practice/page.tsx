'use client';

import { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PenTool, RotateCcw, CheckCircle, XCircle, Zap } from 'lucide-react';
import { SakuraDecoration } from '@/components/SakuraDecoration';
import { hiraganaCharacters, katakanaCharacters, Character } from '@/data/characters';

export default function Practice() {
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [scriptType, setScriptType] = useState<'hiragana' | 'katakana'>('hiragana');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const characters = scriptType === 'hiragana' ? hiraganaCharacters : katakanaCharacters;
  const currentChar = characters[currentCharIndex];

  const getTouchPos = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!context) return;
    setIsDrawing(true);
    const { x, y } = getTouchPos(e);
    context.beginPath();
    context.moveTo(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    e.preventDefault(); // Mencegah scrolling halaman saat menggambar
    const { x, y } = getTouchPos(e);
    context.lineTo(x, y);
    context.stroke();
  };

  // 1. Load Model saat komponen pertama kali mounting
  useEffect(() => {
    async function load() {
      const loadedModel = await tf.loadGraphModel('/tfjs_model/model.json');
      setModel(loadedModel as tf.GraphModel);
    }
    load();
  }, []);

  // Inisialisasi Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Background putih
        setContext(ctx);
      }
    }
  }, []);

  // 2. Fungsi Prediksi
  const checkWriting = async () => {
    if (!model || !canvasRef.current) return;

    // Preprocessing: Ambil data canvas
    const imgData = tf.browser.fromPixels(canvasRef.current, 1); // Greyscale
    const resized = tf.image.resizeBilinear(imgData, [28, 28]); // Sesuaikan ukuran input model Anda
    const normalized = resized.div(255.0).expandDims(0);

    // Prediksi
    const prediction = model.predict(normalized) as tf.Tensor;
    const resultIndex = prediction.argMax(-1).dataSync()[0];

    // Logika verifikasi
    // Asumsi: Anda membandingkan indeks hasil model dengan karakter saat ini
    const isCorrect = characters[currentCharIndex].id === `h${resultIndex + 1}`; // Sesuaikan logika ID Anda

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setAccuracy(isCorrect ? 95 : 60); // Mock score jika tidak pakai confidence score model
    if (isCorrect) setXpEarned(prev => prev + 15);

    // Bersihkan tensor dari memori
    imgData.dispose();
    resized.dispose();
    normalized.dispose();
    prediction.dispose();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#1D3557';
        setContext(ctx);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      context.beginPath();
      context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    if (!context) return;
    setIsDrawing(false);
    context.closePath();
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setFeedback(null);
  };

  const nextCharacter = () => {
    setCurrentCharIndex((prev) => (prev + 1) % characters.length);
    clearCanvas();
  };

  return (
    <div className="p-8 relative">
      <SakuraDecoration />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Latihan Menulis</h1>
          <p className="text-muted-foreground">Kuasai menulis karakter Hiragana dan Katakana dengan Yumekana!</p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-accent to-yellow-300 px-6 py-3 rounded-2xl shadow-lg">
          <Zap className="w-5 h-5 text-navy" />
          <span className="text-2xl font-bold text-navy">+{xpEarned} XP</span>
        </div>
      </div>

      <Tabs value={scriptType} onValueChange={(v) => setScriptType(v as 'hiragana' | 'katakana')} className="mb-6">
        <TabsList className="bg-white shadow-md p-1 rounded-2xl">
          <TabsTrigger value="hiragana" className="rounded-xl">Hiragana ひらがな</TabsTrigger>
          <TabsTrigger value="katakana" className="rounded-xl">Katakana カタカナ</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Character Display */}
        <Card className="shadow-2xl border-2 border-secondary/30">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
            <CardTitle>Karakter Saat Ini</CardTitle>
            <CardDescription>Belajar menulis karakter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-6xl md:text-7xl mb-4 text-primary">
                {currentChar.character}
              </div>
              <div className="text-center space-y-2">
                <div className="text-xl font-bold text-primary">{currentChar.romaji}</div>
                <Badge variant="secondary">{scriptType}</Badge>
                <div className="text-sm text-muted-foreground mt-2">
                  Contoh: {currentChar.example} ({currentChar.exampleMeaning})
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drawing Canvas */}
        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-pink-50">
            <CardTitle>Area Latihan</CardTitle>
            <CardDescription>Tulis karakter dengan benar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={300}
                  className="w-full max-w-sm mx-auto border border-gray-200 rounded-lg cursor-crosshair bg-white touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}

                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={stopDrawing}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={clearCanvas} variant="outline" className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2 hover:cursor-pointer" />
                  Bersihkan
                </Button>
                <Button onClick={checkWriting} className="flex-1 hover:cursor-pointer">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Periksa
                </Button>
              </div>

              {feedback && (
                <div className={`p-4 rounded-xl text-center ${feedback === 'correct'
                  ? 'bg-green-100 text-green-800 border-2 border-green-200'
                  : 'bg-red-100 text-red-800 border-2 border-red-200'
                  }`}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {feedback === 'correct' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span className="font-bold">
                      {feedback === 'correct' ? 'Bagus!' : 'Coba lagi!'}
                    </span>
                  </div>
                  <div className="text-sm">
                    Akurasi: {accuracy}% | XP Earned: +{feedback === 'correct' ? (accuracy > 90 ? 25 : 15) : 0}
                  </div>
                </div>
              )}

              <Button onClick={nextCharacter} variant="secondary" className="w-full hover:cursor-pointer">
                Karakter Selanjutnya
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}