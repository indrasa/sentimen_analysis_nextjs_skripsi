'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);


export default function ChartSentimen() {

    const data = {
        labels: ['Very Positive', 'Positive', 'Neutral', 'Negative', 'Very Negative'],
        datasets: [{
            label: 'Sentimen Analysis',
            data: [300, 50, 40, 50, 100], //todo: ganti dengan data asli
            backgroundColor: [
                'rgb(22, 145, 67)',   // green for positive
                'rgb(59, 189, 214)',   // green for very positive
                'rgb(151, 154, 159)',   // blue for neutral
                'rgb(239, 148, 68)',   // orange for negative
                'rgb(239, 68, 68)'    // red for very negative
            ],
            borderColor: [
                'rgb(22, 145, 67)',
                'rgb(59, 189, 214)',
                'rgb(151, 154, 159)',
                'rgb(220, 138, 38)',
                'rgb(220, 38, 38)'
            ],
            borderWidth: 1,
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        plugin: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: "Hasil Analisis Sentimen"
            }
        }
    }

    return <>
    
    <Pie data={data} options={options}></Pie>

    </>

}