"use client";

import Link from "next/link";

export function NavLinks() {
  const links = [
    { href: "#features", label: "Features" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
