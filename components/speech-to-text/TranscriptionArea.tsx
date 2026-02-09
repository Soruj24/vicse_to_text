"use client";

import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mic, Copy, Trash2 } from "lucide-react";

interface TranscriptionAreaProps {
  displayText: string;
  setConvertedText: (text: string) => void;
  isListening: boolean;
  handleCopyText: () => void;
  setShowClearDialog: (show: boolean) => void;
}

export function TranscriptionArea({
  displayText,
  setConvertedText,
  isListening,
  handleCopyText,
  setShowClearDialog,
}: TranscriptionAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [displayText]);

  return (
    <Card className="overflow-hidden border-2 border-border/40 shadow-2xl transition-all duration-500 focus-within:border-primary/40 focus-within:ring-[12px] focus-within:ring-primary/5 rounded-[2rem] md:rounded-[3rem] bg-background/50 backdrop-blur-sm">
      <div className="relative group">
        <Textarea
          ref={textareaRef}
          value={displayText}
          onChange={(e) => setConvertedText(e.target.value)}
          placeholder="Your speech will appear here..."
          className="min-h-[350px] md:min-h-[600px] text-lg md:text-3xl resize-none border-0 focus-visible:ring-0 p-8 md:p-16 leading-relaxed placeholder:text-muted-foreground/20 font-medium bg-transparent"
          aria-label="Transcription output"
          aria-live="polite"
        />
        {!displayText && !isListening && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 px-10 text-center">
            <div className="flex flex-col items-center gap-6 md:gap-10 opacity-[0.03] md:opacity-[0.05]">
              <Mic className="w-24 h-24 md:w-40 md:h-40" />
              <p className="text-2xl md:text-4xl font-black tracking-[0.3em] uppercase">
                Ready to Listen
              </p>
            </div>
          </div>
        )}

        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex gap-3 md:gap-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all bg-background/80 backdrop-blur-md border border-border/50"
                  onClick={handleCopyText}
                >
                  <Copy className="w-5 h-5 md:w-7 md:h-7" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy Text</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all text-destructive bg-background/80 backdrop-blur-md border border-border/50"
                  onClick={() => setShowClearDialog(true)}
                >
                  <Trash2 className="w-5 h-5 md:w-7 md:h-7" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear All</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
}
