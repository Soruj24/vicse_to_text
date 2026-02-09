export function ToolHeader() {
  return (
    <div className="text-center mb-8 md:mb-20">
      <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
        Voice Editor Pro
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-xl px-2 md:px-0 leading-relaxed">
        Capture your thoughts instantly. Select a language, click the mic, and start speaking. 
        <span className="hidden md:inline"> Everything is processed in real-time.</span>
      </p>
    </div>
  );
}
