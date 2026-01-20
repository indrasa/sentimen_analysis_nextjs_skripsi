'use client'

import KartuSentimen from "@/components/sentimen_component/kartu_sentimen";
import { useSentimenStore } from "@/store/useSentimenStore";
import { useEffect } from "react";


export default function Sentimen() {
    const { sentimenResults, getTotalCountByLabel } = useSentimenStore();

    useEffect(() => {
        // console.log(`ini dari halaman sentimen: ${sentimenResults}`);
        // console.log(sentimenResults);
    }, [sentimenResults]);

    return <>
        <KartuSentimen label="Very Positive" jumlah={getTotalCountByLabel('Very Positive')} komentar={['halo', 'dua']} />
        <KartuSentimen label="Positive" jumlah={getTotalCountByLabel('Positive')} komentar={['halo', 'dua']} />
        <KartuSentimen label="Neutral" jumlah={getTotalCountByLabel('Neutral')} komentar={['halo', 'dua']} />
        <KartuSentimen label="Negative" jumlah={getTotalCountByLabel('Negative')} komentar={['halo', 'dua']} />
        <KartuSentimen label="Very Negative" jumlah={getTotalCountByLabel('Very Negative')} komentar={['halo', 'dua']} />
    </>
}