"use client";

import { FAQHeader } from "./faq/FAQHeader";
import { FAQList } from "./faq/FAQList";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: "Is it completely free to use?",
      answer: "Yes, we have a free plan that allows you to transcribe for a limited amount of time every month for free.",
    },
    {
      question: "Does it work accurately with the Bengali language?",
      answer: "Absolutely! Our AI model is optimized for Bengali and can understand various regional accents, providing highly accurate transcription.",
    },
    {
      question: "Is my audio data secure?",
      answer: "We take privacy seriously. Your audio is processed directly in your browser, and we never store your audio files on our servers.",
    },
    {
      question: "Can I use it on my mobile phone?",
      answer: "Yes, our website is fully responsive and works perfectly on any smartphone or tablet.",
    },
    {
      question: "How can I edit the transcribed text?",
      answer: "Once the transcription is complete, you can edit the text directly in the text box and use the 'Copy' button to paste it wherever you need.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-secondary/20">
      <div className="container px-4 mx-auto max-w-4xl">
        <FAQHeader />
        <FAQList faqs={faqs} />
      </div>
    </section>
  );
}
