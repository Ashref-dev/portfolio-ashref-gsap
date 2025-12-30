import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

      tl.from(".about-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
      tl.from(".about-text", { y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "<0.2");
      tl.from(".about-stat", { scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, "<0.4");
      tl.from(".tech-pill", { y: 20, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }, "<0.4");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const techs = ["Next.js", "React", "Unity", ".NET", "Azure", "TailwindCSS", "PostgreSQL", "Figma", "Docker", "Three.js"];

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-white px-6 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        
        {/* Left Col - Title */}
        <div className="md:col-span-4">
          <h2 className="about-title text-[clamp(3rem,6vw,5rem)] font-bold tracking-tighter leading-[0.9] text-neutral-900 mb-8">
            Beyond<br/><span className="text-neutral-400 font-serif italic">The Code</span>
          </h2>
          <div className="flex flex-col gap-6">
            <div className="about-stat p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
               <Award className="w-8 h-8 text-amber-500 mb-4" />
               <div className="text-3xl font-bold text-neutral-900">4x</div>
               <div className="text-sm font-mono text-neutral-500 uppercase tracking-wider">Microsoft Certified</div>
            </div>
            <div className="about-stat p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
               <Zap className="w-8 h-8 text-indigo-500 mb-4" />
               <div className="text-3xl font-bold text-neutral-900">20+</div>
               <div className="text-sm font-mono text-neutral-500 uppercase tracking-wider">Projects Shipped</div>
            </div>
          </div>
        </div>

        {/* Right Col - Bio & Tech */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <div className="prose prose-lg prose-neutral max-w-none mb-12">
            <p className="about-text text-xl md:text-2xl font-light leading-relaxed text-neutral-800">
              I'm <strong className="font-semibold text-black">Ashref</strong>, a developer specializing in creating stunning experiences using .NET, React, and Unity Engine. My diverse skill set allows me to bridge the gap between high-performance backends and immersive front-ends.
            </p>
            <p className="about-text text-lg text-neutral-500 mt-6 leading-relaxed">
              As a certified Azure Cloud professional with a background in game development, I leverage a unique blend of skills to craft applications that are not only functional but visually compelling. Whether it's a dynamic web app or a VR training module, my goal is to innovate and deliver excellence.
            </p>
          </div>

          <div>
             <h3 className="about-text font-mono text-sm text-neutral-400 uppercase tracking-widest mb-6">Technologies I Love</h3>
             <div className="flex flex-wrap gap-3">
               {techs.map((tech, i) => (
                 <span key={i} className="tech-pill px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full font-medium text-sm hover:bg-neutral-900 hover:text-white transition-colors cursor-default">
                   {tech}
                 </span>
               ))}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};