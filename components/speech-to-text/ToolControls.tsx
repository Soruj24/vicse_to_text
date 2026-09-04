import { Button } from "@/components/ui/button";
import { Mic, Square, Download, FileText, FileDown, Search, Maximize, Minimize, Share2, Printer, Mail, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ToolControlsProps {
  isListening: boolean;
  toggleListening: () => void;
  handleSaveText: () => void;
  handleExportPDF: () => void;
  hasText: boolean;
  onOpenFindReplace: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  displayText?: string;
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
  displayText = "",
}: ToolControlsProps) {

  const handleShare = async () => {
    if (!displayText.trim()) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Transcription', text: displayText });
        toast.success("Shared successfully");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(displayText);
      toast.success("Copied to clipboard");
    }
  };

  const handlePrint = () => {
    if (!displayText.trim()) return;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print Transcription</title>');
      printWindow.document.write('</head><body style="font-family: sans-serif; padding: 20px; line-height: 1.6;">');
      printWindow.document.write('<h1 style="border-bottom: 1px solid #ccc; padding-bottom: 10px;">Transcription</h1>');
      printWindow.document.write(`<div style="white-space: pre-wrap;">${displayText}</div>`);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const handleEmail = () => {
    if (!displayText.trim()) return;
    const subject = encodeURIComponent("Transcription");
    const body = encodeURIComponent(displayText.substring(0, 2000));
    window.location.href = `mailto:?subject=${subject}&body=${body}...`;
  };

  return (
    <div className="relative z-10 p-6 md:p-8 bg-card border border-border rounded-xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300">
      
      {/* Recording Status Indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-destructive/10 border border-destructive/20 px-4 py-1.5 rounded-full flex items-center gap-2 z-20 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-red-500 tracking-wide">Recording</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Actions */}
      <div className="flex-1 flex justify-start gap-3 order-2 md:order-1 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <div className="flex items-center gap-1.5 bg-muted/50 p-1.5 rounded-lg border border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={!hasText} className="rounded-md h-8 px-3 gap-1.5 font-medium text-xs hover:bg-muted transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
                <ChevronUp className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44 rounded-lg border border-shadow-lg p-1">
              <DropdownMenuItem onClick={handleSaveText} className="cursor-pointer gap-2 py-1.5 px-2.5 text-xs">
                <FileText className="w-3.5 h-3.5 opacity-70" />
                <span>Text File (.txt)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer gap-2 py-1.5 px-2.5 text-xs">
                <FileDown className="w-3.5 h-3.5 opacity-70" />
                <span>PDF Document (.pdf)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrint} className="cursor-pointer gap-2 py-1.5 px-2.5 text-xs">
                <Printer className="w-3.5 h-3.5 opacity-70" />
                <span>Print</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={!hasText} className="rounded-md h-8 px-3 gap-1.5 font-medium text-xs hover:bg-muted transition-colors">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
                <ChevronUp className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44 rounded-lg border border-shadow-lg p-1">
              <DropdownMenuItem onClick={handleShare} className="cursor-pointer gap-2 py-1.5 px-2.5 text-xs">
                <Share2 className="w-3.5 h-3.5 opacity-70" />
                <span>Share / Copy</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEmail} className="cursor-pointer gap-2 py-1.5 px-2.5 text-xs">
                <Mail className="w-3.5 h-3.5 opacity-70" />
                <span>Email</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Recording Button */}
      <div className="flex-1 flex justify-center order-1 md:order-2 -mt-12 md:-mt-16 z-20">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          {isListening && (
            <>
              <motion.div
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-red-500/20 z-0 blur-lg"
              />
            </>
          )}

          <Button
            size="lg"
            onClick={toggleListening}
            className={`relative z-10 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-sm transition-all duration-300 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20"
                : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
            }`}
          >
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div key="stop" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                  <Square className="w-7 h-7 fill-current" />
                </motion.div>
              ) : (
                <motion.div key="start" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                  <Mic className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>

      {/* Right Actions */}
      <div className="flex-1 flex justify-end gap-3 order-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <div className="flex items-center gap-1.5 bg-muted/50 p-1.5 rounded-lg border border-border">
          <TooltipButton onClick={onOpenFindReplace} icon={<Search className="w-3.5 h-3.5" />} label="Find" disabled={!hasText} tooltip="Find & Replace" />
          <TooltipButton onClick={onToggleFocusMode} icon={isFocusMode ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />} label={isFocusMode ? "Exit" : "Focus"} disabled={false} tooltip={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"} variant={isFocusMode ? "secondary" : "ghost"} />
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
            className={`rounded-md transition-all duration-200 h-8 px-3 gap-1.5 font-medium text-xs ${
              variant === "ghost" ? "hover:bg-muted" : ""
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
