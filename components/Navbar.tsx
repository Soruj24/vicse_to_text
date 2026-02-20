"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./navbar/Logo";
import { NavLinks } from "./navbar/NavLinks";
import { MobileMenu } from "./navbar/MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-border/10 shadow-lg supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileMenu />
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLinks />
        </div>

        <div className="flex items-center gap-4">
          <Link href="#tool">
            <Button size="sm" className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all hover:scale-105 active:scale-95 text-white border-0">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
