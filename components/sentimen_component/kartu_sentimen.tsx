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
            return 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 hover:border-emerald-500/50';
        case 'Positive':
            return 'border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/20 hover:border-teal-500/50';
        case 'Neutral':
            return 'border-slate-500/30 bg-slate-50/50 dark:bg-slate-950/20 hover:border-slate-500/50';
        case 'Negative':
            return 'border-orange-500/30 bg-orange-50/50 dark:bg-orange-950/20 hover:border-orange-500/50';
        case 'Very Negative':
            return 'border-red-500/30 bg-red-50/50 dark:bg-red-950/20 hover:border-red-500/50';
        default:
            return 'border-border bg-card hover:border-primary/50';
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
            <CardContent className="text-5xl font-bold text-center text-foreground my-4">
                {jumlah}
            </CardContent>
            <div className="mt-auto flex flex-col items-center space-y-3 px-0">
                <CardAction className="w-full flex justify-center">
                    <DialogIsiKomentar list_komentar={list_komentar} label={label} />
                </CardAction>
            </div>
        </Card>
    </>
}