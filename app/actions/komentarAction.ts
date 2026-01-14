'use server'
import { komentar_scrapper } from "@/lib/komentar_scrapper";

export async function KomentarAction(linkYoutube: string) {
    // kumpulkan komentar
    const list_komentar = await komentar_scrapper(linkYoutube);
    
    // analisa komentar
    return list_komentar;
}