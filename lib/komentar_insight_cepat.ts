import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export default async function komentar_insight_cepat(
  list_komentar: string[] = [],
) {
  const list_komentar_str = list_komentar.join("\n");
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Buatkan insight singkat dari kumpulan komentar berikut ini, cukup insight saja, tanpa komentar dari anda, usahakan 1 paragraf:\n${list_komentar_str}\n`,
  });
  console.log(response.text);
  return response.text;
}
