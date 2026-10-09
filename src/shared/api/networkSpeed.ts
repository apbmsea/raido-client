const SLOW_REQUEST_MS = 3000;
const SLOW_REQUESTS_LIMIT = 2;
const SLOW_PAGE_LOAD_MS = 8000;

let slowRequests = 0;
let isSlow = false;
const listeners = new Set<() => void>();

const markSlow = () => {
	if (isSlow) return;

	isSlow = true;
	listeners.forEach(listener => listener());
};

export const reportRequestDuration = (duration: number) => {
	if (duration < SLOW_REQUEST_MS) return;

	slowRequests += 1;
	if (slowRequests >= SLOW_REQUESTS_LIMIT) markSlow();
};

export const reportRequestFailure = () => {
	if (navigator.onLine) markSlow();
};

export const reportPageLoad = () => {
	if (
		document.visibilityState === 'visible' &&
		performance.now() >= SLOW_PAGE_LOAD_MS
	) {
		markSlow();
	}
};

export const subscribeToNetworkSpeed = (listener: () => void) => {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
};

export const getIsNetworkSlow = () => isSlow;
