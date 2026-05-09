"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

interface AIAssistantContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextValue | null>(null);

export function AIAssistantProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((v) => !v), []);

    const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle]);

    return <AIAssistantContext.Provider value={value}>{children}</AIAssistantContext.Provider>;
}

export function useAIAssistant(): AIAssistantContextValue {
    const ctx = useContext(AIAssistantContext);
    if (!ctx) {
        // Fallback no-op so components don't crash if used outside the provider.
        return {
            isOpen: false,
            open: () => {},
            close: () => {},
            toggle: () => {},
        };
    }
    return ctx;
}
