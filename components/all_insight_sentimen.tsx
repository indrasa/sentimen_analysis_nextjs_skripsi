'use client'

import AllKartuSentimen from "@/components/sentimen_component/all_kartu_sentimen";
import ChartSentimen from './sentimen_component/chart_sentimen';
import { useSentimenStore } from "@/store/useSentimenStore";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { AnalysisProgress } from "./analysis_progress";

export default function AllInsightSentimen() {
    const { sentimenResults } = useSentimenStore();
    const { status } = useAnalysisStore();

    // Show progress component when running
    if (status === 'running') {
        return (
            <div className="w-full mt-8">
                <AnalysisProgress />
            </div>
        );
    }

    // Show completed message briefly or nothing when idle with no results
    if (!Array.isArray(sentimenResults) || sentimenResults.length === 0) {
        // Show completed state if analysis just finished
        if (status === 'completed') {
            return (
                <div className="w-full mt-8">
                    <AnalysisProgress />
                </div>
            );
        }
        return null;
    }

    // Show results
    return (
        <div className="w-full mt-8">
            {/* Show completed message if just finished */}
            {status === 'completed' && <AnalysisProgress />}

            <h1 className="text-3xl font-bold text-center mt-6">Hasil Analisa Sentimen</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 mb-6">
                <div className="md:w-1/3">
                    <ChartSentimen />
                </div>
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 [@media(min-width:1024px)]:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] auto-rows-fr gap-6">
                    <AllKartuSentimen />
                </div>
            </div>
        </div>
    );
}