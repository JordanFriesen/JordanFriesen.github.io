import { useEffect, useRef, useState } from 'react';

const slideModules = import.meta.glob('../../assets/hunt/*.{jpg,jpeg,png,webp}', {
	eager: true,
});

const SLIDES = Object.entries(slideModules)
	.map(([path, mod]) => {
		const filename = path.split('/').pop() ?? path;
		const alt = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
		return { src: mod.default, filename, alt };
	})
	.sort((a, b) => a.alt.localeCompare(b.alt));

const MOBILE_STILL_FILE = 'hooj-mobile.webp';
const MOBILE_STILL_INDEX = Math.max(
	0,
	SLIDES.findIndex((slide) => slide.filename === MOBILE_STILL_FILE),
);

const INTERVAL_MS = 7500;
const SWIPE_THRESHOLD = 40;

function detectMobile() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const shortest = Math.min(width, height);
	const coarse = window.matchMedia('(pointer: coarse)').matches;
	const noHover = window.matchMedia('(hover: none)').matches;
	const hasTouch = navigator.maxTouchPoints > 0;

	// Phone portrait, or landscape where the short edge is still a phone.
	if (shortest <= 540) return true;
	if (width < 768) return true;

	// Touch-first devices below typical desktop / iPad-pro landscape widths.
	return (coarse || noHover || hasTouch) && width < 1024;
}

export default function HuntSlideshow() {
	const [index, setIndex] = useState(null);
	const [isMobile, setIsMobile] = useState(null);
	const [reduceMotion, setReduceMotion] = useState(false);
	const swipeStart = useRef(null);
	const userPaged = useRef(false);

	useEffect(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const syncMobile = () => setIsMobile(detectMobile());
		const syncMotion = () => setReduceMotion(motion.matches);

		syncMobile();
		syncMotion();
		motion.addEventListener('change', syncMotion);
		window.addEventListener('resize', syncMobile);
		window.addEventListener('orientationchange', syncMobile);

		return () => {
			motion.removeEventListener('change', syncMotion);
			window.removeEventListener('resize', syncMobile);
			window.removeEventListener('orientationchange', syncMobile);
		};
	}, []);

	useEffect(() => {
		if (isMobile === null || userPaged.current) return;
		setIndex(isMobile ? MOBILE_STILL_INDEX : 0);
	}, [isMobile]);

	useEffect(() => {
		if (isMobile !== false || index === null || reduceMotion || SLIDES.length < 2) {
			return undefined;
		}

		const id = setInterval(() => {
			setIndex((current) => (current + 1) % SLIDES.length);
		}, INTERVAL_MS);

		return () => clearInterval(id);
	}, [index, isMobile, reduceMotion]);

	function go(delta) {
		if (SLIDES.length < 2) return;
		userPaged.current = true;
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
			{isMobile !== null &&
				index !== null &&
				SLIDES.map((slide, i) => (
					<div
						key={slide.filename}
						className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
							i === index ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<img
							src={slide.src.src}
							alt=""
							draggable={false}
							className={`h-full w-full object-cover select-none ${
								isMobile ? 'object-top' : 'object-center'
							} ${
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
