'use client'

import { Button } from "../ui/button"
import { Card, CardAction, CardContent, CardHeader } from "../ui/card"
import { Progress } from "../ui/progress";


type KartuSentimenProps = {
    label: string,
    jumlah: number,
    komentar: string[],
}

export default function KartuSentimen({ label, jumlah, komentar }: KartuSentimenProps) {
    const list_komentar: string[] = komentar;
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
                    <Button>
                        Lihat
                    </Button>
                </CardAction>
                <Progress value={50} className="w-[60%] " />
            </div>
        </Card>
    </>
}