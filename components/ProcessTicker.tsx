import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Database, Network } from "lucide-react";
import { cn } from "../utils";

gsap.registerPlugin(ScrollTrigger);

// --- Styled Components for this section ---
const TextSegment = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "text-[clamp(6rem,14vw,12rem)] font-bold tracking-tighter whitespace-nowrap shrink-0 leading-none select-none text-neutral-900",
      className
    )}
  >
    {children}
  </span>
);

const HighlightWord = ({
  children,
  color = "text-blue-600",
}: {
  children?: React.ReactNode;
  color?: string;
}) => (
  <span
    className={cn(
      "font-serif italic mx-6 relative inline-block group cursor-none text-[clamp(6rem,14vw,12rem)] leading-none",
      color
    )}
  >
    {children}
    <span className="absolute -bottom-4 left-0 w-full h-[4px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
  </span>
);

export const ProcessTicker = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (!track || !container) return;

      // Function to calculate scroll amount dynamically
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Main track movement
      tl.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      // Parallax elements - synced with main timeline
      const parallaxItems = track.querySelectorAll("[data-speed]");
      parallaxItems.forEach((item) => {
        const speed = parseFloat(item.getAttribute("data-speed") || "1");
        tl.to(
          item,
          {
            x: () => getScrollAmount() * (speed * 0.15),
            ease: "none",
          },
          0
        ); // Start at time 0
      });

      // Popups - using containerAnimation
      const popups = track.querySelectorAll(".popup-element");
      popups.forEach((popup) => {
        gsap.fromTo(
          popup,
          { scale: 0.5, opacity: 0, rotation: -15 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: popup,
              containerAnimation: tl,
              start: "left 90%",
              end: "right 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#fafafa] z-30 border-t border-neutral-100"
    >
      <div className="w-full h-full flex items-center bg-[#fafafa]">
        <div
          ref={trackRef}
          className="flex flex-nowrap items-center px-[5vw] w-max gap-12"
        >
          {/* 1 */}
          <div className="flex items-center gap-6 shrink-0 relative">
            <TextSegment>flexible & robust</TextSegment>
            <HighlightWord color="text-blue-600">Cloud Systems</HighlightWord>
            <div className="popup-element mx-8 p-6 bg-blue-50 rounded-full border border-blue-100 shadow-xl">
              <Network className="w-16 h-16 text-blue-600" />
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-6 shrink-0 relative ml-20">
            <TextSegment>integrating</TextSegment>

            <HighlightWord color="text-rose-600">
              Frontier AI Agents
            </HighlightWord>
            <div className="popup-element mx-8 p-6 bg-rose-50 rounded-full border border-rose-100 shadow-xl">
              <Terminal className="w-24 h-24 text-rose-600 drop-shadow-2xl" />
            </div>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-6 shrink-0 relative ml-20">
            <TextSegment>delivered through</TextSegment>
            <div className="popup-element mx-10 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-xl rotate-6">
              <Database className="w-16 h-16 text-emerald-600" />
            </div>
            <HighlightWord color="text-emerald-600">Polished UX</HighlightWord>
            <TextSegment>.</TextSegment>
            <div className="w-[30em]"></div>
          </div>

          <div className="w-[30vw] shrink-0" />
        </div>
      </div>

      <div className="absolute bottom-12 left-12 flex items-center gap-4 text-neutral-400 font-sans text-[10px] tracking-[0.3em] uppercase">
        <div className="w-8 h-px bg-neutral-200" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};
