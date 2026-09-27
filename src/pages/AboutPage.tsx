import React, { useState } from 'react';
import {
  HelpCircle,
  Cpu,
  Layers,
  Code2,
  FileSpreadsheet,
  TrendingUp,
  BarChart3,
  Globe,
  Palette,
  FileCode,
  ArrowDown,
  CheckCircle2,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const technologies = [
    {
      name: 'Python',
      category: 'Core Programming',
      description: 'Used for algorithm structuring, math computation scripts, and model design.',
      icon: Code2,
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      name: 'NumPy',
      category: 'Linear Algebra',
      description: 'Provides n-dimensional arrays, vectorized element-wise multiplication, and polynomial fitting.',
      icon: Layers,
      color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    },
    {
      name: 'Pandas',
      category: 'Data Science',
      description: 'Handles tabular equipment dataframes, grouping, dynamic aggregations, and series calculations.',
      icon: FileSpreadsheet,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      name: 'CSV Files',
      category: 'Data Persistence',
      description: 'Lightweight flat-file data exchange formats (equipment_data.csv & historical_usage.csv).',
      icon: FileCode,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      name: 'Linear Regression',
      category: 'Machine Learning',
      description: 'Supervised predictive regression algorithm minimizing squared errors to forecast future kWh.',
      icon: TrendingUp,
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    },
    {
      name: 'Matplotlib / Chart.js',
      category: 'Data Visualization',
      description: 'Visual curves for power distributions, monthly expenditure bars, and trendlines.',
      icon: BarChart3,
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
    {
      name: 'HTML5',
      category: 'Semantic Markup',
      description: 'Clean semantic structure, accessible tables, forms, and accessible screen elements.',
      icon: Globe,
      color: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    },
    {
      name: 'Tailwind CSS',
      category: 'Styling & Layout',
      description: 'Modern dashboard UI system with responsive layouts, typography, and glass effects.',
      icon: Palette,
      color: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
    },
    {
      name: 'JavaScript / TS',
      category: 'Interactive Engine',
      description: 'Client-side reactivity, instant mathematical evaluation, and live interactive state.',
      icon: Cpu,
      color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    },
  ];

  const workflowSteps = [
    { title: 'Equipment Data', subtitle: 'Watts, Units, Daily Hours, Days' },
    { title: 'Power Calculation', subtitle: 'Connected load (kW) per appliance' },
    { title: 'Energy Calculation', subtitle: 'Daily & Monthly unit (kWh) conversion' },
    { title: 'NumPy Data Processing', subtitle: 'Vectorized array transformations' },
    { title: 'Pandas / CSV Processing', subtitle: 'Tabular storage & dataframe synthesis' },
    { title: 'Cost Estimation', subtitle: 'Tariff multiplier (₹/unit) expenditure' },
    { title: 'Historical Data Analysis', subtitle: 'Baseline consumption trend extraction' },
    { title: 'AI Forecasting', subtitle: 'Ordinary Least Squares Linear Regression' },
    { title: 'Graphs & Dashboard', subtitle: 'Equipment bars, pie shares & trendlines' },
    { title: 'Energy Saving Recommendations', subtitle: 'Actionable load-shedding insights' },
  ];

  const vivaQuestions = [
    {
      q: 'What is the fundamental difference between Power (kW) and Energy (kWh)?',
      a: 'Power is the instantaneous rate at which electrical energy is consumed or transferred (P = V × I, measured in Watts or kW). Energy is the total cumulative work done over a duration of time (E = P × t). In electricity billing, 1 kWh equals 1 commercial Unit consumed for one hour by a 1,000 Watt device.',
    },
    {
      q: 'How does Linear Algebra optimize calculations over regular Python for-loops?',
      a: 'Linear Algebra expresses equipment ratings, quantities, and hours as 1D vectors: P, U, and H. Using NumPy, the system performs element-wise Hadamard multiplication (P ⊙ U ⊙ H) and dot products in compiled C memory at the hardware level, avoiding the overhead of interpreted Python loops.',
    },
    {
      q: 'Why was Linear Regression chosen for the forecasting module?',
      a: 'Linear Regression provides an interpretable, transparent, and computationally lightweight benchmark for trend extrapolation without requiring heavy neural networks or complex hyperparameter tuning. It uses Ordinary Least Squares to find the global optimum slope and intercept in closed form.',
    },
    {
      q: 'What is the role of the R² (Coefficient of Determination) metric?',
      a: 'R² represents the proportion of variance in the dependent variable (energy consumption in kWh) that is predictable from the independent variable (month index). A value close to 1.0 (such as 0.99) confirms that the linear model captures the historical seasonal trend with minimal error.',
    },
    {
      q: 'How can this project assist campus administrators in green energy transitions?',
      a: 'By identifying the highest-power equipment (such as ACs and laboratory centrifuges) and comparing total monthly kWh against local solar rooftop yields, administrators can size photovoltaic arrays, schedule peak shaving, and minimize energy waste.',
    },
  ];

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Project Synopsis & Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About the Project
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Comprehensive project report covering the problem statement, engineering architecture, cross-subject integration, and viva examination reference guide.
        </p>
      </div>

      {/* Problem Statement & Proposed Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Statement */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
            <span>Challenge</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Problem Statement
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            College campuses use many electrical devices such as air conditioners, computers, lights, fans, laboratory equipment and projectors. It can be difficult to estimate total electricity consumption and identify equipment that consumes more energy.
          </p>
          <div className="pt-2 text-xs text-slate-400 space-y-1.5 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Lack of granular department-level appliance auditing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Difficulty forecasting upcoming billing cycles</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Uncontrolled standby energy waste in vacant lecture halls</span>
            </div>
          </div>
        </div>

        {/* Proposed Solution */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>Methodology</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Proposed Solution
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The Campus Power Consumption Estimator calculates electricity consumption and cost using equipment power ratings, number of units, operating hours and working days.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            The system also analyzes historical consumption and uses simple linear regression to forecast future electricity usage, generating intelligent load reduction recommendations.
          </p>
          <div className="pt-2 text-xs text-slate-400 space-y-1.5 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Standardized electrical formula integration (W → kWh → ₹)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Linear algebra vectorization for instant multi-equipment math</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Predictive forecasting powered by ordinary least squares</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Used Grid */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-cyan-400">
            Technology Stack
          </div>
          <h2 className="text-2xl font-bold text-white">
            Technologies Used in This Project
          </h2>
          <p className="text-xs text-slate-400">
            Core computational and web engineering tools powering the estimation pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${tech.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{tech.name}</h4>
                    <span className="text-[11px] text-slate-400">{tech.category}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Workflow Visual Representation */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-cyan-400">
            Architectural Pipeline
          </div>
          <h2 className="text-2xl font-bold text-white">
            Project Workflow
          </h2>
          <p className="text-xs text-slate-400">
            Data transformation steps from raw equipment inputs to administrative decision intelligence.
          </p>
        </div>

        {/* Vertical/Horizontal Responsive Visual Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {workflowSteps.map((step, idx) => (
            <div
              key={step.title}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-2 relative group hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>0{idx + 1}</span>
                {idx < workflowSteps.length - 1 && (
                  <span className="text-cyan-400 text-xs hidden lg:inline">→</span>
                )}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {step.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Deep Dives: Linear Algebra & Basic Electrical Engineering */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Linear Algebra Deep Dive */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Linear Algebra Representation</h3>
              <p className="text-xs text-slate-400">Mathematical Vector Formulation</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The project maps physical campus appliances into mathematical vectors. Instead of processing appliances independently, they are represented as parallel 1D arrays:
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 font-mono text-xs">
            <div>
              <span className="text-slate-400 font-sans font-medium">Power vector:</span>
              <div className="text-blue-300 mt-0.5">P = [1500, 200, 300, 75, 40] (Watts)</div>
            </div>
            <div>
              <span className="text-slate-400 font-sans font-medium">Units vector:</span>
              <div className="text-cyan-300 mt-0.5">U = [5, 30, 5, 40, 100]</div>
            </div>
            <div>
              <span className="text-slate-400 font-sans font-medium">Hours vector:</span>
              <div className="text-emerald-300 mt-0.5">H = [8, 7, 5, 8, 8] (hrs/day)</div>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 font-sans">
              <span className="font-semibold text-white">Vector Formula:</span>
              <div className="font-mono text-amber-300 mt-1">
                Energy = (Power × Units × Hours) / 1000
              </div>
              <p className="text-slate-400 mt-1 text-xs">
                In NumPy, this represents the Hadamard product followed by scalar division by 1000.
              </p>
            </div>
          </div>
        </div>

        {/* Basic Electrical Engineering Deep Dive */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Basic Electrical Engineering</h3>
              <p className="text-xs text-slate-400">Power, Energy & Tariff Formulas</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Standard electrical laws form the operational foundation of this project:
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div>
              <span className="text-slate-400 font-sans font-medium">1. Electrical Power:</span>
              <div className="text-cyan-300 mt-0.5 font-bold">P = V × I</div>
              <p className="text-[11px] font-sans text-slate-400">Product of operating voltage (230V single phase / 415V three phase) and load current.</p>
            </div>

            <div>
              <span className="text-slate-400 font-sans font-medium">2. Electrical Energy:</span>
              <div className="text-blue-300 mt-0.5 font-bold">E = P × t</div>
              <p className="text-[11px] font-sans text-slate-400">Rate of power consumed continuously over operating period t.</p>
            </div>

            <div>
              <span className="text-slate-400 font-sans font-medium">3. Applied Campus Project Formula:</span>
              <div className="text-emerald-300 mt-0.5 font-bold">
                Energy (kWh) = Power (W) × Units × Hours / 1000
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-slate-400 font-sans font-medium">4. Tariff Expenditure:</span>
              <div className="text-amber-300 mt-0.5 font-bold">Cost = Energy × Electricity Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini-Project Viva Q&A Guide */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-cyan-400">
            Academic Examination Readiness
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Mini-Project Viva Examination Reference Guide</span>
          </h2>
          <p className="text-xs text-slate-400">
            Frequently asked questions by university external examiners during B.Tech project demonstrations.
          </p>
        </div>

        <div className="space-y-3">
          {vivaQuestions.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800/90 bg-slate-950/60 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 border-t border-slate-800/60 leading-relaxed bg-slate-950/90">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
