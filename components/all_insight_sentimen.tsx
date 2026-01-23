'use client'

import AllKartuSentimen from "@/components/sentimen_component/all_kartu_sentimen";
import ChartSentimen from './sentimen_component/chart_sentimen';
import { useSentimenStore } from "@/store/useSentimenStore";
import { useEffect } from "react";
import { Spinner } from "./ui/spinner";
import { StatusLoading, useLoadingStore } from "@/store/useLoadingStore";

export default function AllInsightSentimen() {

    const { sentimenResults } = useSentimenStore();
    // var isLoading: boolean = true;
    const { isLoading, status } = useLoadingStore();

    // gabungan isi komentar very positive, positive diambil dari sentimenResults
    // const positiveComments = sentimenResults
    //     .filter(item => item.label === 'Very Positive' || item.label === 'Positive')
    //     .map(item => item.text);

    // // gabungan isi komentar neutral diambil dari sentimenResults
    // const neutralComments = sentimenResults
    //     .filter(item => item.label === 'Neutral')
    //     .map(item => item.text);

    //     // gabungan isi komentar negative, very negative diambil dari sentimenResults
    // const negativeComments = sentimenResults
    //     .filter(item => item.label === 'Negative' || item.label === 'Very Negative')
    //     .map(item => item.text);

    useEffect(() => {
        // console.log(`Hasil sentimen: ${sentimenResults}`);
        // if (!Array.isArray(sentimenResults) || sentimenResults.length === 0) {
        //     isLoading = false;
        // }
    }, [sentimenResults]);

    if (isLoading) {
        return <>
            <div className="flex flex-col self-center justify-center items-center p-6">
                <Spinner />
                <h1 className="text-lg mt-3">{status === StatusLoading.STATUS_KERJAKAN_KOMENTAR ? 'Mengambil komentar...' : status === StatusLoading.STATUS_ANALISA_KOMENTAR ? 'Menganalisa komentar...' : 'Memproses data sentimen...'}</h1>
            </div>
        </>
    }

    // if (!sentimenResults || sentimenResults == null || sentimenResults == '') {
    if (!Array.isArray(sentimenResults) || sentimenResults.length === 0) {
        return
        <>
        </>
    } else if (sentimenResults) {
        return <>
            {/* <h1 className="text-2xl">Hasil Sentimen </h1>
            {sentimenResults.map(item => (
                <h1 key={item.text}>{item.text}</h1>
            ))} */}
            <h1 className="text-3xl font-bold text-center">Hasil Analisa Sentimen</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 mb-6">
                <div className="md:w-1/3">
                    <ChartSentimen />
                </div>
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 [@media(min-width:1024px)]:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] auto-rows-fr gap-6">
                    <AllKartuSentimen />
                </div>
            </div>
            
            {// next todo: perbaiki tampilan chart dan insight agar fit kiri kanan
                // pakai contoh ini
                // ...existing code...
                // <div className="flex flex-col md:flex-row mx-auto gap-5 justify-center w-full">
                //     <div className="self-center md:self-stretch flex-1">
                //         <ChartSentimen />
                //     </div>
                //     <div className='flex flex-col gap-3 flex-1'>
                //         <h1 className="text-3xl font-bold text-center">Insight Cepat</h1>
                //         <Card className='px-5 py-5'>insight 1</Card>
                //         <Card className='px-5 py-5'>insight 1</Card>
                //         <Card className='px-5 py-5'>insight 1</Card>
                //     </div>
                // </div>
                // ...existing code...

            }
            {/* <div className="flex flex-col md:flex-row mx-auto gap-5 justify-center w-full">
                <div className="self-center md:self-stretch flex-1">
                    <ChartSentimen />
                </div>
                <div className='flex flex-col gap-3 flex-1'>
                    <h1 className="text-3xl font-bold text-center">Insight Cepat</h1>
                    <Card className='px-5 py-5'>insight 1</Card>
                </div>
            </div> */}
        </>
    }

}