import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Sbiba Heritage",
    cat: "WebGL • AWS • Next.js",
    image: "/assets/works/sbiba.jpg",
    link: "https://sbiba.vercel.app/",
  },
  {
    id: "02",
    title: "Entretien AI",
    cat: "AI Agent • LLMs • Python",
    image: "/assets/works/entretien-ai.jpg",
    link: "https://entretien-ai.com/",
  },
  {
    id: "03",
    title: "Maxula",
    cat: ".NET Blazor • Azure • Fintech",
    image: "/assets/works/maxula.jpg",
    link: "https://maxula-project.azurewebsites.net/",
  },
  {
    id: "04",
    title: "Ride",
    cat: "Angular • ThreeJS • Real-time",
    image: "/assets/works/ride.jpg",
    link: "https://ride-project.vercel.app/",
  },
  {
    id: "05",
    title: "MR ADT",
    cat: "Unity • Digital Twins • IoT",
    image: "/assets/works/WindFarm.jpg",
    link: "https://github.com/Ashref-dev/Azure-digitaltwins-windfarm",
  },
  {
    id: "06",
    title: "AR Medicheck",
    cat: "Unity • AR • Healthcare",
    image: "/assets/works/medicheck.jpg",
    link: "https://github.com/Ashref-dev/Medicheck-ar-project",
  },
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (!track || !container) return;

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
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, {
        x: getScrollAmount,
        ease: "none",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#fafafa] z-10 pt-24 md:pt-32 scroll-mt-24 md:scroll-mt-32"
      id="work"
    >
      <div className="absolute top-24 left-12 z-20 pointer-events-none md:top-32 md:left-16 !-z-10">
        <h2 className="text-[10vw] font-serif leading-none tracking-tighter text-neutral-900 opacity-5">
          WORKS
        </h2>
      </div>

      <div className="w-full h-full flex items-center">
        <div
          ref={trackRef}
          className="flex flex-nowrap items-center px-[10vw] gap-16 w-max"
        >
          {/* Intro Card */}
          <div className="w-[80vw] md:w-[30vw] shrink-0 pr-10 text-neutral-900">
            <h3 className="text-5xl font-light mb-6 leading-[1.1]">
              Selected
              <br />
              <span className="font-serif italic text-neutral-400">
                Artifacts
              </span>
            </h3>
            <p className="text-neutral-500 max-w-xs text-[10px] leading-relaxed font-sans uppercase tracking-[0.2em]">
              A collection of digital systems, cloud architectures, and
              interactive experiences.
            </p>
          </div>

          {/* Project Cards */}
          {projects.map((project) => (
            <div
              key={project.id}
              className="group !z-10 relative flex-shrink-0 w-[70vw] md:w-[40vw] aspect-square overflow-hidden bg-neutral-50 rounded-2xl transition-all duration-500 ease-out hover:shadow-2xl cursor-pointer"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                {/* Media Container */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Minimal Info Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between bg-black/0 group-hover:bg-black/40 transition-colors duration-500">
                  <div className="flex justify-between items-start">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-sans text-[10px] tracking-[0.2em] uppercase">
                      {project.id}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-serif text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-none mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-sans text-[10px] uppercase tracking-[0.2em]">
                      {project.cat}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}

          {/* End Spacer */}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>
    </section>
  );
};
