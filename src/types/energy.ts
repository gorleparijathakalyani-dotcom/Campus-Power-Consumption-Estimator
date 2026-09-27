export type PageType = 'home' | 'subjects' | 'estimator' | 'results' | 'forecast' | 'about';

export interface EquipmentItem {
  id: string;
  name: string;
  powerWatts: number;
  units: number;
  hoursPerDay: number;
  workingDays: number;
  category: 'HVAC' | 'Computing' | 'Lighting' | 'Lab' | 'Utility';
}

export interface CalculationResult {
  dailyKwh: number;
  monthlyKwh: number;
  monthlyCost: number;
  totalKw: number;
}

export interface HistoricalRecord {
  monthIndex: number; // 1, 2, 3...
  month: string;
  energyKwh: number;
}

export interface LinearRegressionResult {
  slope: number;
  intercept: number;
  rSquared: number;
  predictedKwh: number;
  predictedCost: number;
  targetMonthIndex: number;
  targetMonthName: string;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface Recommendation {
  id: string;
  type: 'warning' | 'info' | 'success';
  equipmentName?: string;
  title: string;
  message: string;
  potentialSavingKwh?: number;
}
