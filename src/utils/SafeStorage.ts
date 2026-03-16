export const SafeStorage = {
  get<T>(key: string, fb: T | null = null): T | null {
    try {
      const r = localStorage.getItem(key);
      return r ? (JSON.parse(r) as T) : fb;
    } catch {
      return fb;
    }
  },
  set(key: string, v: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  },
};
