export default function CountdownUnit({ value, label }) {
	const display = String(Math.max(0, value)).padStart(2, '0');

	return (
		<div className="flex min-w-0 flex-col items-center px-0.5 sm:px-3">
			<span className="text-[clamp(1.65rem,10vw,6rem)] font-black tabular-nums leading-none tracking-tighter text-amber-50 drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
				{display}
			</span>
			<span className="mt-2 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-amber-200/75 sm:mt-3 sm:text-xs sm:tracking-[0.35em]">
				{label}
			</span>
		</div>
	);
}
