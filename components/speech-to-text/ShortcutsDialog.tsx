"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard, Command } from "lucide-react";

export function ShortcutsDialog() {
  const shortcuts = [
    { key: "Ctrl + Space", description: "Start / Stop Recording" },
    { key: "Ctrl + Shift + C", description: "Copy Transcript" },
    { key: "Ctrl + S", description: "Save Transcript as TXT" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-xs text-muted-foreground hover:text-foreground rounded-lg px-3">
          <Keyboard className="w-3 h-3" />
          <span className="hidden md:inline">Shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl border border-shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10">
              <Command className="w-4 h-4 text-primary" />
            </div>
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>Use these shortcuts to control the editor quickly.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background/50 px-1.5 font-mono text-[10px] text-muted-foreground shadow-sm">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
