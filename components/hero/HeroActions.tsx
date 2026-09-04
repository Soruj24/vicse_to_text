"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
      <Link href="#tool" className="w-full sm:w-auto">
        <Button size="lg" className="w-full h-14 md:h-20 px-8 md:px-14 text-lg md:text-2xl font-bold gap-3 md:gap-4 rounded-lg shadow-sm hover:shadow-md transition-all">
          Get Started Free <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
        </Button>
      </Link>
      <Link href="#features" className="w-full sm:w-auto">
        <Button size="lg" variant="outline" className="w-full h-14 md:h-20 px-8 md:px-14 text-lg md:text-2xl font-semibold rounded-lg border hover:bg-muted transition-colors">
          How it works?
        </Button>
      </Link>
    </div>
  );
}
