import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="p-6 md:p-8 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-all duration-300">
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
        </div>
        <h3 className="text-lg md:text-xl font-bold mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
}