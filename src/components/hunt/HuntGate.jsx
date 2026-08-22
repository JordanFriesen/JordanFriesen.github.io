import { useState } from 'react';

const PASSWORD = 'Fossens26';

export default function HuntGate({ onUnlock }) {
	const [value, setValue] = useState('');
	const [error, setError] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();

		if (value.trim() === PASSWORD) {
			setError(false);
			onUnlock();
			return;
		}

		setError(true);
	}

	return (
		<div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-black px-6 text-center">
			<p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-amber-300/85">
				The Old Boys at Fossen's 2026
			</p>
			<h1 className="mt-4 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
				The Hunt
			</h1>
			<p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/50">
				Crew only
			</p>

			<form
				onSubmit={handleSubmit}
				className="mt-10 flex w-full max-w-sm flex-col items-center gap-4"
			>
				<label htmlFor="hunt-password" className="sr-only">
					Password
				</label>
				<input
					id="hunt-password"
					type="password"
					name="password"
					autoComplete="off"
					autoFocus
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
						setError(false);
					}}
					placeholder="Password"
					className={`w-full border bg-black/60 px-4 py-3 text-center text-sm uppercase tracking-[0.28em] text-amber-50 outline-none placeholder:text-white/30 ${
						error
							? 'border-red-400/80 focus:border-red-300'
							: 'border-amber-200/30 focus:border-amber-200/70'
					}`}
				/>
				<button
					type="submit"
					className="w-full border border-amber-200/40 bg-amber-200/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.32em] text-amber-100 transition-colors hover:bg-amber-200/20"
				>
					Enter camp
				</button>
				{error && (
					<p className="text-[0.65rem] uppercase tracking-[0.2em] text-red-300/90">
						Wrong password. Try again.
					</p>
				)}
			</form>
		</div>
	);
}
