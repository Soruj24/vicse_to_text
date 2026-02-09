"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";

interface SessionStatsProps {
  wordCount: number;
  recordingDuration: number;
  confidence: number;
}

export function SessionStats({
  wordCount,
  recordingDuration,
  confidence,
}: SessionStatsProps) {
  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="hidden lg:block shadow-xl border-border/40 overflow-hidden rounded-3xl">
      <CardHeader className="pb-3 bg-secondary/30 py-5 px-6">
        <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 flex items-center gap-3">
          <Timer className="w-4 h-4 text-primary" />
          Session Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium">Word Count</span>
          <Badge
            variant="secondary"
            className="px-4 py-1.5 font-mono text-lg bg-primary/10 text-primary border-none rounded-lg"
          >
            {wordCount}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium">Time</span>
          <span className="font-mono font-bold text-xl">{formatDuration(recordingDuration)}</span>
        </div>
        {confidence > 0 && (
          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Accuracy</span>
              <span className="font-mono font-bold text-primary text-lg">
                {Math.round(confidence * 100)}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out ${
                  confidence > 0.8
                    ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                    : confidence > 0.5
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
