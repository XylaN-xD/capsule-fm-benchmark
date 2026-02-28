import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

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

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated assistant response
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

  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <div className="space-y-2">
        <span className="section-label">Research Assistant</span>
        <h2 className="text-2xl font-semibold tracking-tight">Research Assistant (Exploratory)</h2>
        <p className="text-sm text-muted-foreground">
          Ask about datasets, concepts, workflow, and visualizations. Does not provide medical advice.
        </p>
      </div>

      <div className="glass-panel flex flex-col h-[500px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="glass-panel p-2 h-fit rounded-lg shrink-0">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
              <div className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <div className="glass-panel p-2 h-fit rounded-lg shrink-0">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
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
            This assistant is for research exploration only. It does not provide medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
