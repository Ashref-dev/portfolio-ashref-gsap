import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: "Software Engineer",
    company: "Bookme OÜ",
    period: "June 2024 - Present",
    desc: "Developed full-stack Next.js solutions with advanced AI integration, enabling faster document processing using AWS and real-time analytics."
  },
  {
    role: "Solutions Developer",
    company: "Forvia (Tessan Group)",
    period: "Jan 2024 - June 2024",
    desc: "Developed industrial VR training modules using Unity Engine, achieving 90+ FPS. Engineered custom interactions increasing user engagement by 50%."
  },
  {
    role: "Blazor Developer",
    company: "Forvia (Tessan Group)",
    period: "Dec 2023",
    desc: "Architected high-performance .NET Blazor application, achieving 95% Lighthouse accessibility score and reducing page load time significantly."
  },
  {
    role: "Full-stack Developer",
    company: "TSI",
    period: "June 2023 - Sept 2023",
    desc: "Developed QR-based inventory system, reducing login time for seasonal workers by 80% and built Angular-based management interface."
  },
  {
    role: "Creative Developer",
    company: "Chilift",
    period: "May 2023 - June 2023",
    desc: "Developed high-converting landing page using React and Tailwind CSS, increasing conversion rate by 35%."
  },
  {
    role: "Co-Founder & Game Dev",
    company: "RedSpear",
    period: "Mar 2022 - June 2023",
    desc: "Developed C# gameplay systems achieving 60 FPS. Implemented Python AI scripts automating development tasks."
  },
  {
    role: "Web Developer",
    company: "AJico Group",
    period: "Jan 2023 - May 2023",
    desc: "Developed event website with 10K+ visitors. Implemented real-time communication features."
  },
  {
    role: "Junior Web Developer",
    company: "CIN Group",
    period: "Aug 2022 - Jan 2023",
    desc: "Developed secure investment platform with 99.9% uptime and zero security incidents."
  }
];

export const Experience = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-neutral-100 rounded-full">
            <Briefcase className="w-5 h-5 text-neutral-600" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Work History</h2>
        </div>

        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              className="group relative pl-8 md:pl-0"
            >
              {/* Timeline Line (Desktop) */}
              <div className="hidden md:block absolute left-[145px] top-2 bottom-0 w-px bg-neutral-100 group-last:hidden" />
              <div className="hidden md:block absolute left-[141px] top-2 w-2 h-2 rounded-full bg-neutral-200 group-hover:bg-blue-600 transition-colors" />

              {/* Timeline Line (Mobile) */}
              <div className="md:hidden absolute left-0 top-2 bottom-0 w-px bg-neutral-100 group-last:hidden" />
              <div className="md:hidden absolute left-[-3.5px] top-2 w-2 h-2 rounded-full bg-neutral-200 group-hover:bg-blue-600 transition-colors" />

              <div className="flex flex-col md:flex-row md:gap-12">
                <span className="font-mono text-xs text-neutral-400 uppercase w-32 shrink-0 pt-1 mb-2 md:mb-0">{exp.period}</span>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-neutral-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {exp.role} <span className="text-neutral-400 font-normal">at {exp.company}</span>
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-sm max-w-xl">
                    {exp.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};