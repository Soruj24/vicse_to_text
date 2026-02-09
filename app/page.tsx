import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { SpeechToText } from "@/components/SpeechToText";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <section id="tool" className="py-24 bg-background relative">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_left_-20px] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative">
          <SpeechToText />
        </div>
      </section>
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
