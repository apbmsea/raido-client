type NavigateOptions = { replace?: boolean };
type NavigateFn = (path: string, options?: NavigateOptions) => void;

let navigate: NavigateFn | null = null;

/** Регистрирует навигацию роутера, чтобы ею могли пользоваться саги */
export const setNavigate = (navFn: NavigateFn) => {
	navigate = navFn;
};

export const navigateTo = (path: string, options?: NavigateOptions) => {
	navigate?.(path, options);
};
