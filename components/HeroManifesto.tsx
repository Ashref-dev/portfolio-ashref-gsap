import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverPill } from './HoverPill';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components ---

const Word = ({ children }: { children?: React.ReactNode }) => (
  <span className="manifesto-element inline-block mr-[0.25em] will-change-[transform,opacity,filter] leading-[1.15] origin-center">
    {children}
  </span>
);

const TimeDisplay = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'Africa/Tunis', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span>{time} TN</span>;
};

// --- Main Component ---

export const HeroManifesto = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.manifesto-element');
      const footerItems = gsap.utils.toArray('.footer-item');
      
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      tl.fromTo(footerItems,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
        0.1
      );

      // 2. Manifesto Text Reveal (Center Stage)
      tl.fromTo(elements, 
        { 
          y: 60,
          opacity: 0, 
          filter: "blur(20px)",
        },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.04,
        },
        0.3 // Overlap slightly with footer
      );

      // Background Blob Animation
      gsap.to(".bg-blob-1", {
        x: "20%", y: "-20%", rotation: 90, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
      gsap.to(".bg-blob-2", {
        x: "-20%", y: "20%", rotation: -90, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut"
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col justify-between bg-[#fafafa] text-neutral-900 z-10 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-blob-1 absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-rose-300/20 rounded-full blur-[100px] mix-blend-multiply opacity-80" />
        <div className="bg-blob-2 absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-blue-300/20 rounded-full blur-[100px] mix-blend-multiply opacity-80" />
      </div>

      {/* Spacer for Header */}
      <div className="h-24 md:h-32" />

      {/* --- Main Content (Manifesto) --- */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-4">
        <div className="max-w-[95vw] md:max-w-7xl mx-auto text-center">
          <div className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-medium tracking-tight leading-[1.15] md:leading-[1.1]">
            
            <div className="block py-2">
              <Word>In</Word><Word>every</Word><Word>pixel,</Word><Word>discover</Word><Word>the</Word>
            </div>

            <div className="block py-2">
               <Word>undeniable</Word>
               <HoverPill 
                  text="Real Magic" 
                  imageUrl="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=200&auto=format&fit=crop"
                  colorClass="text-rose-600" 
                  bgClass="bg-rose-100" 
                  className="manifesto-element align-middle mx-3"
                />
            </div>

            <div className="block py-2">
               <Word>of</Word><Word>crafting</Word><Word>pure</Word>
               <HoverPill 
                  text="Digital Awe" 
                  imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop"
                  colorClass="text-amber-600" 
                  bgClass="bg-amber-100"
                  className="manifesto-element align-middle mx-3"
                />
            </div>

            <div className="block py-2">
               <Word>that</Word><Word>brings</Word><Word>us</Word>
               <HoverPill 
                  text="Together." 
                  imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=200&auto=format&fit=crop"
                  colorClass="text-blue-600" 
                  bgClass="bg-blue-100"
                  className="manifesto-element align-middle mx-3"
                />
            </div>

          </div>
        </div>
      </div>

      {/* --- Footer (Bottom Bar) --- */}
      <div className="relative z-20 flex items-end justify-between px-6 py-8 md:px-12 md:py-10 text-xs md:text-sm font-mono text-neutral-400">
        
        {/* Location / Status */}
        <div className="footer-item flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AVAILABLE FOR WORK
          </span>
          <span className="uppercase tracking-widest">Tunis, Tunisia</span>
        </div>

        {/* Scroll Indicator (Center) */}
        <div className="footer-item hidden md:flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-10">
          <span className="uppercase tracking-widest text-[10px]">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-neutral-900" />
        </div>

        {/* Time / Copyright */}
        <div className="footer-item flex flex-col items-end gap-1 text-right">
          <span className="text-neutral-900 font-bold"><TimeDisplay /></span>
          <span>&copy; 2025</span>
        </div>

      </div>

    </section>
  );
};