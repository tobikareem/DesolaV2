import { toast, ToastOptions } from "react-toastify";

const activeToasts: Record<string, boolean> = {};

export const toastManager = {
  show: (
    key: string,
    message: string,
    type: 'info' | 'success' | 'warn' | 'error' = 'info',
    options?: ToastOptions
  ) => {
    if (activeToasts[key]) return;

    activeToasts[key] = true;

    toast[type](message, {
      ...options,
      onClose: () => {
        activeToasts[key] = false;
        options?.onClose?.();
      },
      autoClose: options?.autoClose ?? 3000,
    });
  }
};
