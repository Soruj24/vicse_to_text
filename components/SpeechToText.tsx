"use client";

import { useSpeechToTextManager } from "@/hooks/useSpeechToTextManager";
import { LanguageSelector } from "./speech-to-text/LanguageSelector";
import { SessionStats } from "./speech-to-text/SessionStats";
import { TranscriptionArea } from "./speech-to-text/TranscriptionArea";
import { ToolHeader } from "./speech-to-text/ToolHeader";
import { ToolControls } from "./speech-to-text/ToolControls";
import { BrowserUnsupported } from "./speech-to-text/BrowserUnsupported";
import { ClearDialog } from "./speech-to-text/ClearDialog";

export function SpeechToText() {
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
    toggleListening,
    handleCopyText,
    handleSaveText,
    handleClearText,
  } = useSpeechToTextManager();

  if (!isSupported) {
    return <BrowserUnsupported />;
  }

  return (
    <div className="max-w-6xl mx-auto py-6 md:py-16 px-4 md:px-6" id="tool">
      <ToolHeader />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-10">
        <div className="lg:col-span-1 space-y-4 md:space-y-8">
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
        </div>

        <div className="lg:col-span-3 space-y-5 md:space-y-8">
          <TranscriptionArea
            displayText={displayText}
            setConvertedText={setConvertedText}
            isListening={isListening}
            handleCopyText={handleCopyText}
            setShowClearDialog={setShowClearDialog}
          />

          <ToolControls
            isListening={isListening}
            toggleListening={toggleListening}
            handleSaveText={handleSaveText}
            hasText={!!displayText.trim()}
          />
        </div>
      </div>

      <ClearDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        onConfirm={handleClearText}
      />
    </div>
  );
}
