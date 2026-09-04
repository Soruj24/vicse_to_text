"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold uppercase tracking-wider mb-8 md:mb-10">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      <span>AI-powered transcription engine</span>
    </div>
  );
}

export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link href="#tool" className="w-full sm:w-auto">
        <Button size="lg" className="w-full h-12 md:h-14 px-8 md:px-14 text-base md:text-lg font-semibold rounded-lg shadow-sm">
          Get Started Free <span className="hidden sm:inline"> →</span>
        </Button>
      </Link>
      <Link href="#features" className="w-full sm:w-auto">
        <Button size="lg" variant="outline" className="w-full h-12 md:h-14 px-8 md:px-14 text-base md:text-lg font-medium rounded-lg border hover:bg-muted transition-colors">
          How it works?
        </Button>
      </Link>
    </div>
  );
}