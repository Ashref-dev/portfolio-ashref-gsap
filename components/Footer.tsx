import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const magnetic = magneticRef.current;
      if (!magnetic) return;

      const xTo = gsap.quickTo(magnetic, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(magnetic, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = magnetic.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        const distance = Math.sqrt(x * x + y * y);
        if (distance < 300) {
          xTo(x * 0.3);
          yTo(y * 0.3);
        } else {
          xTo(0);
          yTo(0);
        }
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      window.addEventListener("mousemove", handleMouseMove);
      magnetic.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        magnetic.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={containerRef} 
      className='relative h-full bg-neutral-950 flex flex-col items-center justify-between py-24 px-6 overflow-hidden'
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full text-center">
        <h2 className="text-[25vw] font-black text-neutral-900 uppercase leading-none opacity-50">
          Ashref
        </h2>
      </div>

      <div className='flex-1 flex flex-col items-center justify-center z-10 w-full'>
        <p className='text-neutral-500 mb-12 font-sans text-[10px] tracking-[0.5em] uppercase'>
          Got an idea?
        </p>
        
        <div ref={magneticRef} className="relative group cursor-pointer">
          <a 
            href='mailto:hi@ashref.tn' 
            className='block text-center relative z-10'
          >
            <h2 className='text-[clamp(4rem,15vw,12rem)] font-black text-white leading-[0.8] tracking-tighter transition-colors duration-500 group-hover:text-neutral-400'>
              LET'S<br />TALK.
            </h2>
          </a>
          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-600/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 z-10 border-t border-neutral-900 pt-12">
        <div className='flex flex-wrap justify-center md:justify-start gap-x-12 gap-y-4 text-neutral-400 font-sans text-[10px] tracking-[0.2em] uppercase'>
          {[
            { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/mohamedashrefbna/' },
            { label: 'BEHANCE', href: 'https://www.behance.net/mohamedashrefbna' },
            { label: 'GITHUB', href: 'https://github.com/Ashref-dev' },
            { label: 'LEETCODE', href: 'https://leetcode.com/u/mohamedashrefbenabdallah/' }
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-white transition-colors relative group'
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <a
            href='/assets/resume_ashref.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='px-8 py-4 rounded-full border border-neutral-800 text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300'
          >
            Download CV
          </a>
          <p className='text-[10px] font-sans tracking-widest text-neutral-600 uppercase'>
            &copy; {new Date().getFullYear()} Ashref. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


