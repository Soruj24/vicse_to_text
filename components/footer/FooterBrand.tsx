"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";
import { Logo } from "../navbar/Logo";

export function FooterBrand() {
  return (
    <div className="col-span-1">
      <div className="mb-4">
        <Logo />
      </div>
      <p className="text-muted-foreground mb-6 max-w-xs text-sm">
        A powerful platform to transform your ideas into text at the speed of thought.
      </p>
      <div className="flex gap-3">
        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
          <Twitter className="w-4 h-4" />
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
          <Github className="w-4 h-4" />
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
          <Linkedin className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export function FooterSection({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-4 text-sm">{title}</h4>
      <ul className="space-y-3 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
