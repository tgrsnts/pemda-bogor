export function SakuraDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {/* Sakura flowers scattered */}
      <div className="absolute top-10 left-10 text-6xl animate-float" style={{ animationDelay: '0s' }}>
        🌸
      </div>
      <div className="absolute top-32 right-20 text-4xl animate-float" style={{ animationDelay: '2s' }}>
        🌸
      </div>
      <div className="absolute bottom-20 left-1/4 text-5xl animate-float" style={{ animationDelay: '1s' }}>
        🌸
      </div>
      <div className="absolute top-1/2 right-10 text-3xl animate-float" style={{ animationDelay: '3s' }}>
        🌸
      </div>
      <div className="absolute bottom-10 right-1/3 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>
        🌸
      </div>
    </div>
  );
}
