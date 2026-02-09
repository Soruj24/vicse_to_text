import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export function TestimonialCard({
  name,
  role,
  content,
  avatar,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="p-8 rounded-3xl border border-border bg-secondary/20 hover:bg-secondary/30 transition-all duration-300">
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-primary text-primary" : "text-muted border-muted"
            }`}
          />
        ))}
      </div>
      <p className="text-lg mb-8 italic">
        &ldquo;{content.replace(/"/g, "&ldquo;")}&rdquo;
      </p>
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
