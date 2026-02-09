"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export const useSpeechToText = (options: { lang: string }) => {
  const [isListening, setIsListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [confidence, setConfidence] = useState(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isStartingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsSupported(false);
      return;
    }

    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      setIsSupported(false);
      setError("Speech recognition is not supported in this browser");
      return;
    }

    try {
      const recognition = new SpeechRecognitionConstructor() as SpeechRecognition;
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = options.lang;

      recognition.addEventListener("start", () => {
        setIsListening(true);
        isStartingRef.current = false;
        setError("");
      });

      recognition.addEventListener("result", (event: Event) => {
        const recognitionEvent = event as SpeechRecognitionEvent;
        let interim = "";
        let final = "";
        let highestConfidence = 0;

        for (let i = recognitionEvent.resultIndex; i < recognitionEvent.results.length; i++) {
          const result = recognitionEvent.results[i];
          const transcript = result[0].transcript;
          const currentConfidence = result[0].confidence;

          if (currentConfidence > highestConfidence) {
            highestConfidence = currentConfidence;
          }

          if (result.isFinal) {
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

      recognition.addEventListener("error", (event: Event) => {
        const errorEvent = event as SpeechRecognitionErrorEvent;
        let errorMessage = "";
        switch (errorEvent.error) {
          case "not-allowed":
          case "permission-denied":
            errorMessage = "Microphone permission denied.";
            break;
          case "audio-capture":
            errorMessage = "No microphone found.";
            break;
          case "network":
            errorMessage = "Network error occurred.";
            break;
          case "no-speech":
            errorMessage = "No speech detected.";
            break;
          default:
            errorMessage = `Error: ${errorEvent.error}`;
        }
        setError(errorMessage);
        setIsListening(false);
        isStartingRef.current = false;
      });

      recognition.addEventListener("end", () => {
        setIsListening(false);
        isStartingRef.current = false;
      });
    } catch (err) {
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
    if (!recognitionRef.current) return;
    if (!isListening && !isStartingRef.current) {
      isStartingRef.current = true;
      try {
        recognitionRef.current.start();
      } catch (err) {
        setError("Failed to start speech recognition");
        isStartingRef.current = false;
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setFinalTranscript("");
    setInterimTranscript("");
    setError("");
    setConfidence(0);
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
      if (isListening) stopListening();
      else startListening();
    },
    resetTranscript,
  };
};
