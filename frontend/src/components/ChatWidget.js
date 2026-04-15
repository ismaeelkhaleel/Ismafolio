"use client";
import { useState, useRef, useEffect } from "react";

// animate: true = word-by-word (first time only), false = instant
function TypingMessage({ text, animate }) {
  const words = text.split(" ");
  const [displayed, setDisplayed] = useState(animate ? "" : text);
  const [wordIndex, setWordIndex] = useState(animate ? 0 : words.length);

  useEffect(() => {
    if (!animate) return;
    if (wordIndex >= words.length) return;
    const timeout = setTimeout(() => {
      setDisplayed((prev) =>
        prev ? prev + " " + words[wordIndex] : words[wordIndex],
      );
      setWordIndex((i) => i + 1);
    }, 60);
    return () => clearTimeout(timeout);
  }, [wordIndex, animate, words]);

  return <span>{displayed}</span>;
}

function LoadingDots() {
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        padding: "4px 2px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#94a3b8",
            display: "inline-block",
            animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const historyMap = useRef(new Map());
  const sessionId = "default";
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  function getHistory() {
    if (!historyMap.current.has(sessionId)) {
      historyMap.current.set(sessionId, []);
    }
    return historyMap.current.get(sessionId);
  }

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMsg = { role: "user", content: message };

    // UI update
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setMessage("");
    setLoading(true);

    // ✅ get history
    const history = getHistory();
    history.push(userMsg);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: history.slice(-6), // ✅ last 6 messages only
        }),
      });

      const data = await res.json();

      const botMsg = {
        role: "assistant",
        content: data.reply,
      };

      // ✅ save in map
      history.push(botMsg);

      const wordCount = data.reply.split(" ").length;

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply, animate: true },
      ]);

      setTimeout(
        () => {
          setMessages((prev) =>
            prev.map((m, idx) =>
              idx === prev.length - 1 && m.role === "bot"
                ? { ...m, animate: false }
                : m,
            ),
          );
        },
        wordCount * 60 + 300,
      );
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong. Please try again.",
          animate: false,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');

        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes widgetOpen {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0   rgba(99,102,241,0.5); }
          70%  { box-shadow: 0 0 0 12px rgba(99,102,241,0); }
          100% { box-shadow: 0 0 0 0   rgba(99,102,241,0); }
        }

        .chat-widget   { font-family: 'Sora', sans-serif; }
        .chat-bubble   { animation: fadeSlideUp 0.3s ease forwards; }
        .chat-open     { animation: widgetOpen 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        .fab-btn { animation: pulseRing 2.5s ease-in-out infinite; transition: transform 0.2s; }
        .fab-btn:hover { transform: scale(1.1); }

        /* Separate close button in top-right of panel */
        .close-btn {
          position: absolute; top: 12px; right: 12px;
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: #94a3b8; font-size: 13px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s; z-index: 10;
        }
        .close-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }

        .send-btn { transition: transform 0.15s ease, filter 0.15s; }
        .send-btn:hover  { transform: scale(1.06); filter: brightness(1.15); }
        .send-btn:active { transform: scale(0.95); }

        .chat-input:focus {
          outline: none;
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.18);
        }

        /* ── Light mode overrides ── */
        @media (prefers-color-scheme: light) {
          .chat-panel-wrap {
            background: #ffffff !important;
            border: 1px solid rgba(99,102,241,0.15) !important;
            box-shadow: 0 24px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(99,102,241,0.1) !important;
          }
          .chat-header {
            background: linear-gradient(135deg,#f0f0ff,#e8eaff) !important;
            border-bottom: 1px solid rgba(99,102,241,0.1) !important;
          }
          .bot-name  { color: #1e1b4b !important; }
          .bot-sub   { color: #6366f1 !important; }
          .online-lbl { color: #94a3b8 !important; }
          .msg-area  { background: #f9f9ff !important; }
          .empty-txt { color: #9ca3af !important; }
          .bot-bubble {
            background: #ececf8 !important;
            border: 1px solid rgba(99,102,241,0.12) !important;
            color: #1e1b4b !important;           /* ← text visible in light mode */
          }
          .input-bar {
            background: #f0f0ff !important;
            border-top: 1px solid rgba(99,102,241,0.1) !important;
          }
          .chat-input {
            background: #fff !important;
            border: 1px solid rgba(99,102,241,0.22) !important;
            color: #1e1b4b !important;
          }
          .chat-input::placeholder { color: #a0aec0 !important; }
          .close-btn {
            background: rgba(0,0,0,0.05) !important;
            border-color: rgba(0,0,0,0.1) !important;
            color: #64748b !important;
          }
          .close-btn:hover { background: rgba(0,0,0,0.1) !important; color: #1e1b4b !important; }
        }

        /* Mobile full-screen */
        @media (max-width: 480px) {
          .chat-panel-wrap {
            bottom: 0 !important; right: 0 !important;
            width: 100vw !important; height: 100dvh !important;
            border-radius: 0 !important;
          }
        }
      `}</style>

      {!open && (
        <button
          className="fab-btn chat-widget"
          onClick={() => setOpen((v) => !v)}
          style={{
            position: "fixed",
            bottom: "68px",
            right: "24px",
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            border: "none",
            cursor: "pointer",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            color: "#fff",
          }}
          aria-label="Toggle chat"
        >
          ✦
        </button>
      )}
      {open && (
        <div
          className="chat-open chat-panel-wrap chat-widget"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "24px",
            width: "370px",
            height: "500px",
            background: "#0f0f13",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            zIndex: 9998,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.15)",
          }}
        >
          <button
            className="close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>

          <div
            className="chat-header"
            style={{
              padding: "18px 20px 14px",
              background: "linear-gradient(135deg,#13131a,#1a1a27)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#6366f1,#a78bfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                marginBottom: "2px",
              }}
            >
              ✦
            </div>
            <span
              className="bot-name"
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: "15px",
                letterSpacing: "0.02em",
              }}
            >
              AI Assistant
            </span>
            <span
              className="bot-sub"
              style={{
                color: "#6366f1",
                fontSize: "11px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Ask me about myself
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "2px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 6px #22c55e",
                  display: "inline-block",
                }}
              />
              <span
                className="online-lbl"
                style={{ color: "#64748b", fontSize: "11px" }}
              >
                Online
              </span>
            </div>
          </div>

          <div
            className="msg-area"
            style={{
              flex: 1,
              padding: "16px 14px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              scrollbarWidth: "thin",
              scrollbarColor: "#2d2d3a transparent",
              background: "#0f0f13",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{ margin: "auto", textAlign: "center", padding: "20px" }}
              >
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>✦</div>
                <div
                  className="empty-txt"
                  style={{
                    color: "#4b5563",
                    fontSize: "13px",
                    lineHeight: "1.7",
                  }}
                >
                  Send a message to start the conversation.
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className="chat-bubble flex items-end gap-2"
                style={{
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "bot" && (
                  <div
                    className="flex items-center justify-center text-white"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#6366f1,#a78bfa)",
                      flexShrink: 0,
                      fontSize: "12px",
                    }}
                  >
                    ✦
                  </div>
                )}

                <div
                  className={`max-w-[75%] px-3 py-2 text-[13.5px] leading-[1.6] font-normal break-words
      ${
        msg.role === "user"
          ? "text-white shadow-lg"
          : "text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5"
      }`}
                  style={{
                    borderRadius:
                      msg.role === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                        : undefined,
                    boxShadow:
                      msg.role === "user"
                        ? "0 4px 15px rgba(99,102,241,0.3)"
                        : "none",
                  }}
                >
                  {msg.role === "bot" ? (
                    <TypingMessage text={msg.text} animate={!!msg.animate} />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div
                className="chat-bubble"
                style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#6366f1,#a78bfa)",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  ✦
                </div>
                <div
                  style={{
                    padding: "10px 16px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "18px 18px 18px 4px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <LoadingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div
            className="input-bar"
            style={{
              padding: "12px 14px",
              background: "#13131a",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <input
              className="chat-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type something..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "10px 14px",
                color: "#e2e8f0",
                fontSize: "13.5px",
                fontFamily: "'Sora', sans-serif",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={loading}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: loading
                  ? "#2d2d3a"
                  : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: loading ? "none" : "0 4px 15px rgba(99,102,241,0.4)",
              }}
              aria-label="Send"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
