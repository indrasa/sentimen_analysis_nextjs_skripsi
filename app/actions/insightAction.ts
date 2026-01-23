'use server'
import komentar_insight_cepat from "@/lib/komentar_insight_cepat";

export async function InsightAction(list_komentar: string[]) {
    // analisa komentar
    const insight = await komentar_insight_cepat(list_komentar);
    return insight;
}