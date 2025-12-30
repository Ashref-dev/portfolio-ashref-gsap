import { Header } from './components/Header';
import { HeroManifesto } from './components/HeroManifesto';
import { HeroIdentity } from './components/HeroIdentity';
import { ProcessTicker } from './components/ProcessTicker';
import { About } from './components/About';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { Divider } from './components/Divider';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className='bg-neutral-950 min-h-screen'>
      <style>{`
        :root {
          --font-serif: 'Instrument Serif', serif;
          --font-sans: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        .font-serif { font-family: var(--font-serif); }
        .font-sans { font-family: var(--font-sans); }
        .font-mono { font-family: var(--font-mono); }
        
        html {
           scroll-behavior: auto !important; 
        }
      `}</style>

      {/* Global Header */}
      <Header />

      {/* 1. Hero Manifesto (Clean Intro) */}
      <HeroManifesto />

      {/* 2. Hero Identity (Dark Mode Transition) */}
      <HeroIdentity />

      {/* 3. Process Ticker (Horizontal Story) */}
      <ProcessTicker />

      {/* 4. About Me (Bio, Stats, Tech) */}
      <About />

      {/* 5. Services (Grid) */}
      <Services />

      {/* 6. Experience (Timeline) */}
      <Experience />

      {/* 7. Divider */}
      <Divider />

      {/* 8. Projects Gallery (Horizontal) */}
      <Projects />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. Blog */}
      <Blog />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
