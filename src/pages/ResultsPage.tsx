import React, { useState } from 'react';
import { EquipmentItem, PageType } from '../types/energy';
import {
  calculateEquipmentMetrics,
  calculateCampusTotals,
  generateRecommendations,
  generateEquipmentCsv,
} from '../utils/calculations';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  ShieldAlert,
  Zap,
  Download,
  Trash2,
  Plus,
  IndianRupee,
  Layers,
  ArrowUpRight,
  Filter,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface ResultsPageProps {
  equipment: EquipmentItem[];
  tariffRate: number;
  onUpdateTariffRate: (rate: number) => void;
  onRemoveEquipment: (id: string) => void;
  onNavigate: (page: PageType) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  equipment,
  tariffRate,
  onUpdateTariffRate,
  onRemoveEquipment,
  onNavigate,
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'consumption' | 'cost' | 'distribution'>('consumption');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showCsvModal, setShowCsvModal] = useState(false);

  const totals = calculateCampusTotals(equipment, tariffRate);
  const recommendations = generateRecommendations(equipment);

  // Equipment with computed metrics
  const equipmentWithMetrics = equipment.map((item) => {
    const metrics = calculateEquipmentMetrics(
      item.powerWatts,
      item.units,
      item.hoursPerDay,
      item.workingDays,
      tariffRate
    );
    return {
      ...item,
      metrics,
    };
  });

  // Sort by consumption for ranking
  const sortedByKwh = [...equipmentWithMetrics].sort(
    (a, b) => b.metrics.monthlyKwh - a.metrics.monthlyKwh
  );

  const maxKwh = Math.max(...equipmentWithMetrics.map((e) => e.metrics.monthlyKwh), 1);
  const maxCost = Math.max(...equipmentWithMetrics.map((e) => e.metrics.monthlyCost), 1);

  // Power rating classification
  const getPowerClassification = (watts: number) => {
    if (watts >= 1500) return { label: 'High', color: 'text-rose-400 bg-rose-950/60 border-rose-800/60' };
    if (watts >= 300) return { label: 'Medium', color: 'text-amber-400 bg-amber-950/60 border-amber-800/60' };
    return { label: 'Low', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' };
  };

  const handleDownloadCsv = () => {
    const csvContent = generateEquipmentCsv(equipment);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'equipment_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Color palette for charts
  const colors = [
    '#38bdf8', // sky-400
    '#34d399', // emerald-400
    '#818cf8', // indigo-400
    '#fbbf24', // amber-400
    '#f472b6', // pink-400
    '#a78bfa', // purple-400
    '#2dd4bf', // teal-400
    '#fb923c', // orange-400
    '#94a3b8', // slate-400
  ];

  return (
    <div className="space-y-12 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Campus Energy Audit Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Results & Analysis
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Comprehensive equipment-level power consumption ledger, dynamic tariff evaluations, and analytical breakdowns.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Tariff:</span>
            <div className="flex items-center gap-1 font-mono text-cyan-300 font-semibold">
              <span>₹</span>
              <input
                type="number"
                min="1"
                step="0.5"
                value={tariffRate}
                onChange={(e) => onUpdateTariffRate(Number(e.target.value) || 1)}
                className="w-12 bg-transparent text-cyan-300 outline-none focus:border-b border-cyan-400 text-center"
              />
              <span className="text-[10px] text-slate-500 font-sans font-normal">/kWh</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('estimator')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Equipment</span>
          </button>

          <button
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Monthly Consumption */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Monthly Consumption</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono tabular-nums">
            {totals.totalMonthlyKwh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            <span className="text-xs text-slate-400 font-sans font-normal ml-1">kWh</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Across {totals.count} tracked device classes
          </div>
        </div>

        {/* Estimated Monthly Bill */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Estimated Monthly Bill</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono tabular-nums">
            ₹{totals.totalMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[11px] text-emerald-400/80 font-mono">
            Commercial tariff @ ₹{tariffRate}/unit
          </div>
        </div>

        {/* Highest Power Equipment */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Highest Power Equipment</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-white truncate" title={totals.highestEnergyItem?.name}>
            {totals.highestEnergyItem?.name || 'None'}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {totals.highestEnergyItem ? `${totals.highestEnergyItem.powerWatts} Watts / unit` : 'N/A'}
          </div>
        </div>

        {/* Number of Equipment */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Number of Equipment</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
            {totals.count}
          </div>
          <div className="text-[11px] text-slate-400">
            Total Connected: {totals.totalPowerKw.toFixed(1)} kW load
          </div>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
              <span>Campus Equipment Power Ledger</span>
            </h2>
            <p className="text-xs text-slate-400">
              Formulated dynamically via Power (W) × Units × Operating Hours × Working Days ÷ 1000
            </p>
          </div>
          <button
            onClick={() => setShowCsvModal(!showCsvModal)}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors self-start sm:self-auto"
          >
            {showCsvModal ? 'Hide CSV Schema' : 'View CSV Structure'}
          </button>
        </div>

        {/* Optional CSV Preview Box */}
        {showCsvModal && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <div className="text-cyan-400 font-sans font-semibold text-xs flex items-center justify-between">
              <span>equipment_data.csv (Conceptual Storage Structure)</span>
              <button onClick={handleDownloadCsv} className="underline text-xs hover:text-white">
                Download Raw File
              </button>
            </div>
            <pre className="text-[11px] overflow-x-auto text-emerald-300/90 whitespace-pre">
              {generateEquipmentCsv(equipment)}
            </pre>
          </div>
        )}

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Equipment</th>
                <th className="py-3 px-3 text-right">Power (W)</th>
                <th className="py-3 px-3 text-right">Units</th>
                <th className="py-3 px-3 text-right">Hours/Day</th>
                <th className="py-3 px-3 text-right">Working Days</th>
                <th className="py-3 px-3 text-right text-cyan-400">Monthly kWh</th>
                <th className="py-3 px-3 text-right text-emerald-400">Monthly Cost (₹)</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {equipmentWithMetrics.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="py-3 px-3 font-sans font-medium text-white flex items-center gap-2">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({item.category})</span>
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-300">
                    {item.powerWatts.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-300">
                    {item.units}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-300">
                    {item.hoursPerDay}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-400">
                    {item.workingDays}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums font-bold text-cyan-300">
                    {item.metrics.monthlyKwh.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums font-bold text-emerald-300">
                    ₹{item.metrics.monthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onRemoveEquipment(item.id)}
                      title="Remove equipment"
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-700 font-mono text-xs sm:text-sm font-bold bg-slate-950/40">
                <td className="py-3 px-3 font-sans text-white">Campus Totals</td>
                <td className="py-3 px-3 text-right text-slate-300">
                  {equipment.reduce((acc, e) => acc + e.powerWatts, 0).toLocaleString()} W
                </td>
                <td className="py-3 px-3 text-right text-slate-300">
                  {equipment.reduce((acc, e) => acc + e.units, 0)}
                </td>
                <td className="py-3 px-3 text-right text-slate-400">-</td>
                <td className="py-3 px-3 text-right text-slate-400">-</td>
                <td className="py-3 px-3 text-right text-cyan-300 text-base">
                  {totals.totalMonthlyKwh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
                <td className="py-3 px-3 text-right text-emerald-300 text-base">
                  ₹{totals.totalMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <span>Campus Energy Visualizations</span>
            </h2>
            <p className="text-xs text-slate-400">
              Comparative distribution across load categories and financial weightage.
            </p>
          </div>

          {/* Segmented Chart Tabs (Interactive buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveChartTab('consumption')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeChartTab === 'consumption'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Chart 1: Monthly Energy (kWh)
            </button>
            <button
              onClick={() => setActiveChartTab('cost')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeChartTab === 'cost'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Chart 2: Monthly Cost (₹)
            </button>
            <button
              onClick={() => setActiveChartTab('distribution')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeChartTab === 'distribution'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Chart 3: Power Distribution (%)
            </button>
          </div>
        </div>

        {/* Chart View 1: Equipment-wise Energy Consumption (Bar Chart) */}
        {activeChartTab === 'consumption' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-white">Chart 1:</span> Equipment-wise Monthly Energy Consumption (kWh)
            </div>
            <div className="space-y-3 pt-2">
              {sortedByKwh.map((item, idx) => {
                const percentage = Math.round((item.metrics.monthlyKwh / maxKwh) * 100);
                const shareOfTotal = totals.totalMonthlyKwh > 0
                  ? ((item.metrics.monthlyKwh / totals.totalMonthlyKwh) * 100).toFixed(1)
                  : '0';

                return (
                  <div key={item.id} className="space-y-1 group">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
                        <span>{item.name}</span>
                      </span>
                      <span className="font-mono text-cyan-300 font-semibold tabular-nums">
                        {item.metrics.monthlyKwh.toLocaleString(undefined, { maximumFractionDigits: 1 })} kWh
                        <span className="text-[11px] text-slate-400 font-sans ml-2">({shareOfTotal}%)</span>
                      </span>
                    </div>
                    {/* Bar track */}
                    <div className="w-full h-3.5 rounded-full bg-slate-950 border border-slate-800/80 overflow-hidden flex">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${Math.max(percentage, 3)}%`,
                          backgroundColor: colors[idx % colors.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chart View 2: Monthly Electricity Cost (Bar Chart) */}
        {activeChartTab === 'cost' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-white">Chart 2:</span> Monthly Electricity Cost Expenditure (₹)
            </div>
            <div className="space-y-3 pt-2">
              {sortedByKwh.map((item, idx) => {
                const percentage = Math.round((item.metrics.monthlyCost / maxCost) * 100);
                const shareOfTotal = totals.totalMonthlyCost > 0
                  ? ((item.metrics.monthlyCost / totals.totalMonthlyCost) * 100).toFixed(1)
                  : '0';

                return (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span>{item.name}</span>
                      </span>
                      <span className="font-mono text-emerald-300 font-semibold tabular-nums">
                        ₹{item.metrics.monthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        <span className="text-[11px] text-slate-400 font-sans ml-2">({shareOfTotal}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-3.5 rounded-full bg-slate-950 border border-slate-800/80 overflow-hidden flex">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 ease-out"
                        style={{ width: `${Math.max(percentage, 3)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chart View 3: Power Consumption Distribution (Donut / Pie) */}
        {activeChartTab === 'distribution' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
            <div className="md:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-56 h-56 flex items-center justify-center">
                {/* SVG Donut Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {(() => {
                    let cumulativeAngle = 0;
                    return sortedByKwh.map((item, idx) => {
                      const share = totals.totalMonthlyKwh > 0 ? item.metrics.monthlyKwh / totals.totalMonthlyKwh : 0;
                      const strokeDasharray = `${share * 283} 283`;
                      const strokeDashoffset = -cumulativeAngle * 283;
                      cumulativeAngle += share;

                      return (
                        <circle
                          key={item.id}
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke={colors[idx % colors.length]}
                          strokeWidth="9"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-300 hover:opacity-80"
                        />
                      );
                    });
                  })()}
                </svg>

                {/* Center metric */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-[11px] text-slate-400">Total Load</div>
                  <div className="text-xl font-bold font-mono text-cyan-300 tabular-nums">
                    {totals.totalMonthlyKwh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">kWh/month</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {sortedByKwh.map((item, idx) => {
                const shareOfTotal = totals.totalMonthlyKwh > 0
                  ? ((item.metrics.monthlyKwh / totals.totalMonthlyKwh) * 100).toFixed(1)
                  : '0';

                return (
                  <div
                    key={item.id}
                    className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: colors[idx % colors.length] }}
                      />
                      <span className="text-slate-300 truncate">{item.name}</span>
                    </div>
                    <span className="font-mono text-white font-semibold ml-2 tabular-nums">
                      {shareOfTotal}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* High Power Consuming Equipment Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-cyan-400">
            Electrical Load Classification
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>High Power Consuming Equipment</span>
          </h2>
          <p className="text-xs text-slate-400">
            Categorization based on rated wattage: High (≥1500W), Medium (300W–1499W), Low (&lt;300W).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipment.map((item) => {
            const classification = getPowerClassification(item.powerWatts);
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white truncate" title={item.name}>
                    {item.name}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${classification.color}`}>
                    {classification.label}
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400 font-mono">
                    <span>Rating:</span>
                    <span className="text-white font-semibold">{item.powerWatts} W</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-mono">
                    <span>Deployments:</span>
                    <span className="text-slate-300">{item.units} units</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-mono">
                    <span>Duty Cycle:</span>
                    <span className="text-slate-300">{item.hoursPerDay} hrs/day</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Energy Saving Recommendations Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-emerald-400">
            Intelligent Energy Audit Insights
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-emerald-400" />
            <span>Energy Saving Recommendations</span>
          </h2>
          <p className="text-xs text-slate-400">
            Rule-based suggestions derived from operating hours, connected wattage thresholds, and unit clustering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => {
            const isWarning = rec.type === 'warning';
            const isSuccess = rec.type === 'success';

            return (
              <div
                key={rec.id}
                className={`p-5 rounded-xl border flex flex-col justify-between space-y-3 ${
                  isWarning
                    ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                    : isSuccess
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                    : 'bg-slate-950/70 border-slate-800 text-slate-200'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    {isWarning ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : isSuccess ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0" />
                    )}
                    <span className="text-white">{rec.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rec.message}
                  </p>
                </div>

                {rec.potentialSavingKwh ? (
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 font-sans">Potential Monthly Savings:</span>
                    <span className="text-emerald-400 font-bold">
                      ~{rec.potentialSavingKwh} kWh (₹{(rec.potentialSavingKwh * tariffRate).toLocaleString()})
                    </span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
