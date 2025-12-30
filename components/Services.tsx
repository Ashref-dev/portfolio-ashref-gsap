import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Server, Cloud, Glasses } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Creative Development",
    desc: "Crafting visually captivating and user-centric experiences that enhance user engagement using React, Tailwind, and GSAP.",
    icon: Palette,
    color: "text-rose-600",
    bg: "group-hover:bg-rose-50"
  },
  {
    title: "Back-end Development",
    desc: "Building reliable and secure systems with Node, ASP.NET, and PostgreSQL ensuring seamless data flow.",
    icon: Server,
    color: "text-emerald-600",
    bg: "group-hover:bg-emerald-50"
  },
  {
    title: "Cloud Solutions",
    desc: "Architecting CI/CD pipelines and managing cloud infrastructure on Azure with automation and security in mind.",
    icon: Cloud,
    color: "text-blue-600",
    bg: "group-hover:bg-blue-50"
  },
  {
    title: "Unity Development",
    desc: "Creating state-of-the-art VR/AR applications and immersive simulations using Unity Engine and C#.",
    icon: Glasses,
    color: "text-purple-600",
    bg: "group-hover:bg-purple-50"
  }
];

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-neutral-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
           <h2 className="text-sm font-mono text-neutral-400 tracking-[0.5em] uppercase mb-4">What I Do</h2>
           <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Solving problems with <br/> <span className="font-serif italic text-neutral-500">elegant solutions.</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div key={i} className={`service-card group p-8 md:p-12 bg-white rounded-3xl border border-neutral-200 transition-colors duration-500 ${s.bg}`}>
               <div className="mb-8 flex items-start justify-between">
                 <div className={`p-4 rounded-2xl bg-neutral-50 ${s.color} transition-colors duration-500 group-hover:bg-white`}>
                   <s.icon className="w-8 h-8" />
                 </div>
                 <span className="font-mono text-xs text-neutral-300 group-hover:text-neutral-500">0{i+1}</span>
               </div>
               <h4 className="text-2xl font-bold text-neutral-900 mb-4">{s.title}</h4>
               <p className="text-neutral-500 leading-relaxed max-w-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};