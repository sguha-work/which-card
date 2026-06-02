import { useState, useEffect, useCallback, useRef } from "react";
import { getItem, setItem } from "../db/indexedDB";

/**
 * Drop-in replacement for useLocalStorage backed by IndexedDB.
 *
 * Returns [value, setValue, loading] where `loading` is true until the
 * initial async read from IndexedDB has completed.
 */
export function useIndexedDB<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  // Keep a ref to the latest value so the write callback stays stable.
  const latestRef = useRef<T>(initialValue);
  latestRef.current = storedValue;

  // Load from IndexedDB once on mount (or when key changes).
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getItem<T>(key)
      .then((value) => {
        if (!cancelled) {
          setStoredValue(value !== undefined ? value : initialValue);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(`[useIndexedDB] Read error for "${key}":`, err);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    (valueOrUpdater: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next =
          typeof valueOrUpdater === "function"
            ? (valueOrUpdater as (prev: T) => T)(prev)
            : valueOrUpdater;

        // Fire-and-forget write; the UI stays reactive via local state.
        setItem(key, next).catch((err) =>
          console.error(`[useIndexedDB] Write error for "${key}":`, err)
        );

        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue, loading] as const;
}
