"use client";

import { HeroBadge, HeroActions } from "./hero/HeroBadge";

export function Hero() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[5%] w-[60%] md:w-[40%] h-[40%] bg-primary/[0.04] blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[60%] md:w-[40%] h-[40%] bg-primary/[0.04] blur-[100px] rounded-full" />
      </div>

      <div className="section-container text-center">
        <HeroBadge />

        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1] px-4">
          Transform Your Voice into <br className="hidden md:block" />
          <span className="text-primary">Flawless Text</span> Instantly
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed px-4">
          The most accurate, real-time speech-to-text platform for creators,
          professionals, and students. Completely free for everyone.
        </p>

        <HeroActions />

        <div className="mt-20 md:mt-28 pt-10 border-t border-border/50">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8">
            Trusted worldwide by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-20 opacity-40">
            <span className="text-lg md:text-2xl font-bold tracking-tight">TECHCORP</span>
            <span className="text-lg md:text-2xl font-bold tracking-tight">STUDIO</span>
            <span className="text-lg md:text-2xl font-bold tracking-tight">GLOBAL</span>
            <span className="text-lg md:text-2xl font-bold tracking-tight">INNOVATE</span>
          </div>
        </div>
      </div>
    </section>
  );
}