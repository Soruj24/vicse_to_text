"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
      <Link href="#tool" className="w-full sm:w-auto">
        <Button size="lg" className="w-full h-14 md:h-20 px-8 md:px-14 text-lg md:text-2xl font-black gap-3 md:gap-4 rounded-2xl md:rounded-3xl shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95">
          Get Started Free <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
        </Button>
      </Link>
      <Link href="#features" className="w-full sm:w-auto">
        <Button size="lg" variant="outline" className="w-full h-14 md:h-20 px-8 md:px-14 text-lg md:text-2xl font-bold rounded-2xl md:rounded-3xl border-2 hover:bg-secondary/50 transition-all">
          How it works?
        </Button>
      </Link>
    </div>
  );
}
