"use client";

import { TestimonialCard } from "./testimonials/TestimonialCard";
import { TestimonialHeader } from "./testimonials/TestimonialHeader";

interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export function Testimonials() {
  const testimonials: TestimonialItem[] = [
    {
      name: "Rakib Hasan",
      role: "Content Creator",
      content: "This website has made my video scripting much easier. The Bengali recognition is amazing!",
      avatar: "https://i.pravatar.cc/150?u=rakib",
      rating: 5,
    },
    {
      name: "Shaila Ahmed",
      role: "Journalist",
      content: "I haven't seen a better tool for transcribing interviews. I get perfectly accurate text every time.",
      avatar: "https://i.pravatar.cc/150?u=shaila",
      rating: 5,
    },
    {
      name: "Tarek Aziz",
      role: "Student",
      content: "This is the best for taking lecture notes. Class lectures turn directly into text, making it so easy to study.",
      avatar: "https://i.pravatar.cc/150?u=tarek",
      rating: 4,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <TestimonialHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
