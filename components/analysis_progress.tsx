'use client'

/**
 * Analysis Progress Component
 * 
 * Komponen UI yang PASIF dan REAKTIF:
 * - Hanya subscribe ke Zustand store
 * - Hanya render progress
 * - TIDAK ada logic bisnis
 * - TIDAK panggil API langsung
 */

import { useAnalysisStore } from '@/store/useAnalysisStore'
import { Progress } from '@/components/ui/progress'

export function AnalysisProgress() {
    const { status, progress, error } = useAnalysisStore()

    // Idle state - tidak tampilkan apa-apa
    if (status === 'idle') {
        return null
    }

    // Error state
    if (status === 'error') {
        return (
            <div className="w-full p-6 rounded-2xl bg-destructive/10 border border-destructive/30 backdrop-blur-sm">
                <p className="text-destructive text-base font-semibold">
                    Terjadi kesalahan saat menganalisis komentar
                </p>
                {error && (
                    <p className="text-destructive/80 text-sm mt-2">{error}</p>
                )}
            </div>
        )
    }

    // Completed state
    if (status === 'completed') {
        return (
            <div className="w-full p-6 rounded-2xl bg-primary/10 border border-primary/30 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="text-primary font-semibold text-base">
                            Analisis selesai!
                        </p>
                        {progress && (
                            <p className="text-muted-foreground text-sm mt-0.5">
                                {progress.total} komentar berhasil dianalisis
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Running state - show progress
    if (!progress) {
        return (
            <div className="w-full p-6 rounded-2xl bg-card border border-border backdrop-blur-sm">
                <p className="text-foreground text-base">
                    Memulai analisis...
                </p>
            </div>
        )
    }

    const percent = (progress.current / progress.total) * 100

    return (
        <div className="w-full p-6 rounded-2xl bg-card border border-border backdrop-blur-sm space-y-4">
            {/* Progress text */}
            <div className="flex items-center justify-between">
                <p className="text-foreground font-medium text-base">
                    Menganalisa komentar{' '}
                    <span className="text-primary font-semibold">{progress.current}</span>
                    {' '}dari{' '}
                    <span className="text-primary font-semibold">{progress.total}</span>
                </p>
                <span className="text-muted-foreground text-sm font-semibold">
                    {percent.toFixed(0)}%
                </span>
            </div>

            {/* Progress bar */}
            <Progress value={percent} className="h-2.5" />

            {/* Current comment text */}
            <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
                    Komentar saat ini:
                </p>
                <p className="text-foreground text-sm leading-relaxed line-clamp-2">
                    &ldquo;{progress.commentText}&rdquo;
                </p>
            </div>
        </div>
    )
}
