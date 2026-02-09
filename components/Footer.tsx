"use client";

import { FooterBrand } from "./footer/FooterBrand";
import { FooterSection } from "./footer/FooterSection";
import Link from "next/link";

export function Footer() {
  const sections = [
    {
      title: "Product",
      links: [
        { href: "#features", label: "Features" },
        { href: "#", label: "Integrations" },
        { href: "#", label: "Enterprise" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", label: "Documentation" },
        { href: "#", label: "Guidelines" },
        { href: "#", label: "API Reference" },
        { href: "#", label: "Support" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "#", label: "Privacy Policy" },
        { href: "#", label: "Terms of Service" },
        { href: "#", label: "Cookie Policy" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <FooterBrand />
          {sections.map((section) => (
            <FooterSection key={section.title} title={section.title} links={section.links} />
          ))}
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} VoiceFlow Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">System Status</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
