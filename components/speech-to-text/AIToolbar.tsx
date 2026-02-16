"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, Languages, Wand2, FileText, Loader2, Smile, Heart, ThumbsUp, Mail, FileOutput, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface AIToolbarProps {
  text: string;
  onTextUpdate: (newText: string) => void;
}

export function AIToolbar({ text, onTextUpdate }: AIToolbarProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAIAction = async (action: string, promptTemplate: string, isAnalysis: boolean = false) => {
    if (!text.trim()) {
      toast.error("Please record or type some text first!");
      return;
    }

    setIsLoading(action);
    
    try {
      // Simulate progress or just wait for response
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${promptTemplate}: "${text}"`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process text");
      }

      if (isAnalysis) {
          // For analysis (like sentiment), we don't replace the text, we just show it
          toast.message("Analysis Result", {
            description: data.result,
            duration: 5000,
          });
      } else {
          onTextUpdate(data.result);
          toast.success(`${action} completed successfully!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process with AI. Please try again.");
    } finally {
      setIsLoading(null);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-white/40 dark:bg-black/20 border border-white/10 rounded-2xl backdrop-blur-xl w-fit shadow-lg ring-1 ring-black/5 dark:ring-white/10"
    >
      <div className="flex items-center gap-2 px-2 border-r border-black/5 dark:border-white/10 mr-1">
        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">AI Tools</span>
      </div>

      <motion.div variants={item}>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-2 rounded-xl hover:bg-primary/10 hover:text-primary transition-all font-medium text-xs md:text-sm active:scale-95"
          onClick={() => handleAIAction("Grammar Fix", "Fix the grammar and punctuation of this text, keeping the same language and tone")}
          disabled={!!isLoading}
        >
          {isLoading === "Grammar Fix" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Wand2 className="w-3.5 h-3.5" />
          )}
          Fix Grammar
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-2 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 transition-all font-medium text-xs md:text-sm active:scale-95"
          onClick={() => handleAIAction("Polish", "Make this text sound more professional and polished")}
          disabled={!!isLoading}
        >
          {isLoading === "Polish" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          Polish
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-2 rounded-xl hover:bg-green-500/10 hover:text-green-500 transition-all font-medium text-xs md:text-sm active:scale-95"
              disabled={!!isLoading}
            >
              {isLoading?.startsWith("Translate") ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Languages className="w-3.5 h-3.5" />
              )}
              Translate <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
            {["English", "Spanish", "French", "German", "Bengali", "Hindi"].map((lang) => (
              <DropdownMenuItem 
                key={lang}
                onClick={() => handleAIAction(`Translate to ${lang}`, `Translate this text to ${lang}`)}
                className="rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary py-2 px-3 text-sm font-medium transition-colors"
              >
                {lang}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <motion.div variants={item}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-2 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 transition-all font-medium text-xs md:text-sm active:scale-95"
              disabled={!!isLoading}
            >
              {isLoading === "Summarize" || isLoading === "Email" || isLoading === "Sentiment" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FileText className="w-3.5 h-3.5" />
              )}
              More <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
            <DropdownMenuItem 
              className="rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary py-2 px-3 text-sm font-medium transition-colors"
              onClick={() => handleAIAction("Summarize", "Summarize this text in a concise bulleted list")}
            >
              <FileOutput className="w-4 h-4 mr-2 opacity-70" />
              Summarize
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary py-2 px-3 text-sm font-medium transition-colors"
              onClick={() => handleAIAction("Email", "Convert this text into a professional email format")}
            >
              <Mail className="w-4 h-4 mr-2 opacity-70" />
              Format as Email
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary py-2 px-3 text-sm font-medium transition-colors"
              onClick={() => handleAIAction("Sentiment", "Analyze the sentiment of this text (Positive, Negative, or Neutral) and give a very brief 1-sentence explanation", true)}
            >
              <Heart className="w-4 h-4 mr-2 opacity-70" />
              Analyze Sentiment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </motion.div>
  );
}
