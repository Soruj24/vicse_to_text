"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages } from "lucide-react";

export const languages = [
  { code: "en-US", name: "English", flag: "🇺🇸" },
  { code: "bn-BD", name: "Bengali", flag: "🇧🇩" },
  { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
  { code: "es-ES", name: "Spanish", flag: "🇪🇸" },
  { code: "fr-FR", name: "French", flag: "🇫🇷" },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  isListening: boolean;
}

export function LanguageSelector({
  selectedLanguage,
  setSelectedLanguage,
  isListening,
}: LanguageSelectorProps) {
  return (
    <Card className="shadow-xs border border-border overflow-hidden rounded-xl">
      <CardHeader className="pb-2 bg-muted/30 py-3 px-4 border-b border-border">
        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70 flex items-center gap-2">
          <Languages className="w-3 h-3 text-primary" />
          Select Language
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <Select
          value={selectedLanguage}
          onValueChange={setSelectedLanguage}
          disabled={isListening}
        >
          <SelectTrigger className="w-full h-10 rounded-lg text-sm bg-background/50 border border-input hover:bg-background/80 transition-colors focus:ring-primary/20">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border rounded-lg">
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code} className="cursor-pointer focus:bg-accent focus:text-accent-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <span className="font-medium text-sm">{lang.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
