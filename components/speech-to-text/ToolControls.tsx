import { Button } from "@/components/ui/button";
import { Mic, Square, Download } from "lucide-react";

interface ToolControlsProps {
  isListening: boolean;
  toggleListening: () => void;
  handleSaveText: () => void;
  hasText: boolean;
}

export function ToolControls({
  isListening,
  toggleListening,
  handleSaveText,
  hasText,
}: ToolControlsProps) {
  return (
    <div className="p-5 md:p-12 bg-secondary/10 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
      <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto">
        <Button
          size="lg"
          onClick={toggleListening}
          variant={isListening ? "destructive" : "default"}
          className={`w-full md:w-auto rounded-2xl md:rounded-3xl px-8 md:px-14 h-14 md:h-20 text-base md:text-xl font-black gap-4 md:gap-6 shadow-2xl transition-all active:scale-95 ${
            isListening
              ? "animate-pulse ring-[8px] md:ring-[12px] ring-destructive/10 shadow-destructive/30"
              : "shadow-primary/30 hover:shadow-primary/40"
          }`}
          aria-label={isListening ? "Stop Recording" : "Start Recording"}
        >
          {isListening ? (
            <>
              <Square className="w-5 h-5 md:w-8 md:h-8 fill-current" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 md:w-8 md:h-8" />
              Start Recording
            </>
          )}
        </Button>

        {isListening && (
          <div className="flex items-center gap-4 px-6 py-3 bg-background/50 rounded-2xl border border-border/50 animate-in fade-in slide-in-from-left-4">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-destructive animate-pulse">
              Live
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <Button
          variant="outline"
          size="lg"
          onClick={handleSaveText}
          disabled={isListening || !hasText}
          className="flex-1 md:flex-none h-14 md:h-16 px-6 md:px-10 rounded-2xl md:rounded-2xl font-bold gap-3 border-2 hover:border-primary transition-all"
          aria-label="Save transcript as TXT file"
        >
          <Download className="w-5 h-5" />
          Save TXT
        </Button>
      </div>
    </div>
  );
}
