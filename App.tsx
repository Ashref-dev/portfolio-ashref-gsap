import { Header } from "./components/Header";
import { HeroManifesto } from "./components/HeroManifesto";
import { HeroIdentity } from "./components/HeroIdentity";
import { ProcessTicker } from "./components/ProcessTicker";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Testimonials } from "./components/Testimonials";
import { Blog } from "./components/Blog";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="bg-neutral-950 min-h-screen">
      <style>{`
        :root {
          --font-serif: 'Instrument Serif', serif;
          --font-sans: 'Inter', sans-serif;
        }

        .font-serif { font-family: var(--font-serif); }
        .font-sans { font-family: var(--font-sans); }
        
        html {
           scroll-behavior: auto !important; 
        }
      `}</style>

      {/* Global Header */}
      <Header />

      {/* Main Content Wrapper - Slides over the footer */}
      <main className="relative z-10 bg-white shadow-2xl mb-[85vh]">
        {/* 1. Hero Manifesto (Clean Intro) */}
        <HeroManifesto />

        {/* 2. Projects Gallery (Horizontal) */}
        <Projects />

        {/* 3. Hero Identity (Dark Mode Transition) */}
        <HeroIdentity />

        {/* 4. Process Ticker (Horizontal Story) */}
        <ProcessTicker />

        {/* 5. About Me (Bio, Stats, Tech) */}
        <About />

        {/* 6. Services (Grid) */}
        <Services />

        {/* 7. Experience (Timeline) */}
        <Experience />

        {/* 8. Testimonials */}
        <Testimonials />

        {/* 9. Blog */}
        <Blog />
      </main>

      {/* Global Footer - Fixed at the bottom */}
      <div className="fixed bottom-0 left-0 w-full h-[85vh] z-0">
        <Footer />
      </div>
    </div>
  );
}
