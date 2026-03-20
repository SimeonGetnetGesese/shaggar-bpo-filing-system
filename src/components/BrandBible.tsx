import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BrandIdentity, ImageSize } from '../types';
import { Palette, Type as TypeIcon, Image as ImageIcon, Download, RefreshCw, Loader2, Sparkles } from 'lucide-react';
import { generateBrandImage } from '../services/gemini';

interface BrandBibleProps {
  identity: BrandIdentity;
  onUpdateLogo: (url: string) => void;
  onUpdateMarks: (urls: string[]) => void;
}

export const BrandBible: React.FC<BrandBibleProps> = ({ identity, onUpdateLogo, onUpdateMarks }) => {
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const [isGeneratingMarks, setIsGeneratingMarks] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ImageSize>(ImageSize.SIZE_1K);

  const handleGenerateLogo = async () => {
    setIsGeneratingLogo(true);
    try {
      const prompt = `Professional primary logo for a brand named "${identity.brandName}". Tagline: "${identity.tagline}". Mission: ${identity.mission}. Minimalist, high-end, vector style, white background.`;
      const url = await generateBrandImage(prompt, selectedSize);
      onUpdateLogo(url);
    } catch (error) {
      console.error("Logo generation failed", error);
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  const handleGenerateMarks = async () => {
    setIsGeneratingMarks(true);
    try {
      const prompt = `Set of 3 secondary brand marks and icons for "${identity.brandName}". Style: ${identity.palette[0].name} themed, minimalist, geometric, white background.`;
      const url = await generateBrandImage(prompt, selectedSize);
      onUpdateMarks([url]); // For simplicity, we generate one image containing marks
    } catch (error) {
      console.error("Marks generation failed", error);
    } finally {
      setIsGeneratingMarks(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Header Section */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">{identity.brandName}</h1>
        <p className="text-xl text-indigo-600 font-medium italic">"{identity.tagline}"</p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Visuals */}
        <div className="lg:col-span-2 space-y-8">
          {/* Primary Logo */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <ImageIcon className="w-5 h-5 text-indigo-500" />
                Primary Logo
              </div>
              <div className="flex items-center gap-4">
                <select 
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value as ImageSize)}
                  className="text-xs border-slate-200 rounded-lg px-2 py-1"
                >
                  <option value={ImageSize.SIZE_1K}>1K</option>
                  <option value={ImageSize.SIZE_2K}>2K</option>
                  <option value={ImageSize.SIZE_4K}>4K</option>
                </select>
                <button 
                  onClick={handleGenerateLogo}
                  disabled={isGeneratingLogo}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-indigo-600"
                >
                  {isGeneratingLogo ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="aspect-square bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-dashed border-slate-200">
              {identity.primaryLogoUrl ? (
                <img src={identity.primaryLogoUrl} alt="Primary Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              ) : (
                <div className="text-center p-8">
                  <p className="text-slate-400 text-sm mb-4">No logo generated yet</p>
                  <button onClick={handleGenerateLogo} className="text-indigo-600 font-semibold text-sm hover:underline">Generate Now</button>
                </div>
              )}
            </div>
          </section>

          {/* Secondary Marks */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Secondary Marks
              </div>
              <button 
                onClick={handleGenerateMarks}
                disabled={isGeneratingMarks}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-indigo-600"
              >
                {isGeneratingMarks ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {identity.secondaryMarks.length > 0 ? (
                identity.secondaryMarks.map((url, idx) => (
                  <div key={idx} className="aspect-[2/1] bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200">
                    <img src={url} alt={`Secondary Mark ${idx}`} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                ))
              ) : (
                <div className="aspect-[2/1] bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-200">
                  <button onClick={handleGenerateMarks} className="text-indigo-600 font-semibold text-sm hover:underline">Generate Marks</button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Specs */}
        <div className="space-y-8">
          {/* Color Palette */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-slate-800 mb-6">
              <Palette className="w-5 h-5 text-indigo-500" />
              Color Palette
            </div>
            <div className="space-y-4">
              {identity.palette.map((color, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-inner border border-black/5"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-900">{color.name}</span>
                      <code className="text-[10px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">{color.hex}</code>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{color.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-slate-800 mb-6">
              <TypeIcon className="w-5 h-5 text-indigo-500" />
              Typography
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block mb-2">Header Font</label>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-2xl text-slate-900" style={{ fontFamily: identity.fonts.headerFont }}>{identity.fonts.headerFont}</p>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block mb-2">Body Font</label>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: identity.fonts.bodyFont }}>
                    {identity.fonts.bodyFont} - The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed">
                Rationale: {identity.fonts.rationale}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
