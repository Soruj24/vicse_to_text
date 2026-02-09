"use client";

import { Sparkles } from "lucide-react";

export function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-sm font-bold uppercase tracking-wider mb-6 md:mb-10 animate-fade-in">
      <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
      <span>New: AI-powered transcription engine</span>
    </div>
  );
}
