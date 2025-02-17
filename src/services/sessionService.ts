import { SESSION_VALUES } from "../utils/constants";


export const saveSession = (key: string, value: string) => {
    sessionStorage.setItem(`${SESSION_VALUES.chat}_${key}`, value);
};

export const getSession = (key: string) => {
    const data = sessionStorage.getItem(`${SESSION_VALUES.chat}_${key}`);
    return data ? JSON.parse(data) : null;
};

export const clearSession = () => {
    sessionStorage.clear();
};
