import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverPill } from './HoverPill';

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components ---

const Word = ({ children }: { children?: React.ReactNode }) => (
  <span className='manifesto-element inline-block mr-[0.25em] will-change-[transform,opacity,filter] leading-[1.15] origin-center'>
    {children}
  </span>
);

const TimeDisplay = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Tunis',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.manifesto-element');
      const footerItems = gsap.utils.toArray('.footer-item');
      const exploreBtn = targetRef.current;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        footerItems,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
        0.1
      );

      // 2. Manifesto Text Reveal (Center Stage)
      tl.fromTo(
        elements,
        {
          y: 60,
          opacity: 0,
          filter: 'blur(20px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.4,
          stagger: 0.04,
        },
        0.3 // Overlap slightly with footer
      );

      // 3. Explore Button Reveal
      tl.fromTo(
        exploreBtn,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' },
        '-=0.5'
      );

      // Background Blob Animation
      gsap.to('.bg-blob-1', {
        x: '20%',
        y: '-20%',
        rotation: 90,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.bg-blob-2', {
        x: '-20%',
        y: '20%',
        rotation: -90,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Canvas Logic
      const canvas = canvasRef.current;
      if (canvas) {
        ctxRef.current = canvas.getContext('2d');
        const updateCanvasSize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        const drawArrow = () => {
          if (!ctxRef.current || !targetRef.current) return;
          const ctx = ctxRef.current;
          const mouse = mousePosRef.current;
          const rect = targetRef.current.getBoundingClientRect();
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const x0 = mouse.x;
          const y0 = mouse.y;
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          // Only draw if mouse is active
          if (x0 === 0 && y0 === 0) return;

          const a = Math.atan2(cy - y0, cx - x0);
          const x1 = cx - Math.cos(a) * (rect.width / 2 + 10);
          const y1 = cy - Math.sin(a) * (rect.height / 2 + 10);

          const midX = (x0 + x1) / 2;
          const midY = (y0 + y1) / 2;
          const dist = Math.hypot(x1 - x0, y1 - y0);
          const offset = Math.min(150, dist * 0.3);
          const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
          
          const controlX = midX;
          const controlY = midY + offset * t;

          const opacity = Math.min(0.4, (dist - 100) / 400);
          if (opacity <= 0) return;

          ctx.strokeStyle = `rgba(225, 29, 72, ${opacity})`; // rose-600
          ctx.lineWidth = 1.5;
          ctx.setLineDash([8, 4]);

          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.quadraticCurveTo(controlX, controlY, x1, y1);
          ctx.stroke();

          // Arrowhead
          const angle = Math.atan2(y1 - controlY, x1 - controlX);
          const headLen = 8;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 - headLen * Math.cos(angle - Math.PI / 6), y1 - headLen * Math.sin(angle - Math.PI / 6));
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 - headLen * Math.cos(angle + Math.PI / 6), y1 - headLen * Math.sin(angle + Math.PI / 6));
          ctx.stroke();
        };

        const handleMouseMove = (e: MouseEvent) => {
          mousePosRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', updateCanvasSize);
        window.addEventListener('mousemove', handleMouseMove);
        updateCanvasSize();

        gsap.ticker.add(drawArrow);

        // Fade out canvas when leaving hero
        gsap.to(canvas, {
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom 50%',
            scrub: true,
          },
        });

        return () => {
          window.removeEventListener('resize', updateCanvasSize);
          window.removeEventListener('mousemove', handleMouseMove);
          gsap.ticker.remove(drawArrow);
        };
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className='relative h-screen flex flex-col justify-between bg-[#fafafa] text-neutral-900 z-10 overflow-hidden'
    >
      <canvas ref={canvasRef} className='fixed inset-0 pointer-events-none z-50' />
      
      {/* Background Ambience */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='bg-blob-1 absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-rose-300/20 rounded-full blur-[100px] mix-blend-multiply opacity-80' />
        <div className='bg-blob-2 absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-blue-300/20 rounded-full blur-[100px] mix-blend-multiply opacity-80' />
      </div>

      {/* Spacer for Header */}
      <div className='h-24 md:h-32' />

      {/* --- Main Content (Manifesto) --- */}
      <div className='relative z-10 flex-grow flex flex-col items-center justify-center px-4'>
        <div className='md:max-w-7xl mx-auto text-center'>
          <div className='text-[clamp(2.5rem,5vw,5rem)] font-medium tracking-tight leading-[1.15] md:leading-[1.1]'>
            <div className='block py-2 '>
              <Word>Solving</Word>
              <Word>complex</Word>
              <HoverPill
                text='Problems'
                imageUrl='https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400'
                colorClass='text-rose-600'
                bgClass='bg-rose-100'
                className='manifesto-element align-middle mx-3'
              />
            </div>

            <div className='block py-2'>
              <Word>by</Word>
              <Word>designing</Word>
              <Word>simple</Word>
              <HoverPill
                text='Systems'
                imageUrl='https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400'
                colorClass='text-amber-600'
                bgClass='bg-amber-100'
                className='manifesto-element align-middle mx-3'
              />
            </div>

            <div className='block py-2'>
              <Word>backed</Word>
              <Word>by</Word>
              <Word>solid</Word>
              <HoverPill
                text='Infrastructure.'
                imageUrl='https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400'
                colorClass='text-blue-600'
                bgClass='bg-blue-100'
                className='manifesto-element align-middle mx-3'
              />
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <div className='mt-12 md:mt-16'>
          <button
            ref={targetRef}
            onClick={() => document.getElementById('identity')?.scrollIntoView({ behavior: 'smooth' })}
            className='group relative px-8 py-4 bg-neutral-900 text-white rounded-full font-sans text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-transform hover:scale-105 active:scale-95'
          >
            <span className='relative z-10'>Explore Work</span>
            <div className='absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out' />
          </button>
        </div>
      </div>

      {/* --- Footer (Bottom Bar) --- */}
      <div className='relative z-20 flex items-end justify-between px-6 py-8 md:px-12 md:py-10 text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-sans'>
        {/* Status / Coordinates */}
        <div className='footer-item flex flex-col gap-2'>
          <div className='flex items-center gap-3'>
            <div className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
            </div>
            <span className='text-neutral-900 font-bold'>Status: Active</span>
          </div>
          <span className='opacity-50'>36.8065° N, 10.1815° E</span>
        </div>

        {/* Scroll Indicator (Center) */}
        <div className='footer-item hidden md:flex flex-col items-center gap-4 absolute left-1/2 -translate-x-1/2 bottom-10'>
          <div className='w-px h-12 bg-neutral-200 relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-1/2 bg-neutral-900 animate-scroll-line'></div>
          </div>
          <span className='text-[9px] opacity-50'>Scroll</span>
        </div>

        {/* Time / Copyright */}
        <div className='footer-item flex flex-col items-end gap-2 text-right'>
          <div className='flex items-center gap-2'>
            <span className='opacity-50'>Local Time</span>
            <span className='text-neutral-900 font-bold'>
              <TimeDisplay />
            </span>
          </div>
          <span className='opacity-50'>&copy; 2025 Ashref.dev</span>
        </div>
      </div>
    </section>
  );
};

<style>{`
  @keyframes scroll-line {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(200%); }
  }
  .animate-scroll-line {
    animation: scroll-line 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
  }
`}</style>
