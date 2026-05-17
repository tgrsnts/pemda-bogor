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
  const isDrawingRef = useRef(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [accuracy, setAccuracy] = useState(0);

  // Canvas tampil: guide + stroke pengguna (visible)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Canvas hidden: HANYA stroke pengguna, tanpa guide (untuk prediksi)
  const strokeCanvasRef = useRef<HTMLCanvasElement>(null);

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const strokeCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const characters = scriptType === 'hiragana' ? hiraganaCharacters : katakanaCharacters;
  const currentChar = characters[currentCharIndex];

  // ─── Helpers posisi ───────────────────────────────────────────────────────

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

  // ─── Load model ──────────────────────────────────────────────────────────

  useEffect(() => {
    tf.loadGraphModel('/etl_try_3/model.json').then((m) => setModel(m as tf.GraphModel));
  }, []);

  // ─── Gambar guide ke canvas tampil ───────────────────────────────────────

  const drawGuide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    // Hanya hapus area guide (full clear), lalu gambar ulang guide
    // Stroke pengguna TIDAK di-clear di sini — drawGuide hanya dipanggil
    // saat karakter berganti (via useEffect) yang juga clear stroke canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#E5E7EB';
    ctx.font = `bold ${Math.floor(canvas.width * 0.7)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentChar.character, canvas.width / 2, canvas.height / 2);
    ctx.restore();
  };

  // ─── Init context + guide setiap ganti karakter/script ───────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    const strokeCanvas = strokeCanvasRef.current;
    if (!canvas || !strokeCanvas) return;

    // Setup ctx tampil
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#000000';
    ctxRef.current = ctx;

    // Setup ctx stroke-only (hidden)
    const strokeCtx = strokeCanvas.getContext('2d', { willReadFrequently: true });
    if (!strokeCtx) return;
    strokeCtx.lineCap = 'round';
    strokeCtx.lineJoin = 'round';
    strokeCtx.lineWidth = 12;
    strokeCtx.strokeStyle = '#000000';
    strokeCtxRef.current = strokeCtx;

    // Fill putih sebagai background permanen stroke canvas
    strokeCtx.fillStyle = '#FFFFFF';
    strokeCtx.fillRect(0, 0, strokeCanvas.width, strokeCanvas.height);

    // Gambar guide ke canvas tampil
    drawGuide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharIndex, scriptType]);

  // ─── Touch events (passive: false agar e.preventDefault() berfungsi) ─────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onTouchStart = (e: TouchEvent) => {
      const ctx = ctxRef.current;
      const strokeCtx = strokeCtxRef.current;
      if (!ctx || !strokeCtx) return;
      isDrawingRef.current = true;
      const { x, y } = getTouchPos(e.touches[0]);

      // Canvas tampil
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      ctx.moveTo(x, y);

      // Canvas stroke-only
      strokeCtx.globalAlpha = 1;
      strokeCtx.globalCompositeOperation = 'source-over';
      strokeCtx.strokeStyle = '#000000';
      strokeCtx.beginPath();
      strokeCtx.moveTo(x, y);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const ctx = ctxRef.current;
      const strokeCtx = strokeCtxRef.current;
      if (!isDrawingRef.current || !ctx || !strokeCtx) return;
      const { x, y } = getTouchPos(e.touches[0]);

      ctx.lineTo(x, y);
      ctx.stroke();

      strokeCtx.lineTo(x, y);
      strokeCtx.stroke();
    };

    const onTouchEnd = () => {
      isDrawingRef.current = false;
      ctxRef.current?.closePath();
      strokeCtxRef.current?.closePath();
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

  // ─── Mouse handlers ───────────────────────────────────────────────────────

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    const strokeCtx = strokeCtxRef.current;
    if (!ctx || !strokeCtx) return;

    isDrawingRef.current = true;
    const { x, y } = getMousePos(e);

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(x, y);

    strokeCtx.globalAlpha = 1;
    strokeCtx.globalCompositeOperation = 'source-over';
    strokeCtx.strokeStyle = '#000000';
    strokeCtx.beginPath();
    strokeCtx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    const strokeCtx = strokeCtxRef.current;
    if (!isDrawingRef.current || !ctx || !strokeCtx) return;

    const { x, y } = getMousePos(e);

    ctx.lineTo(x, y);
    ctx.stroke();

    strokeCtx.lineTo(x, y);
    strokeCtx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    ctxRef.current?.closePath();
    strokeCtxRef.current?.closePath();
  };

  // ─── Prediksi: baca dari strokeCanvas (tanpa guide) ──────────────────────

  const checkWriting = async () => {
    const strokeCanvas = strokeCanvasRef.current;
    if (!model || !strokeCanvas) return;

    // strokeCanvas hanya berisi stroke pengguna — bebas guide
    const imgData = tf.browser.fromPixels(strokeCanvas, 1);
    const resized = tf.image.resizeBilinear(imgData, [28, 28]);
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

  // ─── Clear: hapus stroke di kedua canvas, gambar ulang guide ─────────────

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const strokeCanvas = strokeCanvasRef.current;
    if (!canvas || !strokeCanvas) return;

    // Reset stroke canvas ke background putih
    const strokeCtx = strokeCanvas.getContext('2d')!;
    strokeCtx.fillStyle = '#FFFFFF';
    strokeCtx.fillRect(0, 0, strokeCanvas.width, strokeCanvas.height);

    // Clear canvas tampil lalu gambar ulang guide
    drawGuide();

    setFeedback(null);
  };

  const nextCharacter = () => {
    setCurrentCharIndex((prev) => (prev + 1) % characters.length);
    setFeedback(null);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

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
                {/* Canvas tersembunyi — hanya stroke pengguna, dipakai untuk prediksi */}
                <canvas
                  ref={strokeCanvasRef}
                  width={300}
                  height={300}
                  className="hidden"
                />
                {/* Canvas tampil — guide + stroke pengguna */}
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