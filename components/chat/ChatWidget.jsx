"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import SeaLogo from "@/components/ui/SeaLogo";

const MAX_HISTORY = 16;
const FOCUSABLE = "button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";

function splitReply(text) {
  let wordCount = 0;
  return text
    .split(/(\s+)/)
    .filter(Boolean)
    .map((part) => {
      if (/^\s+$/.test(part)) return { part, isWord: false, delay: 0 };
      const delay = Math.min(wordCount * 12, 420);
      wordCount += 1;
      return { part, isWord: true, delay };
    });
}

function AssistantReply({ text }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <p
      className={`ai-chat-message ai-chat-message--assistant ai-chat-message--revealing${isVisible ? " is-visible" : ""}`}
      aria-label={text}
    >
      {splitReply(text).map(({ part, isWord, delay }, index) =>
        isWord ? (
          <span key={index} className="ai-chat-word" style={{ "--word-delay": `${delay}ms` }}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </p>
  );
}

function ChatMessage({ message, language }) {
  if (message.type === "thinking") {
    return (
      <p
        className="ai-chat-message ai-chat-message--assistant ai-chat-thinking"
        role="status"
        aria-label={language === "en" ? "Assistant is replying" : "L’assistant prépare sa réponse"}
      >
        <span className="ai-chat-thinking__dot" aria-hidden="true" />
        <span className="ai-chat-thinking__dot" aria-hidden="true" />
        <span className="ai-chat-thinking__dot" aria-hidden="true" />
      </p>
    );
  }
  if (message.type === "reply") return <AssistantReply text={message.content} />;
  if (message.type === "error") {
    return (
      <p className="ai-chat-message ai-chat-message--assistant ai-chat-thinking ai-chat-message--error">
        {message.content}
      </p>
    );
  }
  return <p className="ai-chat-message ai-chat-message--user">{message.content}</p>;
}

export default function ChatWidget() {
  const { language, t } = useLanguage();
  const { lockScroll, unlockScroll } = useSmoothScroll();
  const panelRef = useRef(null);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const openButtonRef = useRef(null);
  const historyRef = useRef([]);
  const nextIdRef = useRef(0);
  const wasOpenRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) openButtonRef.current?.focus();
      wasOpenRef.current = false;
      return undefined;
    }
    wasOpenRef.current = true;
    lockScroll();
    if (panelRef.current) panelRef.current.scrollTop = 0;
    inputRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter(
        (element) => element.getClientRects().length > 0,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, lockScroll, unlockScroll]);

  useEffect(() => {
    const list = messagesRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  const createId = () => {
    nextIdRef.current += 1;
    return nextIdRef.current;
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || isSending) return;

    const pendingId = createId();
    const updatePending = (update) =>
      setMessages((current) =>
        current.map((message) => (message.id === pendingId ? { ...message, ...update } : message)),
      );

    setDraft("");
    setIsSending(true);
    setMessages((current) => [
      ...current,
      { id: createId(), type: "user", content },
      { id: pendingId, type: "thinking", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          messages: [...historyRef.current, { role: "user", content }],
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          typeof result?.error?.message === "string"
            ? result.error.message
            : `La requête a échoué (HTTP ${response.status}).`,
        );
      }
      const reply = typeof result?.reply === "string" ? result.reply.trim() : "";
      if (!reply) throw new Error("L’IA n’a pas renvoyé de réponse. Réessayez dans un instant.");

      updatePending({ type: "reply", content: reply });
      historyRef.current = [
        ...historyRef.current,
        { role: "user", content },
        { role: "assistant", content: reply },
      ].slice(-MAX_HISTORY);
    } catch (error) {
      const isNetworkError = error instanceof TypeError;
      const unreachable =
        language === "en"
          ? "Unable to reach the server. Please try again shortly."
          : "Impossible de contacter le serveur. Réessayez dans un instant.";
      updatePending({
        type: "error",
        content: isNetworkError
          ? unreachable
          : `${language === "en" ? "Unable to contact the assistant:" : "Impossible de contacter l’assistant :"} ${error.message}`,
      });
    } finally {
      setIsSending(false);
      inputRef.current?.focus({ preventScroll: true });
    }
  };

  return (
    <aside className={`ai-chat${isOpen ? " is-open" : ""}`} aria-label={t("Assistant SEA Foundation")}>
      <button
        className="ai-chat-backdrop"
        type="button"
        aria-label={t("Fermer l’assistant")}
        hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      />
      <section
        ref={panelRef}
        className="ai-chat-panel"
        id="ai-chat-panel"
        aria-labelledby="ai-chat-title"
        role="dialog"
        aria-modal="true"
        hidden={!isOpen}
      >
        <div className="ai-chat-brand-panel">
          <SeaLogo />
          <span className="ai-chat-brand-kicker">{t("SEA FOUNDATION · TOGO")}</span>
          <h2>{t("Un avenir à construire ensemble.")}</h2>
          <p>
            {t(
              "Un assistant pour vous orienter vers nos programmes, nos actions et les possibilités d’engagement.",
            )}
          </p>
          <div className="ai-chat-brand-footer">
            <span /> {t("Accompagnement · Engagement · Avenir")}
          </div>
        </div>
        <div className="ai-chat-conversation">
          <header className="ai-chat-header">
            <div>
              <span className="ai-chat-eyebrow">{t("ASSISTANT VIRTUEL")}</span>
              <h2 id="ai-chat-title">{t("Comment pouvons-nous vous aider ?")}</h2>
            </div>
            <div className="ai-chat-header-actions">
              <button
                className="ai-chat-icon-button"
                type="button"
                aria-label={t("Fermer le chatbot")}
                onClick={() => setIsOpen(false)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          </header>
          <div
            ref={messagesRef}
            className="ai-chat-messages"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
          >
            <p className="ai-chat-message ai-chat-message--assistant">
              {t(
                "Bonjour ! Je peux vous renseigner sur les actions de SEA Foundation et les possibilités d’engagement.",
              )}
            </p>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} language={language} />
            ))}
          </div>
          <form className="ai-chat-form" onSubmit={sendMessage}>
            <label className="visually-hidden" htmlFor="ai-chat-input">
              {t("Votre message")}
            </label>
            <input
              ref={inputRef}
              id="ai-chat-input"
              name="message"
              type="text"
              placeholder={t("Écrivez votre message…")}
              maxLength={1200}
              autoComplete="off"
              required
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button type="submit" aria-label={t("Envoyer le message")} disabled={isSending}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </button>
          </form>
          <p className="ai-chat-disclaimer">
            {t("Assistant IA · vérifiez les informations importantes auprès de la Fondation.")}
          </p>
        </div>
      </section>
      <button
        ref={openButtonRef}
        className="ai-chat-launcher"
        type="button"
        aria-expanded={isOpen}
        aria-controls="ai-chat-panel"
        onClick={() => setIsOpen(true)}
      >
        <span className="ai-chat-launcher-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
            <path d="m19 15 .9 3.1L23 19l-3.1.9L19 23l-.9-3.1L15 19l3.1-.9L19 15Z" />
          </svg>
        </span>
        <span>{t("Besoin d’aide ?")}</span>
      </button>
      <nav className="ai-social-links" aria-label={t("Réseaux sociaux et contact")}>
        <a
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("TikTok SEA Foundation")}
          title="TikTok"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.6 8.3a7.2 7.2 0 0 1-4.5-1.6v8.1a6.1 6.1 0 1 1-5.3-6.1v3.4a2.8 2.8 0 1 0 2 2.7V2.5h3.3c.2 2.2 1.8 4 4.5 4.3v1.5Z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("Instagram SEA Foundation")}
          title="Instagram"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle className="icon-dot" cx="17.5" cy="6.8" r="1" />
          </svg>
        </a>
        <a href="mailto:info@fondationsea.org" aria-label={t("Envoyer un e-mail")} title={t("E-mail")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2.8" y="4.5" width="18.4" height="15" rx="2" />
            <path d="m3.7 6 8.3 6.6L20.3 6" />
          </svg>
        </a>
        <a
          href="https://wa.me/22870162121"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("Contacter SEA Foundation sur WhatsApp")}
          title="WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.9a8.2 8.2 0 1 1 16-3.4Z" />
            <path d="M8.2 7.8c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .4-.1.6l-.6.7c-.2.2-.2.4-.1.6.7 1.2 1.6 2 2.8 2.6.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.3.4.5 0 .3-.2 1.3-.9 1.8-.6.5-1.4.7-2.2.5-1-.2-2.3-.8-3.8-2.1-1.8-1.6-2.9-3.6-3.2-4.6-.3-1 .1-1.8.5-2.2Z" />
          </svg>
        </a>
      </nav>
    </aside>
  );
}
