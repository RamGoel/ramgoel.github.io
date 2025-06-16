'use client'
import { Space_Grotesk } from "next/font/google";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TechSection from "./components/TechSection";

const font= Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function Supermemory() {
  return (
    <div className={`bg-[#1c2027] min-h-screen px-7 py-6 ${font.className}`}>
      <Header />
      <div className="h-screen">
      <Hero />
      </div>
        <TechSection />
    </div>
  );
}