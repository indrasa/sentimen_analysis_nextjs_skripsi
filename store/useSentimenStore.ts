import { create } from 'zustand';

export interface SentimenData {
  text: string;
  label: string;
  score: number;
}

interface SentimenStore {
  sentimenResults: SentimenData[];
  //data inti
  setSentimenResults: (results: SentimenData[]) => void;
  addSentimenResult: (result: SentimenData) => void;
  clearSentimenResults: () => void;
  getTotalCount: () => number;
  getAverageScore: () => number;
  // per label sentimen
  getSentimenByLabel: (label: string) => SentimenData[];
  getTotalCountByLabel: (label: string) => number;
}

export const useSentimenStore = create<SentimenStore>((set, get) => ({
  sentimenResults: [],
  
  setSentimenResults: (results) => set({ sentimenResults: results }),
  
  addSentimenResult: (result) => set((state) => ({
    sentimenResults: [...state.sentimenResults, result]
  })),
  
  clearSentimenResults: () => set({ sentimenResults: [] }),
  
  getSentimenByLabel: (label) => {
    return get().sentimenResults.filter(item => item.label === label);
  },
  
  getTotalCount: () => {
    return get().sentimenResults.length;
  },
  
  getAverageScore: () => {
    const results = get().sentimenResults;
    if (results.length === 0) return 0;
    const total = results.reduce((sum, item) => sum + item.score, 0);
    return total / results.length;
  },
  
  getTotalCountByLabel: (label) => {
    return get().sentimenResults.filter(item => item.label === label).length;
  },
}));
