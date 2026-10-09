import { useEffect } from 'react';

const LOCK_CLASS = 'is-scroll-locked';

let locksCount = 0;
let lockedScrollY = 0;
let lockedPath = '';

const getPath = () => window.location.pathname + window.location.search;

const lockPage = () => {
	lockedScrollY = window.scrollY;
	lockedPath = getPath();
	document.body.style.top = `-${lockedScrollY}px`;
	document.body.classList.add(LOCK_CLASS);
};

const unlockPage = () => {
	document.body.classList.remove(LOCK_CLASS);
	document.body.style.top = '';
	window.scrollTo({
		top: getPath() === lockedPath ? lockedScrollY : 0,
		behavior: 'instant'
	});
};

export function useLockScroll(lock: boolean) {
	useEffect(() => {
		if (!lock) return;

		if (locksCount === 0) lockPage();
		locksCount += 1;

		return () => {
			locksCount -= 1;
			if (locksCount === 0) unlockPage();
		};
	}, [lock]);
}
