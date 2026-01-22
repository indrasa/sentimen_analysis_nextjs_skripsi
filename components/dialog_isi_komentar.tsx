'use client';

import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type DialogIsiKomentarProps = {
    label?: string,
    list_komentar?: string[],
}

export default function DialogIsiKomentar({ label = "", list_komentar = [] }: DialogIsiKomentarProps) {
    // console.log('Komentar yang diterima di DialogIsiKomentar:', list_komentar);
    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="text-sm">Lihat Komentar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                    <DialogDescription>
                        Daftar komentar dengan sentimen {label}:
                    </DialogDescription>
                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                    {
                        (Array.isArray(list_komentar) ? list_komentar : []).map((komentar, index) => (
                            <p key={index} className="mb-2">{komentar}</p>
                        ))
                    }
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Tutup</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </>
}