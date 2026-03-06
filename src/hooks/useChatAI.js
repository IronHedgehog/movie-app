import { startChatWithAI } from "@/store/services/geminiApi";
import { addMessage, toggleChat } from "@/store/slices/aiSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useChatAI = () => {
  const dispatch = useDispatch();

  // ✨ Витягуємо favorites разом із юзером
  const { user, favorites } = useSelector((state) => state.user);
  const { chatHistory, isChatOpen, currentMovieContext } = useSelector(
    (state) => state.ai,
  );

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const chatSession = useRef(null);

  // Флаг, щоб не вітатися двічі (корисно в React Strict Mode)
  const hasGreetedRef = useRef(false);

  // ✨ Динамічні Quick Actions (змінюються залежно від сторінки)
  const QUICK_ACTIONS = currentMovieContext
    ? [
        "Без спойлерів, варто дивитись? 🤔",
        "Яка тут головна фішка? 🎬",
        favorites.length > 0
          ? "Схоже на мої улюблені? ❤️"
          : "Порівняй з топами 🏆",
      ]
    : [
        "Порадь щось на вечір 🍿",
        "Хочеться чогось веселого 😂",
        favorites.length > 0
          ? "Що схоже на моє обране? 👀"
          : "Що зараз популярне? 🔥",
      ];

  // 1. Ініціалізація сесії (передаємо favorites)
  useEffect(() => {
    if (!chatSession.current || chatHistory.length === 0) {
      chatSession.current = startChatWithAI(
        user,
        currentMovieContext,
        favorites,
      );
      hasGreetedRef.current = false; // Скидаємо прапорець при новій сесії
    }
  }, [chatHistory.length, user, currentMovieContext, favorites]);

  // 2. Скрол до останнього повідомлення
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  // 3. ✨ Контекстне привітання (Фікс білого екрану)
  useEffect(() => {
    if (isChatOpen && chatHistory.length === 0 && !hasGreetedRef.current) {
      hasGreetedRef.current = true;
      const userName = user?.displayName
        ? user.displayName.split(" ")[0]
        : "Бро";

      const greetingText = currentMovieContext
        ? `Привіт, ${userName}! Бачу тебе зацікавив фільм "${currentMovieContext}". Що хочеш дізнатися? 😉`
        : `Привіт, ${userName}! Я КіноБро. Який настрій сьогодні? Підберемо крутий фільм! 🍿`;

      dispatch(
        addMessage({
          role: "model",
          parts: [{ text: greetingText }],
        }),
      );
    }
  }, [isChatOpen, currentMovieContext, dispatch, chatHistory.length, user]);

  const onSend = async (text = inputValue) => {
    const messageText = text.trim();
    if (!messageText) return;

    dispatch(addMessage({ role: "user", parts: [{ text: messageText }] }));
    setInputValue("");
    setIsTyping(true);

    try {
      // Більше не треба приклеювати currentMovieContext до тексту,
      // бо ми передали його в systemInstruction
      const res = await chatSession.current.sendMessage(messageText);
      dispatch(
        addMessage({ role: "model", parts: [{ text: res.response.text() }] }),
      );
    } catch (err) {
      console.log(err);
      dispatch(
        addMessage({
          role: "model",
          parts: [{ text: "Бро, щось мережа лагає. Спробуй ще!" }],
        }),
      );
    } finally {
      setIsTyping(false);
    }
  };

  return {
    chatHistory,
    isChatOpen,
    inputValue,
    isTyping,
    chatRef,
    setInputValue,
    onSend,
    onToggle: () => dispatch(toggleChat()),
    QUICK_ACTIONS,
  };
};
