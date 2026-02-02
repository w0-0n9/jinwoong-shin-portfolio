import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import Career from "@/components/home/Career";
import { Projects } from "@/components/home/Projects";
import { Contact } from "@/components/home/Contact";
import { Education } from "@/components/home/Education";
import { Certifications } from "@/components/home/Certifications";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 relative">
      <BackgroundGrid />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Career />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
}
