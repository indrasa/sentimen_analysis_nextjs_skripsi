'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useYoutubeStore } from '@/store/useYoutubeStore'
import { KomentarAction } from "../app/actions/komentarAction"
import { AnalisaAction } from "../app/actions/analisaAction"
import { useSentimenStore } from '../store/useSentimenStore';
import { Spinner } from "./ui/spinner"
import { StatusLoading, useLoadingStore } from "@/store/useLoadingStore"

export default function InputURLYoutube() {
    // const [ isLoading, setLoading ] = useState(false);
    const { isLoading, setLoading, setStatus } = useLoadingStore();

    const setUrl = useYoutubeStore((s) => s.setUrl)
    const isValid = useYoutubeStore((s) => s.isValid)
    const url = useYoutubeStore((s) => s.url)

    const { setSentimenResults } = useSentimenStore();

    const handleUrl = async (url: string) => {
        // jika link valid, maka proses scraping dan analisa komentar, buat 2 action, pengumpul komentar dan analisa hugging face
        if (isValid) {
            try {
                setLoading(true);
                setStatus(StatusLoading.STATUS_KERJAKAN_KOMENTAR);
                //jadi minta ke serverAction > proses dari lib(scrapper), dan harus ditampung, kalau nggak nggak bisa
                const listKomentar = await KomentarAction(url);
                // console.log(listKomentar);
                // next analisa dengan AnalisaAction, kirim list komentar ke actions
                setStatus(StatusLoading.STATUS_ANALISA_KOMENTAR);
                const analisaKomentar = await AnalisaAction(listKomentar)
                // console.log(analisaKomentar);

                // console.log(`analisa komentar: ${analisaKomentar[0].label}`);
                //gabung hasil analisa dan komentar jadi satu
                const gabungKomentarDanAnalisa = listKomentar.map((komentar, index) => ({
                    ...komentar,
                    sentimen: analisaKomentar[index]
                }));
                // console.log(gabungKomentarDanAnalisa);

                // buat variabel baru menampung 3 saja, komentar, label sentimen, dan skor sentimen
                const filteredKomentar = gabungKomentarDanAnalisa.map((item) => ({
                    text: item.text,
                    label: item.sentimen.label,
                    score: item.sentimen.score,
                    // kalau mau nambah photo dan authornya bisa di sini, kayaknya kita pakai ini aja
                }));
                // console.log(filteredKomentar);
                setSentimenResults(filteredKomentar)
                //todo: next lanjut di sini
                //kemudian masukkan ke store untuk di filter per kategori dan dibuatkan chart
                // console.log(filteredKomentar);
                
            } catch (e) {
                // error di sini
            } finally {
                setLoading(false);
                setStatus(StatusLoading.IDLE);
            }
        } else if (!isValid) {
            // alert(`LINK TIDAK VALID: ${url}`);
        }
    }

    return <>
        <Input onChange={(e) => setUrl(e.target.value)} />
        <Button onClick={() => handleUrl(url)} variant="default">{isLoading ? <Spinner/> : 'Analisis Komentar'}</Button>
    </>
}