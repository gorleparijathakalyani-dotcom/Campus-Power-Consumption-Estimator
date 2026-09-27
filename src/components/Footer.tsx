import React from 'react';
import { PageType } from '../types/energy';
import { Zap, Cpu, Activity, BarChart2, BookOpen, Layers } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Campus Power Consumption Estimator
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              B.Tech Mini Project · Smart energy estimation, cost projection, and AI-based linear regression forecasting for college campus electrical loads.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Electrical Engg</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Linear Algebra</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Python / NumPy</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Forecasting</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('subjects')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Subjects Used (JNTUK R23)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estimator')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Energy Estimator Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Results & Analysis
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Project Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Analysis & Intelligence
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('forecast')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Linear Regression</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Equipment Energy Audits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  B.Tech Mini-Project Report & Viva Q&A
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="font-semibold text-slate-300">Campus Power Consumption Estimator</span>
            {' '}— B.Tech Mini Project
          </div>
          <div className="text-center sm:text-right text-slate-400">
            Integration of Electrical Engineering + Mathematics + Programming + AI
          </div>
        </div>
      </div>
    </footer>
  );
};
