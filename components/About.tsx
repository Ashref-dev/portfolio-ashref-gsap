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
            <h3 className="text-3xl font-bold text-neutral-900 mb-6">I build complex systems that feel simple.</h3>
            <p className="about-text text-xl md:text-2xl font-light leading-relaxed text-neutral-800">
              I'm <strong className="font-semibold text-black">Ashref</strong>. I'm a software engineer who cares about the whole product, from the database to the pixel. I've built cybersecurity agents that dynamically provision Kali Linux containers in the cloud, and document processing systems that handle real-world workloads.
            </p>
            <p className="about-text text-lg text-neutral-500 mt-6 leading-relaxed">
              I use <strong className="font-medium text-neutral-900">Go</strong> for high-performance microservices, <strong className="font-medium text-neutral-900">AWS</strong> for scalable infrastructure, and <strong className="font-medium text-neutral-900">Next.js</strong> because I believe even complex internal tools should have a great user experience. I also have deep experience tuning AI agents using prompt engineering and A/B testing to ensure reliability. I bridge the gap between heavy backend logic and the person using it.
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