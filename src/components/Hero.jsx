import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(6,_182,_212,_0.15),_transparent_45%)] animate-pulse"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          Smooth Scrolling <br /> with Lenis & Astro
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Experience ultra-smooth scroll animations, premium aesthetics, and responsive interactions. Built for the modern web.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            Get Started
          </button>
          <button className="px-8 py-3 rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 text-white transition-all duration-300 backdrop-blur-sm">
            View Source
          </button>
        </div>
      </div>
      
       {/* Scroll Indicator */}
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </div>
    </div>
  );
}
