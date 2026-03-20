import React, { useState, useEffect } from 'react';
import { BrandForm } from './components/BrandForm';
import { BrandBible } from './components/BrandBible';
import { AIChatBot } from './components/AIChatBot';
import { BrandIdentity } from './types';
import { generateBrandStrategy } from './services/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowLeft, Key } from 'lucide-react';

export default function App() {
  const [identity, setIdentity] = useState<BrandIdentity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleGenerate = async (mission: string) => {
    setIsLoading(true);
    try {
      const strategy = await generateBrandStrategy(mission);
      setIdentity({
        mission,
        brandName: strategy.brandName || "Untitled Brand",
        tagline: strategy.tagline || "Visionary Excellence",
        palette: strategy.palette || [],
        fonts: strategy.fonts || { headerFont: 'Inter', bodyFont: 'Inter', rationale: 'Default pairing' },
        secondaryMarks: []
      });
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLogo = (url: string) => {
    if (identity) setIdentity({ ...identity, primaryLogoUrl: url });
  };

  const updateMarks = (urls: string[]) => {
    if (identity) setIdentity({ ...identity, secondaryMarks: urls });
  };

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center space-y-6 border border-slate-100">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
            <Key className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">API Key Required</h1>
          <p className="text-slate-500">
            To generate high-quality brand assets and logos, you need to select a Gemini API key.
          </p>
          <button
            onClick={handleOpenKeySelector}
            className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            Select API Key
          </button>
          <p className="text-xs text-slate-400">
            Requires a paid Google Cloud project. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-indigo-500 hover:underline">Learn more</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600">
            <BookOpen className="w-6 h-6" />
            BrandBible
          </div>
          {identity && (
            <button 
              onClick={() => setIdentity(null)}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              New Identity
            </button>
          )}
        </div>
      </nav>

      <main className="py-12 px-6">
        <AnimatePresence mode="wait">
          {!identity ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <BrandForm onSubmit={handleGenerate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="bible"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BrandBible 
                identity={identity} 
                onUpdateLogo={updateLogo}
                onUpdateMarks={updateMarks}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AIChatBot />
    </div>
  );
}
