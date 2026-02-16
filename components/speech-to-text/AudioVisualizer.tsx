"use client";

import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isListening: boolean;
}

export function AudioVisualizer({ isListening }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isListening) {
      cleanup();
      return;
    }

    const startVisualization = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        const audioContext = new AudioCtx();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        sourceRef.current = source;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        dataArrayRef.current = dataArray;

        draw();
      } catch (error) {
        console.error("Error accessing microphone for visualizer:", error);
      }
    };

    startVisualization();

    return () => {
      cleanup();
    };
  }, [isListening]);

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!canvas || !analyser || !dataArray) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    animationFrameRef.current = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray as Uint8Array<ArrayBuffer>);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Get current theme colors (simple check for dark mode if needed, or use generic colors that work on both)
    // For a premium look, we'll use a subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#8b5cf6"); // Violet
    gradient.addColorStop(0.5, "#3b82f6"); // Blue
    gradient.addColorStop(1, "#ec4899"); // Pink

    const barWidth = (width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = (dataArray[i] / 255) * height * 0.6; // Scale height

      ctx.fillStyle = gradient;
      
      // Draw smooth rounded bars
      ctx.beginPath();
      // Check if browser supports roundRect, otherwise fallback to fillRect
      if (typeof ctx.roundRect === 'function') {
         ctx.roundRect(x, height / 2 - barHeight / 2, barWidth - 2, barHeight, [10]);
      } else {
         ctx.fillRect(x, height / 2 - barHeight / 2, barWidth - 2, barHeight);
      }
      ctx.fill();

      x += barWidth + 1;
    }
  };

  return (
    <div className={`w-full h-full absolute top-0 left-0 z-0 pointer-events-none transition-all duration-1000 ${isListening ? 'opacity-20' : 'opacity-0'}`}>
      <canvas 
        ref={canvasRef} 
        width={1000} 
        height={400} 
        className="w-full h-full object-cover mix-blend-overlay" 
      />
    </div>
  );
}
