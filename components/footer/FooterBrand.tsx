"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";
import { Logo } from "../navbar/Logo";

export function FooterBrand() {
  return (
    <div className="col-span-1 md:col-span-1">
      <div className="mb-6">
        <Logo />
      </div>
      <p className="text-muted-foreground mb-6 max-w-xs">
        A powerful platform to transform your ideas into text at the speed of thought.
      </p>
      <div className="flex gap-4">
        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors bg-secondary p-2 rounded-full">
          <Twitter className="w-5 h-5" />
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors bg-secondary p-2 rounded-full">
          <Github className="w-5 h-5" />
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors bg-secondary p-2 rounded-full">
          <Linkedin className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
