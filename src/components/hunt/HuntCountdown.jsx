import { useEffect, useState } from 'react';
import CountdownUnit from './CountdownUnit.jsx';

// Opening morning — October 21, 2026 at 5:00 AM local time
const TARGET = new Date(2026, 9, 21, 5, 0, 0);

function getRemaining(now) {
	const diff = Math.max(0, TARGET.getTime() - now.getTime());
	const totalSeconds = Math.floor(diff / 1000);

	return {
		done: diff <= 0,
		days: Math.floor(totalSeconds / 86400),
		hours: Math.floor((totalSeconds % 86400) / 3600),
		minutes: Math.floor((totalSeconds % 3600) / 60),
		seconds: totalSeconds % 60,
	};
}

export default function HuntCountdown() {
	const [remaining, setRemaining] = useState(null);

	useEffect(() => {
		const tick = () => setRemaining(getRemaining(new Date()));
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, []);

	return (
		<div className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-end overflow-x-hidden px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center md:justify-center md:px-6 md:pb-0">
			<p className="max-w-full text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.12em] text-amber-300/85 md:text-sm md:tracking-[0.28em]">
				The Old Boys at Fossen's 2026
			</p>

			<h1 className="mt-3 text-[clamp(2.5rem,16vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter drop-shadow-[0_4px_28px_rgba(0,0,0,0.75)] md:mt-4">
				The Hunt
			</h1>

			<p className="mt-3 max-w-full text-xs uppercase tracking-[0.16em] text-white/70 md:mt-4 md:text-base md:tracking-[0.28em]">
				October 21, 2026 · First light
			</p>

			<div className="mt-6 w-full min-w-0 max-w-3xl md:mt-12">
				{!remaining ? (
					<div className="h-24 md:h-28" aria-hidden="true" />
				) : remaining.done ? (
					<div className="space-y-3">
						<p className="text-4xl font-black uppercase tracking-tighter text-amber-200 md:text-6xl">
							It's time
						</p>
						<p className="text-sm uppercase tracking-[0.3em] text-white/70">
							Get in the woods.
						</p>
					</div>
				) : (
					<div
						className="grid w-full min-w-0 grid-cols-4 items-start divide-x divide-amber-200/20"
						aria-live="polite"
						aria-atomic="true"
					>
						<CountdownUnit value={remaining.days} label="Days" />
						<CountdownUnit value={remaining.hours} label="Hours" />
						<CountdownUnit value={remaining.minutes} label="Mins" />
						<CountdownUnit value={remaining.seconds} label="Secs" />
					</div>
				)}
			</div>

			<p className="mt-5 px-4 text-[0.6rem] uppercase tracking-[0.2em] text-white/40 md:absolute md:bottom-8 md:left-0 md:right-0 md:mt-0 md:text-[0.65rem] md:tracking-[0.32em]">
				Crew only ·{' '}
				<a
					href="https://www.google.com/maps/dir/?api=1&destination=Fossen%27s+Guest+Lodge%2C+Rock+Creek%2C+BC"
					target="_blank"
					rel="noopener noreferrer"
					className="pointer-events-auto text-amber-200/80 underline decoration-amber-200/40 underline-offset-4 transition-colors hover:text-amber-100 hover:decoration-amber-100"
				>
					map here
				</a>
			</p>
		</div>
	);
}
