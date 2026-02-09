"use client";

import { 
  Zap, 
  Shield, 
  Globe, 
  MessageSquare, 
  Keyboard, 
  Layout 
} from "lucide-react";
import { FeatureCard } from "./features/FeatureCard";
import { FeaturesHeader } from "./features/FeaturesHeader";

const features = [
  {
    title: "Real-time Processing",
    description: "Experience lightning-fast transcription as you speak, with minimal latency.",
    icon: Zap,
  },
  {
    title: "High Accuracy",
    description: "Powered by advanced AI for industry-leading recognition accuracy.",
    icon: MessageSquare,
  },
  {
    title: "Multi-language Support",
    description: "Break language barriers with support for over 100 languages and dialects.",
    icon: Globe,
  },
  {
    title: "Privacy First",
    description: "Your data is encrypted and processed securely. We value your privacy.",
    icon: Shield,
  },
  {
    title: "Easy Editing",
    description: "Refine your transcripts with our intuitive built-in editor and formatting tools.",
    icon: Keyboard,
  },
  {
    title: "Modern Interface",
    description: "A clean, distraction-free environment designed for maximum productivity.",
    icon: Layout,
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-6">
        <FeaturesHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
