"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useSpeechToText } from "./useSpeechToText";
import { jsPDF } from "jspdf";

export interface HistoryItem {
  id: string;
  text: string;
  date: string;
  language: string;
}

export function useSpeechToTextManager() {
  const [convertedText, setConvertedText] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-US");
  const [isMounted, setIsMounted] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedText = localStorage.getItem("voice_transcript");
    const savedLang = localStorage.getItem("voice_lang");
    const savedHistory = localStorage.getItem("voice_history");
    
    if (savedText) setConvertedText(savedText);
    if (savedLang) setSelectedLanguage(savedLang);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    setIsMounted(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("voice_transcript", convertedText);
    }
  }, [convertedText, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("voice_lang", selectedLanguage);
    }
  }, [selectedLanguage, isMounted]);

  const addToHistory = useCallback((text: string) => {
    if (!text.trim()) return;
    
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      text,
      date: new Date().toISOString(),
      language: selectedLanguage,
    };
    
    setHistory((prev) => {
      const newHistory = [newItem, ...prev].slice(0, 50); // Keep last 50 items
      localStorage.setItem("voice_history", JSON.stringify(newHistory));
      return newHistory;
    });
    
    toast.success("Saved to history");
  }, [selectedLanguage]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem("voice_history");
    toast.success("History cleared");
  }, []);

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter(item => item.id !== id);
      localStorage.setItem("voice_history", JSON.stringify(newHistory));
      return newHistory;
    });
    toast.success("Item removed from history");
  }, []);

  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [showClearDialog, setShowClearDialog] = useState<boolean>(false);

  const {
    isListening,
    transcript,
    finalTranscript,
    interimTranscript,
    error,
    isSupported,
    confidence,
    toggleListening,
    resetTranscript,
  } = useSpeechToText({ lang: selectedLanguage });

  const displayText = convertedText + interimTranscript;

  // Handle live transcript updates by inserting at cursor position
  useEffect(() => {
    if (finalTranscript) {
      const textarea = document.querySelector('textarea[aria-label="Transcription output"]') as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const after = text.substring(end);
        
        const newText = before + finalTranscript + after;
        setConvertedText(newText);
        
        // Reset transcript in hook to avoid duplicate insertions
        resetTranscript();
        
        // Update cursor position after state update
        setTimeout(() => {
          textarea.focus();
          const newCursorPos = start + finalTranscript.length;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      } else {
        // Fallback for when textarea is not available
        setConvertedText((prev) => prev + finalTranscript);
        resetTranscript();
      }
    }
  }, [finalTranscript, resetTranscript]);

  const wordCount = displayText.split(/\s+/).filter((w) => w.length > 0).length;

  const handleCopyText = useCallback(async (): Promise<void> => {
    const textToCopy = displayText;
    if (!textToCopy.trim()) {
      toast.error("No text to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Text copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  }, [convertedText, transcript]);

  const handleSaveText = useCallback((): void => {
    const textToSave = displayText;
    if (!textToSave.trim()) {
      toast.error("No text to save");
      return;
    }
    const blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded successfully");
    
    // Also add to history when saving
    addToHistory(textToSave);
  }, [displayText, addToHistory]);

  const handleExportPDF = useCallback(() => {
    const textToSave = displayText;
    if (!textToSave.trim()) {
      toast.error("No text to export");
      return;
    }
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text("Transcription", 10, 15);
      
      // Add metadata
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Date: ${new Date().toLocaleString()}`, 10, 22);
      doc.text(`Language: ${selectedLanguage}`, 10, 27);
      
      // Add content
      doc.setFontSize(12);
      doc.setTextColor(0);
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 10;
      const maxWidth = pageWidth - (margin * 2);
      const startY = 35;
      const lineHeight = 7;
      
      const splitText = doc.splitTextToSize(textToSave, maxWidth);
      
      let cursorY = startY;
      
      splitText.forEach((line: string) => {
        if (cursorY + lineHeight > pageHeight - margin) {
          doc.addPage();
          cursorY = margin + 5; // Reset to top of new page
        }
        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
      });
      
      doc.save(`transcript-${new Date().getTime()}.pdf`);
      toast.success("PDF exported successfully");
      
      // Also add to history when exporting
      addToHistory(textToSave);
    } catch (error) {
      console.error(error);
      toast.error("Failed to export PDF");
    }
  }, [displayText, addToHistory, selectedLanguage]);

  const handleClearText = useCallback((): void => {
    if (displayText.trim()) {
      addToHistory(displayText); // Auto-save to history before clearing
    }
    setConvertedText("");
    resetTranscript();
    setShowClearDialog(false);
    toast.success("All text cleared");
  }, [displayText, addToHistory, resetTranscript]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        toggleListening();
      }
      if (e.ctrlKey && e.shiftKey && e.code === "KeyC") {
        e.preventDefault();
        handleCopyText();
      }
      if (e.ctrlKey && e.code === "KeyS") {
        e.preventDefault();
        handleSaveText();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleListening, handleCopyText, handleSaveText]);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening && sessionStartTime) {
      interval = setInterval(() => {
        setRecordingDuration(Date.now() - sessionStartTime);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isListening, sessionStartTime]);

  // Session notifications
  useEffect(() => {
    if (isListening && !sessionStartTime) {
      setSessionStartTime(Date.now());
      toast.info("Recording started", {
        description: "Speak clearly into your microphone.",
      });
    } else if (!isListening && sessionStartTime) {
      setSessionStartTime(null);
      setRecordingDuration(0);
      toast.success("Recording stopped", {
        description: "Your transcript has been saved below.",
      });
    }
  }, [isListening, sessionStartTime]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return {
    convertedText,
    setConvertedText,
    selectedLanguage,
    setSelectedLanguage,
    recordingDuration,
    showClearDialog,
    setShowClearDialog,
    isListening,
    transcript,
    isSupported,
    confidence,
    displayText,
    wordCount,
    history,
    toggleListening,
    handleCopyText,
    handleSaveText,
    handleExportPDF,
    handleClearText,
    addToHistory,
    deleteHistoryItem,
    clearHistory,
  };
}
