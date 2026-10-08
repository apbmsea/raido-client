import { useEffect, type RefObject } from 'react';

/**
 * Вызывает onOutside при клике мимо элемента и по нажатию Escape
 */
export function useClickOutside(
	ref: RefObject<HTMLElement | null>,
	onOutside: () => void,
	enabled = true
) {
	useEffect(() => {
		if (!enabled) return;

		const handlePointerDown = (e: PointerEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onOutside();
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onOutside();
		};

		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [ref, onOutside, enabled]);
}
