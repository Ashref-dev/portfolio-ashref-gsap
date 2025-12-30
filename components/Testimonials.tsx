import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "He is an excellent graphic designer and so talented at finding solutions that are simple and effective, without over engineering everything. A valuable asset to any team.",
    author: "Ahmed Balti",
    role: "Full-Stack Developer @ NeoCortex",
    link: "https://www.linkedin.com/in/mohamedashrefbna/"
  },
  {
    text: "Ashref consistently exceeds expectations. He's not afraid to push boundaries and come up with innovative solutions. He's a valuable asset to any team, highly recommend!",
    author: "Taha Ben Othmen",
    role: "Solutions Developer @ Forvia",
    link: "https://www.linkedin.com/in/mohamedashrefbna/"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-neutral-900 text-white px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-mono text-neutral-500 tracking-[0.5em] uppercase mb-16 text-center">Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col justify-between">
              <div>
                <Quote className="w-8 h-8 text-neutral-700 mb-6" />
                <p className="text-xl md:text-2xl font-serif italic text-neutral-300 leading-relaxed mb-8">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-400">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.author}</h4>
                  <p className="text-sm text-neutral-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};