import React from 'react';
import { PageType } from '../types/energy';

interface BackgroundLayerProps {
  currentPage: PageType;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ currentPage }) => {
  // Select appropriate background image based on current section
  let bgImg = '/src/assets/images/campus_solar_hero_1790512231637.jpg';
  if (currentPage === 'subjects' || currentPage === 'about') {
    bgImg = '/src/assets/images/electrical_lab_bench_1790512245144.jpg';
  } else if (currentPage === 'results' || currentPage === 'forecast') {
    bgImg = '/src/assets/images/energy_control_room_1790512259725.jpg';
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Background Image with blur, darkening, and low opacity */}
      <img
        src={bgImg}
        alt="Campus Energy Context"
        className="absolute inset-0 w-full h-full object-cover object-center filter blur-md scale-105 opacity-20 transition-opacity duration-1000 ease-in-out"
        referrerPolicy="no-referrer"
      />

      {/* Deep Dark Navy and Cyan Tinted Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 w-[30rem] h-80 bg-blue-600/10 rounded-full blur-3xl" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
