'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useYoutubeStore } from '@/store/useYoutubeStore'
import { KomentarAction } from "./actions/komentarAction"
import { AnalisaAction } from "./actions/analisaAction"

// const isValidYoutubeURL = (url: string): boolean => {
//     const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=[-\w]{11}|youtu\.be\/[-\w]{11}|shorts\/[-\w]{11})/;
//     return youtubeRegex.test(url);
// }

export default function InputURLYoutube() {
    const setUrl = useYoutubeStore((s) => s.setUrl)
    const isValid = useYoutubeStore((s) => s.isValid)
    const url = useYoutubeStore((s) => s.url)

    const handleUrl = async (url: string) => {
        // jika link valid, maka proses scraping dan analisa komentar, buat 2 action, pengumpul komentar dan analisa hugging face
        if (isValid) {
            // alert(`LINK VALID: ${url}`);
            // console.log(`valid, lanjut proses link ${url}`);
            //jadi minta ke serverAction > proses dari lib(scrapper), dan harus ditampung, kalau nggak nggak bisa
            const listKomentar = await KomentarAction(url);
            console.log(listKomentar);

            // next analisa dengan AnalisaAction, kirim list komentar ke actions
            const analisaKomentar = await AnalisaAction(listKomentar)
            console.log(`analisa komentar: ${analisaKomentar}`);
        } else if (!isValid) {
            // alert(`LINK TIDAK VALID: ${url}`);
            // console.log("nggak valid, perbaiki link");
        }
    }

    return <>
        <Input onChange={(e) => setUrl(e.target.value)} />
        <Button onClick={() => handleUrl(url)} variant="default">Analisis Komentar</Button>
        {/* {!isValid && (
            <p className="text-red-500 text-sm">URL nggak valid</p>
        )} */}

        {/* {
            isValid && <p className="text-green-500 text-sm">Valid</p>
        }
        {
            !isValid && <p className="text-red-500 text-sm">Tidak Valid</p>
        } */}
    </>
}