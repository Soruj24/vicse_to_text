"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, Languages, Wand2, FileText, Loader2, Smile, Heart, ThumbsUp, Mail, FileOutput, ChevronDown, ListTodo, Hash, Lightbulb, Zap, MessageSquare, LayoutTemplate, Briefcase, UserCheck, Share2, Heading } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AIToolbarProps {
  text: string;
  onTextUpdate: (newText: string) => void;
}

export function AIToolbar({ text, onTextUpdate }: AIToolbarProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAIAction = async (action: string, promptTemplate: string, isAnalysis: boolean = false) => {
    if (!text.trim()) {
      toast.error("Please record or type some text first!");
      return;
    }

    setIsLoading(action);

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `${promptTemplate}: "${text}"` }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process text");
      }

      if (isAnalysis) {
        toast.message("Analysis Result", { description: data.result, duration: 5000 });
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

  return (
    <motion.div
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      animate="show"
      className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-card border border-border rounded-xl w-fit shadow-xs"
    >
      <div className="flex items-center gap-2 px-2 border-r border-border mr-1">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">AI Tools</span>
      </div>

      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg hover:bg-muted transition-all font-medium text-xs" disabled={!!isLoading}>
              {isLoading?.startsWith("Advanced") ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
              Advanced <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-lg p-1.5 border border-shadow-lg">
            {[
              { key: "Summarize", icon: FileText, label: "Summarize", prompt: "Summarize this text into a concise, easy-to-read paragraph capturing the main points." },
              { key: "Smart Format", icon: LayoutTemplate, label: "Smart Format", prompt: "Reformat this text into a clean, structured document." },
              { key: "Meeting Minutes", icon: Briefcase, label: "Meeting Minutes", prompt: "Format this transcript into professional Meeting Minutes." },
              { key: "Simplify", icon: UserCheck, label: "Simplify (ELI5)", prompt: "Explain this text in simple terms." },
              { key: "Action Items", icon: ListTodo, label: "Extract Action Items", prompt: "Extract a list of actionable items." },
              { key: "Key Points", icon: Lightbulb, label: "Key Points", prompt: "Extract the key points from this text." },
              { key: "Hashtags", icon: Hash, label: "Generate Hashtags", prompt: "Generate relevant hashtags." },
            ].map((item) => (
              <DropdownMenuItem key={item.key} className="rounded-md cursor-pointer focus:bg-accent focus:text-accent-foreground py-1.5 px-3 text-xs font-medium" onClick={() => handleAIAction("Advanced: " + item.key, item.prompt)}>
                <item.icon className="w-3.5 h-3.5 mr-2 opacity-70" />
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg hover:bg-muted transition-all font-medium text-xs" disabled={!!isLoading}>
              {isLoading === "Ask AI" ? <Loader2 className="w-3 h-3 animate-spin" /> : <MessageSquare className="w-3 h-3" />}
              Ask AI
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-xl border border-shadow-lg">
            <DialogHeader>
              <DialogTitle>Ask AI</DialogTitle>
              <DialogDescription>Give any instruction to the AI about your text.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="prompt">Instruction</Label>
                <Input id="prompt" placeholder="e.g., Translate to French..." value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && customPrompt.trim()) { handleAIAction("Ask AI", customPrompt); setIsDialogOpen(false); setCustomPrompt(""); } }} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => { if (customPrompt.trim()) { handleAIAction("Ask AI", customPrompt); setIsDialogOpen(false); setCustomPrompt(""); } }} disabled={!customPrompt.trim()}>Send Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg hover:bg-muted transition-all font-medium text-xs" onClick={() => handleAIAction("Grammar Fix", "Fix the grammar and punctuation of this text.")} disabled={!!isLoading}>
          {isLoading === "Grammar Fix" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
          Fix Grammar
        </Button>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg hover:bg-muted transition-all font-medium text-xs" onClick={() => handleAIAction("Polish", "Make this text sound more professional.")} disabled={!!isLoading}>
          {isLoading === "Polish" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          Polish
        </Button>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg hover:bg-muted transition-all font-medium text-xs" disabled={!!isLoading}>
              {isLoading?.startsWith("Translate") ? <Loader2 className="w-3 h-3 animate-spin" /> : <Languages className="w-3 h-3" />}
              Translate <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 rounded-lg p-1.5 border border-shadow-lg">
            {["English", "Spanish", "French", "German", "Bengali", "Hindi"].map((lang) => (
              <DropdownMenuItem key={lang} className="rounded-md cursor-pointer focus:bg-accent focus:text-accent-foreground py-1.5 px-3 text-xs" onClick={() => handleAIAction("Translate to " + lang, `Translate this text to ${lang}`)}>
                {lang}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg hover:bg-muted transition-all font-medium text-xs" disabled={!!isLoading}>
              {isLoading === "Summarize" ? <Loader2 className="w-3 h-3 animate-spin" /> : <FileText className="w-3 h-3" />}
              More <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-lg p-1.5 border border-shadow-lg">
            {[
              { key: "Summarize", icon: FileOutput, label: "Summarize" },
              { key: "Email", icon: Mail, label: "Format as Email" },
              { key: "Sentiment", icon: Heart, label: "Analyze Sentiment" },
              { key: "Social Post", icon: Share2, label: "Create Social Post" },
              { key: "Title Ideas", icon: Heading, label: "Generate Titles" },
            ].map((item) => (
              <DropdownMenuItem key={item.key} className="rounded-md cursor-pointer focus:bg-accent focus:text-accent-foreground py-1.5 px-3 text-xs" onClick={() => handleAIAction(item.key, item.label)}>
                <item.icon className="w-3.5 h-3.5 mr-2 opacity-70" />
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </motion.div>
  );
}
