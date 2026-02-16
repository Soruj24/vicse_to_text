import { Button } from "@/components/ui/button";
import { Mic, Square, Download, FileText, FileDown, Search, Maximize, Minimize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolControlsProps {
  isListening: boolean;
  toggleListening: () => void;
  handleSaveText: () => void;
  handleExportPDF: () => void;
  hasText: boolean;
  onOpenFindReplace: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
}

export function ToolControls({
  isListening,
  toggleListening,
  handleSaveText,
  handleExportPDF,
  hasText,
  onOpenFindReplace,
  isFocusMode,
  onToggleFocusMode,
}: ToolControlsProps) {
  return (
    <div className="relative z-10 p-6 md:p-8 bg-white/40 dark:bg-black/20 border-t border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8 rounded-b-[2.5rem] shadow-2xl mt-[-20px] pt-12 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500">
      
      {/* Recording Status Indicator - Only visible when recording */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-red-500/10 backdrop-blur-md border border-red-500/20 px-6 py-2 rounded-full flex items-center gap-3 z-20 shadow-xl shadow-red-500/5"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-bold text-red-500 tracking-wide uppercase text-[10px]">Recording in progress</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Actions (File Operations) */}
      <div className="flex-1 flex justify-start gap-3 order-2 md:order-1 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <div className="flex items-center gap-2 bg-white/30 dark:bg-black/30 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-sm ring-1 ring-white/5">
          <TooltipButton
            onClick={handleSaveText}
            icon={<FileText className="w-4 h-4" />}
            label="Save TXT"
            disabled={!hasText}
            tooltip="Download as Text"
          />
          <TooltipButton
            onClick={handleExportPDF}
            icon={<FileDown className="w-4 h-4" />}
            label="Export PDF"
            disabled={!hasText}
            tooltip="Download as PDF"
          />
        </div>
      </div>

      {/* Main Recording Button - Center Stage */}
      <div className="flex-1 flex justify-center order-1 md:order-2 -mt-12 md:-mt-16 z-20">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          {/* Pulsing rings when recording */}
          {isListening && (
            <>
              <motion.div
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-red-500/30 z-0 blur-xl"
              />
              <motion.div
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 1.3 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="absolute inset-0 rounded-full bg-red-500/20 z-0 blur-md"
              />
            </>
          )}

          <Button
            size="lg"
            onClick={toggleListening}
            className={`relative z-10 rounded-full w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center gap-2 shadow-2xl transition-all duration-500 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white border-4 border-red-200/20 shadow-red-500/30"
                : "bg-gradient-to-br from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white border-4 border-white/10 shadow-primary/30"
            }`}
          >
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div
                  key="stop"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                >
                  <Square className="w-8 h-8 fill-current" />
                </motion.div>
              ) : (
                <motion.div
                  key="start"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Mic className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold tracking-wider text-muted-foreground pointer-events-none bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 shadow-lg">
            {isListening ? "STOP RECORDING" : "START RECORDING"}
          </div>
        </motion.div>
      </div>

      {/* Right Actions (View/Search) */}
      <div className="flex-1 flex justify-end gap-3 order-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
         <div className="flex items-center gap-2 bg-white/30 dark:bg-black/30 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-sm ring-1 ring-white/5">
          <TooltipButton
            onClick={onOpenFindReplace}
            icon={<Search className="w-4 h-4" />}
            label="Find"
            disabled={!hasText}
            tooltip="Find & Replace"
          />
          <TooltipButton
            onClick={onToggleFocusMode}
            icon={isFocusMode ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            label={isFocusMode ? "Exit" : "Focus"}
            disabled={false}
            tooltip={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
            variant={isFocusMode ? "secondary" : "ghost"}
          />
        </div>
      </div>
    </div>
  );
}

interface TooltipButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  label?: string;
  tooltip: string;
  variant?: "outline" | "ghost" | "secondary" | "default" | "destructive";
}

function TooltipButton({ onClick, disabled, icon, label, tooltip, variant = "ghost" }: TooltipButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            className={`rounded-xl transition-all duration-300 h-9 px-3 gap-2 font-medium text-xs md:text-sm ${
              variant === "ghost" ? "hover:bg-primary/10 hover:text-primary" : ""
            }`}
          >
            {icon}
            {label && <span>{label}</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
