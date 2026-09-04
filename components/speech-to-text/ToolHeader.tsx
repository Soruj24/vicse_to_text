import { ShortcutsDialog } from "./ShortcutsDialog";

export function ToolHeader() {
  return (
    <div className="text-center mb-8 md:mb-12 relative">
      <div className="absolute top-0 right-0 hidden lg:block">
        <ShortcutsDialog />
      </div>
      <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight">
        Voice Editor Pro
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg px-2 md:px-0 leading-relaxed">
        Capture your thoughts instantly. Select a language, click the mic, and start speaking.
        <span className="hidden md:inline"> Everything is processed in real-time.</span>
      </p>
      <div className="mt-4 lg:hidden">
        <ShortcutsDialog />
      </div>
    </div>
  );
}
