import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { BrandForm, ServiceCategory } from './components/BrandForm';
import { BrandBible } from './components/BrandBible';
import { WebsiteDashboard } from './components/WebsiteDashboard';
import { TrainingDashboard } from './components/TrainingDashboard';
import { AIChatBot } from './components/AIChatBot';
import { BrandIdentity, WebsiteSpec, TrainingSpec, ServiceData } from './types';
import { generateBrandStrategy, generateWebsiteSpec, generateTrainingSpec } from './services/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowLeft, Key, Globe, GraduationCap, LayoutDashboard } from 'lucide-react';

function AppContent() {
  const [serviceData, setServiceData] = useState<ServiceData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleGenerate = async (mission: string, category: ServiceCategory) => {
    setIsLoading(true);
    try {
      if (category === 'branding') {
        const strategy = await generateBrandStrategy(mission);
        const branding: BrandIdentity = {
          mission,
          brandName: strategy.brandName || "Untitled Brand",
          tagline: strategy.tagline || "Visionary Excellence",
          palette: strategy.palette || [],
          fonts: strategy.fonts || { headerFont: 'Inter', bodyFont: 'Inter', rationale: 'Default pairing' },
          secondaryMarks: []
        };
        setServiceData(prev => ({ ...prev, branding }));
        navigate('/branding');
      } else if (category === 'website') {
        const spec = await generateWebsiteSpec(mission);
        const website: WebsiteSpec = {
          siteName: spec.siteName || "Untitled Site",
          pages: spec.pages || [],
          features: spec.features || [],
          techStack: spec.techStack || [],
          designRationale: spec.designRationale || ""
        };
        setServiceData(prev => ({ ...prev, website }));
        navigate('/website');
      } else if (category === 'training') {
        const spec = await generateTrainingSpec(mission);
        const training: TrainingSpec = {
          programName: spec.programName || "Untitled Program",
          numTrainees: spec.numTrainees || 0,
          trainerNames: spec.trainerNames || [],
          curriculum: spec.curriculum || [],
          duration: spec.duration || ""
        };
        setServiceData(prev => ({ ...prev, training }));
        navigate('/training');
      }
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLogo = (url: string) => {
    if (serviceData.branding) {
      setServiceData({
        ...serviceData,
        branding: { ...serviceData.branding, primaryLogoUrl: url }
      });
    }
  };

  const updateMarks = (urls: string[]) => {
    if (serviceData.branding) {
      setServiceData({
        ...serviceData,
        branding: { ...serviceData.branding, secondaryMarks: urls }
      });
    }
  };

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center space-y-6">
          <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-black uppercase tracking-tight">API Key Required</h1>
          <p className="text-slate-600 font-medium">
            To generate high-quality brand assets and logos, you need to select a Gemini API key.
          </p>
          <button
            onClick={handleOpenKeySelector}
            className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-slate-900 transition-all"
          >
            Select API Key
          </button>
          <p className="text-xs text-slate-400">
            Requires a paid Google Cloud project. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-black hover:underline font-bold">Learn more</a>
          </p>
        </div>
      </div>
    );
  }

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white border-b-2 border-black sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tighter text-black uppercase">
            <LayoutDashboard className="w-6 h-6" />
            ServiceHub
          </Link>
          <div className="flex items-center gap-6">
            {!isHome && (
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-xs font-bold text-black uppercase tracking-widest hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                New Service
              </button>
            )}
            <div className="flex items-center gap-4">
              <Link to="/branding" className={`text-[10px] font-bold uppercase tracking-widest ${location.pathname === '/branding' ? 'text-black underline' : 'text-slate-400 hover:text-black'}`}>Branding</Link>
              <Link to="/website" className={`text-[10px] font-bold uppercase tracking-widest ${location.pathname === '/website' ? 'text-black underline' : 'text-slate-400 hover:text-black'}`}>Website</Link>
              <Link to="/training" className={`text-[10px] font-bold uppercase tracking-widest ${location.pathname === '/training' ? 'text-black underline' : 'text-slate-400 hover:text-black'}`}>Training</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-12 px-6">
        <Routes>
          <Route path="/" element={<BrandForm onSubmit={handleGenerate} isLoading={isLoading} />} />
          <Route path="/branding" element={
            serviceData.branding ? (
              <BrandBible 
                identity={serviceData.branding} 
                onUpdateLogo={updateLogo}
                onUpdateMarks={updateMarks}
              />
            ) : (
              <div className="text-center py-24">
                <p className="text-slate-400 font-bold uppercase tracking-widest">No Branding Data Found</p>
                <Link to="/" className="text-black underline font-bold mt-4 block">Generate Now</Link>
              </div>
            )
          } />
          <Route path="/website" element={
            serviceData.website ? (
              <WebsiteDashboard spec={serviceData.website} />
            ) : (
              <div className="text-center py-24">
                <p className="text-slate-400 font-bold uppercase tracking-widest">No Website Data Found</p>
                <Link to="/" className="text-black underline font-bold mt-4 block">Generate Now</Link>
              </div>
            )
          } />
          <Route path="/training" element={
            serviceData.training ? (
              <TrainingDashboard spec={serviceData.training} />
            ) : (
              <div className="text-center py-24">
                <p className="text-slate-400 font-bold uppercase tracking-widest">No Training Data Found</p>
                <Link to="/" className="text-black underline font-bold mt-4 block">Generate Now</Link>
              </div>
            )
          } />
        </Routes>
      </main>

      <AIChatBot />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
