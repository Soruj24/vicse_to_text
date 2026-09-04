"use client";

import { HeroBadge, HeroActions } from "./hero/HeroBadge";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[50%] md:w-[35%] h-[35%] bg-primary/5 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] md:w-[35%] h-[35%] bg-primary/5 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <HeroBadge />

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 md:mb-8 leading-[1.05] px-2">
          Transform Your Voice into <br className="hidden md:block" />
          <span className="text-primary">Flawless Text</span> Instantly
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed px-4">
          The most accurate, real-time speech-to-text platform for creators,
          professionals, and students. Completely free for everyone.
        </p>

        <HeroActions />

        <div className="mt-16 md:mt-24 pt-8 border-t border-border/50">
          <p className="text-[10px] md:text-xs font-bold text-muted-foreground/50 mb-8 md:mb-10 uppercase tracking-[0.3em]">Trusted worldwide by</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-20 opacity-40">
            <span className="text-xl md:text-3xl font-black tracking-tighter">TECHCORP</span>
            <span className="text-xl md:text-3xl font-black tracking-tighter">STUDIO</span>
            <span className="text-xl md:text-3xl font-black tracking-tighter">GLOBAL</span>
            <span className="text-xl md:text-3xl font-black tracking-tighter">INNOVATE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
