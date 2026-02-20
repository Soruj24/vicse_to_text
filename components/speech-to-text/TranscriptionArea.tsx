"use client";

import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mic, Copy, Trash2, Volume2, VolumeX } from "lucide-react";
import { AIToolbar } from "./AIToolbar";
import { AudioVisualizer } from "./AudioVisualizer";
import { motion } from "framer-motion";

interface TranscriptionAreaProps {
  displayText: string;
  setConvertedText: (text: string) => void;
  isListening: boolean;
  handleCopyText: () => void;
  setShowClearDialog: (show: boolean) => void;
  language: string;
}

export function TranscriptionArea({
  displayText,
  setConvertedText,
  isListening,
  handleCopyText,
  setShowClearDialog,
  language,
}: TranscriptionAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (textareaRef.current && isListening) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [displayText, isListening]);

  // Handle Text-to-Speech
  const handleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (!displayText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(displayText);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    // Use selected language for TTS (Bangla supported via bn-BD/bn-IN)
    utterance.lang = language || 'en-US';
    // Try to pick a matching voice if available
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = (language || 'en-US').split('-')[0];
    const voice =
      voices.find(v => v.lang === language) ||
      voices.find(v => v.lang.toLowerCase().startsWith(langPrefix.toLowerCase())) ||
      voices.find(v => v.default) ||
      voices[0];
    if (voice) utterance.voice = voice;
    
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
        <AIToolbar text={displayText} onTextUpdate={setConvertedText} />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="relative overflow-hidden border-0 shadow-2xl rounded-[2rem] bg-white/40 dark:bg-black/20 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 group transition-all duration-500 hover:shadow-primary/5">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative min-h-[60vh] flex flex-col">
            {/* Visualizer at the top, subtle */}
            <div className="h-16 w-full opacity-70">
              <AudioVisualizer isListening={isListening} />
            </div>
            
            <Textarea
              ref={textareaRef}
              value={displayText}
              onChange={(e) => setConvertedText(e.target.value)}
              placeholder="Start speaking or typing..."
              className="flex-1 text-lg md:text-xl resize-none border-0 focus-visible:ring-0 p-8 md:p-10 leading-relaxed placeholder:text-muted-foreground/40 font-normal bg-transparent scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20 transition-colors selection:bg-primary/20 selection:text-primary"
              aria-label="Transcription output"
              aria-live="polite"
              spellCheck={false}
            />

            {/* Floating Action Button for TTS/Copy - visible on hover or when has text */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all"
                      onClick={handleSpeak}
                      disabled={!displayText}
                    >
                      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isPlaying ? "Stop Speaking" : "Read Aloud"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all"
                      onClick={handleCopyText}
                      disabled={!displayText}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy Text</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

               <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground transition-all"
                      onClick={() => setShowClearDialog(true)}
                      disabled={!displayText}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear Text</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
