'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const isValidYoutubeURL = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=[-\w]{11}|youtu\.be\/[-\w]{11}|shorts\/[-\w]{11})/;
    return youtubeRegex.test(url);
}

export default function InputURLYoutube(){
    const [URL, setURL] = useState();
    

    const handlePerubahanURL = (event) => {
        // kok dipisah? karena kalau satu di handleURL, nilai URL belum sempat diset dan divalidasi, gampangnya di sini aja
        setURL(event.target.value);
    }

    const handleUrl = () => {
        if (!URL || !isValidYoutubeURL(URL)) {
            alert('Mohon masukkan link YouTube yang valid');
            //todo: ganti alert dengan modal yang bagus
            return;
        }
        alert(`LINK VALID: ${URL}`);
    }

    return <>
        <Input onChange={handlePerubahanURL} />
        <Button onClick={handleUrl} variant="default">Analisis Komentar</Button>
    </>
}