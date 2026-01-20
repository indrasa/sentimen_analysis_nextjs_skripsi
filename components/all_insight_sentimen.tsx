'use client'

import Sentimen from "@/components/sentimen_component/all_kartu_sentimen";
import ChartSentimen from "./sentimen_component/chart_sentimen";
import { Card } from "./ui/card";
import { useSentimenStore } from "@/store/useSentimenStore";
import { useEffect } from "react";

export default function AllInsightSentimen() {

    const { sentimenResults } = useSentimenStore();

    useEffect(() => {
        console.log(`Hasil sentimen: ${sentimenResults}`);
    }, [sentimenResults]);

    if (!sentimenResults || sentimenResults == null || sentimenResults == '') {
        return <>nggak ada</>
    } else if (sentimenResults) {
        return <>
            <h1 className="text-2xl">Hasil Sentimen </h1>
            {sentimenResults.map(item => (
                <h1 key={item.text}>{item.text}</h1>
            ))}
            <div className="my-9 grid grid-cols-1 md:grid-cols-5 col-span-1 gap-6">
                <Sentimen />
            </div>

            <div className="flex flex-col gap-5 justify-center">
                <div className="self-center">
                    <ChartSentimen />
                </div>
                <div className='flex flex-col gap-3'>
                    <h1 className="text-3xl font-bold text-center">Insight Cepat</h1>
                    <Card className='px-5 py-5'>insight 1</Card>
                    <Card className='px-5 py-5'>insight 1</Card>
                    <Card className='px-5 py-5'>insight 1</Card>
                </div>
            </div>
        </>
    }
    
}