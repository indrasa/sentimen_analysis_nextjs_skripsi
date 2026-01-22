'use client'

import { SentimenData } from "@/store/useSentimenStore";
import { Button } from "../ui/button"
import { Card, CardAction, CardContent, CardHeader } from "../ui/card"
import { Progress } from "../ui/progress";
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
        <Card className="grid rounded-sm shadow-md border border-gray-100 p-4">
            <CardHeader className="text-2xl font-bold px-2 text-center justify-center">
                {label}
            </CardHeader>
            <CardContent className="text-4xl font-bold text-center">
                {jumlah}
            </CardContent>
            <div className="flex flex-col items-center space-y-5 px-2 pb-3">
                <CardAction className="items-center self-center md:self-end">
                    <DialogIsiKomentar list_komentar={list_komentar} label={label}/>
                </CardAction>
                {/* <Progress value={50} className="w-[60%] " /> */}
            </div>
        </Card>
    </>
}