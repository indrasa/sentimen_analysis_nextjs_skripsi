// Type definitions for sentiment analysis progress tracking

export type SentimentLabel = 'Positive' | 'Negative' | 'Neutral' | 'Very Positive' | 'Very Negative'

export type SentimentResult = {
  label: SentimentLabel
  score: number
}

export type AnalysisProgress = {
  current: number      // 1-indexed (mulai dari 1)
  total: number
  commentText: string  // teks komentar yang sedang dianalisis
}

export type AnalysisStatus = 'idle' | 'running' | 'completed' | 'error'

// Comment type untuk input
export type Comment = {
  text: string
  [key: string]: unknown  // allow additional properties
}
