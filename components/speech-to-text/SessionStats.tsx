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
    <Card className="shadow-xs border border-border overflow-hidden rounded-xl">
      <CardHeader className="pb-2 py-3 px-4 border-b border-border">
        <CardTitle className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-2">
          <Timer className="w-3 h-3 text-primary" />
          Session Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Word Count</span>
          <Badge variant="secondary" className="px-3 py-1 font-mono text-base bg-primary/10 text-primary border-none rounded-md">
            {wordCount}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Time</span>
          <span className="font-mono font-semibold text-sm">{formatDuration(recordingDuration)}</span>
        </div>
        {confidence > 0 && (
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Accuracy</span>
              <span className="font-mono font-semibold text-sm text-success">{Math.round(confidence * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out rounded-full ${
                  confidence > 0.8 ? "bg-success shadow-success/20" : confidence > 0.5 ? "bg-warning" : "bg-destructive"
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
