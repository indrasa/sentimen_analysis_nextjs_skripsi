'use client'

import { Button } from "./ui/button"
import { Card, CardAction, CardContent, CardHeader } from "./ui/card"
import { Progress } from "./ui/progress";

type KartuSentimenProps = {
    label: string,
    jumlah: number,
    komentar: string[],
}

export default function KartuSentimen({label, jumlah, komentar} : KartuSentimenProps  ) {
    const list_komentar: string []= komentar;
    return <>
        <Card className="rounded-xl p-6 shadow-sm border border-gray-100">
            <CardHeader className="text-3xl font-bold items-center gap-3">
                { label }
            </CardHeader>
            <CardContent className="text-5xl font-black text-right">
                { jumlah }
            </CardContent>
            <CardAction>
                <Button>
                    Lihat
                </Button>
            </CardAction>
            <Progress value={100} className="w-[60%] [$>div]:bg-blue-500"/>
        </Card>
    </>
}