import Sentimen from '../components/sentimen_component/all_kartu_sentimen';
import InputURLYoutube from "../components/input_url_youtube";
import ChartSentimen from "@/components/sentimen_component/chart_sentimen";
import { Card } from '@/components/ui/card';
import AllInsightSentimen from '@/components/all_insight_sentimen';

export default function Home() {
  const isSudahDiAnalisa = true;



  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-5xl font-black text-center mb-4">Analisis Sentimen Komentar Youtube</h1>
          <p className="text-center">Masukkan URL video Youtube untuk mengetahui sentimen komentar secara otomatis dengan teknologi AI canggih.</p>
          <div className="flex space-x-3 mt-7">
            <InputURLYoutube />
          </div>
         
         
          {isSudahDiAnalisa && <AllInsightSentimen />}

        </div>

      </main>

    </div>
  );
}
