import { Type, Hash, AtSign, Clock } from "lucide-react";

export default function CharacterCounter({ characters, maxChars, words, hashtags, mentions, readingTimeSeconds }) {
  return (
    <div className="flex items-center justify-between mt-3 mb-1">
      <div id="char-counter" className="text-sm font-mono" style={{ color: "var(--ink-60)" }}>
        {characters.toLocaleString()} / {maxChars.toLocaleString()}
      </div>
      <div className="flex gap-4 text-xs" style={{ color: "var(--ink-40)" }}>
        <span className="flex items-center gap-1" title="Word count">
          <Type size={13} aria-hidden="true" /> {words}
        </span>
        <span className="flex items-center gap-1" title="Hashtags">
          <Hash size={13} aria-hidden="true" /> {hashtags}
        </span>
        <span className="flex items-center gap-1" title="Mentions">
          <AtSign size={13} aria-hidden="true" /> {mentions}
        </span>
        <span className="flex items-center gap-1" title="Estimated reading time">
          <Clock size={13} aria-hidden="true" /> {readingTimeSeconds}s
        </span>
      </div>
    </div>
  );
}
