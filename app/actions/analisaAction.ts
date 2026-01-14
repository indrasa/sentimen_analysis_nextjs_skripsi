"use server";
type SkorSentimen = {
  label: string;
  score: number;
};

export async function AnalisaAction(listKomentar: any[]) {
  const hasil_analisa: SkorSentimen[] = [];

  // Buat array of promises
  const promises = listKomentar.map(async (komentar) => {
    try {
      const teksKomentar = komentar["text"];
      const response = await query({ inputs: teksKomentar });
      
      // Validasi response
      if (!response || !Array.isArray(response) || response.length === 0) {
        console.error("Invalid response:", response);
        throw new Error("Invalid API response");
      }

      const sentimenKomentar = response[0];
      
      // Validasi sentimenKomentar adalah array
      if (!Array.isArray(sentimenKomentar)) {
        console.error("sentimenKomentar is not an array:", sentimenKomentar);
        throw new Error("Invalid sentiment data format");
      }

      const skorTertinggi: SkorSentimen = tentukanSkorTertinggi(sentimenKomentar);
      return skorTertinggi;
    } catch (error) {
      console.error("Error analyzing comment:", error);
      // Return default neutral sentiment on error
      return { label: "Neutral", score: 0.5 };
      // return { label: , score:};
    }
  });

  // Tunggu semua promises selesai
  const results = await Promise.all(promises);
  hasil_analisa.push(...results);

  return hasil_analisa;
}

function tentukanSkorTertinggi(
  sentimenKomentar: Array<{ label: string; score: number }>
): SkorSentimen {
  if (!sentimenKomentar || sentimenKomentar.length === 0) {
    return { label: "Neutral", score: 0.5 };
  }
  
  return sentimenKomentar.reduce((highest, current) =>
    current.score > highest.score ? current : highest
  );
}

async function query(data: { inputs: string }) {
  try {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("API Response:", result);
    return result;
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
}
