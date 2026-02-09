import InputURLYoutube from "../components/input_url_youtube";
import AllInsightSentimen from '@/components/all_insight_sentimen';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/30">
      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold tracking-tight bg-linear-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Analisis Sentimen Komentar YouTube
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Masukkan URL video YouTube untuk mengetahui sentimen komentar secara otomatis dengan teknologi AI canggih.
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-16">
            <InputURLYoutube />
          </div>

          {/* Results Section */}
          <AllInsightSentimen />
        </div>
      </main>
    </div>
  );
}
