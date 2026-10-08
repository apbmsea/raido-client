import { useEffect } from 'react';

const LOCK_CLASS = 'is-scroll-locked';

// Блокировать прокрутку могут сразу несколько слоёв (меню + модальное окно),
// поэтому класс снимается только когда закрылся последний из них
let locksCount = 0;

export function useLockScroll(lock: boolean) {
	useEffect(() => {
		if (!lock) return;

		locksCount += 1;
		document.body.classList.add(LOCK_CLASS);

		return () => {
			locksCount -= 1;
			if (locksCount === 0) {
				document.body.classList.remove(LOCK_CLASS);
			}
		};
	}, [lock]);
}
