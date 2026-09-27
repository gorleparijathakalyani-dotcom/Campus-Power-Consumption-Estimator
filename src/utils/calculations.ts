import { EquipmentItem, HistoricalRecord, LinearRegressionResult, Recommendation } from '../types/energy';

export function calculateEquipmentMetrics(
  powerWatts: number,
  units: number,
  hoursPerDay: number,
  workingDays: number,
  tariffRate: number
) {
  const totalKw = (powerWatts * units) / 1000;
  const dailyKwh = (powerWatts * units * hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * workingDays;
  const monthlyCost = monthlyKwh * tariffRate;

  return {
    totalKw,
    dailyKwh,
    monthlyKwh,
    monthlyCost,
  };
}

export function calculateCampusTotals(equipment: EquipmentItem[], tariffRate: number) {
  let totalPowerKw = 0;
  let totalDailyKwh = 0;
  let totalMonthlyKwh = 0;
  let totalMonthlyCost = 0;

  equipment.forEach((item) => {
    const metrics = calculateEquipmentMetrics(
      item.powerWatts,
      item.units,
      item.hoursPerDay,
      item.workingDays,
      tariffRate
    );
    totalPowerKw += metrics.totalKw;
    totalDailyKwh += metrics.dailyKwh;
    totalMonthlyKwh += metrics.monthlyKwh;
    totalMonthlyCost += metrics.monthlyCost;
  });

  const sortedByMonthlyKwh = [...equipment].sort((a, b) => {
    const kwhA = (a.powerWatts * a.units * a.hoursPerDay * a.workingDays) / 1000;
    const kwhB = (b.powerWatts * b.units * b.hoursPerDay * b.workingDays) / 1000;
    return kwhB - kwhA;
  });

  const highestEnergyItem = sortedByMonthlyKwh[0] || null;

  return {
    totalPowerKw,
    totalDailyKwh,
    totalMonthlyKwh,
    totalMonthlyCost,
    count: equipment.length,
    highestEnergyItem,
  };
}

/**
 * Linear Regression using Ordinary Least Squares:
 * y = mx + c
 * m = (N*sum(xy) - sum(x)*sum(y)) / (N*sum(x^2) - (sum(x))^2)
 * c = (sum(y) - m*sum(x)) / N
 */
export function computeLinearRegression(
  historicalData: HistoricalRecord[],
  targetMonthIndex: number,
  tariffRate: number
): LinearRegressionResult {
  const n = historicalData.length;
  if (n < 2) {
    return {
      slope: 0,
      intercept: 0,
      rSquared: 0,
      predictedKwh: 0,
      predictedCost: 0,
      targetMonthIndex,
      targetMonthName: getMonthName(targetMonthIndex),
      trend: 'stable',
    };
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  historicalData.forEach((record) => {
    const x = record.monthIndex;
    const y = record.energyKwh;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
    sumY2 += y * y;
  });

  const denominator = n * sumX2 - sumX * sumX;
  const slope = denominator !== 0 ? (n * sumXY - sumX * sumY) / denominator : 0;
  const intercept = (sumY - slope * sumX) / n;

  // Calculate R-squared (coefficient of determination)
  const meanY = sumY / n;
  let ssTotal = 0;
  let ssRes = 0;

  historicalData.forEach((record) => {
    const x = record.monthIndex;
    const y = record.energyKwh;
    const yPred = slope * x + intercept;
    ssTotal += Math.pow(y - meanY, 2);
    ssRes += Math.pow(y - yPred, 2);
  });

  const rSquared = ssTotal !== 0 ? Math.max(0, Math.min(1, 1 - ssRes / ssTotal)) : 1;

  const predictedKwh = Math.round(slope * targetMonthIndex + intercept);
  const predictedCost = Math.round(predictedKwh * tariffRate);

  let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
  if (slope > 10) trend = 'increasing';
  else if (slope < -10) trend = 'decreasing';

  return {
    slope: Number(slope.toFixed(2)),
    intercept: Number(intercept.toFixed(2)),
    rSquared: Number(rSquared.toFixed(4)),
    predictedKwh,
    predictedCost,
    targetMonthIndex,
    targetMonthName: getMonthName(targetMonthIndex),
    trend,
  };
}

export function getMonthName(monthIndex: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const adjusted = ((monthIndex - 1) % 12 + 12) % 12;
  return months[adjusted];
}

export function generateRecommendations(equipment: EquipmentItem[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  equipment.forEach((item) => {
    const dailyKwh = (item.powerWatts * item.units * item.hoursPerDay) / 1000;
    const monthlyKwh = dailyKwh * item.workingDays;

    if (item.powerWatts >= 1000) {
      recommendations.push({
        id: `rec-high-pwr-${item.id}`,
        type: 'warning',
        equipmentName: item.name,
        title: `High-Power Device Alert (${item.powerWatts} W)`,
        message: `${item.name} has a high power rating of ${item.powerWatts}W. Monitor its usage carefully and avoid standby mode when not in operation.`,
        potentialSavingKwh: Math.round(monthlyKwh * 0.15),
      });
    }

    if (item.hoursPerDay > 8) {
      recommendations.push({
        id: `rec-hrs-${item.id}`,
        type: 'warning',
        equipmentName: item.name,
        title: `Excessive Operating Hours (${item.hoursPerDay} hrs/day)`,
        message: `${item.name} runs for ${item.hoursPerDay} hours daily. Consider reducing unnecessary operating hours by 1-2 hours to save power.`,
        potentialSavingKwh: Math.round(((item.powerWatts * item.units * 2) / 1000) * item.workingDays),
      });
    }

    if (item.units >= 20 && item.hoursPerDay >= 7) {
      recommendations.push({
        id: `rec-multi-${item.id}`,
        type: 'info',
        equipmentName: item.name,
        title: `Large Cluster Deployment (${item.units} units)`,
        message: `With ${item.units} units operating for ${item.hoursPerDay} hours, enforcing automatic sleep modes or scheduled shut-offs will significantly cut base load.`,
        potentialSavingKwh: Math.round(monthlyKwh * 0.2),
      });
    }

    if (item.powerWatts <= 50 && item.units >= 50) {
      recommendations.push({
        id: `rec-efficient-${item.id}`,
        type: 'success',
        equipmentName: item.name,
        title: `Efficient Lighting/Fixtures (${item.powerWatts} W)`,
        message: `${item.name} shows lower individual power consumption. Ensure daylight harvesting sensors are utilized in campus corridors.`,
      });
    }
  });

  if (recommendations.length === 0) {
    recommendations.push({
      id: 'rec-default',
      type: 'info',
      title: 'Optimal Campus Operation',
      message: 'Energy usage across all registered equipment is currently within standard operational boundaries.',
    });
  }

  return recommendations;
}

export function generateEquipmentCsv(equipment: EquipmentItem[]): string {
  const headers = 'Equipment,Power_Watts,Units,Hours_Per_Day,Working_Days,Monthly_kWh,Monthly_Cost_INR';
  const rows = equipment.map((item) => {
    const kwh = Math.round((item.powerWatts * item.units * item.hoursPerDay * item.workingDays) / 1000);
    const cost = Math.round(kwh * 8);
    return `"${item.name}",${item.powerWatts},${item.units},${item.hoursPerDay},${item.workingDays},${kwh},${cost}`;
  });
  return [headers, ...rows].join('\n');
}

export function generateHistoricalCsv(historical: HistoricalRecord[]): string {
  const headers = 'Month,Month_Index,Energy_kWh';
  const rows = historical.map((h) => `"${h.month}",${h.monthIndex},${h.energyKwh}`);
  return [headers, ...rows].join('\n');
}
