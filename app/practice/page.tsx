'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, CheckCircle, XCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { hiraganaCharacters, katakanaCharacters } from '@/data/characters';
import { ETL8B_HIRAGANA_MAP, KATAKANA_MAP } from '@/data/mapping';

type ScriptType = 'hiragana' | 'katakana';
type FeedbackType = 'correct' | 'incorrect' | null;

// ─── Particle effect on correct answer ──────────────────────────────────────
function ConfettiParticle({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <div
      className="confetti-particle"
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: 8,
        height: 8,
        borderRadius: 2,
        backgroundColor: color,
        pointerEvents: 'none',
        zIndex: 9999,
        animation: 'confettiFall 1s ease-out forwards',
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
}

export default function Practice() {
  const [hiraganaModel, setHiraganaModel] = useState<tf.GraphModel | null>(null);
  const [katakanaModel, setKatakanaModel] = useState<tf.GraphModel | null>(null);
  const [scriptType, setScriptType] = useState<ScriptType>(() => {
    if (typeof window === 'undefined') return 'hiragana';
    const saved = localStorage.getItem('selectedScript');
    return saved === 'katakana' ? 'katakana' : 'hiragana';
  });
  const model = scriptType === 'hiragana' ? hiraganaModel : katakanaModel;
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const isDrawingRef = useRef(false);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [accuracy, setAccuracy] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [totalChecked, setTotalChecked] = useState(0);
  const [showCharHint, setShowCharHint] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokeCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const strokeCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const characters = scriptType === 'hiragana' ? hiraganaCharacters : katakanaCharacters;
  const currentChar = characters[currentCharIndex];

  // ─── Helpers ───────────────────────────────────────────────────────────────

  const getPos = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  // ─── Load models ───────────────────────────────────────────────────────────

  useEffect(() => {
    tf.loadGraphModel('/etl_try_5/model.json').then((m) => setHiraganaModel(m as tf.GraphModel));
    tf.loadGraphModel('/katakana_model/model.json').then((m) => setKatakanaModel(m as tf.GraphModel));
  }, []);

  // ─── Canvas setup ──────────────────────────────────────────────────────────

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#8B5CF6';
    ctx.font = `bold ${Math.floor(canvas.width * 0.68)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentChar.character, canvas.width / 2, canvas.height / 2);
    ctx.restore();
  }, [currentChar]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const strokeCanvas = strokeCanvasRef.current;
    if (!canvas || !strokeCanvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#3A0007';
    ctxRef.current = ctx;

    const strokeCtx = strokeCanvas.getContext('2d', { willReadFrequently: true });
    if (!strokeCtx) return;
    strokeCtx.lineCap = 'round';
    strokeCtx.lineJoin = 'round';
    strokeCtx.lineWidth = 14;
    strokeCtx.strokeStyle = '#000000';
    strokeCtxRef.current = strokeCtx;

    strokeCtx.fillStyle = '#FFFFFF';
    strokeCtx.fillRect(0, 0, strokeCanvas.width, strokeCanvas.height);

    drawGuide();
    setHasDrawn(false);
    setFeedback(null);
  }, [currentCharIndex, scriptType, drawGuide]);

  // ─── Touch events ──────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const ctx = ctxRef.current;
      const strokeCtx = strokeCtxRef.current;
      if (!ctx || !strokeCtx) return;
      isDrawingRef.current = true;
      setHasDrawn(true);
      const { x, y } = getPos(e.touches[0].clientX, e.touches[0].clientY);
      [ctx, strokeCtx].forEach((c) => { c.beginPath(); c.moveTo(x, y); });
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const ctx = ctxRef.current;
      const strokeCtx = strokeCtxRef.current;
      if (!isDrawingRef.current || !ctx || !strokeCtx) return;
      const { x, y } = getPos(e.touches[0].clientX, e.touches[0].clientY);
      [ctx, strokeCtx].forEach((c) => { c.lineTo(x, y); c.stroke(); });
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
  }, []);

  // ─── Mouse handlers ────────────────────────────────────────────────────────

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    const strokeCtx = strokeCtxRef.current;
    if (!ctx || !strokeCtx) return;
    isDrawingRef.current = true;
    setHasDrawn(true);
    const { x, y } = getPos(e.clientX, e.clientY);
    [ctx, strokeCtx].forEach((c) => { c.beginPath(); c.moveTo(x, y); });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    const strokeCtx = strokeCtxRef.current;
    if (!isDrawingRef.current || !ctx || !strokeCtx) return;
    const { x, y } = getPos(e.clientX, e.clientY);
    [ctx, strokeCtx].forEach((c) => { c.lineTo(x, y); c.stroke(); });
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    ctxRef.current?.closePath();
    strokeCtxRef.current?.closePath();
  };

  // ─── Confetti burst ────────────────────────────────────────────────────────

  const spawnConfetti = () => {
    const colors = ['#f472b6', '#a78bfa', '#34d399', '#fbbf24', '#FCA5A5', '#f87171'];
    const particles = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 1200);
  };

  // ─── Check writing ─────────────────────────────────────────────────────────

  const checkWriting = async () => {
    const strokeCanvas = strokeCanvasRef.current;
    if (!model || !strokeCanvas || isChecking) return;
    setIsChecking(true);

    const imgData = tf.browser.fromPixels(strokeCanvas, 1);
    const resized = tf.image.resizeBilinear(imgData, [64, 64]);
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
    const map = scriptType === 'hiragana' ? ETL8B_HIRAGANA_MAP : KATAKANA_MAP;
    const predictedChar = map[resultIndex];
    const confidenceScore = probabilities[resultIndex];

    const isCorrect = predictedChar === currentChar.character;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    const displayAccuracy = Math.min(Math.round((confidenceScore / 0.2) * 100), 100);
    setAccuracy(isCorrect ? Math.max(displayAccuracy, 85) : Math.round(confidenceScore * 100));
    setTotalChecked((p) => p + 1);
    if (isCorrect) {
      setStreakCount((p) => p + 1);
      spawnConfetti();
    } else {
      setStreakCount(0);
    }

    imgData.dispose(); resized.dispose(); normalized.dispose();
    invertedBase.dispose(); prediction.dispose();
    setIsChecking(false);
  };

  // ─── Clear canvas ──────────────────────────────────────────────────────────

  const clearCanvas = () => {
    const strokeCanvas = strokeCanvasRef.current;
    if (!strokeCanvas) return;
    const strokeCtx = strokeCanvas.getContext('2d')!;
    strokeCtx.fillStyle = '#FFFFFF';
    strokeCtx.fillRect(0, 0, strokeCanvas.width, strokeCanvas.height);
    drawGuide();
    setFeedback(null);
    setHasDrawn(false);
  };

  const nextCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    setCurrentCharIndex(randomIndex);
    setShowCharHint(false);
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    setCurrentCharIndex(randomIndex);
    setFeedback(null);
  }, [scriptType]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Global styles injected inline for isolated page */}
      <style>{`
        html, body { overflow: hidden !important; height: 100%; }
        @keyframes confettiFall {
          0%   { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
          100% { opacity: 0; transform: translateY(120px) rotate(720deg) scale(0.5); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.85); }
          60%  { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(230, 57, 70,0.4); }
          70%  { box-shadow: 0 0 0 12px rgba(230, 57, 70,0); }
          100% { box-shadow: 0 0 0 0 rgba(230, 57, 70,0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .feedback-enter { animation: popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
        .canvas-pulse { animation: pulseRing 1.5s ease-out; }
        .slide-up { animation: slideUp 0.4s ease both; }
        .fade-in  { animation: fadeIn 0.3s ease both; }

        /* Scrollbar hidden globally while this page mounts */
        ::-webkit-scrollbar { display: none; }

        /* Canvas crosshair only on desktop */
        @media (pointer: coarse) {
          .drawing-canvas { cursor: default !important; }
        }
      `}</style>

      {/* Confetti */}
      {confetti.map((p) => <ConfettiParticle key={p.id} x={p.x} y={p.y} color={p.color} />)}

      {/* ── Root fullscreen container ── */}
      <div
        style={{
          position: 'fixed', inset: 0,
          width: '100vw', height: '100dvh',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #fdf4ff 0%, #FFF5F5 40%, #f0f9ff 100%)',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'inherit',
        }}
      >
        {/* ── TOP BAR ── */}
        <header
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(230, 57, 70,0.15)',
            zIndex: 10,
          }}
        >
          {/* Back button */}
          <a
            href="/latihan"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              color: '#E63946', fontWeight: 600, fontSize: 14,
              textDecoration: 'none', padding: '6px 12px',
              borderRadius: 12, background: 'rgba(230, 57, 70,0.1)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(230, 57, 70,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(230, 57, 70,0.1)')}
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Kembali</span>
          </a>

          {/* Script toggle */}
          <div
            style={{
              display: 'flex', gap: 4,
              background: 'rgba(230, 57, 70,0.1)',
              borderRadius: 14, padding: 4,
            }}
          >
            {(['hiragana', 'katakana'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setScriptType(s)}
                style={{
                  padding: '5px 14px', borderRadius: 10, fontSize: 13,
                  fontWeight: 600, border: 'none', cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: scriptType === s ? '#E63946' : 'transparent',
                  color: scriptType === s ? '#fff' : '#E63946',
                  boxShadow: scriptType === s ? '0 2px 8px rgba(230, 57, 70,0.3)' : 'none',
                }}
              >
                {s === 'hiragana' ? 'ひ Hiragana' : 'ア Katakana'}
              </button>
            ))}
          </div>

          {/* Streak / stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {streakCount > 1 && (
              <div
                className="fade-in"
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                  color: '#fff', borderRadius: 10, padding: '4px 10px',
                  fontSize: 13, fontWeight: 700,
                }}
              >
                🔥 {streakCount}
              </div>
            )}
            {totalChecked > 0 && (
              <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
                {totalChecked} dicek
              </div>
            )}
          </div>
        </header>

        {/* ── MAIN CONTENT ── */}
        {/* Mobile: vertical stack | Desktop: horizontal split */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            overflow: 'hidden',
            // Desktop: row, Mobile: column — handled via media query class trick inline
          }}
          className="flex-col lg:flex-row"
        >
          {/* ── LEFT PANEL (Character info) ── */}
          {/* On mobile: compact horizontal strip. On desktop: full left sidebar */}
          <div
            style={{
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRight: '1px solid rgba(230, 57, 70,0.1)',
              transition: 'all 0.3s ease',
            }}
            className="
              flex-shrink-0
              py-3 px-4 flex-row gap-4
              lg:py-0 lg:px-0 lg:flex-col lg:gap-0
              w-full lg:w-72 xl:w-80
              h-auto lg:h-full
              border-b lg:border-b-0
            "
          >
            {/* Character display */}
            <div
              key={currentCharIndex}
              className="slide-up"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 4,
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #E63946, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                  letterSpacing: '-2px',
                  userSelect: 'none',
                }}
                className="hidden lg:block"
              >
                {currentChar.character}
              </div>

              {/* Mobile: smaller inline char */}
              <div
                style={{
                  fontSize: '2.5rem', fontWeight: 800, lineHeight: 1,
                  background: 'linear-gradient(135deg, #E63946, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                className="lg:hidden"
              >
                {currentChar.character}
              </div>

              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                    fontWeight: 700, color: '#7A0010',
                  }}
                >
                  {currentChar.romaji}
                </span>
                <Badge
                  variant="secondary"
                  style={{ fontSize: 11, background: 'rgba(230, 57, 70,0.15)', color: '#E63946' }}
                >
                  {scriptType}
                </Badge>
              </div>

              {/* Example — hidden on mobile */}
              <div
                className="hidden lg:block text-center"
                style={{
                  fontSize: 13, color: '#6b7280',
                  background: 'rgba(230, 57, 70,0.08)',
                  borderRadius: 10, padding: '8px 16px',
                  marginTop: 8, maxWidth: 200,
                }}
              >
                <span style={{ fontWeight: 600, color: '#E63946' }}>{currentChar.example}</span>
                <br />
                <span>{currentChar.exampleMeaning}</span>
              </div>
            </div>

            {/* Hint toggle — desktop only */}
            <button
              className="hidden lg:flex"
              onClick={() => setShowCharHint((p) => !p)}
              style={{
                marginTop: 24, alignItems: 'center', gap: 6,
                color: '#E63946', fontSize: 12, fontWeight: 600,
                background: 'rgba(230, 57, 70, 0.08)',
                border: '1px dashed rgba(230, 57, 70, 0.3)',
                borderRadius: 10, padding: '6px 14px', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Sparkles size={13} />
              {showCharHint ? 'Sembunyikan panduan' : 'Tampilkan panduan'}
            </button>

            {showCharHint && (
              <div
                className="hidden lg:block fade-in"
                style={{
                  marginTop: 12,
                  fontSize: 80, lineHeight: 1,
                  color: 'rgba(230, 57, 70,0.2)',
                  fontWeight: 900, userSelect: 'none',
                }}
              >
                {currentChar.character}
              </div>
            )}
          </div>

          {/* ── RIGHT PANEL (Canvas + actions) ── */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: '0 12px',
              position: 'relative',
            }}
          >
            {/* Canvas area */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                width: '100%',
                maxHeight: 'calc(100% - 80px)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 'min(100%, min(calc(100vh - 220px), 420px))',
                  aspectRatio: '1 / 1',
                  borderRadius: 24,
                  boxShadow: feedback === 'correct'
                    ? '0 0 0 3px #34d399, 0 20px 60px rgba(52,211,153,0.2)'
                    : feedback === 'incorrect'
                    ? '0 0 0 3px #f87171, 0 20px 60px rgba(248,113,113,0.15)'
                    : '0 8px 40px rgba(230, 57, 70,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.4s ease',
                  background: '#fff',
                }}
                className={feedback === 'correct' ? 'canvas-pulse' : ''}
              >
                {/* Grid lines decoration */}
                <div
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 24,
                    backgroundImage: `
                      linear-gradient(rgba(230, 57, 70,0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(230, 57, 70,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '25% 25%',
                    pointerEvents: 'none', zIndex: 1,
                  }}
                />
                {/* Center cross */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 24,
                  backgroundImage: `
                    linear-gradient(rgba(230, 57, 70,0.12) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(230, 57, 70,0.12) 1px, transparent 1px)
                  `,
                  backgroundSize: '50% 50%',
                  pointerEvents: 'none', zIndex: 1,
                }} />

                {/* Hidden stroke canvas */}
                <canvas ref={strokeCanvasRef} width={300} height={300} style={{ display: 'none' }} />

                {/* Visible drawing canvas */}
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={300}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    borderRadius: 24,
                    cursor: 'crosshair',
                    touchAction: 'none',
                    zIndex: 2,
                  }}
                  className="drawing-canvas"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />

                {/* Feedback overlay */}
                {feedback && (
                  <div
                    className="feedback-enter"
                    style={{
                      position: 'absolute', top: 12, right: 12,
                      borderRadius: 12, padding: '6px 12px',
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 13, fontWeight: 700, zIndex: 3,
                      background: feedback === 'correct'
                        ? 'linear-gradient(135deg, #d1fae5, #a7f3d0)'
                        : 'linear-gradient(135deg, #fee2e2, #fecaca)',
                      color: feedback === 'correct' ? '#065f46' : '#991b1b',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    {feedback === 'correct'
                      ? <><CheckCircle size={14} /> Benar!</>
                      : <><XCircle size={14} /> Coba lagi</>
                    }
                  </div>
                )}

                {/* Empty state hint */}
                {!hasDrawn && !feedback && (
                  <div
                    style={{
                      position: 'absolute', bottom: 16, left: 0, right: 0,
                      textAlign: 'center', fontSize: 12, color: '#d1d5db',
                      pointerEvents: 'none', zIndex: 3,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    Mulai menulis di sini ✍️
                  </div>
                )}
              </div>
            </div>

            {/* ── BOTTOM ACTION BAR ── */}
            <div
              style={{
                flexShrink: 0,
                width: '100%',
                maxWidth: 480,
                display: 'flex',
                gap: 10,
                padding: '12px 0 16px',
                alignItems: 'center',
              }}
            >
              {/* Clear */}
              <button
                onClick={clearCanvas}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 6, height: 48, borderRadius: 14,
                  border: '2px solid rgba(230, 57, 70,0.3)',
                  background: 'rgba(255,255,255,0.9)',
                  color: '#E63946', fontWeight: 600, fontSize: 14,
                  cursor: 'pointer', flex: 1,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(230, 57, 70,0.1)';                  
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.9)';                
                }}
              >
                <RotateCcw size={16} />
                <span>Hapus</span>
              </button>

              {/* Check */}
              <button
                onClick={checkWriting}
                disabled={!hasDrawn || isChecking}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 8, height: 48, borderRadius: 14,
                  background: hasDrawn && !isChecking
                    ? 'linear-gradient(135deg, #E63946, #a855f7)'
                    : 'rgba(230, 57, 70,0.3)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700, fontSize: 15,
                  cursor: hasDrawn && !isChecking ? 'pointer' : 'not-allowed',
                  flex: 2,
                  boxShadow: hasDrawn && !isChecking
                    ? '0 4px 16px rgba(230, 57, 70,0.35)'
                    : 'none',
                  transition: 'all 0.25s',
                  transform: 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  if (hasDrawn && !isChecking) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(230, 57, 70,0.45)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = hasDrawn && !isChecking
                    ? '0 4px 16px rgba(230, 57, 70,0.35)' : 'none';
                }}
              >
                <CheckCircle size={17} />
                {isChecking ? 'Memeriksa...' : 'Periksa'}
              </button>

              {/* Next */}
              <button
                onClick={nextCharacter}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 6, height: 48, borderRadius: 14, flex: 1,
                  background: feedback === 'correct'
                    ? 'linear-gradient(135deg, #34d399, #10b981)'
                    : 'rgba(255,255,255,0.9)',
                  border: feedback === 'correct'
                    ? 'none'
                    : '2px solid rgba(230, 57, 70,0.3)',
                  color: feedback === 'correct' ? '#fff' : '#E63946',
                  fontWeight: 600, fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: feedback === 'correct' ? '0 4px 16px rgba(52,211,153,0.4)' : 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  if (feedback !== 'correct') {
                    e.currentTarget.style.background = 'rgba(230, 57, 70,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (feedback !== 'correct') {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                  }
                }}
              >
                {feedback === 'correct' ? '✓ Lanjut' : 'Lewati'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}