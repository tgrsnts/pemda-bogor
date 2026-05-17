'use client';

import { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { SakuraDecoration } from '@/components/SakuraDecoration';
import { hiraganaCharacters, katakanaCharacters } from '@/data/characters';
import { ETL8B_HIRAGANA_MAP } from '@/data/mapping';

export default function Practice() {
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [scriptType, setScriptType] = useState<'hiragana' | 'katakana'>('hiragana');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const isDrawingRef = useRef(false); // ✅ Pakai ref bukan state agar tidak trigger re-render
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [accuracy, setAccuracy] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const characters = scriptType === 'hiragana' ? hiraganaCharacters : katakanaCharacters;
  const currentChar = characters[currentCharIndex];

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const getTouchPos = (touch: Touch) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY,
    };
  };

  // Load model
  useEffect(() => {
    tf.loadGraphModel('/etl_try_2/model.json').then((m) => setModel(m as tf.GraphModel));
  }, []);

  const drawGuide = (character: string) => {
    const guide = guideCanvasRef.current;
    if (!guide) return;
    const ctx = guide.getContext('2d')!;
    ctx.clearRect(0, 0, guide.width, guide.height);
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#E5E7EB';
    ctx.font = `bold ${Math.floor(guide.width * 0.7)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character, guide.width / 2, guide.height / 2);
  };

  // Init context + guide
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#000000';
    ctxRef.current = ctx;
    drawGuide(currentChar.character);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharIndex, scriptType]);

  // ✅ Blokir scroll touch via native listener dengan passive: false
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onTouchStart = (e: TouchEvent) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      isDrawingRef.current = true;
      const { x, y } = getTouchPos(e.touches[0]);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // ✅ Berfungsi karena { passive: false }
      const ctx = ctxRef.current;
      if (!isDrawingRef.current || !ctx) return;
      const { x, y } = getTouchPos(e.touches[0]);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const onTouchEnd = () => {
      isDrawingRef.current = false;
      ctxRef.current?.closePath();
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mouse handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = '#000000';
    isDrawingRef.current = true;
    const { x, y } = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    if (!isDrawingRef.current || !ctx) return;
    const { x, y } = getMousePos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    ctxRef.current?.closePath();
  };

  const checkWriting = async () => {
    const canvas = canvasRef.current;
    if (!model || !canvas) return;

    const imgData = tf.browser.fromPixels(canvas, 1);
    const resized = tf.image.resizeBilinear(imgData, [69, 69]);
    const normalized = resized.div(255.0);
    const invertedBase = tf.scalar(1.0).sub(normalized);

    const inverted = tf.tidy(() =>
      tf.where(
        invertedBase.greater(tf.scalar(0.2)),
        tf.onesLike(invertedBase),
        tf.zerosLike(invertedBase)
      )
    );

    const input = inverted.expandDims(0);
    const prediction = model.predict(input) as tf.Tensor;
    const probabilities = await prediction.data();
    const resultIndex = prediction.argMax(-1).dataSync()[0];
    const predictedChar = ETL8B_HIRAGANA_MAP[resultIndex];
    const confidenceScore = probabilities[resultIndex];

    console.log(`Prediksi: ${predictedChar} (confidence: ${(confidenceScore * 100).toFixed(2)}%)`);

    const isCorrect = predictedChar === currentChar.character;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    const displayAccuracy = Math.min(Math.round((confidenceScore / 0.2) * 100), 100);
    setAccuracy(isCorrect ? Math.max(displayAccuracy, 85) : Math.round(confidenceScore * 100));

    imgData.dispose();
    resized.dispose();
    normalized.dispose();
    invertedBase.dispose();
    prediction.dispose();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setFeedback(null);
  };

  const nextCharacter = () => {
    setCurrentCharIndex((prev) => (prev + 1) % characters.length);
    setFeedback(null);
  };

  return (
    <div className="p-4 md:p-8 relative">
      <SakuraDecoration />

      <div className="mb-6">
        <h1 className="mb-2">Latihan Menulis</h1>
        <p className="text-muted-foreground">Kuasai menulis karakter Hiragana dan Katakana dengan Yumekana!</p>
      </div>

      <Tabs value={scriptType} onValueChange={(v) => setScriptType(v as 'hiragana' | 'katakana')} className="mb-6">
        <TabsList className="bg-white shadow-md p-1 rounded-2xl">
          <TabsTrigger value="hiragana" className="rounded-xl">Hiragana ひらがな</TabsTrigger>
          <TabsTrigger value="katakana" className="rounded-xl">Katakana カタカナ</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-2xl border-2 border-secondary/30">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
            <CardTitle>Karakter Saat Ini</CardTitle>
            <CardDescription>Belajar menulis karakter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-6xl md:text-7xl mb-4 text-primary">{currentChar.character}</div>
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

        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-pink-50">
            <CardTitle>Area Latihan</CardTitle>
            <CardDescription>Tulis karakter dengan benar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                <canvas
                  ref={guideCanvasRef}
                  width={300}
                  height={300}
                  className="absolute inset-0 w-full max-w-sm mx-auto pointer-events-none"
                />
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={300}
                  style={{ touchAction: 'none' }}
                  className="relative w-full max-w-sm mx-auto border border-gray-200 rounded-lg cursor-crosshair bg-transparent"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={clearCanvas} variant="outline" className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Bersihkan
                </Button>
                <Button onClick={checkWriting} className="flex-1">
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
                    {feedback === 'correct' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    <span className="font-bold">{feedback === 'correct' ? 'Bagus!' : 'Coba lagi!'}</span>
                  </div>
                  <div className="text-sm">Akurasi: {accuracy}%</div>
                </div>
              )}

              <Button onClick={nextCharacter} variant="secondary" className="w-full">
                Karakter Selanjutnya
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}