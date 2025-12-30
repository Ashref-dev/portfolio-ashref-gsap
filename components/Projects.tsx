import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Bot, Layout, Car, Fan, Activity, ArrowUpRight } from 'lucide-react';
import { cn } from '../utils';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: "01", 
    title: "Sbiba Heritage", 
    cat: "WebGL • AWS", 
    icon: Globe, 
    color: "text-amber-600 bg-amber-50",
    link: "https://sbiba.vercel.app/"
  },
  { 
    id: "02", 
    title: "Entretien AI", 
    cat: "Next.js • AI Agent", 
    icon: Bot, 
    color: "text-indigo-600 bg-indigo-50",
    link: "https://entretien-ai.com/"
  },
  { 
    id: "03", 
    title: "Maxula", 
    cat: ".NET Blazor • Azure", 
    icon: Layout, 
    color: "text-blue-600 bg-blue-50",
    link: "https://maxula-project.azurewebsites.net/"
  },
  { 
    id: "04", 
    title: "Ride", 
    cat: "Angular • ThreeJS", 
    icon: Car, 
    color: "text-emerald-600 bg-emerald-50",
    link: "https://ride-project.vercel.app/"
  },
  { 
    id: "05", 
    title: "MR ADT", 
    cat: "Unity • Digital Twins", 
    icon: Fan, 
    color: "text-sky-600 bg-sky-50",
    link: "https://github.com/Ashref-dev/Azure-digitaltwins-windfarm"
  },
  { 
    id: "06", 
    title: "AR Medicheck", 
    cat: "Unity • AR", 
    icon: Activity, 
    color: "text-rose-600 bg-rose-50",
    link: "https://github.com/Ashref-dev/Medicheck-ar-project"
  },
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (!track || !container) return;

      // Function to calculate scroll amount dynamically
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(track, {
        x: getScrollAmount,
        ease: "none"
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white z-10" id="portfolio" style={{ backgroundColor: '#ffffff' }}>
      <div className="w-full h-full flex items-center bg-white">
        <div ref={trackRef} className="flex flex-nowrap items-center px-[5vw] gap-8 w-max">
          
          {/* Intro Card */}
          <div className="w-[80vw] md:w-[30vw] shrink-0 pr-10 text-neutral-900">
            <h3 className="text-4xl font-light mb-4">Featured<br/><span className="font-serif italic text-neutral-500">Case Studies</span></h3>
            <p className="text-neutral-500 max-w-xs text-sm leading-relaxed">
              A curated selection of projects demonstrating expertise in WebGL, Cloud Solutions, and Full-stack Engineering.
            </p>
          </div>

          {/* Project Cards */}
          {projects.map((p, i) => (
            <a 
              key={i} 
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[85vw] md:w-[45vw] h-[60vh] shrink-0 bg-neutral-50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border border-neutral-200"
            >
              
              <div className="absolute top-8 left-8 z-10">
                <span className="font-mono text-xs text-neutral-500 tracking-widest bg-white/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">PROJECT {p.id}</span>
              </div>

              <div className="absolute top-8 right-8 z-10 p-3 rounded-full border border-neutral-300 bg-white text-neutral-900 hover:scale-110 transition-transform duration-300 shadow-sm">
                <ArrowUpRight className="w-5 h-5" />
              </div>

              {/* Decorative Background Blob */}
              <div className={cn("absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500", p.color.split(' ')[1])} />

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
                <div className={cn("mb-6 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm bg-white", p.color.split(' ')[0])}>
                  <p.icon className="w-7 h-7" />
                </div>
                <h4 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-2 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{p.title}</h4>
                <p className="font-mono text-sm text-neutral-600 uppercase tracking-wider">{p.cat}</p>
              </div>
            </a>
          ))}

          {/* End Spacer */}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>
    </section>
  );
};