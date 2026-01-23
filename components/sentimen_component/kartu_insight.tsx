'use client'

import { InsightAction } from "@/app/actions/insightAction"
import { useEffect, useState } from "react"
import { Spinner } from "../ui/spinner";

type KomentarSiapInsight = {
    listKomentar: string[],
}

export default function KartuInsight({listKomentar} : KomentarSiapInsight) {

    // const insight = InsightAction(listKomentar);

    const [insight, setInsight] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=> {
        const fetchInsight = async () => {
            try {
                setLoading(true);
                const result = await InsightAction(listKomentar);
                if (result !== undefined){
                    setInsight(result);
                }
            } catch (error) {
                setLoading(false);
                console.error("Error fetching insight:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchInsight();
    }, [listKomentar]);

    if (loading) {
        return <>
        <Spinner/>
        </>
    }
    
    return <>
    <h1>{insight}</h1>
    </>
}