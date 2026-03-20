import React from 'react';
import { motion } from 'motion/react';
import { TrainingSpec } from '../types';
import { Users, GraduationCap, BookOpen, Clock, UserCheck } from 'lucide-react';

interface TrainingDashboardProps {
  spec: TrainingSpec;
}

export const TrainingDashboard: React.FC<TrainingDashboardProps> = ({ spec }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold text-black tracking-tighter uppercase">{spec.programName}</h1>
        <p className="text-xl text-slate-500 font-medium">Training Program & Curriculum Dashboard</p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Trainees & Trainers */}
        <section className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tight mb-6">
            <Users className="w-5 h-5" />
            Program Personnel
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block mb-2">Number of Trainees</label>
              <div className="text-4xl font-bold text-black">{spec.numTrainees}</div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block mb-2">Trainer Names</label>
              <div className="space-y-2">
                {spec.trainerNames.map((trainer, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border-2 border-black font-bold text-sm">
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    {trainer}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:col-span-2">
          <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tight mb-6">
            <BookOpen className="w-5 h-5" />
            Curriculum Modules
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {spec.curriculum.map((module, idx) => (
              <div key={idx} className="p-4 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-[10px] font-bold text-indigo-600 uppercase mb-1">Module 0{idx + 1}</div>
                <div className="font-bold text-sm">{module}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Duration & Program Details */}
        <section className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tight">
              <Clock className="w-5 h-5" />
              Program Duration
            </div>
            <div className="px-4 py-2 bg-black text-white font-bold text-sm uppercase tracking-widest">
              {spec.duration}
            </div>
          </div>
          <div className="p-6 bg-slate-50 border-2 border-black border-dashed">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
              <p className="text-sm text-slate-700 font-medium italic">
                This program is designed to deliver high-impact results through a structured, expert-led curriculum.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
