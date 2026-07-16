import { useState, useRef, useEffect, useCallback } from "react";
import { Copy, Trash2 } from "lucide-react";

import { PLATFORMS } from "../utils/platformRules.js";
import { useCharacterCount } from "../hooks/useCharacterCount.js";
import { useValidation } from "../hooks/useValidation.js";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import PlatformSelector from "./PlatformSelector.jsx";
import CharacterCounter from "./CharacterCounter.jsx";
import ProgressBar from "./ProgressBar.jsx";
import ValidationMessage from "./ValidationMessage.jsx";
import Toast from "./Toast.jsx";

const LIGHT_THEME = {
  "--page-bg": "#F6F1E7",
  "--paper": "#FFFDF8",
  "--paper-dim": "#EFE8D9",
  "--ink": "#2C271F",
  "--ink-60": "#5B5346",
  "--ink-50": "#786F5F",
  "--ink-40": "#948A78",
  "--ink-30": "#B7AC97",
  "--ink-20": "#DCD3BF",
  "--ink-15": "rgba(44,39,31,0.12)",
  "--ink-10": "#E8E0CC",
  "--seal": "#B23A2E",
};

const DARK_THEME = {
  "--page-bg": "#161A22",
  "--paper": "#1E2530",
  "--paper-dim": "#191F28",
  "--ink": "#EDE6D6",
  "--ink-60": "#B9B2A0",
  "--ink-50": "#9C947F",
  "--ink-40": "#7C7563",
  "--ink-30": "#5C5648",
  "--ink-20": "#403C33",
  "--ink-15": "#000000",
  "--ink-10": "#2A2E36",
  "--seal": "#C9532C",
};

export default function PostComposer() {
  const [selected, setSelected] = useState(PLATFORMS[0]);
  const [text, setText] = useState("");
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState("");
  const [drafts, setDrafts] = useState([]); // { id, platformId, text, savedAt }
  const textareaRef = useRef(null);

  const { characters, words, hashtags, mentions, readingTimeSeconds } = useCharacterCount(text);
  const { status, remaining, percent } = useValidation(characters, selected.maxChars);

  // Auto-resize the textarea as the draft grows
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 420)}px`;
  }, [text]);

  const handleReset = useCallback(() => {
    setText("");
    textareaRef.current?.focus();
  }, []);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied to clipboard");
    } catch {
      setToast("Couldn't copy — try selecting the text manually");
    }
  }, [text]);

  const handleSaveDraft = useCallback(
    (e) => {
      e.preventDefault();
      if (status === "exceeded" || characters === 0) {
        setToast(characters === 0 ? "Write something first" : "Trim the post before saving");
        return;
      }
      setDrafts((prev) => [
        { id: crypto.randomUUID(), platformId: selected.id, text, savedAt: new Date() },
        ...prev,
      ]);
      setToast("Draft saved");
    },
    [status, characters, selected, text]
  );

  const handleRestoreDraft = useCallback((draft) => {
    const platform = PLATFORMS.find((p) => p.id === draft.platformId) || PLATFORMS[0];
    setSelected(platform);
    setText(draft.text);
    textareaRef.current?.focus();
  }, []);

  const handleDeleteDraft = useCallback((id) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const theme = dark ? DARK_THEME : LIGHT_THEME;

  return (
    <div
      style={{ ...theme, background: "var(--page-bg)", minHeight: "100%" }}
      className="w-full flex justify-center px-4 py-8 transition-colors duration-300 font-body"
    >
      <form onSubmit={handleSaveDraft} className="w-full max-w-2xl">
        <Header dark={dark} onToggleDark={() => setDark((d) => !d)} />

        <section className="rounded-lg p-5 sm:p-7" style={{ background: "var(--paper)", border: "1px solid var(--ink-20)" }}>
          {/* Platform selection */}
          <PlatformSelector platforms={PLATFORMS} selected={selected} onSelect={setSelected} />

          {/* Draft textarea with dynamic placeholder + autoresize */}
          <div className="mt-6">
            <label htmlFor="post-draft" className="sr-only">
              Write your post for {selected.label}
            </label>
            <textarea
              id="post-draft"
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={selected.placeholder}
              rows={5}
              className="w-full resize-none text-base leading-relaxed p-4 rounded-md transition-colors duration-200 focus-visible:ring-2"
              style={{
                background: "var(--paper-dim)",
                color: "var(--ink)",
                border: `1px solid ${status === "exceeded" ? "var(--seal)" : "var(--ink-20)"}`,
                outlineColor: "var(--seal)",
              }}
              aria-describedby="char-counter validation-message"
            />
          </div>

          {/* Character counter + word/hashtag/mention/reading-time chips */}
          <CharacterCounter
            characters={characters}
            maxChars={selected.maxChars}
            words={words}
            hashtags={hashtags}
            mentions={mentions}
            readingTimeSeconds={readingTimeSeconds}
          />

          {/* Progress bar */}
          <ProgressBar percent={percent} status={status} />

          {/* Real-time feedback */}
          <div id="validation-message" className="mt-4">
            <ValidationMessage status={status} remaining={remaining} maxChars={selected.maxChars} />
          </div>

          {/* Action row */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-md text-sm font-medium font-display transition-transform duration-150 active:scale-95 focus:outline-none focus-visible:ring-2"
              style={{ background: "var(--seal)", color: "var(--paper)" }}
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2"
              style={{ border: "1px solid var(--ink-20)", color: "var(--ink)" }}
            >
              <Copy size={15} aria-hidden="true" /> Copy
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 ml-auto"
              style={{ border: "1px solid var(--ink-20)", color: "var(--ink-60)" }}
            >
              <Trash2 size={15} aria-hidden="true" /> Clear
            </button>
          </div>
        </section>

        {drafts.length > 0 && (
          <section className="mt-6">
            <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "var(--ink-50)" }}>
              Saved drafts ({drafts.length})
            </p>
            <ul className="flex flex-col gap-2">
              {drafts.map((d) => {
                const platform = PLATFORMS.find((p) => p.id === d.platformId) || PLATFORMS[0];
                const Icon = platform.icon;
                return (
                  <li
                    key={d.id}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm"
                    style={{ background: "var(--paper)", border: "1px solid var(--ink-20)" }}
                  >
                    <Icon size={15} aria-hidden="true" style={{ color: platform.seal, flexShrink: 0 }} />
                    <span className="truncate flex-1" style={{ color: "var(--ink)" }}>
                      {d.text.length > 60 ? `${d.text.slice(0, 60)}…` : d.text || "(empty)"}
                    </span>
                    <span className="text-xs flex-shrink-0" style={{ color: "var(--ink-40)" }}>
                      {d.savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRestoreDraft(d)}
                      className="text-xs flex-shrink-0 underline focus:outline-none focus-visible:ring-2"
                      style={{ color: "var(--seal)" }}
                    >
                      Restore
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDraft(d.id)}
                      aria-label="Delete draft"
                      className="flex-shrink-0 focus:outline-none focus-visible:ring-2"
                      style={{ color: "var(--ink-40)" }}
                    >
                      <Trash2 size={14} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <Footer />
      </form>

      <Toast message={toast} onDone={() => setToast("")} />
    </div>
  );
}
