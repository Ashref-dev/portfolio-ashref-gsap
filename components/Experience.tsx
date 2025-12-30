import { useState } from 'react';
import { ChevronDown, Briefcase } from 'lucide-react';
import { cn } from '../utils';

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-neutral-100 rounded-full">
            <Briefcase className="w-5 h-5 text-neutral-600" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Work History</h2>
        </div>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              className="border-b border-neutral-100 last:border-0"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left group hover:bg-neutral-50/50 transition-colors px-2 rounded-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <span className="font-mono text-xs text-neutral-400 uppercase w-32 shrink-0">{exp.period}</span>
                  <h3 className="text-lg font-medium text-neutral-900 group-hover:text-blue-600 transition-colors">
                    {exp.role} <span className="text-neutral-400 font-normal">at {exp.company}</span>
                  </h3>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-neutral-400 transition-transform duration-300", openIndex === i ? "rotate-180" : "")} />
              </button>
              
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out px-2 md:pl-40",
                openIndex === i ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"
              )}>
                <p className="text-neutral-500 leading-relaxed text-sm md:text-base max-w-xl">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};