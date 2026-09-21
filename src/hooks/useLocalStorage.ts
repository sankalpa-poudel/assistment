"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue) {
        const parsedValue: unknown = JSON.parse(storedValue);
        if (Array.isArray(initialValue) ? Array.isArray(parsedValue) : parsedValue !== null) {
          setValue(parsedValue as T);
        }
      }
    } catch {
      window.localStorage.removeItem(key);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [isLoaded, key, value]);

  return [value, setValue] as const;
}