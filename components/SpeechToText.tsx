"use client";

import { useState } from "react";
import { useSpeechToTextManager } from "@/hooks/useSpeechToTextManager";
import { LanguageSelector } from "./speech-to-text/LanguageSelector";
import { SessionStats } from "./speech-to-text/SessionStats";
import { TranscriptionArea } from "./speech-to-text/TranscriptionArea";
import { ToolHeader } from "./speech-to-text/ToolHeader";
import { ToolControls } from "./speech-to-text/ToolControls";
import { BrowserUnsupported } from "./speech-to-text/BrowserUnsupported";
import { ClearDialog } from "./speech-to-text/ClearDialog";
import { HistorySheet } from "./speech-to-text/HistorySheet";
import { FindReplace } from "./speech-to-text/FindReplace";
import { motion, AnimatePresence } from "framer-motion";

export function SpeechToText() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isFindReplaceOpen, setIsFindReplaceOpen] = useState(false);

  const {
    setConvertedText,
    selectedLanguage,
    setSelectedLanguage,
    recordingDuration,
    showClearDialog,
    setShowClearDialog,
    isListening,
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
  } = useSpeechToTextManager();

  if (!isSupported) {
    return <BrowserUnsupported />;
  }

  return (
    <div className={`max-w-5xl mx-auto px-4 md:px-6 transition-all duration-500 ${isFocusMode ? 'py-4' : 'py-8 md:py-16'}`} id="tool">
      <AnimatePresence>
        {!isFocusMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ToolHeader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`grid grid-cols-1 ${isFocusMode ? 'lg:grid-cols-1' : 'lg:grid-cols-4'} gap-6 md:gap-8`}>
        <AnimatePresence>
          {!isFocusMode && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, width: 0 }}
              className="lg:col-span-1 space-y-4 md:space-y-6"
            >
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                isListening={isListening}
              />

              <SessionStats
                wordCount={wordCount}
                recordingDuration={recordingDuration}
                confidence={confidence}
              />

              <HistorySheet
                history={history}
                onLoad={setConvertedText}
                onDelete={deleteHistoryItem}
                onClear={clearHistory}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          className={`${isFocusMode ? 'lg:col-span-1 max-w-4xl mx-auto w-full' : 'lg:col-span-3'} space-y-5 md:space-y-8 transition-all duration-500`}
        >
          <TranscriptionArea
            displayText={displayText}
            setConvertedText={setConvertedText}
            isListening={isListening}
            handleCopyText={handleCopyText}
            setShowClearDialog={setShowClearDialog}
            language={selectedLanguage}
          />

          <ToolControls
            isListening={isListening}
            toggleListening={toggleListening}
            handleSaveText={handleSaveText}
            handleExportPDF={handleExportPDF}
            hasText={!!displayText.trim()}
            onOpenFindReplace={() => setIsFindReplaceOpen(true)}
            isFocusMode={isFocusMode}
            onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
            displayText={displayText}
          />
        </motion.div>
      </div>

      <ClearDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        onConfirm={handleClearText}
      />

      <FindReplace
        isOpen={isFindReplaceOpen}
        onOpenChange={setIsFindReplaceOpen}
        text={displayText}
        onReplace={setConvertedText}
      />
    </div>
  );
}
