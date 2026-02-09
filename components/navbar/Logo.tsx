"use client";

import Link from "next/link";
import { Mic } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
      <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
        <Mic className="w-5 h-5" />
      </div>
      <span>VoiceFlow</span>
    </Link>
  );
}
