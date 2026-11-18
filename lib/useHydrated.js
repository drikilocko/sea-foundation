import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Renvoie false pendant le rendu serveur et l’hydratation, puis true côté navigateur. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
