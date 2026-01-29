import React, { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS, ERROR
    const [errors, setErrors] = useState({}); // Object to hold validation errors

    // REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzybJlG2Z_NOmZFhuZCAnI7iTPkN4acoHzwqLiSVwmMCzL_NSna-586HpUOkQ6Me34Fdg/exec";

    const validate = (data) => {
        const newErrors = {};

        // Email Validation (Simple Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            newErrors.email = "INVALID_PROTOCOL: Malformed frequency format.";
        }

        // Message Validation (Min 50 chars)
        if (!data.message || data.message.length < 50) {
            newErrors.message = `INSUFFICIENT_DATA: Payload too short (${data.message?.length || 0}/50 chars).`;
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Validate
        const validationErrors = validate(data);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // HONEYPOT DETECTION
        if (data.bot_field) {
            // Bot detected! Fake success to fool them.
            setStatus('SUCCESS');
            return;
        }

        setStatus('SUBMITTING');

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });

            setStatus('SUCCESS');
            e.target.reset();
        } catch (error) {
            console.error("Transmission Error:", error);
            setStatus('ERROR');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-1 bg-gradient-to-br from-slate-700 to-slate-800">
            <div className="bg-slate-950 p-8 md:p-12 relative overflow-hidden">
                {/* Decorative Brutalist Elements */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/50"></div>

                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Initialize Handshake</h2>
                <p className="text-slate-500 font-mono text-sm mb-8 uppercase tracking-widest border-b border-slate-800 pb-4">
                // Secure Uplink Protocol v1.0
                </p>

                {status === 'SUCCESS' ? (
                    <div className="bg-green-500/10 border border-green-500/50 p-6 text-center animate-pulse">
                        <h3 className="text-green-400 font-bold uppercase tracking-wider text-xl">Transmission Complete</h3>
                        <p className="text-green-500/70 text-sm mt-2 font-mono">Data packet payload delivered successfully.</p>
                        <button
                            onClick={() => setStatus('IDLE')}
                            className="mt-6 text-cyan-500 hover:text-cyan-400 text-xs font-mono uppercase tracking-widest"
                        >
                            [ Send Another Transmission ]
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* HONEYPOT FIELD (Hidden) */}
                        <div className="hidden">
                            <label>Don't fill this out if you're human: <input name="bot_field" /></label>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-cyan-500 text-xs font-bold uppercase tracking-widest">Operator Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                id="name"
                                className="w-full bg-slate-900 border border-slate-700 text-white p-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                                placeholder="ENTER_ID"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-cyan-500 text-xs font-bold uppercase tracking-widest">Comms Frequency (Email)</label>
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                className={`w-full bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-700'} text-white p-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono`}
                                placeholder="HANDLE@DOMAIN.LOC"
                            />
                            {errors.email && <p className="text-red-500 text-xs font-mono mt-1">&gt; {errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-cyan-500 text-xs font-bold uppercase tracking-widest">Packet Payload (Message)</label>
                            <textarea
                                required
                                name="message"
                                id="message"
                                rows="5"
                                className={`w-full bg-slate-900 border ${errors.message ? 'border-red-500' : 'border-slate-700'} text-white p-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono`}
                                placeholder="DATA_STREAM... (MIN 50 CHARS)"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-xs font-mono mt-1">&gt; {errors.message}</p>}
                        </div>

                        <button
                            disabled={status === 'SUBMITTING'}
                            type="submit"
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-widest py-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {status === 'SUBMITTING' ? 'Transmitting...' : 'Execute Transmission'}
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>

                        {status === 'ERROR' && (
                            <p className="text-red-500 text-xs font-mono text-center">Protocol Failure. Please retry manual override.</p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
