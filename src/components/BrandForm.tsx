import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';

interface BrandFormProps {
  onSubmit: (mission: string) => void;
  isLoading: boolean;
}

export const BrandForm: React.FC<BrandFormProps> = ({ onSubmit, isLoading }) => {
  const [mission, setMission] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mission.trim()) {
      onSubmit(mission);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-slate-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-900">Define Your Vision</h2>
      </div>
      
      <p className="text-slate-500 mb-8 leading-relaxed">
        Describe your company's mission, values, and what makes you unique. 
        Our AI will distill this into a cohesive brand identity.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="mission" className="block text-sm font-medium text-slate-700 mb-2">
            Company Mission & Values
          </label>
          <textarea
            id="mission"
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            placeholder="e.g., We create sustainable, high-performance outdoor gear for modern explorers who value minimalism and durability..."
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !mission.trim()}
          className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Distilling Brand Essence...
            </>
          ) : (
            <>
              Generate Brand Bible
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
