import { ShortcutsDialog } from "./ShortcutsDialog";

export function ToolHeader() {
  return (
    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 tracking-tight">
        Voice Editor Pro
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
        Capture your thoughts instantly. Select a language, click the mic, and start speaking.
        <span className="hidden md:inline"> Everything is processed in real-time.</span>
      </p>
      <div className="mt-4 flex justify-center">
        <ShortcutsDialog />
      </div>
    </div>
  );
}