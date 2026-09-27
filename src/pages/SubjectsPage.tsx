import React, { useState } from 'react';
import { Cpu, Layers, Terminal, FunctionSquare, ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';

export const SubjectsPage: React.FC = () => {
  const [activeVectorTab, setActiveVectorTab] = useState<'power' | 'units' | 'hours' | 'result'>('power');
  const [interactiveP, setInteractiveP] = useState<number[]>([1500, 200, 300, 75, 40]);
  const unitsVector = [5, 30, 5, 40, 100];
  const hoursVector = [8, 7, 5, 8, 8];

  return (
    <div className="space-y-12 py-6 sm:py-10">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Academic Curriculum Mapping</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Subjects Used in This Project
        </h1>
        <p className="text-base sm:text-lg font-medium text-cyan-200">
          Relevant JNTUK R23 First Semester Subjects
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Rather than abstract textbook exercises, this project synthesizes the core foundational subjects prescribed in the B.Tech First Year curriculum. Below are the directly applied subjects and their concrete engineering roles.
        </p>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject 1: Basic Electrical Engineering */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-cyan-500/40 transition-all shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Basic Electrical Engineering
                  </h3>
                  <p className="text-xs text-slate-400">Curricular Domain: Circuit & Energy Fundamentals</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
                Used in Project
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Subject Role:
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                This subject is used to understand electrical power, energy consumption, electrical units and electricity cost. The project uses power ratings of equipment and converts them into energy consumption.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                How It Is Used:
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                  <span>Power (W)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Energy (kWh)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Cost (₹)</span>
                </div>
                <p className="text-slate-400">
                  Equipment ratings (Watts) are multiplied by operating hours and converted to Commercial Board units (1 kWh = 1 Unit of electricity).
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Concrete Example:
              </div>
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs font-mono text-cyan-200 space-y-1">
                <div className="text-slate-300 font-sans font-semibold">Electrical Energy Law:</div>
                <div className="text-cyan-300">Energy = Power × Time</div>
                <div className="text-slate-400">P = 1500 W, Time = 8 hrs</div>
                <div className="text-emerald-300">Daily Energy = (1500 × 8) / 1000 = 12.0 kWh</div>
                <div className="text-emerald-400 font-semibold">Cost @ ₹8/unit = 12 × 8 = ₹96.00 / day</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Covers Ohm's Law, Active Power, Energy meters & Tariff structures</span>
          </div>
        </div>

        {/* Subject 2: Linear Algebra / Mathematics */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Linear Algebra / Mathematics
                  </h3>
                  <p className="text-xs text-slate-400">Curricular Domain: Vector Spaces & Matrix Operations</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-blue-300 bg-blue-950/60 border border-blue-800/60 px-2.5 py-1 rounded">
                Used in Project
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Subject Role:
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mathematical concepts are used to represent equipment and energy data using vectors, arrays and matrices. NumPy arrays are used to process multiple equipment values efficiently.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                How It Is Used:
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="text-blue-300 font-semibold font-mono">
                  Daily_kWh_Vector = (P ⊙ U ⊙ H) / 1000
                </div>
                <p className="text-slate-400">
                  Instead of slow iterative element-by-element loops, Linear Algebra utilizes vectorized Hadamard (element-wise) multiplication across 1D and 2D arrays.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Simple Interactive Example:
              </div>
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs font-mono space-y-2">
                <div className="text-slate-300 font-sans font-semibold">Equipment Power Vector (P):</div>
                <div className="text-blue-300 bg-slate-950/70 p-2 rounded">
                  P = [{interactiveP.join(', ')}] (Watts)
                </div>
                <div className="text-slate-300 font-sans font-semibold">Units Vector (U):</div>
                <div className="text-cyan-300 bg-slate-950/70 p-2 rounded">
                  U = [{unitsVector.join(', ')}]
                </div>
                <div className="text-slate-400 text-[11px] font-sans">
                  Total Instantaneous Campus Power = P · U = {interactiveP.reduce((acc, p, i) => acc + (p * unitsVector[i]), 0) / 1000} kW
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Covers Dot Products, Vector Spaces, Matrix Dimensions & Inverses</span>
          </div>
        </div>

        {/* Subject 3: Programming for Problem Solving */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Programming for Problem Solving
                  </h3>
                  <p className="text-xs text-slate-400">Curricular Domain: Algorithms, Python & Data Handling</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded">
                Used in Project
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Subject Role:
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Programming concepts are used to build the calculation logic, process CSV data, generate results, create graphs and connect the different modules of the project.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Core Programming Pillars Utilized:
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
                  <span className="font-semibold text-emerald-400">Variables:</span> Power, units, tariff
                </div>
                <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
                  <span className="font-semibold text-emerald-400">Functions:</span> compute_kwh(), predict()
                </div>
                <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
                  <span className="font-semibold text-emerald-400">Conditions:</span> High-wattage audit rules
                </div>
                <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
                  <span className="font-semibold text-emerald-400">Loops:</span> Iterating equipment records
                </div>
                <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
                  <span className="font-semibold text-emerald-400">Data Processing:</span> Aggregation
                </div>
                <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
                  <span className="font-semibold text-emerald-400">File Handling:</span> CSV parsing & export
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Python Code Implementation:
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 space-y-1">
                <div><span className="text-blue-400">import</span> pandas <span className="text-blue-400">as</span> pd</div>
                <div>df = pd.read_csv(<span className="text-amber-300">'equipment_data.csv'</span>)</div>
                <div>df[<span className="text-amber-300">'monthly_kwh'</span>] = (df[<span className="text-amber-300">'power'</span>] * df[<span className="text-amber-300">'units'</span>] * df[<span className="text-amber-300">'hours'</span>] * df[<span className="text-amber-300">'days'</span>]) / <span className="text-cyan-400">1000</span></div>
                <div>total_cost = df[<span className="text-amber-300">'monthly_kwh'</span>].sum() * <span className="text-cyan-400">8.0</span></div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Covers Control Flow, Modular Functions, Data Structures & CSV I/O</span>
          </div>
        </div>

        {/* Subject 4: Engineering Mathematics / Mathematical Foundations */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <FunctionSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Engineering Mathematics / Foundations
                  </h3>
                  <p className="text-xs text-slate-400">Curricular Domain: Calculus & Statistical Modeling</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded">
                Used in Project
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Subject Role:
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mathematical calculations are used for energy estimation, cost calculation, averages, trends and forecasting.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Mathematical Formulations Applied:
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2 font-mono">
                <div className="text-amber-300 font-semibold">
                  1. Ordinary Least Squares (OLS) Regression:
                </div>
                <div className="text-slate-400 text-[11px]">
                  Slope (m) = [ N·∑(xy) - ∑x·∑y ] / [ N·∑(x²) - (∑x)² ]
                </div>
                <div className="text-slate-400 text-[11px]">
                  Intercept (c) = ( ∑y - m·∑x ) / N
                </div>
                <div className="text-amber-200 text-[11px]">
                  Forecast: y(t) = m·t + c
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Statistical Accuracy Metric:
              </div>
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs space-y-1">
                <div className="text-slate-300 font-sans font-semibold">
                  Coefficient of Determination (R²):
                </div>
                <div className="font-mono text-amber-300">
                  R² = 1 - (SS_res / SS_tot) ≈ 0.993
                </div>
                <p className="text-[11px] text-slate-400">
                  Measures the goodness-of-fit of the monthly consumption trendline against actual campus electric sub-meters.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Covers Statistical Regression, Summations, Mean & Deviation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
