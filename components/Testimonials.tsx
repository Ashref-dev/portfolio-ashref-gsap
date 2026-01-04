import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: "01",
    text: "He is an excellent graphic designer and so talented at finding solutions that are simple and effective, without over engineering everything.",
    author: "Ahmed Balti",
    role: "Full-Stack Developer @ NeoCortex",
    color: "bg-rose-600",
    textAccent: "text-rose-600"
  },
  {
    id: "02",
    text: "Ashref consistently exceeds expectations. He's not afraid to push boundaries and come up with innovative solutions. He's a valuable asset to any team.",
    author: "Taha Ben Othmen",
    role: "Solutions Developer @ Forvia",
    color: "bg-blue-600",
    textAccent: "text-blue-600"
  },
  {
    id: "03",
    text: "A rare talent who understands both the technical constraints and the user's emotional journey. His work on our cloud infrastructure was transformative.",
    author: "Sarah Chen",
    role: "CTO @ CloudScale",
    color: "bg-emerald-600",
    textAccent: "text-emerald-600"
  },
  {
    id: "04",
    text: "The level of detail in his UI work is unparalleled. He doesn't just build interfaces; he crafts digital experiences that feel alive.",
    author: "Marc Rossi",
    role: "Design Lead @ StudioV",
    color: "bg-amber-600",
    textAccent: "text-amber-600"
  }
];

export const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      
      if (!track || !section) return;

      // Calculate the total width to scroll
      // (Track width - Viewport width)
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      tl.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      // Parallax effect for inner content
      // We select all elements with class .parallax-content and move them slightly in the opposite direction
      gsap.utils.toArray<HTMLElement>(".parallax-content").forEach((el) => {
        gsap.to(el, {
          x: 100, // Move slightly right as container moves left
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
          }
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#fafafa] overflow-hidden flex flex-col justify-center">
      
      {/* Background Grid Lines (Subtle Architectural Feel) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-24 left-0 w-full h-px bg-neutral-100" />
        <div className="absolute bottom-24 left-0 w-full h-px bg-neutral-100" />
      </div>

      {/* The Horizontal Track */}
      <div ref={trackRef} className="flex items-center h-[70vh] w-max px-[5vw] gap-[5vw]">
        
        {/* 1. Intro Title Block */}
        <div className="w-[30vw] md:w-[25vw] shrink-0 flex flex-col justify-center h-full pr-12 border-r border-neutral-100">
          <div className="parallax-content">
            <span className="block text-[10px] font-sans font-bold tracking-[0.3em] text-neutral-400 uppercase mb-6">
              Testimonials
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-neutral-900 leading-[0.9]">
              Trusted<br/>
              <span className="italic text-neutral-400">Voices.</span>
            </h2>
            <p className="mt-8 text-sm text-neutral-500 leading-relaxed max-w-xs">
              Feedback from the engineers, founders, and teams I've had the privilege to build with.
            </p>
          </div>
        </div>

        {/* 2. The Monoliths (Testimonial Cards) */}
        {testimonials.map((t, i) => (
          <div 
            key={i} 
            className="relative w-[80vw] md:w-[40vw] h-full shrink-0 group"
          >
            <div className="w-full h-full bg-neutral-50 border border-neutral-100 p-8 md:p-12 flex flex-col justify-between transition-colors duration-500 hover:bg-[#fafafa] hover:shadow-xl hover:shadow-neutral-100/50 hover:border-neutral-200">
              
              {/* Top: Quote Icon & ID */}
              <div className="flex justify-between items-start">
                <Quote className={`w-10 h-10 ${t.textAccent} opacity-50`} />
                <span className="text-[10px] font-sans font-bold text-neutral-300 tracking-widest">
                  {t.id}
                </span>
              </div>

              {/* Middle: The Quote */}
              <div className="relative overflow-hidden">
                <p className="text-2xl md:text-3xl font-serif text-neutral-800 leading-tight">
                  "{t.text}"
                </p>
              </div>

              {/* Bottom: Author Info */}
              <div className="flex items-center gap-4 mt-8">
                <div className={`w-12 h-12 shrink-0 ${t.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                    {t.author}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    {t.role}
                  </p>
                </div>
              </div>

              {/* Hover Accent Line */}
              <div className={`absolute bottom-0 left-0 w-full h-1 ${t.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          </div>
        ))}

        {/* End Spacer */}
        <div className="w-[10vw] shrink-0" />
      </div>
    </section>
  );
};

