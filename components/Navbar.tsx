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
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-xs"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLinks />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="#tool">
            <Button size="sm" className="rounded-md px-5 font-semibold shadow-xs">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
