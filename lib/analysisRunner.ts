/**
 * Analysis Runner - Core logic untuk analisis sentimen sequential
 * 
 * Menggunakan async generator untuk yield progress setiap komentar selesai dianalisis.
 * Logic ini TERPISAH dari React component dan Zustand store.
 */

import type { Comment, SentimentResult, AnalysisProgress } from './types/analysis'

// Type untuk yield dari generator
export type AnalysisYield = AnalysisProgress & {
    result: SentimentResult
}

/**
 * Analyze single comment menggunakan Hugging Face API
 * Dijalankan di client-side
 */
async function analyzeSentiment(text: string): Promise<SentimentResult> {
    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('API Error:', response.status, errorText)
            throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()
        return data as SentimentResult
    } catch (error) {
        console.error('Sentiment analysis error:', error)
        // Return default neutral sentiment on error
        return { label: 'Neutral', score: 0.5 }
    }
}

/**
 * Async generator untuk menjalankan analisis sequential
 * Yield progress + result setiap komentar selesai dianalisis
 * 
 * @param comments - Array of comments to analyze
 * @yields AnalysisYield - Progress info + sentiment result
 */
export async function* runAnalysis(
    comments: Comment[]
): AsyncGenerator<AnalysisYield, void, unknown> {
    const total = comments.length

    for (let i = 0; i < total; i++) {
        const comment = comments[i]
        const commentText = comment.text || ''

        // Analyze sentiment untuk komentar ini
        const result = await analyzeSentiment(commentText)

        // Yield progress + result
        yield {
            current: i + 1,  // 1-indexed
            total,
            commentText,
            result,
        }
    }
}
