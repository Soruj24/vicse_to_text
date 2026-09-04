"use client";

import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isListening: boolean;
}

export function AudioVisualizer({ isListening }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isListening) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const barCount = 32;
      const barWidth = width / barCount;
      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.random() * height * 0.6;
        const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.3)");
        gradient.addColorStop(1, "rgba(99, 102, 241, 0.05)");
        ctx.fillStyle = gradient;
        const x = i * barWidth;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, height - barHeight, barWidth - 1, barHeight, [2]);
        } else {
          ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
        }
        ctx.fill();
      }
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [isListening]);

  return (
    <div className="w-full h-full absolute top-0 left-0 z-0 pointer-events-none opacity-40">
      <canvas ref={canvasRef} width={800} height={160} className="w-full h-full" />
    </div>
  );
}
