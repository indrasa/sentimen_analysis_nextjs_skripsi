'use client'

import AllKartuSentimen from "@/components/sentimen_component/all_kartu_sentimen";
import ChartSentimen from './sentimen_component/chart_sentimen';
import { useSentimenStore } from "@/store/useSentimenStore";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { AnalysisProgress } from "./analysis_progress";
import ListKomentar from "./list_komentar";

export default function AllInsightSentimen() {
    const { sentimenResults } = useSentimenStore();
    const { status } = useAnalysisStore();
    

    // tampilakn progress saat analisa berjalan
    if (status === 'running') {
        return (
            <div className="w-full mt-8">
                <AnalysisProgress />
            </div>
        );
    }

    // Tampilkan pesan selesai sebentar atau tidak sama sekali saat idle tanpa hasil
    if (!Array.isArray(sentimenResults) || sentimenResults.length === 0) {
        // Tampilkan status selesai jika analisis baru saja selesai
        if (status === 'completed') {
            return (
                <div className="w-full mt-8">
                    <AnalysisProgress />
                </div>
            );
        }
        return null;
    }

    // Tampilkan hasil analisa sentimen
    return (
        <div className="w-full space-y-8">
            {/* Tampilkan pesan selesai jika baru saja selesai */}
            {status === 'completed' && (
                <div className="mb-6">
                    <AnalysisProgress />
                </div>
            )}

            <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-center bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Hasil Analisa Sentimen
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Bagian Grafik */}
                    <div className="lg:col-span-3">
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg h-full">
                            <ChartSentimen />
                        </div>
                    </div>

                    {/* Bagian Kartu */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AllKartuSentimen />
                    </div>

                    {/* bagian kumpulan komentar */}
                </div>
                <div className="grid grid-cols-1 gap-2">
                    <ListKomentar/>
                </div>
            </div>
        </div>
    );
}