'use server'
import { komentar_scrapper } from "@/lib/komentar_scrapper";

export async function KomentarAction(linkYoutube: string) {
    // validasi url youtube
    // console.log("kumpulkan komentar");
    // kumpulkan komentar
    const list_komentar = await komentar_scrapper(linkYoutube);
    
    // analisa komentar


    // return hasil
    // console.log(list_komentar);
    return list_komentar;
}