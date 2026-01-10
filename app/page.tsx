import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sentimen from './sentimen';
import InputURLYoutube from "./input_url_youtube";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-5xl font-black text-center mb-4">Analisis Sentimen Komentar Youtube</h1>
          <p className="text-center">Masukkan URL video Youtube untuk mengetahui sentimen komentar secara otomatis dengan teknologi AI canggih.</p>
          <div className="flex space-x-3 mt-7">
            <InputURLYoutube/>
          </div>
          <div className="my-9">
            <Sentimen/>
          </div>
        </div>
      </main>
    </div>
  );
}
