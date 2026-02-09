"use client";

import { HeroBadge } from "./hero/HeroBadge";
import { HeroActions } from "./hero/HeroActions";

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-primary/10 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <HeroBadge />
        
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 md:mb-10 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-[1.1] md:leading-tight px-2">
          Transform Your Voice into <br className="hidden md:block" />
          <span className="text-primary italic">Flawless Text</span> Instantly
        </h1>
        
        <p className="text-base md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 md:mb-16 leading-relaxed px-4">
          The most accurate, real-time speech-to-text platform for creators, 
          professionals, and students. Completely free for everyone.
        </p>
        
        <HeroActions />

        <div className="mt-20 md:mt-32 pt-10 border-t border-border/50">
          <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 mb-10 md:mb-14 uppercase tracking-[0.3em]">Trusted worldwide by</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-20 md:gap-y-12 opacity-30 grayscale contrast-125">
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
