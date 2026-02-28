import { useState } from "react";
import { X, Send, Bot, User, MessageSquare } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Welcome to the ELL Research Assistant. I can help explain concepts, datasets, workflow stages, and visualization tools used in this research prototype. How can I assist your exploration?",
  },
];

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatDrawer = ({ isOpen, onClose }: ChatDrawerProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Thank you for your question. As a research assistant, I can discuss dataset characteristics, annotation methodologies, visualization techniques, and the research workflow. Please note that I do not provide medical advice, diagnosis, or treatment recommendations.",
        },
      ]);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Panel */}
      <div className="drawer-panel animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="glass-panel p-2 rounded-lg">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Research Assistant</p>
              <p className="text-[10px] font-mono text-muted-foreground">Exploratory · Non-diagnostic</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="glass-panel p-1.5 h-fit rounded-lg shrink-0">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
              )}
              <div className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <div className="glass-panel p-1.5 h-fit rounded-lg shrink-0">
                  <User className="w-3 h-3 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border/50 p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about the research..."
              className="flex-1 bg-surface-raised border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-colors placeholder:text-muted-foreground/50"
            />
            <button
              onClick={handleSend}
              className="glass-panel p-2.5 text-primary hover:bg-primary/10 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground/40 font-mono mt-2">
            Research exploration only. Does not provide medical advice.
          </p>
        </div>
      </div>
    </>
  );
};

// Trigger button
export const ChatDrawerTrigger = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed right-0 top-1/2 -translate-y-1/2 z-30 group"
    title="Open Research Assistant"
  >
    <div className="flex items-center gap-2 bg-card/90 backdrop-blur-xl border border-border/60 border-r-0 rounded-l-xl px-3 py-3 shadow-2xl transition-all duration-300 hover:px-5 hover:shadow-primary/10 animate-glow-pulse">
      <MessageSquare className="w-4 h-4 text-primary" />
      <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors overflow-hidden max-w-0 group-hover:max-w-24 whitespace-nowrap duration-300">
        Assistant
      </span>
    </div>
  </button>
);

export default ChatDrawer;
