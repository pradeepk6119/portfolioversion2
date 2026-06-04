import React, { useState } from 'react';
import { SKILLS } from '../data';
import { Skill } from '../types';
import { Code, Database, Cpu, Film, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function SkillShowcase() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'focus_ai' | 'hobbies'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const categories = [
    { id: 'all', name: 'All Skills', icon: Sparkles },
    { id: 'frontend', name: 'Frontend', icon: Code },
    { id: 'backend', name: 'Core Java & Data', icon: Database },
    { id: 'focus_ai', name: 'AI & IoT', icon: Cpu },
    { id: 'hobbies', name: 'Editing & Interests', icon: Film },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

  return (
    <div className="bg-[var(--primary-bgcolor)]/5 border border-[var(--theme-card-border)] rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-[#D92243] text-white shadow-md shadow-[#D92243]/20 translate-y-[-1px]'
                  : 'bg-[var(--theme-card-border)] text-[var(--theme-text-primary)] hover:bg-[var(--primary-bgcolor)]/15'
              }`}
              id={`skill-filter-${cat.id}`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
 
      {/* Skills & Info Container */}
      <div className="space-y-6">
        {/* Skills Grid - Responsive 3-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-[var(--theme-card-bg)] border border-[var(--theme-card-border)] rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-[#D92243]/30 cursor-pointer flex flex-col justify-between min-h-[160px]"
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              id={`skill-card-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D92243] shrink-0" />
                    <span className="font-display font-medium text-[var(--theme-text-primary)] text-sm md:text-base leading-tight">{skill.name}</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#D92243] bg-[#D92243]/10 px-2 py-0.5 rounded shrink-0">
                    {skill.level}%
                  </span>
                </div>
                
                {/* Progress bar container */}
                <div className="w-full bg-[var(--theme-card-border)] h-1.5 rounded-full overflow-hidden mb-3">
                  <div 
                    className="bg-[#D92243] h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-[var(--theme-text-secondary)] mt-1 flex-grow">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {/* Horizontal Info Panel at the bottom */}
        <div className="bg-[#37353E] text-[#E6D8C3] rounded-xl p-6 shadow-inner relative overflow-hidden transition-all duration-300">
          {/* Subtle high-contrast accent graphic */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D92243]/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <h3 className="font-display text-base md:text-lg text-white font-medium mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D92243]" />
                <span>Skill Focus & Competence</span>
              </h3>
              
              {hoveredSkill ? (
                <div className="space-y-1.5">
                  <div className="inline-flex text-[10px] bg-[#D92243] text-white font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                    {hoveredSkill.category.replace('_', ' ')}
                  </div>
                  <h4 className="text-lg font-display font-bold text-white">{hoveredSkill.name}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                    {hoveredSkill.description}
                  </p>
                </div>
              ) : (
                <p className="text-sm italic text-[#E6D8C3]/70">
                  Hover over or touch any specific skill card above to preview technical applications, experience breakdowns, and specific utility contexts.
                </p>
              )}
            </div>

            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#E6D8C3]/20 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2.5 text-xs text-[#E6D8C3]/80 mb-1.5">
                <Check className="w-4 h-4 text-[#D92243] shrink-0" />
                <span className="font-semibold">Bengaluru Internship Verified Stack</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Core Java libraries & relational SQL design form the backbone of these services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
