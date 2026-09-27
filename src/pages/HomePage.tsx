import React from 'react';
import { PageType, EquipmentItem } from '../types/energy';
import { calculateCampusTotals } from '../utils/calculations';
import {
  Zap,
  Calculator,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Cpu,
  BarChart3,
  Sparkles,
  Server,
  Layers,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  equipment: EquipmentItem[];
  tariffRate: number;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, equipment, tariffRate }) => {
  const totals = calculateCampusTotals(equipment, tariffRate);

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl shadow-cyan-950/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          {/* Natural human editorial kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Academic Mini-Project · B.Tech Engineering Curriculum</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Campus Power Consumption Estimator
          </h1>

          <p className="text-lg sm:text-xl font-medium text-cyan-200/90">
            Smart Energy Estimation, Cost Projection & AI-Based Forecasting
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            This project estimates electricity consumption and electricity cost for electrical equipment used across a college campus. It combines electrical engineering calculations, mathematical data representation, Python programming and simple AI-based forecasting to understand present and future energy usage.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('estimator')}
              className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              <span>Start Estimating</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-xl transition-all hover:text-white"
            >
              <span>View Project</span>
            </button>

            <button
              onClick={() => onNavigate('results')}
              className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              <span>Explore Live Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live campus snapshot banner */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Total Registered Equipment</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">
              {totals.count} <span className="text-xs text-slate-400 font-sans font-normal">items</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Monthly Campus Energy</div>
            <div className="text-2xl font-bold text-cyan-300 font-mono tabular-nums">
              {totals.totalMonthlyKwh.toLocaleString()} <span className="text-xs text-slate-400 font-sans font-normal">kWh</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Estimated Monthly Cost</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
              ₹{totals.totalMonthlyCost.toLocaleString()}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Highest Power Load</div>
            <div className="text-base font-semibold text-amber-300 truncate" title={totals.highestEnergyItem?.name}>
              {totals.highestEnergyItem?.name || 'N/A'}
            </div>
          </div>
        </div>
      </section>

      {/* Four Core Feature Cards */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-cyan-400">
            01. Key Architectural Capabilities
          </div>
          <h2 className="text-2xl font-bold text-white">
            Core Project Modules
          </h2>
          <p className="text-sm text-slate-400">
            Engineered using first-principles electrical engineering formulas and Python data handling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Energy Estimation */}
          <div
            onClick={() => onNavigate('estimator')}
            className="group cursor-pointer rounded-xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-800/50 hover:border-cyan-500/40 p-6 transition-all duration-200 backdrop-blur-md flex flex-col justify-between hover:-translate-y-1 shadow-md hover:shadow-cyan-500/10"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Energy Estimation
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Calculate daily and monthly electricity consumption across any departmental equipment using rated wattage, count, and hours.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 group-hover:text-cyan-300 font-medium">
              <span>Open Estimator</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Cost Projection */}
          <div
            onClick={() => onNavigate('results')}
            className="group cursor-pointer rounded-xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-800/50 hover:border-emerald-500/40 p-6 transition-all duration-200 backdrop-blur-md flex flex-col justify-between hover:-translate-y-1 shadow-md hover:shadow-emerald-500/10"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Cost Projection
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Estimate electricity cost using the electricity tariff (₹/kWh) applied to individual machines, laboratories, or whole wings.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-emerald-400 group-hover:text-emerald-300 font-medium">
              <span>View Cost Ledger</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: AI Forecasting */}
          <div
            onClick={() => onNavigate('forecast')}
            className="group cursor-pointer rounded-xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-800/50 hover:border-blue-500/40 p-6 transition-all duration-200 backdrop-blur-md flex flex-col justify-between hover:-translate-y-1 shadow-md hover:shadow-blue-500/10"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  AI Forecasting
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Predict future monthly energy consumption using historical data and linear regression (Ordinary Least Squares mathematical model).
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-blue-400 group-hover:text-blue-300 font-medium">
              <span>Run AI Prediction</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Energy Saving */}
          <div
            onClick={() => onNavigate('results')}
            className="group cursor-pointer rounded-xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-800/50 hover:border-amber-500/40 p-6 transition-all duration-200 backdrop-blur-md flex flex-col justify-between hover:-translate-y-1 shadow-md hover:shadow-amber-500/10"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Energy Saving
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Generate simple recommendations for reducing unnecessary energy usage based on hours, high wattage, and standby power.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-amber-400 group-hover:text-amber-300 font-medium">
              <span>View Audit Rules</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Academic Integration Snapshot */}
      <section className="rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-cyan-400">
              Curricular Alignment
            </div>
            <h2 className="text-xl font-bold text-white">
              B.Tech Interdisciplinary Syllabi Integration
            </h2>
            <p className="text-xs text-slate-400">
              Directly maps JNTUK R23 First Semester foundational engineering and computational concepts.
            </p>
          </div>
          <button
            onClick={() => onNavigate('subjects')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors self-start sm:self-auto"
          >
            <span>Read Academic Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Electrical Engineering</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              Power conversion, kWh metric, equipment power ratings, and unit tariffs.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Linear Algebra</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              Vector formulation [P, U, H] and matrix element-wise calculations.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <Server className="w-4 h-4" />
              <span>Python & Pandas</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              CSV data handling, mathematical array transformation, and modular logic.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Machine Learning</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              Linear regression, trend fitting (y = mx + c), and future month projection.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
