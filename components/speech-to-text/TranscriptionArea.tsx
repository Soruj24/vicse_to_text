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
import { Mic, Copy, Trash2, Volume2, VolumeX, Clock, Type, AlignLeft, ArrowDown } from "lucide-react";
import { AIToolbar } from "./AIToolbar";
import { AudioVisualizer } from "./AudioVisualizer";
import { motion, AnimatePresence } from "framer-motion";

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

  // Calculate stats
  const wordCount = displayText.trim() ? displayText.trim().split(/\s+/).length : 0;
  const charCount = displayText.length;
  const readingTime = Math.ceil(wordCount / 200); // approx 200 wpm

  const [autoScroll, setAutoScroll] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (textareaRef.current && autoScroll) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [displayText, autoScroll]);

  const handleScroll = () => {
    if (!textareaRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = textareaRef.current;
    // Check if user is near bottom (within 50px)
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

    if (!isAtBottom && autoScroll) {
      setAutoScroll(false);
      setShowScrollButton(true);
    } else if (isAtBottom && !autoScroll) {
      setAutoScroll(true);
      setShowScrollButton(false);
    }
  };

  const scrollToBottom = () => {
    setAutoScroll(true);
    setShowScrollButton(false);
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  };

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
          
          <div className="relative h-[60vh] flex flex-col">
            {/* Visualizer at the top, subtle */}
            <div className="h-16 w-full opacity-70 flex-shrink-0">
              <AudioVisualizer isListening={isListening} />
            </div>
            
            <Textarea
              ref={textareaRef}
              value={displayText}
              onChange={(e) => setConvertedText(e.target.value)}
              onScroll={handleScroll}
              placeholder="Start speaking or typing..."
              className="flex-1 h-full text-lg md:text-xl resize-none border-0 focus-visible:ring-0 p-8 md:p-10 pb-40 leading-relaxed placeholder:text-muted-foreground/40 font-normal bg-transparent scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20 transition-colors selection:bg-primary/20 selection:text-primary"
              aria-label="Transcription output"
              aria-live="polite"
              spellCheck={false}
            />

            {/* Scroll to Bottom Button */}
            <AnimatePresence>
              {showScrollButton && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-20 right-6 z-10"
                >
                  <Button
                    size="sm"
                    onClick={scrollToBottom}
                    className="rounded-full h-8 px-3 gap-2 bg-primary/90 hover:bg-primary shadow-lg backdrop-blur-sm text-xs font-medium"
                  >
                    <ArrowDown className="w-3 h-3" />
                    Auto Scroll
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status Bar & Actions */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/40 dark:bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-6 transition-transform duration-300 transform translate-y-0">
              <div className="flex items-center gap-6 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-2" title="Word Count">
                  <AlignLeft className="w-3.5 h-3.5 opacity-70" />
                  <span>{wordCount} words</span>
                </div>
                <div className="flex items-center gap-2" title="Character Count">
                  <Type className="w-3.5 h-3.5 opacity-70" />
                  <span>{charCount} chars</span>
                </div>
                <div className="flex items-center gap-2" title="Estimated Reading Time">
                  <Clock className="w-3.5 h-3.5 opacity-70" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={handleSpeak}
                        disabled={!displayText}
                      >
                        {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{isPlaying ? "Stop Speaking" : "Read Aloud"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="w-px h-4 bg-border mx-1" />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={handleCopyText}
                        disabled={!displayText}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Copy Text</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                        onClick={() => setShowClearDialog(true)}
                        disabled={!displayText}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Clear Text</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
