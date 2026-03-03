import { useChatAI } from "@/hooks/useChatAI";
import { MessageCircle, Send, X } from "lucide-react";

const ChatWidget = () => {
  const {
    chatHistory,
    isChatOpen,
    inputValue,
    isTyping,
    chatRef,
    setInputValue,
    onSend,
    onToggle,
    QUICK_ACTIONS,
  } = useChatAI();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isChatOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100">
          {/* Header */}
          <div className="p-4 bg-accent/20 border-b border-zinc-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <b className="tracking-wide">КіноБро 🍿</b>
            </div>
            <X
              className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
              onClick={onToggle}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-tr-none shadow-md"
                      : "bg-zinc-800 border border-zinc-700 rounded-tl-none"
                  }`}
                >
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-xs text-zinc-500 animate-pulse pl-2">
                КіноБро аналізує...
              </div>
            )}
            <div ref={chatRef} />
          </div>

          <div className="flex gap-2 overflow-x-auto p-2 bg-zinc-800/50 border-t border-zinc-700/50 no-scrollbar">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action}
                onClick={() => onSend(action)}
                className="whitespace-nowrap bg-zinc-700 px-3 py-1.5 rounded-full text-[10px] font-medium hover:bg-accent hover:text-white transition-all border border-zinc-600 active:scale-95"
              >
                {action}
              </button>
            ))}
          </div>

          <div className="p-3 bg-zinc-900 flex gap-2">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Спитай бро..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-sm focus:border-accent outline-none transition-colors"
            />
            <button
              onClick={() => onSend()}
              className="p-2 bg-accent rounded-xl text-white hover:bg-accent/90 transition-all active:scale-90"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onToggle}
        className="w-14 h-14 bg-accent rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;
