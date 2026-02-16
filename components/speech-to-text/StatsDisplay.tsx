"use client";

import { motion } from "framer-motion";
import { AlignLeft, Type, Clock, Mic } from "lucide-react";

interface StatsDisplayProps {
  text: string;
}

export function StatsDisplay({ text }: StatsDisplayProps) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const readingTime = Math.ceil(words / 200); // Average reading speed
  const speakingTime = Math.ceil(words / 130); // Average speaking speed

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-3 md:gap-6 text-xs font-medium px-5 py-2.5 bg-white/40 dark:bg-black/20 rounded-full w-fit backdrop-blur-xl border border-white/10 shadow-lg ring-1 ring-black/5 dark:ring-white/10 mx-auto md:mx-0"
    >
      <div className="flex items-center gap-2 text-muted-foreground" title="Total Words">
        <AlignLeft className="w-3.5 h-3.5 text-primary" />
        <span>{words} words</span>
      </div>
      <div className="w-px h-3.5 bg-black/10 dark:bg-white/10 hidden md:block" />
      
      <div className="flex items-center gap-2 text-muted-foreground" title="Total Characters">
        <Type className="w-3.5 h-3.5 text-blue-500" />
        <span>{chars} chars</span>
      </div>
      <div className="w-px h-3.5 bg-black/10 dark:bg-white/10 hidden md:block" />
      
      <div className="flex items-center gap-2 text-muted-foreground" title="Reading Time">
        <Clock className="w-3.5 h-3.5 text-green-500" />
        <span>{readingTime} min read</span>
      </div>
      <div className="w-px h-3.5 bg-black/10 dark:bg-white/10 hidden md:block" />
      
      <div className="flex items-center gap-2 text-muted-foreground" title="Speaking Time">
        <Mic className="w-3.5 h-3.5 text-orange-500" />
        <span>{speakingTime} min speak</span>
      </div>
    </motion.div>
  );
}