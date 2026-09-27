import React, { useState } from 'react';
import { EquipmentItem, CalculationResult } from '../types/energy';
import { calculateEquipmentMetrics } from '../utils/calculations';
import { ESTIMATOR_PRESETS, DEFAULT_TARIFF_RATE } from '../data/mockData';
import {
  Calculator,
  RotateCcw,
  PlusCircle,
  Zap,
  Calendar,
  Clock,
  Layers,
  IndianRupee,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

interface EstimatorPageProps {
  onAddEquipment: (item: EquipmentItem) => void;
  onNavigateToResults: () => void;
}

export const EstimatorPage: React.FC<EstimatorPageProps> = ({
  onAddEquipment,
  onNavigateToResults,
}) => {
  // Form State
  const [equipmentName, setEquipmentName] = useState('Air Conditioner');
  const [powerWatts, setPowerWatts] = useState<number | ''>(1500);
  const [units, setUnits] = useState<number | ''>(5);
  const [hoursPerDay, setHoursPerDay] = useState<number | ''>(8);
  const [workingDays, setWorkingDays] = useState<number | ''>(25);
  const [tariffRate, setTariffRate] = useState<number | ''>(DEFAULT_TARIFF_RATE);

  // Calculation State
  const [result, setResult] = useState<CalculationResult>({
    dailyKwh: 60,
    monthlyKwh: 1500,
    monthlyCost: 12000,
    totalKw: 7.5,
  });

  const [hasCalculated, setHasCalculated] = useState(true);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const p = Number(powerWatts) || 0;
    const u = Number(units) || 0;
    const h = Number(hoursPerDay) || 0;
    const d = Number(workingDays) || 0;
    const rate = Number(tariffRate) || 0;

    const metrics = calculateEquipmentMetrics(p, u, h, d, rate);
    setResult(metrics);
    setHasCalculated(true);
    setAddedSuccess(false);
  };

  const handleReset = () => {
    setEquipmentName('');
    setPowerWatts('');
    setUnits('');
    setHoursPerDay('');
    setWorkingDays(25);
    setTariffRate(DEFAULT_TARIFF_RATE);
    setResult({
      dailyKwh: 0,
      monthlyKwh: 0,
      monthlyCost: 0,
      totalKw: 0,
    });
    setHasCalculated(false);
    setAddedSuccess(false);
  };

  const loadPreset = (preset: typeof ESTIMATOR_PRESETS[0]) => {
    setEquipmentName(preset.name);
    setPowerWatts(preset.powerWatts);
    setUnits(preset.units);
    setHoursPerDay(preset.hoursPerDay);
    setWorkingDays(preset.workingDays);
    const metrics = calculateEquipmentMetrics(
      preset.powerWatts,
      preset.units,
      preset.hoursPerDay,
      preset.workingDays,
      Number(tariffRate) || DEFAULT_TARIFF_RATE
    );
    setResult(metrics);
    setHasCalculated(true);
    setAddedSuccess(false);
  };

  const handleAddToInventory = () => {
    if (!equipmentName.trim() || !powerWatts || !units || !hoursPerDay || !workingDays) {
      return;
    }
    const newItem: EquipmentItem = {
      id: `eq-${Date.now()}`,
      name: equipmentName.trim(),
      powerWatts: Number(powerWatts),
      units: Number(units),
      hoursPerDay: Number(hoursPerDay),
      workingDays: Number(workingDays),
      category: Number(powerWatts) > 1000 ? 'HVAC' : 'Utility',
    };
    onAddEquipment(newItem);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 4000);
  };

  return (
    <div className="space-y-12 py-6 sm:py-10">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Interactive Calculator Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Energy & Cost Estimator
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Compute instantaneous electrical load, daily unit consumption, and monthly operational expenditure using standardized electrical engineering equations.
        </p>
      </div>

      {/* Quick Preset Selector */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Quick Campus Presets (Click to Auto-fill):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {ESTIMATOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => loadPreset(preset)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all active:scale-95 whitespace-nowrap"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <span>Equipment Parameters</span>
            </h2>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Fields</span>
            </button>
          </div>

          <form onSubmit={handleCalculate} className="space-y-5">
            {/* Equipment Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Equipment Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={equipmentName}
                  onChange={(e) => setEquipmentName(e.target.value)}
                  placeholder="e.g. Air Conditioner"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Grid 2x2 for parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Power Rating (Watts) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Power Rating (Watts)</span>
                  <span className="text-[11px] text-slate-400">e.g. 1500 W</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Zap className="w-4 h-4 text-cyan-400/70" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={powerWatts}
                    onChange={(e) => setPowerWatts(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="1500"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-all outline-none font-mono"
                  />
                </div>
              </div>

              {/* Number of Units */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Number of Units</span>
                  <span className="text-[11px] text-slate-400">e.g. 5 units</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Layers className="w-4 h-4 text-blue-400/70" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={units}
                    onChange={(e) => setUnits(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="5"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-all outline-none font-mono"
                  />
                </div>
              </div>

              {/* Usage Hours per Day */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Usage Hours per Day</span>
                  <span className="text-[11px] text-slate-400">e.g. 8 hrs</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Clock className="w-4 h-4 text-emerald-400/70" />
                  </div>
                  <input
                    type="number"
                    min="0.1"
                    max="24"
                    step="any"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="8"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-all outline-none font-mono"
                  />
                </div>
              </div>

              {/* Working Days per Month */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Working Days per Month</span>
                  <span className="text-[11px] text-slate-400">e.g. 25 days</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Calendar className="w-4 h-4 text-amber-400/70" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={workingDays}
                    onChange={(e) => setWorkingDays(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="25"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-all outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Electricity Rate (₹/kWh) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300 flex items-center justify-between">
                <span>Electricity Rate (₹/kWh)</span>
                <span className="text-[11px] text-slate-400">Standard HT Commercial Tariff = ₹8.00</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={tariffRate}
                  onChange={(e) => setTariffRate(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="8"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-all outline-none font-mono"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.99]"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Energy</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results Container (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Estimation Results</h3>
                <p className="text-xs text-slate-400">
                  {equipmentName ? equipmentName : 'Selected Equipment'}
                </p>
              </div>
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                Live Output
              </span>
            </div>

            {/* Result Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Daily Consumption */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Daily Consumption</div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-300 font-mono tabular-nums">
                  {result.dailyKwh.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  <span className="text-xs text-slate-400 font-sans font-normal ml-1">kWh</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {(Number(powerWatts) * Number(units) * Number(hoursPerDay) / 1000).toFixed(1)} kWh/day
                </div>
              </div>

              {/* Monthly Consumption */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Monthly Consumption</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-300 font-mono tabular-nums">
                  {result.monthlyKwh.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  <span className="text-xs text-slate-400 font-sans font-normal ml-1">kWh</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {Number(workingDays)} operating days
                </div>
              </div>

              {/* Estimated Monthly Cost */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-800/40 space-y-1">
                <div className="text-[11px] text-emerald-400 font-medium">Estimated Monthly Cost</div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-300 font-mono tabular-nums">
                  ₹{result.monthlyCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-emerald-400/80 font-mono">
                  @ ₹{tariffRate}/kWh
                </div>
              </div>

              {/* Connected Power Used */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Connected Load (kW)</div>
                <div className="text-xl sm:text-2xl font-bold text-amber-300 font-mono tabular-nums">
                  {result.totalKw.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  <span className="text-xs text-slate-400 font-sans font-normal ml-1">kW</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {units} × {powerWatts} W
                </div>
              </div>
            </div>

            {/* Arithmetic Formula Walkthrough */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-2 font-mono">
              <div className="text-slate-300 font-sans font-semibold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Step-by-Step Calculation Breakdown:</span>
              </div>
              <div className="text-slate-400 space-y-1 text-[11px]">
                <div>
                  1. <span className="text-cyan-300">Daily Energy:</span>{' '}
                  ({powerWatts || 0} W × {units || 0} × {hoursPerDay || 0} hrs) / 1000 ={' '}
                  <span className="text-white font-semibold">{result.dailyKwh} kWh</span>
                </div>
                <div>
                  2. <span className="text-blue-300">Monthly Energy:</span>{' '}
                  {result.dailyKwh} kWh × {workingDays || 0} days ={' '}
                  <span className="text-white font-semibold">{result.monthlyKwh} kWh</span>
                </div>
                <div>
                  3. <span className="text-emerald-300">Monthly Cost:</span>{' '}
                  {result.monthlyKwh} kWh × ₹{tariffRate || 0} ={' '}
                  <span className="text-white font-semibold">₹{result.monthlyCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action to add to campus inventory */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleAddToInventory}
                disabled={!equipmentName || !powerWatts || !units}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 rounded-xl transition-all"
              >
                <PlusCircle className="w-4 h-4 text-cyan-400" />
                <span>Add this Equipment to Campus Inventory</span>
              </button>

              {addedSuccess && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Added "{equipmentName}" to campus registry!</span>
                  </div>
                  <button
                    onClick={onNavigateToResults}
                    className="underline hover:text-white font-medium ml-2"
                  >
                    View in Results
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
