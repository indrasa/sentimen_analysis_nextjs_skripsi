'use client'

import KartuSentimen from "@/components/sentimen_component/kartu_sentimen";
import { useSentimenStore } from "@/store/useSentimenStore";
import { useEffect } from "react";


export default function AllKartuSentimen() {
    const { sentimenResults, getTotalCountByLabel, getSentimenByLabel } = useSentimenStore();

    useEffect(() => {
        // console.log(`ini dari halaman sentimen: ${sentimenResults}`);
        // console.log(sentimenResults);
        // console.log('Very Positive Comments:', sentimenVeryPositive);
        // console.log('Positive Comments:', sentimenPositive);
        // console.log('Neutral Comments:', sentimenNeutral);
        // console.log('Negative Comments:', sentimenNegative);
        // console.log('Very Negative Comments:', sentimenVeryNegative);
    }, [sentimenResults]);

    const sentimenVeryPositive = getSentimenByLabel('Very Positive');
    const sentimenPositive = getSentimenByLabel('Positive');
    const sentimenNeutral = getSentimenByLabel('Neutral');
    const sentimenNegative = getSentimenByLabel('Negative');
    const sentimenVeryNegative = getSentimenByLabel('Very Negative');

    // console.log('Very Positive Comments:', sentimenVeryPositive);
    // console.log('Positive Comments:', sentimenPositive);
    // console.log('Neutral Comments:', sentimenNeutral);
    // console.log('Negative Comments:', sentimenNegative);
    // console.log('Very Negative Comments:', sentimenVeryNegative);

    return <>
        <KartuSentimen label="Very Positive" jumlah={getTotalCountByLabel('Very Positive')} komentar={sentimenVeryPositive} />
        <KartuSentimen label="Positive" jumlah={getTotalCountByLabel('Positive')} komentar={sentimenPositive} />
        <KartuSentimen label="Neutral" jumlah={getTotalCountByLabel('Neutral')} komentar={sentimenNeutral} />
        <KartuSentimen label="Negative" jumlah={getTotalCountByLabel('Negative')} komentar={sentimenNegative} />
        <KartuSentimen label="Very Negative" jumlah={getTotalCountByLabel('Very Negative')} komentar={sentimenVeryNegative} />
    </>
}