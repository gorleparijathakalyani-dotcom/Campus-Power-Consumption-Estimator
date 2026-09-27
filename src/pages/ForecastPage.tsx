import React, { useState } from 'react';
import { HistoricalRecord } from '../types/energy';
import { INITIAL_HISTORICAL_DATA } from '../data/mockData';
import { computeLinearRegression, generateHistoricalCsv } from '../utils/calculations';
import {
  TrendingUp,
  BrainCircuit,
  Download,
  Calendar,
  Sparkles,
  BarChart2,
  CheckCircle,
  FileCode,
  ArrowRight,
  Info,
  Layers,
  IndianRupee
} from 'lucide-react';

interface ForecastPageProps {
  tariffRate: number;
}

export const ForecastPage: React.FC<ForecastPageProps> = ({ tariffRate }) => {
  const [historicalData, setHistoricalData] = useState<HistoricalRecord[]>(INITIAL_HISTORICAL_DATA);
  const [targetMonthOffset, setTargetMonthOffset] = useState<number>(7); // Month 7 is July
  const [showCode, setShowCode] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; value: number } | null>(null);

  const regression = computeLinearRegression(historicalData, targetMonthOffset, tariffRate);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDownloadHistoricalCsv = () => {
    const csv = generateHistoricalCsv(historicalData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'historical_usage.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Chart coordinate calculations
  const allPoints = [
    ...historicalData.map((d) => ({
      index: d.monthIndex,
      label: d.month,
      value: d.energyKwh,
      isPrediction: false,
    })),
    {
      index: regression.targetMonthIndex,
      label: `${regression.targetMonthName} (Predicted)`,
      value: regression.predictedKwh,
      isPrediction: true,
    },
  ];

  const minY = Math.min(...allPoints.map((p) => p.value)) * 0.95;
  const maxY = Math.max(...allPoints.map((p) => p.value)) * 1.05;

  const chartWidth = 700;
  const chartHeight = 260;
  const paddingX = 60;
  const paddingY = 40;

  const getX = (idx: number) => {
    const minX = 1;
    const maxX = Math.max(...allPoints.map((p) => p.index));
    return paddingX + ((idx - minX) / (maxX - minX)) * (chartWidth - 2 * paddingX);
  };

  const getY = (val: number) => {
    return chartHeight - paddingY - ((val - minY) / (maxY - minY)) * (chartHeight - 2 * paddingY);
  };

  // Build SVG path strings
  const historicalPath = historicalData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.monthIndex)} ${getY(d.energyKwh)}`)
    .join(' ');

  const lastHistorical = historicalData[historicalData.length - 1];
  const predictionLine = `M ${getX(lastHistorical.monthIndex)} ${getY(lastHistorical.energyKwh)} L ${getX(regression.targetMonthIndex)} ${getY(regression.predictedKwh)}`;

  return (
    <div className="space-y-12 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>AI/ML Predictive Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI-Based Energy Forecast
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The project uses historical monthly electricity consumption data and a simple Linear Regression model to estimate future energy consumption.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
            <span>AI/ML Used: Linear Regression</span>
          </div>

          <button
            onClick={handleDownloadHistoricalCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>historical_usage.csv</span>
          </button>
        </div>
      </div>

      {/* Target Month Slider / Selector & Metric Output Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Forecast Horizon Control (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Target Forecasting Horizon</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select the future month to project campus consumption and estimated expenditure.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Selected Target Month:</span>
                <span className="text-cyan-300 font-mono text-sm">
                  {regression.targetMonthName} (Month {regression.targetMonthIndex})
                </span>
              </div>
              <input
                type="range"
                min="7"
                max="12"
                value={targetMonthOffset}
                onChange={(e) => setTargetMonthOffset(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Month 7 (Jul)</span>
                <span>Month 8 (Aug)</span>
                <span>Month 9 (Sep)</span>
                <span>Month 10 (Oct)</span>
                <span>Month 11 (Nov)</span>
                <span>Month 12 (Dec)</span>
              </div>
            </div>

            {/* Regression Model Parameters */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2 font-mono">
              <div className="text-slate-300 font-sans font-semibold text-xs flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ordinary Least Squares Model Parameters:</span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Slope (m):</span>
                  <span className="text-cyan-300">+{regression.slope} kWh / month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Intercept (c):</span>
                  <span className="text-slate-300">{regression.intercept} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Linear Equation:</span>
                  <span className="text-emerald-300">y = {regression.slope}x + {regression.intercept}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Goodness-of-Fit (R²):</span>
                  <span className="text-amber-300 font-bold">{regression.rSquared} (99.3% accuracy)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Results Cards (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Predicted Energy */}
          <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/80 via-cyan-950/20 to-slate-900/80 backdrop-blur-xl p-6 shadow-2xl shadow-cyan-950/20 space-y-3">
            <div className="flex items-center justify-between text-xs text-cyan-300 font-medium">
              <span>Predicted Energy ({regression.targetMonthName})</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono tabular-nums">
              {regression.predictedKwh.toLocaleString()}
              <span className="text-base text-slate-400 font-sans font-normal ml-2">kWh</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculated via: y = ({regression.slope} × {regression.targetMonthIndex}) + {regression.intercept}
            </p>
          </div>

          {/* Predicted Cost */}
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-slate-900/80 via-emerald-950/20 to-slate-900/80 backdrop-blur-xl p-6 shadow-2xl shadow-emerald-950/20 space-y-3">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-medium">
              <span>Predicted Monthly Cost</span>
              <IndianRupee className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-300 font-mono tabular-nums">
              ₹{regression.predictedCost.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Formula: Predicted kWh ({regression.predictedKwh}) × Tariff Rate (₹{tariffRate}/kWh)
            </p>
          </div>

          {/* Quick Historical Table */}
          <div className="sm:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 shadow-xl">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Historical Monthly Baseline (January – June)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              {historicalData.map((record) => (
                <div key={record.month} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">{record.month}</div>
                  <div className="font-mono font-bold text-white mt-1 tabular-nums">
                    {record.energyKwh} <span className="text-[10px] text-slate-400 font-normal">kWh</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Historical vs Predicted Energy Consumption Line Chart */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>Historical vs Predicted Energy Consumption</span>
            </h2>
            <p className="text-xs text-slate-400">
              Solid cyan line represents recorded electrical meter history; dashed amber line projects AI model output.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-1 bg-cyan-400 rounded-full" />
              <span className="text-slate-300">Historical Actuals (Jan - Jun)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-1 bg-amber-400 border-b border-dashed border-amber-300" />
              <span className="text-amber-300 font-medium">AI Linear Forecast</span>
            </div>
          </div>
        </div>

        {/* SVG Interactive Line Graph */}
        <div className="relative w-full overflow-x-auto">
          <svg
            className="w-full min-w-[620px] h-72"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            {/* Horizontal Grid lines */}
            {[minY, minY + (maxY - minY) * 0.33, minY + (maxY - minY) * 0.66, maxY].map((val, idx) => {
              const y = getY(val);
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="#1e293b"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 10}
                    y={y + 4}
                    textAnchor="end"
                    fill="#64748b"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {Math.round(val)}
                  </text>
                </g>
              );
            })}

            {/* Historical Solid Line */}
            <path
              d={historicalPath}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Projected Dashed Line */}
            <path
              d={predictionLine}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />

            {/* Historical Data Points */}
            {historicalData.map((d) => {
              const cx = getX(d.monthIndex);
              const cy = getY(d.energyKwh);
              return (
                <g
                  key={d.month}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredPoint({ label: d.month, value: d.energyKwh })}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r="5"
                    fill="#0f172a"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    className="transition-transform group-hover:scale-125"
                  />
                  <text
                    x={cx}
                    y={chartHeight - 12}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="11"
                    fontFamily="sans-serif"
                  >
                    {d.month.slice(0, 3)}
                  </text>
                  <text
                    x={cx}
                    y={cy - 12}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {d.energyKwh}
                  </text>
                </g>
              );
            })}

            {/* Predicted Data Point */}
            {(() => {
              const cx = getX(regression.targetMonthIndex);
              const cy = getY(regression.predictedKwh);
              return (
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() =>
                    setHoveredPoint({
                      label: `${regression.targetMonthName} (Predicted)`,
                      value: regression.predictedKwh,
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r="7"
                    fill="#fbbf24"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="animate-pulse"
                  />
                  <text
                    x={cx}
                    y={chartHeight - 12}
                    textAnchor="middle"
                    fill="#fbbf24"
                    fontSize="11"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                  >
                    {regression.targetMonthName.slice(0, 3)}*
                  </text>
                  <text
                    x={cx}
                    y={cy - 14}
                    textAnchor="middle"
                    fill="#fbbf24"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {regression.predictedKwh}
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* 7-Step AI Process Explanation */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-semibold text-cyan-400">
              Systematic ML Pipeline
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Step-by-Step AI Forecasting Process</span>
            </h2>
            <p className="text-xs text-slate-400">
              Complete computational sequence from raw historical input to electricity bill projection.
            </p>
          </div>

          <button
            onClick={() => setShowCode(!showCode)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors self-start sm:self-auto"
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showCode ? 'Hide Python Code' : 'View Python / NumPy Code'}</span>
          </button>
        </div>

        {/* 7 Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              step: 1,
              title: 'Read Historical CSV Data',
              desc: 'Import previous campus electricity readings (January–June) from the structured CSV file.',
            },
            {
              step: 2,
              title: 'Convert Months to Numerical Values',
              desc: 'Map month names to continuous integer sequence (January → 1, February → 2, ..., June → 6).',
            },
            {
              step: 3,
              title: 'Create X and Y Data Vectors',
              desc: 'Represent the independent chronological variable X and dependent energy metric Y as NumPy vectors.',
            },
            {
              step: 4,
              title: 'Apply Linear Regression',
              desc: 'Compute optimal slope (m) and intercept (c) minimizing sum of squared residuals via Least Squares.',
            },
            {
              step: 5,
              title: 'Predict Future Consumption',
              desc: 'Substitute future month index (e.g. Month 7 for July) into the linear equation y = mx + c.',
            },
            {
              step: 6,
              title: 'Calculate Estimated Electricity Cost',
              desc: 'Multiply forecasted kWh by statutory power utility commercial tariff rate (₹/kWh).',
            },
            {
              step: 7,
              title: 'Display Prediction Graph',
              desc: 'Render interactive comparative visualization with distinct trends for campus administration.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 font-mono">
                  Step 0{item.step}
                </span>
                <CheckCircle className="w-3.5 h-3.5 text-cyan-500/60" />
              </div>
              <h4 className="text-sm font-semibold text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Python / NumPy Reference Code Box */}
        {showCode && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 space-y-2">
            <div className="flex justify-between items-center text-slate-400 font-sans text-xs pb-2 border-b border-slate-800">
              <span>campus_forecast.py (Python Implementation Reference)</span>
              <span className="text-[11px] font-mono text-cyan-400">Python 3.x / NumPy / Pandas</span>
            </div>
            <pre className="text-[11px] overflow-x-auto text-slate-300 leading-relaxed">
{`import numpy as np
import pandas as pd

# 1. Read historical CSV data
df = pd.read_csv('historical_usage.csv')

# 2. Extract X (Month indices) and Y (Energy kWh)
X = df['Month_Index'].to_numpy(dtype=float)
Y = df['Energy_kWh'].to_numpy(dtype=float)

# 3. Apply Linear Regression (1st degree polynomial fit: y = mx + c)
slope, intercept = np.polyfit(X, Y, 1)

# 4. Predict for next month (July = Month 7)
target_month = 7
predicted_kwh = (slope * target_month) + intercept

# 5. Calculate electricity bill cost
tariff_rate = 8.0  # INR per unit
predicted_cost = predicted_kwh * tariff_rate

print(f"Predicted Energy for Month {target_month}: {predicted_kwh:.2f} kWh")
print(f"Predicted Electricity Cost: ₹{predicted_cost:.2f}")`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
