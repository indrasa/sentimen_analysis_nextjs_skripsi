/**
 * API Route untuk sentiment analysis
 * Memanggil Hugging Face API dari server-side untuk menyembunyikan API key
 */

import { NextRequest, NextResponse } from 'next/server'

type SentimentScore = {
    label: string
    score: number
}

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json()

        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            )
        }

        const response = await fetch(
            'https://router.huggingface.co/hf-inference/models/tabularisai/multilingual-sentiment-analysis',
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ inputs: text }),
            }
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error('HF API Error:', response.status, errorText)
            return NextResponse.json(
                { error: 'Hugging Face API error', details: errorText },
                { status: response.status }
            )
        }

        const result = await response.json()

        // Response format: [[{label, score}, {label, score}, ...]]
        if (!result || !Array.isArray(result) || result.length === 0) {
            return NextResponse.json(
                { error: 'Invalid API response' },
                { status: 500 }
            )
        }

        const sentiments: SentimentScore[] = result[0]

        if (!Array.isArray(sentiments)) {
            return NextResponse.json(
                { error: 'Invalid sentiment data' },
                { status: 500 }
            )
        }

        // Tentukan skor tertinggi
        const highestScore = sentiments.reduce((highest, current) =>
            current.score > highest.score ? current : highest
        )

        return NextResponse.json({
            label: highestScore.label,
            score: highestScore.score,
        })
    } catch (error) {
        console.error('Analyze API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
