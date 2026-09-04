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
      <a href="#tool" className="skip-link">
        Skip to tool
      </a>
      <Navbar />
      <Hero />
      <section id="tool" className="section-spacing bg-background relative">
        <div className="section-container relative">
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