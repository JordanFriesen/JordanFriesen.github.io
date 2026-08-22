import { useEffect, useRef, useState } from 'react';

const slideModules = import.meta.glob('../../assets/hunt/*.{jpg,jpeg,png,webp}', {
	eager: true,
});

const SLIDES = Object.entries(slideModules)
	.map(([path, mod]) => {
		const filename = path.split('/').pop() ?? path;
		const alt = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
		return { src: mod.default, alt };
	})
	.sort((a, b) => a.alt.localeCompare(b.alt));

const INTERVAL_MS = 7500;
const SWIPE_THRESHOLD = 40;
const MOBILE_QUERY = '(max-width: 767px)';

export default function HuntSlideshow() {
	const [index, setIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(null);
	const [reduceMotion, setReduceMotion] = useState(false);
	const swipeStart = useRef(null);

	useEffect(() => {
		const mobile = window.matchMedia(MOBILE_QUERY);
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

		const syncMobile = () => setIsMobile(mobile.matches);
		const syncMotion = () => setReduceMotion(motion.matches);

		syncMobile();
		syncMotion();
		mobile.addEventListener('change', syncMobile);
		motion.addEventListener('change', syncMotion);

		return () => {
			mobile.removeEventListener('change', syncMobile);
			motion.removeEventListener('change', syncMotion);
		};
	}, []);

	useEffect(() => {
		if (isMobile !== false || reduceMotion || SLIDES.length < 2) return undefined;

		const id = setInterval(() => {
			setIndex((current) => (current + 1) % SLIDES.length);
		}, INTERVAL_MS);

		return () => clearInterval(id);
	}, [index, isMobile, reduceMotion]);

	function go(delta) {
		if (SLIDES.length < 2) return;
		setIndex((current) => (current + delta + SLIDES.length) % SLIDES.length);
	}

	function onPointerDown(event) {
		swipeStart.current = { x: event.clientX, y: event.clientY };
	}

	function onPointerUp(event) {
		if (!swipeStart.current) return;

		const dx = event.clientX - swipeStart.current.x;
		const dy = event.clientY - swipeStart.current.y;
		swipeStart.current = null;

		if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

		go(dx < 0 ? 1 : -1);
	}

	function onPointerCancel() {
		swipeStart.current = null;
	}

	return (
		<div
			className="fixed inset-0 z-0 touch-none bg-black"
			aria-hidden="true"
			onPointerDown={onPointerDown}
			onPointerUp={onPointerUp}
			onPointerCancel={onPointerCancel}
		>
			{SLIDES.map((slide, i) => (
				<div
					key={slide.alt}
					className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
						i === index ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<img
						src={slide.src.src}
						alt=""
						draggable={false}
						className={`h-full w-full object-cover select-none ${
							i === index && !reduceMotion && isMobile === false
								? 'hunt-kenburns'
								: ''
						}`}
					/>
				</div>
			))}

			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/55" />
			<div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay" />
		</div>
	);
}
