'use client'

import KartuSentimen from "@/components/kartu_sentimen";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { useSentimenStore } from "@/store/useSentimenStore";
import { useEffect } from "react";


export default function Sentimen(){
    const { sentimenResults, getTotalCountByLabel } = useSentimenStore();
    
    useEffect(() => {
        // console.log(`ini dari halaman sentimen: ${sentimenResults}`);
        // console.log(sentimenResults);
    }, [sentimenResults]);

    return <>
        {/* {sentimenResults.map((item, index) => (
            <p key={index}>{item.text} {item.label} {item.score}</p>
        ))} */}
        <p>
            {/* Very Positive {getTotalCountByLabel('Very Positive') }
            Positive {getTotalCountByLabel('Positive') }
            Neutral {getTotalCountByLabel('Neutral') }
            Negative {getTotalCountByLabel('Negative') }
            Very Negative {getTotalCountByLabel('Very Negative') } */}
        </p>
        <div className="grid grid-cols-5">
            <KartuSentimen label="Very Positive" jumlah={getTotalCountByLabel('Very Positive')} komentar={['halo', 'dua']} />
            <KartuSentimen label="Positive" jumlah={getTotalCountByLabel('Positive')} komentar={['halo', 'dua']} />
            <KartuSentimen label="Neutral" jumlah={getTotalCountByLabel('Neutral')} komentar={['halo', 'dua']} />
            <KartuSentimen label="Negative" jumlah={getTotalCountByLabel('Negative')} komentar={['halo', 'dua']} />
            <KartuSentimen label="Very Negative" jumlah={getTotalCountByLabel('Very Negative')} komentar={['halo', 'dua']} />
        </div>

    </>
}