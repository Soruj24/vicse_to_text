"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Trash2, RotateCcw, Copy, Calendar, Clock } from "lucide-react";
import { HistoryItem } from "@/hooks/useSpeechToTextManager";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface HistorySheetProps {
  history: HistoryItem[];
  onLoad: (text: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export function HistorySheet({
  history,
  onLoad,
  onDelete,
  onClear,
}: HistorySheetProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full h-14 gap-3 rounded-lg border-2 border-border hover:border-primary/30 text-base font-semibold shadow-xs transition-all group bg-card hover:bg-muted/50">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <History className="w-5 h-5 text-primary" />
          </div>
          <span>View History</span>
          <Badge variant="secondary" className="ml-auto bg-muted group-hover:bg-accent transition-colors">
            {history.length}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[540px] border-l border-border bg-popover p-0">
        <SheetHeader className="px-6 py-6 border-b border-border space-y-1">
          <SheetTitle className="flex items-center justify-between text-xl font-bold">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <History className="w-5 h-5 text-primary" />
              </div>
              Transcript History
            </div>
            {history.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onClear}
                className="h-8 px-3 text-xs rounded-lg opacity-80 hover:opacity-100 transition-opacity"
              >
                Clear All
              </Button>
            )}
          </SheetTitle>
          <SheetDescription className="text-muted-foreground pl-[52px]">
            Your recent transcriptions are saved here locally.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-140px)] px-6">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4 p-8">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <History className="w-10 h-10 text-muted-foreground/40" />
              </div>
              <h3 className="text-lg font-semibold">No History Yet</h3>
              <p className="text-sm text-muted-foreground max-w-[250px]">
                Start recording or typing to automatically save your transcripts here.
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-6">
              <AnimatePresence mode="popLayout">
                {history.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative p-5 rounded-xl border border-border bg-card hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Badge variant="outline" className="rounded-md px-2 py-0 h-6 border-primary/20 bg-primary/5 text-primary font-normal">
                          {item.language}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 opacity-60" />
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 opacity-60" />
                          {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-lg hover:bg-muted"
                          onClick={() => handleCopy(item.text)}
                          title="Copy to Clipboard"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => onDelete(item.id)}
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <p className="text-sm leading-relaxed text-foreground/90 line-clamp-3 font-medium group-hover:line-clamp-none transition-all duration-300">
                        {item.text}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4 h-9 rounded-lg text-xs font-medium bg-muted hover:bg-primary hover:text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300"
                      onClick={() => onLoad(item.text)}
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-2" />
                      Load to Editor
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
