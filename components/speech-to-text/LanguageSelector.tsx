"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages, CheckCircle2 } from "lucide-react";

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
    <Card className="shadow-xl border-border/40 overflow-hidden rounded-2xl md:rounded-3xl">
      <CardHeader className="pb-3 bg-secondary/30 py-3 md:py-5 px-4 md:px-6">
        <CardTitle className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80 flex items-center gap-2 md:gap-3">
          <Languages className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
          Select Language
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-5">
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2.5 pb-2 lg:pb-0 scrollbar-hide snap-x">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={selectedLanguage === lang.code ? "default" : "outline"}
              className={`flex-shrink-0 lg:w-full justify-start gap-3 md:gap-4 h-11 md:h-14 rounded-xl md:rounded-2xl transition-all duration-300 snap-start border-2 ${
                selectedLanguage === lang.code
                  ? "shadow-lg shadow-primary/25 border-primary scale-[1.02]"
                  : "hover:bg-secondary/80 border-transparent bg-secondary/20"
              }`}
              onClick={() => setSelectedLanguage(lang.code)}
              disabled={isListening}
              aria-label={`Select ${lang.name} language`}
              aria-pressed={selectedLanguage === lang.code}
            >
              <span className="text-xl md:text-2xl">{lang.flag}</span>
              <span className="text-sm md:text-base font-semibold">{lang.name}</span>
              {selectedLanguage === lang.code && (
                <CheckCircle2 className="hidden md:block w-4 h-4 text-primary-foreground ml-auto" />
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
