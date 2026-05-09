import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import Career from "@/components/home/Career";
import { Projects } from "@/components/home/Projects";
import { Contact } from "@/components/home/Contact";
import { Education } from "@/components/home/Education";
import { Certifications } from "@/components/home/Certifications";
import { Conferences } from "@/components/home/Conferences";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">
      <Navbar />
      <Hero />
      <About />
      <Career />
      <Projects />
      <Education />
      <Certifications />
      <Conferences />
      <Contact />
    </main>
  );
}
