import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-background border border-border/40 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group">
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
        <Icon className="w-7 h-7 md:w-10 md:h-10 text-primary" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </div>
  );
}
