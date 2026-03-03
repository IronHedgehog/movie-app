import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const chatModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "Ти — емоційний друг-кіноман. Твоє ім'я КіноБро. Ти спілкуєшся українською, використовуєш емодзі, ти теплий і ламповий. Ти допомагаєш обрати фільм під настрій. Якщо юзер каже 'мені сумно', порадь щось тепле. Якщо 'хочу драйву' — екшн. Намагайся давати відповіді коротко і влучно.",
});

export const startChatWithAI = () => {
  return chatModel.startChat({
    history: [],
  });
};

const summaryModel = genAI.getGenerativeModel({
  model: "gemini-2.5-pro",
  // ОНОВЛЕНО: Жорсткі обмеження для короткого вердикту
  systemInstruction:
    "Ти — аналітик кіно відгуків. Пиши максимально лаконічно. Твоє завдання: 1. Цільова аудиторія (1 речення). 2. Атмосфера (макс. 2 пункти). 3. Консенсус глядачів (макс. 3 тези). Кожен пункт не довший за 10-12 слів. Використовуй емодзі. Загальний обсяг — до 60-80 слів.",
});

export const getMovieSummary = async (movieTitle, overview, reviews = []) => {
  const reviewsText = reviews
    .slice(0, 5)
    .map((r) => `- ${r.content}`)
    .join("\n");

  const prompt = `
    Аналізуємо фільм: "${movieTitle}"
    Опис: ${overview}
    Реальні відгуки глядачів: 
    ${reviewsText ? reviewsText : "Відгуків поки немає."}
  `;

  const result = await summaryModel.generateContent(prompt);
  return result.response.text();
};
