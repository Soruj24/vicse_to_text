"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Simple toast functions if your toast library isn't working
const toastSuccess = (message: string) => {
  console.log("✅", message);
  // You can replace this with your actual toast implementation
};

const toastError = (message: string) => {
  console.error("❌", message);
  // You can replace this with your actual toast implementation
};

const toastWarning = (message: string) => {
  console.warn("⚠️", message);
  // You can replace this with your actual toast implementation
};

const toastInfo = (message: string) => {
  console.info("ℹ️", message);
  // You can replace this with your actual toast implementation
};

// Simple speech recognition hook
const useSpeechToText = (options: { lang: string }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [confidence, setConfidence] = useState(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isStartingRef = useRef(false);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    if (typeof window === "undefined") {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setError("Speech recognition is not supported in this browser");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = options.lang;

      // Use addEventListener to avoid TypeScript complaints about nonexistent .on* properties
      recognition.addEventListener("start", () => {
        setIsListening(true);
        isStartingRef.current = false;
        setError("");
        console.log("Speech recognition started");
      });

      recognition.addEventListener("result", (e: Event) => {
        const event = e as SpeechRecognitionEvent;
        let interim = "";
        let final = "";
        let highestConfidence = 0;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = (
            event.results[i][0] as SpeechRecognitionAlternative
          ).transcript;
          const confidence = (
            event.results[i][0] as SpeechRecognitionAlternative
          ).confidence;

          if (confidence > highestConfidence) {
            highestConfidence = confidence;
          }

          if (event.results[i].isFinal) {
            final += transcript + " ";
          } else {
            interim += transcript;
          }
        }

        setConfidence(highestConfidence);

        if (final) {
          setFinalTranscript((prev) => prev + final);
          setInterimTranscript("");
        } else {
          setInterimTranscript(interim);
        }
      });

      recognition.addEventListener("error", (e: Event) => {
        const event = e as SpeechRecognitionErrorEvent;
        console.error("Speech recognition error:", event.error);
        let errorMessage = "";

        switch (event.error) {
          case "not-allowed":
          case "permission-denied":
            errorMessage =
              "Microphone permission denied. Please allow microphone access.";
            break;
          case "audio-capture":
            errorMessage = "No microphone found. Please check your microphone.";
            break;
          case "network":
            errorMessage =
              "Network error occurred. Please check your internet connection.";
            break;
          case "no-speech":
            errorMessage = "No speech detected. Please try speaking again.";
            break;
          default:
            errorMessage = `Error: ${event.error}`;
        }

        setError(errorMessage);
        setIsListening(false);
        isStartingRef.current = false;
      });

      recognition.addEventListener("end", () => {
        setIsListening(false);
        isStartingRef.current = false;
        console.log("Speech recognition ended");
      });
    } catch (err) {
      console.error("Failed to initialize speech recognition:", err);
      setIsSupported(false);
      setError("Failed to initialize speech recognition");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [options.lang]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError("Speech recognition not initialized");
      return;
    }

    if (!isListening && !isStartingRef.current) {
      isStartingRef.current = true;
      try {
        recognitionRef.current.start();
        console.log("Starting speech recognition...");
      } catch (err) {
        console.error("Error starting recognition:", err);
        setError("Failed to start speech recognition");
        isStartingRef.current = false;
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        console.log("Stopping speech recognition...");
      } catch (err) {
        console.error("Error stopping recognition:", err);
      }
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setFinalTranscript("");
    setInterimTranscript("");
    setError("");
    setConfidence(0);
  }, []);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    isListening,
    transcript: finalTranscript + interimTranscript,
    finalTranscript,
    interimTranscript,
    error,
    isSupported,
    confidence,
    startListening,
    stopListening,
    toggleListening: () => {
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    },
    resetTranscript,
    clearError,
  };
};

