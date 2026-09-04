import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { SpeechToText } from "@/components/SpeechToText";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <section id="tool" className="py-16 md:py-24 bg-background relative">
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
