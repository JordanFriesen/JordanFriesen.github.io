import { useEffect, useState } from 'react';
import HuntGate from './HuntGate.jsx';
import HuntSlideshow from './HuntSlideshow.jsx';
import HuntCountdown from './HuntCountdown.jsx';

const STORAGE_KEY = 'the-hunt-unlocked';

export default function HuntPage() {
	const [unlocked, setUnlocked] = useState(false);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setUnlocked(window.localStorage.getItem(STORAGE_KEY) === '1');
		setReady(true);
	}, []);

	function handleUnlock() {
		window.localStorage.setItem(STORAGE_KEY, '1');
		setUnlocked(true);
	}

	if (!ready) {
		return <div className="fixed inset-0 bg-black" />;
	}

	if (!unlocked) {
		return <HuntGate onUnlock={handleUnlock} />;
	}

	return (
		<>
			<HuntSlideshow />
			<HuntCountdown />
		</>
	);
}
