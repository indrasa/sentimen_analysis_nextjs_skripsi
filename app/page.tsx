import InputURLYoutube from "../components/input_url_youtube";
import AllInsightSentimen from '@/components/all_insight_sentimen';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 px-8 md:px-32 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-5xl font-black text-center mb-4">Analisis Sentimen Komentar Youtube</h1>
          <p className="text-center">Masukkan URL video Youtube untuk mengetahui sentimen komentar secara otomatis dengan teknologi AI canggih.</p>
          <div className="flex flex-col gap-2 md:flex-row space-x-3 mt-7">
            <InputURLYoutube />
          </div>
         <AllInsightSentimen />
        </div>

      </main>

    </div>
  );
}
