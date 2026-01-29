import React from 'react';

export default function Section({ title, description, reverse = false, color = "cyan", image = null, href = "#", buttonText = "Learn more" }) {
    return (
        <section className="py-24 px-4 md:px-8 relative border-t border-slate-800/50">
            <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24 ${reverse ? 'md:flex-row-reverse' : ''}`}>

                <div className="flex-1 w-full group">
                    {image ? (
                        <div className="aspect-video rounded-sm overflow-hidden border border-slate-700/50 shadow-2xl relative">
                            {/* Image */}
                            <img src={image.src} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                            {/* Overlay effects for 'Poster' vibe */}
                            <div className={`absolute inset-0 bg-${color}-900/10 mix-blend-overlay`}></div>
                            <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                        </div>
                    ) : (
                        <div className={`aspect-video rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl flex items-center justify-center group overflow-hidden`}>
                            <div className={`w-32 h-32 rounded-full bg-${color}-500/20 blur-3xl group-hover:bg-${color}-500/30 transition-all duration-500`}></div>
                            <span className="text-slate-600 font-mono text-sm relative z-10 group-hover:text-slate-400 transition-colors">Placeholder Image</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 leading-[0.9]">
                        {title}
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-slate-800 pl-4">
                        {description}
                    </p>
                    <a href={href} className={`text-${color}-400 hover:text-${color}-300 font-bold tracking-widest uppercase text-sm inline-flex items-center gap-2 group transition-colors`}>
                        {buttonText}
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>

            </div>
        </section>
    );
}