export default function SpeechToText() {
  const [convertedText, setConvertedText] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-US");
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [showClearDialog, setShowClearDialog] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const {
    isListening,
    transcript,
    finalTranscript,
    interimTranscript,
    error,
    isSupported,
    confidence,
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
    clearError,
  } = useSpeechToText({
    lang: selectedLanguage,
  });

  // Timer effect for recording duration
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

  // Start/stop session time tracking
  useEffect(() => {
    if (isListening && !sessionStartTime) {
      setSessionStartTime(Date.now());
      setIsProcessing(true);
      toastInfo("🎤 Recording started! Speak now...");
    } else if (!isListening && sessionStartTime) {
      setSessionStartTime(null);
      setRecordingDuration(0);
      if (finalTranscript) {
        toastSuccess("✓ Recording completed!");
      }
      setTimeout(() => setIsProcessing(false), 1000);
    }
  }, [isListening, sessionStartTime, finalTranscript]);

  // Handle errors with user-friendly messages
  useEffect(() => {
    if (error) {
      if (error.includes("permission") || error.includes("microphone")) {
        toastError("Please allow microphone access in your browser settings");
      } else if (error.includes("network")) {
        toastError("Network error. Please check your internet connection");
      } else {
        toastError(error);
      }
    }
  }, [error]);

  const handleCopyText = async (): Promise<void> => {
    const textToCopy = convertedText || transcript;

    if (!textToCopy.trim()) {
      toastError("No text to copy!");
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      toastSuccess(`✓ ${textToCopy.length} characters copied!`);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toastError("Failed to copy text!");
    }
  };

  const handleClearText = (): void => {
    if (!convertedText && !transcript) {
      toastInfo("No text to clear!");
      return;
    }

    setConvertedText("");
    resetTranscript();
    setShowClearDialog(false);
    toastSuccess("✓ All text cleared!");
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setConvertedText(e.target.value);
  };

  const handleSaveText = (): void => {
    const textToSave = convertedText || transcript;

    if (!textToSave.trim()) {
      toastError("No text to save!");
      return;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `voice-to-text-${timestamp}.txt`;

    const blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toastSuccess(`✓ ${filename} downloaded!`);
  };

  const handleUndo = (): void => {
    const currentText = convertedText || finalTranscript;
    if (!currentText) {
      toastInfo("Nothing to undo!");
      return;
    }

    const words = currentText.trim().split(/\s+/);
    if (words.length > 0) {
      words.pop();
      const newText = words.join(" ") + (words.length > 0 ? " " : "");
      setConvertedText(newText);
      toastSuccess("Last word removed!");
    }
  };

  const handleLanguageChange = (lang: string): void => {
    if (isListening) {
      toastWarning("Please stop recording before changing language!");
      return;
    }
    setSelectedLanguage(lang);
    resetTranscript();
    setConvertedText("");
    toastSuccess(`Language changed to ${getLanguageName(lang)}`);
  };

  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getLanguageName = (code: string): string => {
    return languages.find((lang) => lang.code === code)?.name || code;
  };

  const displayText = convertedText || transcript;
  const characterCount = displayText.length;
  const wordCount = displayText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const sentenceCount = displayText
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim().length > 0).length;

  const languages = [
    { code: "en-US", name: "English", flag: "🇺🇸" },
    { code: "bn-BD", name: "বাংলা", flag: "🇧🇩" },
    { code: "hi-IN", name: "हिन्दी", flag: "🇮🇳" },
    { code: "es-ES", name: "Español", flag: "🇪🇸" },
    { code: "fr-FR", name: "Français", flag: "🇫🇷" },
  ];

  // Browser support check
  if (isSupported === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full shadow-xl border-2 border-red-300">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-3xl">
                ⚠️
              </div>
            </div>
            <CardTitle className="text-2xl text-red-600">
              Browser Not Supported
            </CardTitle>
            <CardDescription className="text-lg">
              Your browser doesn&apos;t support speech recognition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center">
              <p className="text-gray-700">
                This feature requires a modern browser with Web Speech API
                support.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <h3 className="font-semibold mb-2">✅ Supported Browsers:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Google Chrome (recommended)</li>
                  <li>• Microsoft Edge</li>
                  <li>• Safari 14.1+ (macOS/iOS)</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-left border-l-4 border-yellow-400">
                <h3 className="font-semibold mb-2">🔧 Quick Fixes:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Use Chrome or Edge for best results</li>
                  <li>• Ensure you are using HTTPS</li>
                  <li>• Check browser permissions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4">
      <TooltipProvider>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Card */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-4">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg">
                  <div className="text-5xl">🎤</div>
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Voice to Text Converter
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Convert your voice to text - Advanced Speech Recognition
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Main Control Card */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="space-y-6 p-6">
              {/* Language Selector */}
              <div className="flex flex-wrap justify-center gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    variant={
                      selectedLanguage === lang.code ? "default" : "outline"
                    }
                    size="sm"
                    className={`transition-all duration-200 ${
                      selectedLanguage === lang.code
                        ? "shadow-md scale-105"
                        : "hover:scale-105"
                    }`}
                    disabled={isListening}
                  >
                    {lang.flag} {lang.name}
                  </Button>
                ))}
              </div>

              {/* Status Bar */}
              <div className="flex flex-wrap justify-center items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                <Badge
                  variant={isListening ? "default" : "secondary"}
                  className={`text-base px-5 py-2.5 transition-all duration-300 ${
                    isListening
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 animate-pulse shadow-lg"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {isListening ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
                      🎙️ Recording... {formatDuration(recordingDuration)}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      ⚫ Ready to Listen
                    </span>
                  )}
                </Badge>

                {interimTranscript && (
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 border-yellow-300 text-base px-5 py-2.5 animate-pulse"
                  >
                    🔄 Processing...
                  </Badge>
                )}

                {confidence > 0 && (
                  <Badge
                    variant="outline"
                    className={`text-base px-5 py-2.5 ${
                      confidence > 0.7
                        ? "bg-green-100 text-green-800 border-green-300"
                        : confidence > 0.4
                        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                        : "bg-red-100 text-red-800 border-red-300"
                    }`}
                  >
                    📊 Confidence: {Math.round(confidence * 100)}%
                  </Badge>
                )}
              </div>

              {/* Main Control Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  onClick={toggleListening}
                  variant={isListening ? "destructive" : "default"}
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                >
                  {isListening ? (
                    <span className="flex items-center gap-3">
                      ⏹️ Stop Recording
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      🎤 Start Recording
                    </span>
                  )}
                </Button>

                <Button
                  onClick={handleCopyText}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg bg-white"
                  disabled={!displayText}
                >
                  📋 Copy
                </Button>

                <Button
                  onClick={handleSaveText}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg bg-white"
                  disabled={!displayText}
                >
                  💾 Download
                </Button>

                <Button
                  onClick={handleUndo}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg bg-white"
                  disabled={!displayText}
                >
                  ↩️ Undo
                </Button>

                <Button
                  onClick={() => setShowClearDialog(true)}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg bg-white text-red-600 hover:text-red-700 hover:border-red-300"
                  disabled={!displayText}
                >
                  🗑️ Clear
                </Button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-md flex items-start gap-3">
                  <div className="text-2xl">⚠️</div>
                  <div className="flex-1">
                    <strong className="font-semibold">Error: </strong>
                    <span>{error}</span>
                    <div className="mt-2 text-sm">
                      {error.includes("permission") && (
                        <p>• Check browser microphone permissions</p>
                      )}
                      {error.includes("microphone") && (
                        <p>• Ensure microphone is connected and working</p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={clearError}
                    variant="ghost"
                    size="sm"
                    className="text-red-700 hover:text-red-900"
                  >
                    ✕
                  </Button>
                </div>
              )}

              {/* Help Text for First Time Users */}
              {!isListening && !transcript && !error && (
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-6 py-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <strong>Tip:</strong> Click Start Recording and allow
                      microphone access when prompted. Speak clearly into your
                      microphone to see text appear here.
                    </div>
                  </div>
                </div>
              )}

              {/* Transcript Display */}
              <div className="space-y-5">
                {/* Live Preview */}
                {interimTranscript && (
                  <div className="space-y-3 bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></span>
                      🔊 Live Preview (Processing...)
                    </label>
                    <div className="text-xl text-gray-700 italic min-h-[40px] p-3 bg-white rounded-lg">
                      {interimTranscript}
                    </div>
                  </div>
                )}

                {/* Final Transcript */}
                {finalTranscript && (
                  <div className="space-y-3 bg-green-50 p-4 rounded-xl border-2 border-green-200">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      ✅ Final Transcript (Confirmed)
                    </label>
                    <Textarea
                      value={finalTranscript}
                      readOnly
                      className="min-h-[120px] text-lg border-0 bg-white shadow-sm resize-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}

                {/* Editable Area */}
                <div className="space-y-3 bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      ℹ️ Editable Text Area
                    </label>
                    <Badge
                      variant="outline"
                      className="bg-purple-100 text-purple-700 border-purple-300"
                    >
                      ✏️ You can edit this
                    </Badge>
                  </div>
                  <Textarea
                    value={convertedText || transcript}
                    onChange={handleTextChange}
                    placeholder="Your converted text will appear here... You can edit it directly."
                    className="min-h-[180px] text-lg border-0 bg-white shadow-sm resize-y focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md">
                  <CardContent className="p-5 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {characterCount}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      Characters
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md">
                  <CardContent className="p-5 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {wordCount}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      Words
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-md">
                  <CardContent className="p-5 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {sentenceCount}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      Sentences
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-md">
                  <CardContent className="p-5 text-center">
                    <div
                      className={`text-4xl mb-1 ${
                        isListening ? "animate-pulse" : ""
                      }`}
                    >
                      {isListening ? "🎙️" : "✅"}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {isListening ? "Recording" : "Ready"}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Clear Confirmation Dialog */}
          <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear All Text?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your transcribed text. This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearText}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Instructions */}
          <Card className="shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">📝 How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
                      1
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Allow Microphone Access
                      </p>
                      <p className="text-sm text-gray-600">
                        Click Allow when browser asks for microphone permission
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Start Speaking
                      </p>
                      <p className="text-sm text-gray-600">
                        Speak clearly into your microphone after starting
                        recording
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-purple-50 p-3 rounded-lg">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Review & Edit
                      </p>
                      <p className="text-sm text-gray-600">
                        Check the transcribed text and make corrections if
                        needed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-orange-50 p-3 rounded-lg">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
                      4
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Save Your Work
                      </p>
                      <p className="text-sm text-gray-600">
                        Copy or download the text for later use
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TooltipProvider>
    </div>
  );
}
