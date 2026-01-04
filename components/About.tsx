import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../utils';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom bottom",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Title & Bio Reveal
      tl.from(".about-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      // 2. Stats Line Draw & Reveal
      tl.from(".stat-border", {
        scaleX: 0,
        duration: 1,
        ease: "expo.out"
      }, "-=0.5");
      
      tl.from(".stat-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.8");

      // 3. Tech Ticker Fade In
      tl.from(".tech-ticker", {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, "-=0.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "4x", label: "Microsoft Certified", color: "text-amber-600" },
    { value: "20+", label: "Projects Delivered", color: "text-blue-600" },
    { value: "5k+", label: "Cups of Coffee", color: "text-rose-600" },
  ];

  const techs = ["Python", "Go", "Next.js", "AWS", "Azure", "Docker", "PostgreSQL", "AI Agents", "Unity", "Three.js"];

  return (
    <section ref={containerRef} className="relative py-24 bg-[#fafafa] px-6 border-b border-neutral-100 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Compact Bio */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start mb-20">
          <div className="w-full md:w-1/3 shrink-0">
            <h2 className="about-reveal text-[clamp(3rem,5vw,4rem)] font-bold tracking-tighter leading-[0.9] text-neutral-900">
              About<br/>
              <span className="font-serif italic font-light text-neutral-400 mt-1">Me.</span>
            </h2>
          </div>
          
          <div className="w-full md:w-2/3 pt-2">
            <p className="about-reveal text-xl md:text-2xl font-light leading-relaxed text-neutral-800 max-w-2xl">
              I'm <strong className="font-semibold text-black">Ashref</strong>. I bridge the gap between heavy backend logic and the human experience. From dynamically provisioning cloud containers to tuning AI agents for real-world reasoning, I care about the <span className="italic font-serif">entire</span> stack.
            </p>
          </div>
        </div>

        {/* Middle Section: Minimalist Stats Strip */}
        <div ref={statsRef} className="relative mb-20">
          {/* Top Border */}
          <div className="stat-border absolute top-0 left-0 w-full h-px bg-neutral-100 origin-left" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item group py-8 md:py-12 md:px-8 first:pl-0 transition-colors hover:bg-neutral-50/50">
                <div className={cn("text-4xl md:text-5xl font-bold mb-2 tracking-tight transition-colors duration-300", stat.color)}>
                  {stat.value}
                </div>
                <div className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 group-hover:text-neutral-600 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Border */}
          <div className="stat-border absolute bottom-0 left-0 w-full h-px bg-neutral-100 origin-left" />
        </div>

        {/* Bottom Section: Tech Stack Ticker */}
        <div className="tech-ticker overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fafafa] to-transparent z-10" />
          
          <div className="flex whitespace-nowrap animate-ticker hover:[animation-play-state:paused]">
            {[...techs, ...techs, ...techs].map((tech, i) => (
              <div key={i} className="inline-flex items-center mx-6">
                <span className="text-3xl md:text-4xl font-serif italic text-neutral-300 hover:text-neutral-900 transition-colors duration-300 cursor-default">
                  {tech}
                </span>
                <span className="ml-12 w-1 h-1 rounded-full bg-neutral-200" />
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </section>
  );
};