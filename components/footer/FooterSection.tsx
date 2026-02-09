"use client";

import Link from "next/link";

interface FooterSectionProps {
  title: string;
  links: { href: string; label: string }[];
}

export function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div>
      <h4 className="font-semibold mb-6">{title}</h4>
      <ul className="space-y-4 text-sm text-muted-foreground">
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
