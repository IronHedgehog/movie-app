import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// 1. Динамічна ініціалізація чату з контекстом
export const startChatWithAI = (user = null, movieContext = null) => {
  // Базова інструкція
  let instruction =
    "Ти — емоційний друг-кіноман. Твоє ім'я КіноБро. Ти спілкуєшся українською, використовуєш емодзі, ти теплий і ламповий. Ти допомагаєш обрати фільм під настрій. Якщо юзер каже 'мені сумно', порадь щось тепле. Якщо 'хочу драйву' — екшн. Намагайся давати відповіді коротко і влучно.";

  // МАГІЯ: Ін'єкція профілю користувача
  if (user && user.displayName) {
    const firstName = user.displayName.split(" ")[0];
    instruction += `\nВАЖЛИВО: Користувача, з яким ти говориш, звати ${firstName}. Звертайся до нього на ім'я періодично.`;
  }

  // МАГІЯ: Ін'єкція контексту фільму
  if (movieContext) {
    instruction += `\nЗараз ви знаходитесь на сторінці фільму: "${movieContext}".`;
  }

  // Створюємо модель із свіжими інструкціями
  const dynamicChatModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: instruction,
  });

  return dynamicChatModel.startChat({
    history: [],
  });
};

// ... summaryModel та getMovieSummary залишаємо без змін, там усе ідеально!
const summaryModel = genAI.getGenerativeModel({
  model: "gemini-2.5-pro",
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
