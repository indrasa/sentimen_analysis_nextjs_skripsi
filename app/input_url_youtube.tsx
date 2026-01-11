'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useYoutubeStore } from '@/store/useYoutubeStore'

// const isValidYoutubeURL = (url: string): boolean => {
//     const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=[-\w]{11}|youtu\.be\/[-\w]{11}|shorts\/[-\w]{11})/;
//     return youtubeRegex.test(url);
// }

export default function InputURLYoutube() {
    const setUrl = useYoutubeStore((s) => s.setUrl)
    const isValid = useYoutubeStore((s) => s.isValid)
    const url = useYoutubeStore((s) => s.url)

    // const handlePerubahanURL = (event) => {
    //     // kok dipisah? karena kalau satu di handleURL, nilai URL belum sempat diset dan divalidasi, gampangnya di sini aja
    //     setURL(event.target.value);
    // }

    const handleUrl = (url: string) => {
        // if (!URL || !isValidYoutubeURL(URL)) {
        //     alert('Mohon masukkan link YouTube yang valid');
        //     //todo: ganti alert dengan modal yang bagus
        //     return;
        // }
        alert(`LINK VALID: ${url}`);
    }

    return <>
        <Input onChange={(e) => setUrl(e.target.value)} />
        <Button onClick={() => handleUrl(url)} variant="default">Analisis Komentar</Button>
        {!isValid && (
            <p className="text-red-500 text-sm">URL nggak valid</p>
        )}
    </>
}