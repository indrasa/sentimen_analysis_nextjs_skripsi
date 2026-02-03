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
            <div className="w-full p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm font-medium">
                    Terjadi kesalahan saat menganalisis komentar
                </p>
                {error && (
                    <p className="text-red-300/70 text-xs mt-1">{error}</p>
                )}
            </div>
        )
    }

    // Completed state
    if (status === 'completed') {
        return (
            <div className="w-full p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <p className="text-green-400 font-medium">
                        Analisis selesai!
                    </p>
                </div>
                {progress && (
                    <p className="text-green-300/70 text-sm mt-1">
                        {progress.total} komentar berhasil dianalisis
                    </p>
                )}
            </div>
        )
    }

    // Running state - show progress
    if (!progress) {
        return (
            <div className="w-full p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <p className="text-slate-300 text-sm">
                    Memulai analisis...
                </p>
            </div>
        )
    }

    const percent = (progress.current / progress.total) * 100

    return (
        <div className="w-full p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-3">
            {/* Progress text */}
            <div className="flex items-center justify-between">
                <p className="text-slate-200 font-medium">
                    Menganalisa komentar{' '}
                    <span className="text-blue-400">{progress.current}</span>
                    {' '}dari{' '}
                    <span className="text-blue-400">{progress.total}</span>
                </p>
                <span className="text-slate-400 text-sm">
                    {percent.toFixed(0)}%
                </span>
            </div>

            {/* Progress bar */}
            <Progress value={percent} className="h-2" />

            {/* Current comment text */}
            <div className="bg-slate-900/50 rounded-md p-3 border border-slate-700/30">
                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
                    Komentar saat ini:
                </p>
                <p className="text-slate-300 text-sm italic line-clamp-2">
                    &ldquo;{progress.commentText}&rdquo;
                </p>
            </div>
        </div>
    )
}
