"use server";
type SkorSentimen = {
  label: string;
  score: number;
};

export async function AnalisaAction(listKomentar) {
  const hasil_analisa: SkorSentimen[] = [];

  // Buat array of promises
  const promises = listKomentar.map(async (komentar) => {
    const teksKomentar = komentar["text"];
    const response = await query({ inputs: teksKomentar });
    const sentimenKomentar = response[0];
    const skorTertinggi: SkorSentimen = tentukanSkorTertinggi(sentimenKomentar);
    return skorTertinggi;
  });

  // Tunggu semua promises selesai
  const results = await Promise.all(promises);
  hasil_analisa.push(...results);

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
