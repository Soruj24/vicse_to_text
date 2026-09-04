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
    <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all duration-300">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-primary text-primary" : "text-muted"
            }`}
          />
        ))}
      </div>
      <p className="text-base mb-6 leading-relaxed text-muted-foreground">
        &ldquo;{content}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary/20">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-sm">{name}</h4>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
