import React from 'react';
import { ArrowRight, Code2, CheckCircle2, Gamepad2 } from 'lucide-react';
import { Reveal } from './Reveal';

interface BlogPostProps {
  Icon: React.ElementType;
  title: string;
  category: string;
  description: string;
  iconColor: string;
  bgColor: string;
  link: string;
  delay?: '100' | '200' | '300';
}

const BlogPost: React.FC<BlogPostProps> = ({ Icon, title, category, description, iconColor, bgColor, link, delay }) => (
  <Reveal delay={delay} className="group h-full">
    <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
      <div className="bg-white rounded-[2rem] p-3 border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
        
        {/* Image/Icon Container */}
        <div className="aspect-[4/3] bg-neutral-100 rounded-[1.5rem] overflow-hidden relative mb-4">
          <div className={`absolute inset-0 ${bgColor} flex items-center justify-center ${iconColor} group-hover:scale-105 transition-transform duration-500`}>
            <Icon className="w-12 h-12" strokeWidth={1} />
          </div>
        </div>

        {/* Content */}
        <div className="px-3 pb-4">
          <div className="flex gap-3 mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <span>{category}</span>
          </div>
          {/* Using Montserrat specifically for the blog titles as requested */}
          <h3 className="text-xl font-bold font-[Montserrat] text-neutral-900 group-hover:text-rose-600 transition-colors line-clamp-2 mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
    </a>
  </Reveal>
);

export const Blog: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-neutral-100 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex justify-between items-end mb-12 px-2">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">Latest <span className="font-serif italic text-neutral-500">Thoughts.</span></h2>
              <a href="https://www.instagram.com/ashref.dev/" target="_blank" className="hidden md:flex items-center gap-2 text-sm font-semibold font-[Montserrat] hover:text-rose-600 transition-colors">
                  View all posts <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
            <BlogPost 
              Icon={Code2}
              title="Harness the prowess of Reflection in C#"
              category="Development"
              description="Learn about reflection in C# and it's powerful features allowing for run-time flexibility."
              bgColor="bg-orange-50"
              iconColor="text-orange-500"
              link="https://www.instagram.com/p/C3YGWzVNp5V"
              delay="100"
            />
            <BlogPost 
              Icon={CheckCircle2}
              title="A few things about improving productivity"
              category="Productivity"
              description="A few notes on on how to boost your productivity with some simple but effective advice."
              bgColor="bg-blue-50"
              iconColor="text-blue-500"
              link="https://www.instagram.com/p/Co5UA5WLJId"
              delay="200"
            />
            <BlogPost 
              Icon={Gamepad2}
              title="Godot? is that a new pokemon or what?"
              category="Game Dev"
              description="Learn what Godot is and why it's loved by the game dev and open-source community."
              bgColor="bg-rose-50"
              iconColor="text-rose-500"
              link="https://www.instagram.com/p/Ck8D36rLkV9/"
              delay="300"
            />
        </div>
      </div>
    </section>
  );
};