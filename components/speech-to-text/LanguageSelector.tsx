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
    <Card className="shadow-xl border-white/5 overflow-hidden rounded-2xl md:rounded-3xl bg-white/40 dark:bg-black/20 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10">
      <CardHeader className="pb-3 bg-white/5 py-3 md:py-5 px-4 md:px-6 border-b border-white/5">
        <CardTitle className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 flex items-center gap-2 md:gap-3">
          <Languages className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
          Select Language
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-5">
        <Select
          value={selectedLanguage}
          onValueChange={setSelectedLanguage}
          disabled={isListening}
        >
          <SelectTrigger className="w-full h-12 rounded-xl text-base font-medium bg-background/50 border-white/10 hover:bg-background/80 transition-colors focus:ring-primary/20">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="bg-background/95 backdrop-blur-xl border-white/10">
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code} className="cursor-pointer focus:bg-primary/10 focus:text-primary">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
