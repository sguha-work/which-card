const DB_NAME = "which-card-db";
const DB_VERSION = 1;
const STORE_NAME = "keyval";

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      dbPromise = null; // allow retry on next call
      reject(request.error);
    };

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });

  return dbPromise;
}

export async function getItem<T>(key: string): Promise<T | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result as T | undefined);
    request.onerror = () => reject(request.error);
  });
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(value, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/** Request durable (persistent) storage so the browser won't silently evict data. */
export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage?.persist) return false;
  const already = await navigator.storage.persisted();
  if (already) return true;
  return navigator.storage.persist();
}

/**
 * One-time migration: copies any existing localStorage values for the given
 * keys into IndexedDB and then removes them from localStorage.
 */
export async function migrateFromLocalStorage(keys: string[]): Promise<void> {
  for (const key of keys) {
    const raw = window.localStorage.getItem(key);
    if (raw === null) continue;
    try {
      const parsed = JSON.parse(raw);
      await setItem(key, parsed);
      window.localStorage.removeItem(key);
      console.info(`[which-card] Migrated "${key}" from localStorage → IndexedDB`);
    } catch (err) {
      console.warn(`[which-card] Migration failed for "${key}":`, err);
    }
  }
}
