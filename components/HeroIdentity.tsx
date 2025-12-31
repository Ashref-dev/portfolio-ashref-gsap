import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroIdentity = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=350%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onEnter: () =>
            gsap.to('body', { backgroundColor: '#171717', duration: 0.5 }),
          onLeave: () =>
            gsap.to('body', { backgroundColor: '#ffffff', duration: 0.1 }),
          onLeaveBack: () =>
            gsap.to('body', { backgroundColor: '#fafafa', duration: 0.5 }),
        },
      });

    

      // 2. Shutters Open
      tl.to(
        '.shutter-top',
        { yPercent: -100, duration: 1, ease: 'power2.inOut' },
        '>-0.1'
      );
      tl.to(
        '.shutter-bottom',
        { yPercent: 100, duration: 1, ease: 'power2.inOut' },
        '<'
      );

      // 3. Content Reveal
      tl.fromTo(
        '.grid-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

      tl.from(
        '.grid-item-text:not(.scale-word)',
        {
          y: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
        },
        '<'
      );

      tl.from(
        scaleRef.current,
        {
          y: 150,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '<0.1'
      );

      // 4. THE TRANSITION
      // Fade out everything EXCEPT "SCALE"
      tl.to(
        ['.grid-item-text:not(.scale-word)', '.grid-item-aux'],
        {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: 'power2.in',
        },
        '+=0.5'
      );

      // Massive expansion of "SCALE" to fill the screen with white
      // Since the text color is white, expanding it 100x acts as a white reveal
      tl.to(
        scaleRef.current,
        {
          scale: 150,
          duration: 2,
          ease: 'power2.inOut',
        },
        '<'
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className='relative h-screen w-full bg-neutral-900 text-white overflow-hidden z-20'
    >
      <style>{`
        @keyframes blink-solid {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink-solid {
          animation: blink-solid 0.6s infinite;
        }
      `}</style>
      {/* Background Noise */}
      <div
        className='absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        ref={contentRef}
        className='relative w-full h-full flex items-center justify-center'
      >
        {/* Shutters */}
        <div className='shutter-top absolute top-0 left-0 w-full h-1/2 bg-neutral-900 z-10 flex items-end justify-center border-b border-neutral-800' />
        <div className='shutter-bottom absolute bottom-0 left-0 w-full h-1/2 top-1/2 bg-neutral-900 z-10 flex items-start justify-center border-t border-neutral-800' />

        {/* Cursor */}
        <div
          ref={cursorRef}
          className='absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        >
          <div className='w-[2px] h-[60px] bg-white animate-blink-solid' />
        </div>

        {/* Grid Content */}
        <div className='grid-content absolute inset-0 flex flex-col items-center justify-center w-full h-full p-4'>
          {/* Top Row */}
          <div className='flex flex-col md:flex-row items-center gap-4 md:gap-12 mb-2 md:mb-6'>
            <div className='grid-item-aux px-4 py-1.5 rounded-full border border-neutral-700 flex items-center gap-2 bg-neutral-800/50 backdrop-blur-sm'>
              <Code2 className='w-4 h-4 text-neutral-400' />
              <span className='text-xs font-mono text-neutral-400 tracking-wider'>
                INIT_SYSTEM
              </span>
            </div>

            <div className='flex flex-wrap justify-center gap-x-3 md:gap-x-6'>
              {['I', 'BUILD', 'SMART', 'SYSTEMS', 'THAT'].map((word, i) => (
                <span
                  key={i}
                  className='grid-item-text text-[5vw] md:text-[3vw] font-light tracking-tight leading-none'
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Middle Row: SCALE */}
          <div className='relative z-0 leading-[0.8] flex justify-center items-center'>
            <span
              ref={scaleRef}
              className='scale-word text-[25vw] font-black tracking-tighter text-white block origin-center'
            >
              SCALE
            </span>
          </div>

          {/* Bottom Row */}
          <div className='grid-item-aux mt-4 md:mt-0 md:absolute md:bottom-[20%] md:right-[20%] px-6 py-2 rounded-full bg-white text-black flex items-center gap-2 transform rotate-[-2deg]'>
            <MousePointer2 className='w-4 h-4' />
            <span className='text-sm font-bold tracking-wide'>INTERACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
