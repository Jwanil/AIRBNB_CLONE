export const getSaved = (id: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(`saved_${id}`) === 'true';
  } catch {
    return false;
  }
};

export const setSaved = (id: string, val: boolean): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`saved_${id}`, String(val));
  } catch {}
};

export const setLastLightboxIndex = (id: string, idx: number): void => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(`lightbox_${id}`, String(idx));
  } catch {}
};
