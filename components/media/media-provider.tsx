"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface MediaState { activeId: string | null; setActive: (id: string | null) => void }
const MediaContext = createContext<MediaState>({ activeId: null, setActive: () => {} });

/** Tracks the single track/embed allowed to play at any time. */
export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const setActive = useCallback((id: string | null) => setActiveId(id), []);
  const value = useMemo(() => ({ activeId, setActive }), [activeId, setActive]);
  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export const useActiveMedia = () => useContext(MediaContext);
