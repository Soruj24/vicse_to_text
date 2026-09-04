"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Replace, Check, X } from "lucide-react";
import { toast } from "sonner";

interface FindReplaceProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  text: string;
  onReplace: (newText: string) => void;
}

export function FindReplace({
  isOpen,
  onOpenChange,
  text,
  onReplace,
}: FindReplaceProps) {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matchCase, setMatchCase] = useState(false);

  const handleReplace = () => {
    if (!findText) {
      toast.error("Please enter text to find");
      return;
    }
    const flags = matchCase ? "g" : "gi";
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
    const matchCount = (text.match(regex) || []).length;
    if (matchCount === 0) {
      toast.info("No matches found");
      return;
    }
    const newText = text.replace(regex, replaceText);
    onReplace(newText);
    toast.success(`Replaced ${matchCount} occurrences`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-xl border border-border shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-md bg-primary/10">
              <Search className="w-5 h-5 text-primary" />
            </div>
            Find & Replace
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="find" className="text-sm text-muted-foreground">Find</Label>
            <div className="relative group">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input id="find" value={findText} onChange={(e) => setFindText(e.target.value)} className="pl-9 bg-background border-border focus:bg-card" placeholder="Text to find..." />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="replace" className="text-sm text-muted-foreground">Replace with</Label>
            <div className="relative group">
              <Replace className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input id="replace" value={replaceText} onChange={(e) => setReplaceText(e.target.value)} className="pl-9 bg-background border-border focus:bg-card" placeholder="Replacement text..." />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="matchCase" checked={matchCase} onCheckedChange={(checked) => setMatchCase(checked as boolean)} />
            <Label htmlFor="matchCase" className="text-sm">Match case</Label>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-lg">Cancel</Button>
          <Button onClick={handleReplace} className="rounded-lg gap-2 shadow-xs">
            <Check className="w-4 h-4" />
            Replace All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
