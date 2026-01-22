import { create } from 'zustand';

export enum StatusLoading {
    IDLE,
    STATUS_KERJAKAN_KOMENTAR,
    STATUS_ANALISA_KOMENTAR,
}

type LoadingState = {
    isLoading: boolean;
    setLoading: (v: boolean) => void;
    status: StatusLoading;
    setStatus: (s: StatusLoading) => void;
}

export const useLoadingStore = create<LoadingState>((set) => (
    {
        isLoading: false,
        setLoading: (v) => set({isLoading: v}),
        status: StatusLoading.IDLE,
        setStatus: (s) => set({status: s}),
    }
));