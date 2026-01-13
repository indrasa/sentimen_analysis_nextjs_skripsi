"use server";
import { json } from 'stream/consumers';
import Sentimen from '../sentimen';

type LabelSentimen =
  | "Very Negative"
  | "Negative"
  | "Neutral"
  | "Positive"
  | "Very Positive";

type SkorSentimen = {
  label: string;
  score: number;
};

type KomentarDanSkor = {
    komentar: string;
    skor: SkorSentimen;
}

export async function AnalisaAction(listKomentar) {
    
    const hasil_analisa: SkorSentimen[] = [];
    
    //mulai analisa

    // kumpulkan komentar
    for (const komentar of listKomentar){
        // console.log(komentar['text']);
        const teksKomentar = komentar['text'];
        // console.log(teksKomentar);
        query({ inputs: teksKomentar }).then((response) => {
            // console.log(JSON.stringify(response));
            // const analisa_per_komentar = JSON.stringify(response);
            // console.log(analisa_per_komentar);
            // console.log(response[0]);//ini dua dimensi, jadi ambil dimensi dalamnya
            const sentimenKomentar = response[0];
            // console.log(sentimenKomentar);
            // for (const skor of sentimenKomentar){
            //     console.log(skor.score);
            //     //lakukan filtering skor mana yang tertinggi
            //     tentukanSkorTertinggi();
            // }
            const skorTertinggi: SkorSentimen = tentukanSkorTertinggi(sentimenKomentar);
            // console.log(
            //   `Skor tertinggi adalah ${JSON.stringify(skorTertinggi)}`
            // );
            // console.log(`komentar dari dalam query ${teksKomentar}`);
            // console.log(skorTertinggi);
            hasil_analisa.push(skorTertinggi);
            console.log(`hasil analisa per loop ${hasil_analisa}`);
            //gabung komentar dengan skornya jadi satu object
            // masukkan hasil penggabungan ini ke dalam satu list, nggak jadi, ini jadi pencampuran tugas nantinya
        
        });
        // break;
    }

    // // iterasi per komentar untuk dianalisa
    console.log("hasil analisanya: " + hasil_analisa);
    return hasil_analisa;
}

function tentukanSkorTertinggi(
  sentimenKomentar: Array<{ label: string; score: number }>
): SkorSentimen {
  return sentimenKomentar.reduce((highest, current) =>
    current.score > highest.score ? current : highest
  );
}

async function query(data) {
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/tabularisai/multilingual-sentiment-analysis",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}
