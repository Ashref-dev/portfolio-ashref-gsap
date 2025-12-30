import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NavLink = ({ children, href }: { children?: React.ReactNode; href: string }) => (
  <a 
    href={href}
    className="nav-item relative font-mono text-sm uppercase tracking-widest text-neutral-500 hover:text-black transition-colors duration-300 group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
  </a>
);

export const Header = () => {
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const navItems = gsap.utils.toArray('.nav-item');
      
      gsap.fromTo(navItems,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-12 md:py-10 pointer-events-none">
      <div className="nav-item pointer-events-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
          Ashref<span className="text-rose-500">.</span>
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-1 tracking-widest uppercase hidden md:block">
          Software Engineer
        </p>
      </div>

      <nav className="flex items-center gap-6 md:gap-12 pointer-events-auto">
        <div className="hidden md:flex gap-8">
          <NavLink href="#portfolio">Work</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
        <a 
          href="mailto:hi@ashref.tn"
          className="nav-item px-5 py-2 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Let's Talk
        </a>
      </nav>
    </header>
  );
};
