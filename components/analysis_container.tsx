'use client'

/**
 * Contoh komponen yang mengintegrasikan sistem progress analysis
 * 
 * Cara penggunaan:
 * 1. Import komponen ini atau gunakan sebagai referensi
 * 2. Pastikan sudah ada list komentar dari YouTube
 * 3. Panggil startAnalysis dari useAnalysisStore
 */

import { useAnalysisStore } from '@/store/useAnalysisStore'
import { useSentimenStore } from '@/store/useSentimenStore'
import { AnalysisProgress } from '@/components/analysis_progress'
import { Button } from '@/components/ui/button'
import type { Comment } from '@/lib/types/analysis'

interface AnalysisContainerProps {
    comments: Comment[]  // List komentar dari YouTube scraper
}

export function AnalysisContainer({ comments }: AnalysisContainerProps) {
    // Store untuk progress tracking
    const { status, startAnalysis, reset } = useAnalysisStore()

    // Store untuk menyimpan hasil sentimen
    const { addSentimenResult, clearSentimenResults } = useSentimenStore()

    // Handler untuk mulai analisis
    const handleStartAnalysis = async () => {
        // Clear hasil sebelumnya
        clearSentimenResults()

        // Mulai analisis dengan callback untuk simpan hasil
        await startAnalysis(comments, (result) => {
            addSentimenResult(result)
        })
    }

    // Handler untuk reset
    const handleReset = () => {
        reset()
        clearSentimenResults()
    }

    return (
        <div className="space-y-4">
            {/* Tombol kontrol */}
            <div className="flex gap-2">
                <Button
                    onClick={handleStartAnalysis}
                    disabled={status === 'running'}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    {status === 'running' ? 'Menganalisis...' : 'Mulai Analisis'}
                </Button>

                {(status === 'completed' || status === 'error') && (
                    <Button
                        onClick={handleReset}
                        variant="outline"
                    >
                        Reset
                    </Button>
                )}
            </div>

            {/* Progress component - reaktif dari store */}
            <AnalysisProgress />

            {/* Info jumlah komentar */}
            {status === 'idle' && (
                <p className="text-slate-400 text-sm">
                    {comments.length} komentar siap dianalisis
                </p>
            )}
        </div>
    )
}
