type NavigateOptions = { replace?: boolean };

let navigate: (path: string, options?: NavigateOptions) => void;

export const setNavigate = (navFn: typeof navigate) => {
  navigate = navFn;
};

export const navigateTo = (path: string, options?: NavigateOptions) => {
  if (navigate) {
    navigate(path, options);
  }
};
