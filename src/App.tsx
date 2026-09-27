/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageType, EquipmentItem } from './types/energy';
import { INITIAL_EQUIPMENT, DEFAULT_TARIFF_RATE } from './data/mockData';
import { BackgroundLayer } from './components/BackgroundLayer';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { SubjectsPage } from './pages/SubjectsPage';
import { EstimatorPage } from './pages/EstimatorPage';
import { ResultsPage } from './pages/ResultsPage';
import { ForecastPage } from './pages/ForecastPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [equipment, setEquipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [tariffRate, setTariffRate] = useState<number>(DEFAULT_TARIFF_RATE);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddEquipment = (newItem: EquipmentItem) => {
    setEquipment((prev) => [newItem, ...prev]);
  };

  const handleRemoveEquipment = (id: string) => {
    setEquipment((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateTariffRate = (newRate: number) => {
    setTariffRate(newRate);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic blurred, darkened background layer */}
      <BackgroundLayer currentPage={currentPage} />

      {/* Persistent Navigation Bar across all pages */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            equipment={equipment}
            tariffRate={tariffRate}
          />
        )}

        {currentPage === 'subjects' && (
          <SubjectsPage />
        )}

        {currentPage === 'estimator' && (
          <EstimatorPage
            onAddEquipment={handleAddEquipment}
            onNavigateToResults={() => handleNavigate('results')}
          />
        )}

        {currentPage === 'results' && (
          <ResultsPage
            equipment={equipment}
            tariffRate={tariffRate}
            onUpdateTariffRate={handleUpdateTariffRate}
            onRemoveEquipment={handleRemoveEquipment}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'forecast' && (
          <ForecastPage tariffRate={tariffRate} />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Persistent Academic Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
