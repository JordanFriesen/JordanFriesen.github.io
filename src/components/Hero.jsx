import React, { useEffect, useRef } from 'react';
import heroBg from '../assets/hero-bg.png';

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Simple parallax effect
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      containerRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[120vh] overflow-hidden bg-slate-900 border-b-8 border-white">
      {/* Background Image with Overlay */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroBg.src}
          alt="Atmospheric Industrial Background"
          className="w-full h-full object-cover opacity-80"
        />
        {/* Noise Texture Overlay for 'Distressed' look */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col justify-between px-6 py-12 max-w-[1400px] mx-auto">

        {/* Main Massive Text */}
        <div ref={textRef} className="mt-20 flex flex-col items-center sm:items-start text-center sm:text-left mix-blend-overlay text-white/90">
          <h1 className="text-7xl sm:text-9xl font-black tracking-tighter leading-[0.85] uppercase opacity-90">
            Engineering <br />
            <span className="text-white">The Future</span>
          </h1>
          <p className="mt-6 text-xl sm:text-2xl font-bold tracking-widest uppercase border-t-2 border-white/30 pt-4 inline-block">
            Pixels Aren't Enough
          </p>
        </div>

        {/* Dynamic Composition Elements (Simulated Paint/Visuals interacting with text) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-color-dodge pointer-events-none"></div>

        {/* Footer Brand Anchor */}
        <div className="w-full border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-end pb-8">
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-black tracking-tighter uppercase leading-none">Jordan Friesen</span>
            <span className="text-sm tracking-[0.3em] font-medium text-cyan-200">Front End Developer • Canada</span>
          </div>

          <div className="flex items-center gap-4 mt-8 sm:mt-0">
            <div className="h-12 w-12 bg-white text-slate-950 flex items-center justify-center font-bold text-2xl">
              JF
            </div>
            <div className="text-right">
              <p className="font-bold text-3xl tracking-tighter">BUILD THE WEB</p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-pulse text-sm font-mono tracking-widest uppercase">
        Start Sequencing
      </div>

    </div>
  );
}
