'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useYoutubeStore } from '@/store/useYoutubeStore'
import { KomentarAction } from "../app/actions/komentarAction"
import { useSentimenStore } from '../store/useSentimenStore';
import { Spinner } from "./ui/spinner"
import { useAnalysisStore } from "@/store/useAnalysisStore"
import type { Comment } from "@/lib/types/analysis"

export default function InputURLYoutube() {
    // Use analysis store instead of loading store
    const { status: analysisStatus, startAnalysis, reset } = useAnalysisStore()

    const setUrl = useYoutubeStore((s) => s.setUrl)
    const isValid = useYoutubeStore((s) => s.isValid)
    const url = useYoutubeStore((s) => s.url)

    const { addSentimenResult, clearSentimenResults } = useSentimenStore();

    // Check if currently loading (either fetching comments or analyzing)
    const isLoading = analysisStatus === 'running'

    const handleUrl = async (url: string) => {
        // jika link valid, maka proses scraping dan analisa komentar
        if (isValid) {
            try {
                // Reset previous results
                reset()
                clearSentimenResults()

                // Step 1: Fetch comments (server action)
                const listKomentar = await KomentarAction(url);

                // Convert to Comment[] type
                const comments: Comment[] = listKomentar.map((k: { text?: string }) => ({
                    text: k.text || ''
                }))

                // Step 2: Start analysis with async generator
                // This will update progress in real-time
                await startAnalysis(comments, (result) => {
                    // Callback dipanggil setiap komentar selesai dianalisis
                    addSentimenResult(result)
                })

            } catch (e) {
                console.error('Error:', e)
            }
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-lg p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Masukkan URL video YouTube..."
                            disabled={isLoading}
                            className="h-12 text-base"
                        />
                    </div>
                    <Button
                        onClick={() => handleUrl(url)}
                        variant="default"
                        disabled={isLoading || !isValid}
                        className="h-12 px-8 text-base font-semibold whitespace-nowrap"
                    >
                        {isLoading ? <Spinner /> : 'Analisis Komentar'}
                    </Button>
                </div>
                {!isValid && url && (
                    <p className="text-sm text-destructive mt-3 ml-1">
                        URL YouTube tidak valid
                    </p>
                )}
            </div>
        </div>
    )
}