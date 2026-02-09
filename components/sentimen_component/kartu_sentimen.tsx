'use client'

import { SentimenData } from "@/store/useSentimenStore";
import { Card, CardAction, CardContent, CardHeader } from "../ui/card"
import DialogIsiKomentar from '../dialog_isi_komentar';


type KartuSentimenProps = {
    label: string,
    jumlah: number,
    komentar: SentimenData[],
}

// Color mapping for different sentiment types
const getSentimentColors = (label: string) => {
    switch (label) {
            case 'Very Positive':
                return 'border-primary bg-primary/10 dark:bg-primary/20 hover:border-primary/80';
            case 'Positive':
                return 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:border-blue-500';
            case 'Neutral':
                return 'border-zinc-400 bg-zinc-50 dark:bg-zinc-900/20 hover:border-zinc-500';
            case 'Negative':
                return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 hover:border-yellow-600';
            case 'Very Negative':
                return 'border-destructive bg-destructive/10 dark:bg-destructive/20 hover:border-destructive/80';
            default:
                return 'border-border bg-background hover:border-primary/50';
    }
};

export default function KartuSentimen({ label, jumlah, komentar }: KartuSentimenProps) {
    const list_komentar: string[] = komentar.map(k => k.text);
    const colorClasses = getSentimentColors(label);

    return <>
        <Card className={`flex h-full flex-col rounded-2xl shadow-lg border-2 p-6 transition-all duration-300 hover:shadow-xl ${colorClasses}`}>
            <CardHeader className="text-lg font-semibold px-0 text-center text-foreground/80">
                {label}
            </CardHeader>
            <CardContent className="text-6xl font-bold text-center text-foreground my-4">
                {jumlah}
            </CardContent>
            {/* <div className="mt-auto flex flex-col items-center space-y-3 px-0">
                <CardAction className="w-full flex justify-center">
                    <DialogIsiKomentar list_komentar={list_komentar} label={label} />
                </CardAction>
            </div> */}
        </Card>
    </>
}