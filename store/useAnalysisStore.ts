/**
 * Zustand Store untuk Analysis Progress
 * 
 * Store ini HANYA menyimpan state dan expose actions.
 * Logic analisis ada di analysisRunner.ts
 * 
 * Pattern: for await...of untuk consume async generator
 */

import { create } from 'zustand'
import { runAnalysis } from '@/lib/analysisRunner'
import type {
    AnalysisProgress,
    AnalysisStatus,
    Comment
} from '@/lib/types/analysis'
import type { SentimenData } from './useSentimenStore'

interface AnalysisState {
    // State
    status: AnalysisStatus
    progress: AnalysisProgress | null
    error: string | null

    // Actions
    startAnalysis: (
        comments: Comment[],
        onResult?: (result: SentimenData) => void
    ) => Promise<void>
    reset: () => void
}

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
    // Initial state
    status: 'idle',
    progress: null,
    error: null,

    /**
     * Start analysis dengan async generator
     * Consume generator dengan for await...of
     * Update state setiap progress
     */
    startAnalysis: async (comments, onResult) => {
        // Reset dan set status running
        set({
            status: 'running',
            progress: null,
            error: null
        })

        try {
            // Consume async generator
            for await (const { result, ...progress } of runAnalysis(comments)) {
                // Update progress state
                set({ progress })

                // Callback untuk menyimpan result (ke useSentimenStore)
                if (onResult) {
                    onResult({
                        text: progress.commentText,
                        label: result.label,
                        score: result.score,
                    })
                }
            }

            // Selesai
            set({ status: 'completed' })
        } catch (error) {
            console.error('Analysis error:', error)
            set({
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        }
    },

    /**
     * Reset state ke initial
     */
    reset: () => set({
        status: 'idle',
        progress: null,
        error: null,
    }),
}))
