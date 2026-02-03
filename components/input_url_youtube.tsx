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

    return <>
        <Input
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Masukkan URL video YouTube..."
            disabled={isLoading}
        />
        <Button
            onClick={() => handleUrl(url)}
            variant="default"
            disabled={isLoading || !isValid}
        >
            {isLoading ? <Spinner /> : 'Analisis Komentar'}
        </Button>
    </>
}