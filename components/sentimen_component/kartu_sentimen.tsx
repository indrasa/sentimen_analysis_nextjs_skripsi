'use client'

import { SentimenData } from "@/store/useSentimenStore";
import { Card, CardAction, CardContent, CardHeader } from "../ui/card"
import DialogIsiKomentar from '../dialog_isi_komentar';


type KartuSentimenProps = {
    label: string,
    jumlah: number,
    komentar: SentimenData[],
}

export default function KartuSentimen({ label, jumlah, komentar }: KartuSentimenProps) {
    const list_komentar: string[] = komentar.map(k => k.text);
    // console.log(`Komentar untuk label ${label}:`, list_komentar);
    return <>
        <Card className="flex h-full flex-col rounded-sm shadow-md border border-gray-100 p-4">
            <CardHeader className="text-2xl font-bold px-2 text-center">
                {label}
            </CardHeader>
            <CardContent className="text-4xl font-bold text-center">
                {jumlah}
            </CardContent>
            <div className="mt-auto flex flex-col items-center space-y-5 px-2 pb-3">
                <CardAction className="w-full flex justify-center">
                    <DialogIsiKomentar list_komentar={list_komentar} label={label} />
                </CardAction>
            </div>
        </Card>
    </>
}