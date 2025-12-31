import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Server, Cloud, Glasses } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "SaaS Development",
    desc: "Building end-to-end applications with Next.js, focusing on performance and real user needs.",
    icon: Palette,
    color: "text-rose-600",
    bg: "group-hover:bg-rose-50"
  },
  {
    title: "Cloud & DevOps",
    desc: "Setting up reliable AWS environments, Docker containers, and CI/CD pipelines to keep things running smoothly.",
    icon: Cloud,
    color: "text-blue-600",
    bg: "group-hover:bg-blue-50"
  },
  {
    title: "AI Integration",
    desc: "Implementing LLMs (Anthropic/OpenAI) to build agents that can actually reason and automate tasks.",
    icon: Glasses,
    color: "text-purple-600",
    bg: "group-hover:bg-purple-50"
  },
  {
    title: "Microservices",
    desc: "Writing efficient backend services in Go or Python to handle complex logic and routing.",
    icon: Server,
    color: "text-emerald-600",
    bg: "group-hover:bg-emerald-50"
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