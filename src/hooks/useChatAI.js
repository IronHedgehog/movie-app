import { startChatWithAI } from "@/store/services/geminiApi";
import { addMessage, toggleChat } from "@/store/slices/aiSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const QUICK_ACTIONS = [
  "Схожі фільми 🎞",
  "Чи варто дивитись? 🤔",
  "Порівняй з топами 🏆",
];

export const useChatAI = () => {
  const dispatch = useDispatch();
  // Витягуємо юзера з userSlice
  const { user } = useSelector((state) => state.user);
  const { chatHistory, isChatOpen, currentMovieContext } = useSelector(
    (state) => state.ai,
  );

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const chatSession = useRef(null);

  // 1. Ініціалізація сесії (з урахуванням юзера та фільму)
  useEffect(() => {
    // Якщо сесії немає, або історія порожня (наприклад, перейшли на інший фільм і скинули чат)
    if (!chatSession.current || chatHistory.length === 0) {
      chatSession.current = startChatWithAI(user, currentMovieContext);
    }
  }, [chatHistory, user, currentMovieContext]); // Додали залежності

  // 2. Скрол до останнього повідомлення
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  // 3. Контекстне привітання (Тепер з іменем!)
  useEffect(() => {
    if (isChatOpen && currentMovieContext) {
      const alreadyGreeted = chatHistory.some((m) =>
        m.parts[0].text.includes(currentMovieContext),
      );

      if (!alreadyGreeted) {
        // Визначаємо, як звернутися
        const userName = user?.displayName
          ? user.displayName.split(" ")[0]
          : "Бро";

        dispatch(
          addMessage({
            role: "model",
            parts: [
              {
                text: `Привіт, ${userName}! Бачу тебе зацікавив фільм "${currentMovieContext}". Що хочеш дізнатися? 😉`,
              },
            ],
          }),
        );
      }
    }
  }, [isChatOpen, currentMovieContext, dispatch, chatHistory, user]);

  const onSend = async (text = inputValue) => {
    const messageText = text.trim();
    if (!messageText) return;

    dispatch(addMessage({ role: "user", parts: [{ text: messageText }] }));
    setInputValue("");
    setIsTyping(true);

    try {
      // Тут ми вже можемо не додавати назву фільму до кожного промпта,
      // бо ми передали її в systemInstruction у geminiApi.js!
      // Але для Quick Actions залишимо, щоб контекст був точнішим.
      const prompt =
        currentMovieContext && QUICK_ACTIONS.includes(messageText)
          ? `Щодо фільму "${currentMovieContext}": ${messageText}`
          : messageText;

      const res = await chatSession.current.sendMessage(prompt);
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
