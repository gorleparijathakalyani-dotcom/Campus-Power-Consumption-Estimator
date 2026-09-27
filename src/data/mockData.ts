import { EquipmentItem, HistoricalRecord } from '../types/energy';

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-1',
    name: 'Air Conditioner',
    powerWatts: 1500,
    units: 5,
    hoursPerDay: 8,
    workingDays: 25,
    category: 'HVAC',
  },
  {
    id: 'eq-2',
    name: 'Computers',
    powerWatts: 200,
    units: 30,
    hoursPerDay: 7,
    workingDays: 25,
    category: 'Computing',
  },
  {
    id: 'eq-3',
    name: 'Projectors',
    powerWatts: 300,
    units: 5,
    hoursPerDay: 5,
    workingDays: 20,
    category: 'Computing',
  },
  {
    id: 'eq-4',
    name: 'Laboratory Equipment',
    powerWatts: 2500,
    units: 3,
    hoursPerDay: 6,
    workingDays: 22,
    category: 'Lab',
  },
  {
    id: 'eq-5',
    name: 'Fans',
    powerWatts: 75,
    units: 40,
    hoursPerDay: 8,
    workingDays: 25,
    category: 'Utility',
  },
  {
    id: 'eq-6',
    name: 'Lights (LED)',
    powerWatts: 40,
    units: 100,
    hoursPerDay: 8,
    workingDays: 25,
    category: 'Lighting',
  },
  {
    id: 'eq-7',
    name: 'Printers',
    powerWatts: 450,
    units: 4,
    hoursPerDay: 3,
    workingDays: 25,
    category: 'Computing',
  },
  {
    id: 'eq-8',
    name: 'Water Coolers',
    powerWatts: 500,
    units: 4,
    hoursPerDay: 6,
    workingDays: 25,
    category: 'Utility',
  },
];

export const INITIAL_HISTORICAL_DATA: HistoricalRecord[] = [
  { monthIndex: 1, month: 'January', energyKwh: 4200 },
  { monthIndex: 2, month: 'February', energyKwh: 4350 },
  { monthIndex: 3, month: 'March', energyKwh: 4500 },
  { monthIndex: 4, month: 'April', energyKwh: 4700 },
  { monthIndex: 5, month: 'May', energyKwh: 4900 },
  { monthIndex: 6, month: 'June', energyKwh: 5050 },
];

export const ESTIMATOR_PRESETS = [
  { name: 'Air Conditioner (1.5 Ton)', powerWatts: 1500, units: 5, hoursPerDay: 8, workingDays: 25 },
  { name: 'Computer Lab Workstation', powerWatts: 200, units: 30, hoursPerDay: 7, workingDays: 25 },
  { name: 'Classroom Ceiling Fan', powerWatts: 75, units: 40, hoursPerDay: 8, workingDays: 25 },
  { name: 'LED Tube Light Fixture', powerWatts: 40, units: 100, hoursPerDay: 8, workingDays: 25 },
  { name: 'Digital Seminar Projector', powerWatts: 300, units: 5, hoursPerDay: 5, workingDays: 20 },
  { name: 'Heavy Lab Centrifuge / Oven', powerWatts: 2500, units: 3, hoursPerDay: 6, workingDays: 22 },
  { name: 'Campus Water Cooler Chiller', powerWatts: 500, units: 4, hoursPerDay: 6, workingDays: 25 },
  { name: 'Department Network Laser Printer', powerWatts: 450, units: 4, hoursPerDay: 3, workingDays: 25 },
];

export const DEFAULT_TARIFF_RATE = 8; // ₹ per kWh
