"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CopilotPanelProps {
  open: boolean;
  onClose: () => void;
}

const EXAMPLE_QUESTIONS = [
  "What's our churn this month?",
  "Best revenue month?",
  "How many Growth-plan customers?",
];

export default function CopilotPanel({ open, onClose }: CopilotPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your OpsHub analytics copilot. Ask me anything about the dashboard metrics — revenue, users, churn, or plan breakdown.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = (await res.json()) as { answer?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to get an answer");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer ?? "No answer returned." },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Sorry, I couldn't answer that: ${message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendQuestion(input);
  }

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close copilot"
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
      />

      <aside className="fixed bottom-0 right-0 z-50 flex h-[min(640px,85vh)] w-full flex-col border-l border-t border-slate-800 bg-slate-950 shadow-glow animate-slide-in-right sm:w-[420px] lg:bottom-4 lg:right-4 lg:h-[calc(100vh-6rem)] lg:rounded-2xl lg:border">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-white">AI Copilot</p>
            <p className="text-xs text-slate-500">Powered by your dashboard data</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${i}`}
              className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "ml-auto bg-emerald-500/15 text-emerald-50 ring-1 ring-emerald-500/20"
                  : "bg-slate-900 text-slate-200 ring-1 ring-slate-800"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 [animation-delay:300ms]" />
              </span>
              Analyzing metrics...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-slate-800 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {EXAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                disabled={loading}
                onClick={() => sendQuestion(q)}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-300 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {error && (
            <p className="mb-2 text-xs text-red-400">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your metrics..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
