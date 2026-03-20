import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2, BookOpen, Globe, GraduationCap } from 'lucide-react';

export type ServiceCategory = 'branding' | 'website' | 'training';

interface BrandFormProps {
  onSubmit: (mission: string, category: ServiceCategory) => void;
  isLoading: boolean;
}

export const BrandForm: React.FC<BrandFormProps> = ({ onSubmit, isLoading }) => {
  const [mission, setMission] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('branding');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mission.trim()) {
      onSubmit(mission, category);
    }
  };

  const categories: { id: ServiceCategory; label: string; icon: any }[] = [
    { id: 'branding', label: 'Branding', icon: BookOpen },
    { id: 'website', label: 'Website', icon: Globe },
    { id: 'training', label: 'Training', icon: GraduationCap },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-black text-white">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-black uppercase tracking-tight">Define Your Vision</h2>
      </div>
      
      <p className="text-slate-600 mb-8 leading-relaxed font-medium">
        Select a service category and describe your company's mission. 
        Our AI will generate a comprehensive dashboard for your needs.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Category Selector */}
        <div className="grid grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`p-4 border-2 border-black flex flex-col items-center gap-2 transition-all font-bold text-xs uppercase tracking-widest ${
                category === cat.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-slate-50'
              }`}
            >
              <cat.icon className="w-6 h-6" />
              {cat.label}
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="mission" className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
            Company Mission & Values
          </label>
          <textarea
            id="mission"
            rows={5}
            className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black transition-all resize-none font-medium"
            placeholder="e.g., We create sustainable, high-performance outdoor gear for modern explorers..."
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !mission.trim()}
          className="w-full py-4 px-6 bg-black text-white font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:bg-slate-900 disabled:bg-slate-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Dashboard...
            </>
          ) : (
            <>
              Generate {category} Dashboard
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
