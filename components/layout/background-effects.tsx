export function BackgroundEffects() {
  return (
    <>
      {/* Gradient mesh background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grain texture overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-grain" />
    </>
  );
}
