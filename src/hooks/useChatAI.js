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
  const { chatHistory, isChatOpen, currentMovieContext } = useSelector(
    (state) => state.ai,
  );
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const chatSession = useRef(null);

  // Ініціалізація або скидання сесії при очищенні історії
  useEffect(() => {
    if (!chatSession.current || chatHistory.length === 0) {
      chatSession.current = startChatWithAI();
    }
  }, [chatHistory]);

  // Скрол до останнього повідомлення
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  // Контекстне привітання про фільм
  useEffect(() => {
    if (isChatOpen && currentMovieContext) {
      const alreadyGreeted = chatHistory.some((m) =>
        m.parts[0].text.includes(currentMovieContext),
      );
      if (!alreadyGreeted) {
        dispatch(
          addMessage({
            role: "model",
            parts: [
              {
                text: `Бро, бачу тебе зацікавив фільм "${currentMovieContext}". Що хочеш дізнатися? 😉`,
              },
            ],
          }),
        );
      }
    }
  }, [isChatOpen, currentMovieContext, dispatch, chatHistory]);

  const onSend = async (text = inputValue) => {
    const messageText = text.trim();
    if (!messageText) return;

    dispatch(addMessage({ role: "user", parts: [{ text: messageText }] }));
    setInputValue("");
    setIsTyping(true);

    try {
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
