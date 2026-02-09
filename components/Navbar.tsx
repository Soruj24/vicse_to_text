"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./navbar/Logo";
import { NavLinks } from "./navbar/NavLinks";
import { MobileMenu } from "./navbar/MobileMenu";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileMenu />
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLinks />
        </div>

        <div className="flex items-center gap-4">
          <Link href="#tool">
            <Button size="sm" className="rounded-full px-6 font-semibold shadow-md shadow-primary/20">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
