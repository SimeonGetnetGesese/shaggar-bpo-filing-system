import React from 'react';
import { motion } from 'motion/react';
import { WebsiteSpec } from '../types';
import { Globe, Layout, Cpu, Zap } from 'lucide-react';

interface WebsiteDashboardProps {
  spec: WebsiteSpec;
}

export const WebsiteDashboard: React.FC<WebsiteDashboardProps> = ({ spec }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold text-black tracking-tighter uppercase">{spec.siteName}</h1>
        <p className="text-xl text-slate-500 font-medium">Website Architecture & Design Specs</p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pages & Sitemap */}
        <section className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tight mb-6">
            <Layout className="w-5 h-5" />
            Sitemap & Pages
          </div>
          <ul className="space-y-3">
            {spec.pages.map((page, idx) => (
              <li key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-black font-bold text-sm">
                <span className="text-slate-400">0{idx + 1}</span>
                {page}
              </li>
            ))}
          </ul>
        </section>

        {/* Features */}
        <section className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tight mb-6">
            <Zap className="w-5 h-5" />
            Core Features
          </div>
          <div className="grid grid-cols-1 gap-3">
            {spec.features.map((feature, idx) => (
              <div key={idx} className="p-3 border-2 border-black bg-black text-white font-bold text-xs uppercase tracking-widest">
                {feature}
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tight mb-6">
            <Cpu className="w-5 h-5" />
            Technology Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {spec.techStack.map((tech, idx) => (
              <span key={idx} className="px-3 py-1 border-2 border-black font-bold text-xs">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Design Rationale */}
        <section className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tight mb-6">
            <Globe className="w-5 h-5" />
            Design Rationale
          </div>
          <p className="text-sm text-slate-700 leading-relaxed italic">
            {spec.designRationale}
          </p>
        </section>
      </div>
    </div>
  );
};
